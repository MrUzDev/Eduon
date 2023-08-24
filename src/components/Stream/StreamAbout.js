import React, { useEffect, useState, useContext } from 'react'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './Stream.css'
import { useParams, useNavigate } from 'react-router-dom';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { StateContext } from "../../context/Context";
import axios from "../../Apis/api";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";

export default function StreamAbout(props) {
  const {loggedIn } = useContext(StateContext);
  const [youtubeViewers, setYoutubeViewers] = useState(0)


    let id = useParams();
    let navigate = useNavigate()

  const navigateToSpeaker = (e, id) => {
    e.preventDefault();
    navigate(`/speakerAbout/${id}`);
  };  


  useEffect(() => {
    try {
     loggedIn && axios.get(`${process.env.REACT_APP_API_KEY}/api/v2/stream/get-webinar-viewers/${id.id}`,
      {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
      })
      .then((res) => setYoutubeViewers(res.data.length))
      .catch((err) => {
        refresh(err.response.status, err.response.status.text);
      });
    } catch (error) {}
  }, [])

  return (
    <div className='stream-about'>
        <div className="streamTitle">
            <h3> {props.streamAbout.name}</h3>
        </div>
          <div className="video_desc">
           <div className="aboutCourse">
            <p>{youtubeViewers} martta ko'rilgan</p>
              {props.streamAbout.short_descr &&  <>{ ReactHtmlParser(props.streamAbout.short_descr) }</>}
               </div>
               
           </div>

           <div className="Speaker-Stream-About">
       <h3 className="spiker_title">Spiker</h3>
       <div className="rowGrid" style={{ flexWrap: "nowrap" }}>
         <div className="col-6 col-md-6 col-lg-6 col-sm-24">
           <div className="cards_one">
             <div className="spiker_card_one">
               <div className="d-sm-flex justify-sm-between">
                 {props.streamAbout.speaker ? (
                   props.streamAbout.speaker.profile_picture === "" ||
                   props.streamAbout.speaker.profile_picture === "NULL" ? (
                     <svg
                       class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium avatarka pointer "
                       focusable="false"
                       aria-hidden="true"
                       viewBox="0 0 24 24"
                       data-testid="AccountCircleIcon"
                       aria-describedby="2069"
                       width={"40px"}
                       height="40px"
                     >
                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
                     </svg>
                   ) : (
                     <div className="img">
                       {props.streamAbout.speaker.profile_picture ? (
                         <img
                           src={`${process.env.REACT_APP_API_KEY}${props.streamAbout.speaker.profile_picture}`}
                           alt="jpg"
                         />
                       ): <AccountCircleIcon
                       aria-describedby={id}
                       // onClick={handleClick}
                       className="avatar pointer"
                       style={{fontSize: '50px'}}
                     />}
                     </div>
                   )
                 ) : null}
                 <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                   <h3 style={{margin: '15px 0'}}>
                      {props.streamAbout.speaker
                       ? `${props.streamAbout.speaker.f_name} ${props.streamAbout.speaker.l_name && props.streamAbout.speaker.l_name.length > 7 ? props.streamAbout.speaker.l_name.slice(0, 7) + '...' : props.streamAbout.speaker.l_name}`
                       : null}
                   </h3>
                 </div>
               </div>
               <button
                 className="pointer btn"
                 onClick={(e) =>
                   navigateToSpeaker(e, props.streamAbout.speaker.id)
                 }
               >
                 Profilni ko'rish
               </button>
             </div>
           </div>
         </div>
       </div>
     </div>
    </div>
  )
}