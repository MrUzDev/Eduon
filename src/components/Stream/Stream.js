import React, {useContext, useState} from "react";
import NavbarDemo from "../../components/Navbar/Navbar";
import NavbarSm from "../../components/Navbar/NavbarSm";
import SidebarSm from "../../components/Sidebar/SidebarSm";
import SidebarActive from "../../components/Sidebar/SidebarActive";
import StreamApp from "./StreamApp";
import { StateContext } from '../../context/Context'
import FChat from "../StreamChat/FireChat";
import { doc, setDoc} from "firebase/firestore";
import { db } from "../StreamChat/FirebaseConfig";
import { useEffect } from "react";
import axios from "../../Apis/api";
import { useParams, useNavigate } from "react-router-dom";
import StreamAbout from "./StreamAbout";


export default function Stream() {
    const { navStretch, loggedIn } = useContext(StateContext);
    const [streamData, setStreamData] = useState([]);
  const [isBought, setisBought] = useState(false);
  const [streamType, setStreamType] = useState([])
  const [streamSpeaker, setStreamSpeaker] = useState();
  const [active, setActive] = useState(0)
  const [startStream, setStartStrean] = useState()
  const [startTime, setStartTime] = useState()
  const [streamAbout, setStreamAbout] = useState([])

    var id = useParams();
    const navigate = useNavigate()



    useEffect(() => {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access")}`
      };
      try {
          (axios
            .post(
              `${process.env.REACT_APP_API_KEY}/api/v2/stream/start-webinar/${id.id}`,
              {
              },
              { headers }
            )
            .then((res) => {
              setStreamData(res.data)
            })
            .catch((err) => {
              // navigate('/')
            }));
    
      } catch (error) {
       }
    }, [])
    


  useEffect(() => {
    streamData.channel && setDoc(doc(db , streamData.channel, 'asa') , {
      uid: 'sasa',
      name: 'asa'
  })
  }, [])

  useEffect( () => {
   
  }, [])

  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(
            `${process.env.REACT_APP_API_KEY}/api/v2/stream/enrolled-webinars/`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((res) => {
            setisBought(res.data.some((item) => item.webinar.id == id.id));
          })
          .catch((err) => {
          });
    } catch (error) {}
  }, []);


  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(
            `${process.env.REACT_APP_API_KEY}/api/v2/stream/get-webinar/${id.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((res) => {
            setStreamType(res.data.type == "FREE");
            setActive(res.data.activity)
            setStreamSpeaker(res.data.speaker.id);
            setStartStrean(res.data.is_started)
            setStartTime(res.data.start_time)
            setStreamAbout(res.data)
          })
          .catch((err) => {
          });
    } catch (error) {}
  }, [active]);



  return (
    <>
      <NavbarDemo />
      <NavbarSm />
      <SidebarSm active={0} />
      <SidebarActive active={1} />
        <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
       <div>
       <div className="streamContainer">
          <div className="stream-left" style={{width: '100%'}}>
        <StreamApp streamAbout={streamAbout} startStrean={startStream} channelName={streamData.channel} streamData={streamData} streamSpeaker={streamSpeaker} startTime={startTime} speaker2={streamAbout.speaker2 && streamAbout.speaker2.id}/>
        <StreamAbout streamAbout={streamAbout}/>      
          </div>
        <FChat channelName={streamData.channel}/>
        </div>
       </div>
      </div>
      
    </>
  );
}