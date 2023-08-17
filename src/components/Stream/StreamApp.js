import React, { useState, useContext, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import "./Stream.css";
import { StateContext } from "../../context/Context";
import { useNavigate, useParams } from "react-router-dom";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import axios from "../../Apis/api";
import { Alert, Button } from "@mui/material"; 
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";
import { useReactMediaRecorder } from "react-media-recorder";
import CallEndIcon from '@mui/icons-material/CallEnd';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import VideocamIcon from '@mui/icons-material/Videocam';
import AdjustIcon from '@mui/icons-material/Adjust';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { BounceLoader } from "react-spinners";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";


export default function ViewStream(props) {
  const [startStream, setStartStream] = useState(false);
  const { profilePhoto, loggedIn } = useContext(StateContext);
  const [orSpeaker, setOrSpeaker] = useState("student");  
  const [activeUser, setActiveUser] = useState(0);
  const [deleteVebinarNotf, setDeleteVebinarNotf] = useState(false)
  const [downloadVideoNotf, setDownloadVideoNotf] = useState(false)
  const [leaveStreamNotf, setLeaveStreamNotf] = useState(false)
  const [startTimeCheck, setStartTimeCheck] = useState(false)
  const [muteVideoIcon, setMuteVideoIcon] = useState(false)
  const [muteVolumeIcon, setMuteVolumeIcon] = useState(false)
  const [shareScreenIcon, setShareScreenIcon] = useState(false)
  const [mediaBlobCheck, setMediaBlobCheck] = useState(false)
  const [vebinarStartModal, setVebinarStartModal] = useState(false)

  const [loader, setLoader] = useState(false);
  const [startStreamDay, setStartStreamDay] = useState('')
  const [startStreamHour, setStartStreamHour] = useState('')
  const [startStreamMinute, setStartStreamMinute] = useState('')
  const [startStreamSecond, setStartStreamSecond] = useState('')

  const navigate = useNavigate();
  var id = useParams();

    // const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ screen: true});
     
    useEffect(() => {
      setLoader(true)
      if(props.streamAbout && orSpeaker && props.streamData && startStreamMinute) {
        setTimeout(() => {
          setLoader(false)
        }, 1000);
      }
    }, [props.streamAbout && orSpeaker && props.streamData && startStreamMinute])


  useEffect(() => {
    try {
      loggedIn && axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v2/stream/check-user-stream/${id.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then((res) => {
          setOrSpeaker(res.data.user);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, []);


  const streamStatus = (status) => {

    try {
      loggedIn && axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v2/stream/stop-stream/${id.id}`,
          {
            is_started: status == true ? true : false,
            is_end: status == false ? true : false
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}

    if(status === false) {
      navigate('/')
    }
  }


  useEffect(() => {
    if((new Date(props.startTime).getTime()) <= (new Date(moment().format().replace("+03:00", "+05:00")))) {
      setStartTimeCheck(true)
    }
  }, [props.startTime])


  let channelParameters = {
    localAudioTrack: null,
    localVideoTrack: null,
    remoteAudioTrack: null,
    remoteVideoTrack: null,
    screenTrack: null,
    remoteUid: null,
  };


  var isSharingEnabled = false;
  var isMuteVideo = false;

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "4px solid #006aff",
    borderRadius: "15px",
    boxShadow: 24,
    p: 5,
  };

  async function startBasicCall() {
    const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    const remotePlayerContainer = document.createElement("div");
    const localPlayerContainer = document.createElement("div");
    localPlayerContainer.id = String(props.streamData.user_id && props.streamData.user_id);
   
    document.querySelector(".userPhoto").style.display = "none";
    document.querySelector('.streamBg').style.display = 'flex'
    localPlayerContainer.classList.add('VebinarVideo')
    localPlayerContainer.style.width = "100%";
    localPlayerContainer.style.height = "100%";
    localPlayerContainer.style.borderRadius = "5px";

    remotePlayerContainer.style.width = "100%";
    remotePlayerContainer.classList.add('VebinarVideoR')
    remotePlayerContainer.style.height = "100%";
    remotePlayerContainer.style.borderRadius = "5px";


    if(orSpeaker == 'speaker2') {
      localPlayerContainer.classList.add('two-speaker')
        remotePlayerContainer.classList.add('two-speaker')
    }else if(orSpeaker == 'unenrolled') {
      remotePlayerContainer.style.display = 'flex'
      remotePlayerContainer.style.width = '100% !important'
    }else if (orSpeaker == 'speaker') {
    streamStatus(true)
      
    }

    

    agoraEngine.on("user-published", async (user, mediaType) => {
      await agoraEngine.subscribe(user, mediaType);
      console.log("subscribe success");
      if (mediaType == "video") {
        channelParameters.remoteVideoTrack = user.videoTrack;
        channelParameters.remoteAudioTrack = user.audioTrack;
        channelParameters.remoteUid = user.uid.toString();
        remotePlayerContainer.id = user.uid.toString();
        channelParameters.remoteUid = user.uid.toString();
     
        document.querySelector(".streamBg").appendChild(remotePlayerContainer);
        channelParameters.remoteVideoTrack.play(remotePlayerContainer);
      }
      if (mediaType == "audio") {
        channelParameters.remoteAudioTrack = user.audioTrack;
        channelParameters.remoteAudioTrack.play();
      }

      agoraEngine.on("user-left", (user) => {
        if (user.uid == props.streamSpeaker) {
          navigate('/')
        }
      });
  
    });

    agoraEngine.on("user-joined", (user) => {
      console.log(user.uid, 'joined');
      setActiveUser(current => (Number(current) + 1))

      if(user.uid === props.speaker2) {
        localPlayerContainer.classList.add('two-speaker')
        remotePlayerContainer.classList.add('two-speaker')
      }
    });

    agoraEngine.on("user-left", (user) => {
      setActiveUser(current => (Number(current) - 1))

      if(user.uid == props.speaker2) {
        localPlayerContainer.classList.remove('two-speaker')

        if(orSpeaker == 'speaker') {
          remotePlayerContainer.style.display = 'none'
        }
      }
    });


    await agoraEngine.join(
      "0e3533715d014b1b9511f53da3c981c9",
      props.streamData && props.streamData.channel,
      props.streamData && props.streamData.token,
      props.streamData && props.streamData.user_id
    );

  
    

    try { 
        if (orSpeaker == "speaker" || orSpeaker == 'speaker2'){

        channelParameters.localAudioTrack =
        await AgoraRTC.createMicrophoneAudioTrack();
        channelParameters.localVideoTrack =
        await AgoraRTC.createCameraVideoTrack();
        document.querySelector(".streamBg").appendChild(localPlayerContainer);
        await agoraEngine.publish([
          channelParameters.localAudioTrack,
          channelParameters.localVideoTrack,
        ]);
        channelParameters.localVideoTrack.play(localPlayerContainer);
        console.log("publish success!");
      }
      } catch (error) {
        console.log('connect error');
      }
    
try {
  document.getElementById("inItScreen").onclick = async function () {
    if (isSharingEnabled == false) {
      // Create a screen track for screen sharing.
      channelParameters.screenTrack = await AgoraRTC.createScreenVideoTrack();
      // Stop playing the local video track.
      channelParameters.localVideoTrack.stop();
      // Unpublish the local video track.
      await agoraEngine.unpublish(channelParameters.localVideoTrack);
      await agoraEngine.publish(channelParameters.screenTrack);
      // Play the screen track on local container.
      channelParameters.screenTrack.play(localPlayerContainer);
      // Update the button text.
      // Update the screen sharing state.
      isSharingEnabled = true;
      setShareScreenIcon(true)
    } else {
      // Stop playing the screen track.
      channelParameters.screenTrack.stop();
      // Unpublish the screen track.
      await agoraEngine.unpublish(channelParameters.screenTrack);
      // Publish the local video track.
      await agoraEngine.publish(channelParameters.localVideoTrack);
      // Play the local video on the local container.
      channelParameters.localVideoTrack.play(localPlayerContainer);
      // Update the button text.
      // Update the screen sharing state.
      isSharingEnabled = false;
      setShareScreenIcon(false)
    }
  }; 
} catch (error) {
  
}

try {
  document.getElementById("leave").onclick = async function () {

    setDeleteVebinarNotf(false)

    channelParameters.screenTrack = true
  
    channelParameters.localAudioTrack.close();
    channelParameters.localVideoTrack.close();

    removeVideoDiv(remotePlayerContainer.id);
    removeVideoDiv(localPlayerContainer.id);
    
    await agoraEngine.leave();
    console.log("You left the channel");
    setStartStream(false);
    if(orSpeaker == 'speaker') {
      streamStatus(false)
      setLeaveStreamNotf(true)
    }


  };
} catch (error) {}

try {
  document.getElementById("leaveUser").onclick = async function () {

  
    // channelParameters.localAudioTrack.close();
    // channelParameters.localVideoTrack.close();

    removeVideoDiv(remotePlayerContainer.id);
        removeVideoDiv(localPlayerContainer.id);

    await agoraEngine.leave();
     navigate('/')
} 
} catch (error) {}



try {
  document.getElementById("muteVideo").onclick = async function () {
    if (isMuteVideo == false) {
      channelParameters.localVideoTrack.setEnabled(false);
      isMuteVideo = true;
      setMuteVideoIcon(true)
    } else {
      channelParameters.localVideoTrack.setEnabled(true);
      isMuteVideo = false;
      setMuteVideoIcon(false)
    }
  };
  document.getElementById("localAudioVolume").addEventListener("click", function (evt) {
      if(channelParameters.localAudioTrack._volume !== 0) {
        channelParameters.localAudioTrack.setVolume(0);
        setMuteVolumeIcon(true)
      }else {
        channelParameters.localAudioTrack.setVolume(100);
        setMuteVolumeIcon(false)
      }
    });
} catch (error) {}
}

function removeVideoDiv(elementId)
{
    console.log("Removing "+ elementId+"Div");
    let Div = document.getElementById(elementId);
    if (Div)
    {
        Div.remove();
    }
};




useEffect(() => {
    
    const restTime = (new Date(props.streamAbout.start_time).getTime()) - (new Date(moment().format().replace("+03:00", "+05:00")));
    setStartStreamDay(Math.floor(restTime / (1000 * 60 * 60 * 24)));
    setStartStreamHour( Math.floor(
      (restTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ));
    setStartStreamMinute(Math.floor((restTime % (1000 * 60 * 60)) / (1000 * 60)));
    setStartStreamSecond(Math.floor((restTime % (1000 * 60)) / 1000))
   
    
  }, [props.streamAbout, startStreamSecond])
  
  
  useEffect(() => {
    const restTime = (new Date(props.streamAbout.start_time).getTime()) - (new Date(moment().format().replace("+03:00", "+05:00")));
    
    setInterval(() => {
        setStartStreamSecond(Math.floor((restTime % (1000 * 60)) / 1000))
      }, 1000)

      if( (new Date(props.streamAbout.start_time).getTime()) >= (new Date(moment().format().replace("+03:00", "+05:00")))) {
        setVebinarStartModal(true)
      }

},[props.streamAbout])

// useEffect(() => {
//   console.log(mediaBlobUrl);
//   if(mediaBlobUrl) {
//     setMediaBlobCheck(true)
//     console.log('salom');
//   }
// }, [mediaBlobUrl])


  return (
    <>
    {props.streamAbout.webinar_type && props.streamAbout.webinar_type == 'AGORA' ? (
      <div className="container streamBg" id="streamBg">
      {orSpeaker == "speaker" && startStream ? <p id="activeUser">Efirda: {activeUser}</p> : null} 
        <>
          <div className="userPhoto" id="userPhoto">
            <div className="userphotoChild">
              {profilePhoto ? (
                <img
                  src={`${process.env.REACT_APP_API_KEY}${profilePhoto}`}
                  alt=""
                />
              ) : (
                <div className="NoPhoto">
                   <svg
              class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium avatarka pointer "
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="AccountCircleIcon"
              aria-describedby="2069"
              width={"100%"}
              height="100%"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
            </svg>
                </div>
              )}
            </div>
          </div>
          <div className="streamNav"></div>
        </>
        <div className="row" id="row">
          <div className="streamNav">

          { orSpeaker == "speaker" || orSpeaker == 'speaker2' && startTimeCheck ?  (
              <div className="startStreamDiv" id="startStreamDiv">
                {!startStream ? (
                    <button
                    id="join" onClick={() => {
                      startBasicCall();
                      setStartStream(true);
                    }} >
                  <SmartDisplayIcon/>
                  </button>
                ) : (
                  <>
                  {/* {orSpeaker == 'speaker' ? (
                    status == 'recording' ?
                     <button 
                    // onClick={stopRecording}
                    ><StopCircleIcon className="navButtonsRed"/></button> : <button 
                    // onClick={startRecording}
                    ><AdjustIcon/></button>
                  ): null} */}
                    <button type="button" id="inItScreen">
                  {shareScreenIcon ? <StopScreenShareIcon className="navButtonsRed"/>: <ScreenShareIcon/>}
                </button>
                <button type="button" id="muteVideo">
                  {muteVideoIcon ? <VideocamOffIcon className="navButtonsRed"/> : <VideocamIcon/>}
                </button>
                <button id="localAudioVolume">{muteVolumeIcon ? <MicOffIcon className="navButtonsRed"/> : <MicIcon/>}</button>
                
                {orSpeaker == 'speaker2' ? (
                <button type="button" id="leaveUser"> <CallEndIcon className="navButtonsRed"/> </button>
                ): (
                  <button type="button" onClick={() => {
                    // stopRecording();
                     setDeleteVebinarNotf(true)}}>
                   <CallEndIcon className="navButtonsRed" />
                  </button>
                )}
                  </>
                )}
              </div>
            ): (
              <div className="startStreamDiv">
               {!startStream ? (
                props.startStrean ? (
                 <button
                 id="join"
                 onClick={() => {
                      startBasicCall();
                      setStartStream(true);
                    }} >
                   <SmartDisplayIcon/>
                  </button>
                ) : <p>Live {props.startTime && props.startTime.replace('T', ' ').replace("+05:00", '')}</p>

                ) : (
                  <button type="button" id="leaveUser"> <CallEndIcon className="navButtonsRed"/></button>
                )}
              </div>
            )}
            </div>
        </div>

      </div>
    ): (
      <div className="YoutubeTrans">
      {startTimeCheck ? (
        <div style={{position: 'relative'}}>
        <iframe className="width-100 streamBg" allowfullscreen src={props.streamAbout.youtube_link} title="YouTube video player" frameborder="0"></iframe>
        <div id="youtubePlayerMark"></div>
        <div id="youtubePlayerMark2"></div>
        <div id="youtubePlayerMark3"></div>
        </div>
        ): (
        <>
        <img
            src={`${process.env.REACT_APP_API_KEY}${props.streamAbout.cover_img}`}
            alt=""
            className="coverImg"
        />
        </>
      )}
      </div>
    )}

                  
      <Collapse in={deleteVebinarNotf}>
              <Alert
               action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setDeleteVebinarNotf(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
          className="alert animation"
          severity="info"
        >
          <strong>
          <p style={{fontSize: '18px'}}>Haqiqatdan ham tugatmoqchimisiz?</p>
          </strong>
          <div style={{textAlign: 'center', marginTop: '10px'}}>
          </div>
          <Button id="leave" onClick={() => setDownloadVideoNotf(true)} className="alertBtn" style={{borderRadius: '15px', backgroundColor: 'rgba(0, 106, 255, 1)'}} variant="contained">Ha</Button>
          <Button onClick={() => setDeleteVebinarNotf(false)} className="alertBtn" style={{borderRadius: '15px', backgroundColor: 'rgba(0, 106, 255, 1)', marginLeft: '10px'}} variant="contained">Yo'q</Button>
        </Alert>
      </Collapse>

        {loader && (
        <div className="loader">
          <BounceLoader color="#006AFF" speedMultiplier={1.2} />
        </div>
      )}

<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={vebinarStartModal}
        onClose={() => setVebinarStartModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className="modalForLogin">
          <Fade in={vebinarStartModal}>
            <Box sx={style2} className="container">
              <div className="rowGrid">
                <div className="flex justify-end width-100"><CloseIcon className="pointer" onClick={() => setVebinarStartModal(false)}/></div>
                <div className="col-24 text-center mb-24">
                  {/* {startStreamSecond && ( */}
                    <h4> Vebinar boshlanishiga {startStreamDay > 0 ? startStreamDay + ' kun' : null} {startStreamHour > 0 ? startStreamHour + ' soat' : null} {startStreamMinute > 0 ? startStreamMinute + ' daqiqa' : null} {startStreamSecond + ' sekund'} qoldi.</h4>
                  {/* )} */}
               </div>
              </div>
            </Box>
          </Fade>
        </div>
      </Modal>;

      {loader && (
          <div className="loader">
                      <BounceLoader color="#006AFF" speedMultiplier={1.2} />
          </div>
      )}

        {/* <Collapse in={downloadVideoNotf} style={{zIndex: '2'}}>
              <Alert
               action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setDownloadVideoNotf(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
          className="alert animation"
          severity="info"
        >
          <strong>
          <p style={{fontSize: '18px'}}>Yozib olingan videoni yuklab olmoqchimisiz?</p>
          </strong>
          <div style={{textAlign: 'center', marginTop: '10px'}}>
          </div>
          <a href={mediaBlobUrl} download='streamVideo.mp4' onClick={() => {setLeaveStreamNotf(true); setDownloadVideoNotf(false)}}><Button className="alertBtn" style={{borderRadius: '15px', backgroundColor: 'rgba(0, 106, 255, 1)', color: '#fff'}}>Ha</Button> </a>
          <Button onClick={() => {setDownloadVideoNotf(false); navigate('/')}} className="alertBtn" style={{borderRadius: '15px', backgroundColor: 'rgba(0, 106, 255, 1)', marginLeft: '10px'}} variant="contained">Yo'q</Button>
        </Alert>
        </Collapse>

        <Collapse in={leaveStreamNotf} >
              <Alert
               action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setLeaveStreamNotf(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2, display: 'flex', alignItems: 'center' }}
            className="alert animation"
            severity="info"
        >
          <strong>
          <p style={{fontSize: '18px'}}><Button onClick={() => navigate('/')} className="alertBtn" style={{borderRadius: '15px', backgroundColor: 'rgba(0, 106, 255, 1)'}} variant="contained"><a style={{color: 'unset'}}>Bosh sahifaga o'tish</a></Button></p>
          </strong>
        </Alert>
        </Collapse> */}
    </>
  );
}
