import React, { useContext, useEffect, useState, useRef } from "react";
import "./Watching.css";
// import AccordionItem from "../AccordionItem/AccordionItem";
import Rating from "@mui/material/Rating";
import Icon1 from "../../assets/icons/CourseStructureIcons/video-play.png";
import VideoCircle from "../../assets/icons/CourseStructureIcons/video-circle.png";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { StateContext } from "../../context/Context";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabUnstyled from "@mui/base/TabUnstyled";
import CourseAbout from "../CourseAbout/CourseAbout";
import Comments from "../Comments/comments";
import axios from "../../Apis/api";
import { useParams, useLocation } from "react-router-dom";
import CourseRating from "../CourseRating/courseRating";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footers/Footer";
import NavbarDemo from "../Navbar/Navbar";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import ReactHlsPlayer from "react-hls-player";
import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
import CheckIcon from "@mui/icons-material/Check";
import { Divider } from "@mui/material";
import NavbarSm from "../Navbar/NavbarSm";
import PauseIcon from "@mui/icons-material/Pause";
import ReactDOM from "react-dom";
import { BounceLoader } from "react-spinners";
import PauseSharpIcon from "@mui/icons-material/PauseSharp";

import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FullscreenSharpIcon from "@mui/icons-material/FullscreenSharp";
import SlowMotionVideoSharpIcon from "@mui/icons-material/SlowMotionVideoSharp";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

function Watching() {
  const [expanded, setExpanded] = useState("");
  const [datas, setDatas] = useState([]);
  const [play, setPlay] = useState(true);
  const [hover, setHover] = useState(false);
  const [pause, setPause] = useState(false);
  const [videoUrl, setVideoUrl] = useState();
  const { navStretch, loggedIn } = useContext(StateContext);
  const [resData, setResData] = useState("");
  const [VideoSetting, setVideoSetting] = useState(false);
  const [currentVideo, setCurrentVideo] = useState();
  const [lessonIndex, setLessonIndex] = useState('00');
  const [share, setShare] = useState(false);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [referalToken, setReferalToken] = useState("");
  const [userPhone, setUserPhone] = useState();
  const [playVideoDuration, setPlayVideoDuration] = useState();
  const [playVideoCurrent, setPlayVideoCurrent] = useState();
  const [playVideoVolume, setPlayVideoVolume] = useState();
  const [speedOptionsAc, setSpeedOptionsAc] = useState(false);
  const [videoQuality, setVideoQuality] = useState("");
  const [lessonId, setLessonId] = useState(false);

  const [waitingSec, setWaitingSec] = useState(false);
  const [loader, setLoader] = useState(false);
  const [courseRate, setCourseRate] = useState(0)

  var id = useParams();
  const playVideo = useRef();

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setWaitingSec(true);
      setLoader(false);
    }, 1000);
  }, []);

  // const changeWaitingSec = () => {
  //   setWaitingSec(true)
  // }

  const pauseVideoPlayer = () => {
    playVideo.current.pause();
    playVideo.current.currentTime = localStorage.getItem("duration");
    setPlay(true);
    setPause(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/${id.id}`)
        .then((res) => {
          setResData(res.data);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, [id]);

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/watch/module/${id.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then((res) => {
          setDatas(res.data);
          setLessonId(res.data[0] && res.data[0].lessons[0].id);
          const url = {
            resolution_240p: res.data[0].lessons[0].resolution_240p,
            resolution_360p: res.data[0].lessons[0].resolution_360p,
            resolution_480p: res.data[0].lessons[0].resolution_480p,
            resolution_720p: res.data[0].lessons[0].resolution_720p,
            resolution_1080p: res.data[0].lessons[0].resolution_1080p,
          };
          setVideoUrl(url);
          if (url.resolution_240p) {
            setCurrentVideo(url.resolution_240p);
          } else if (url.resolution_360p) {
            setCurrentVideo(url.resolution_360p);
          } else if (url.resolution_480p) {
            setCurrentVideo(url.resolution_480p);
          } else if (url.resolution_720p) {
            setCurrentVideo(url.resolution_720p);
          } else if (url.resolution_1080p) {
            setCurrentVideo(url.resolution_1080p);
          } else {
            setCurrentVideo("");
          }
        })
        .catch((err) => refresh(err.response.status, err.response.status.text));
    } catch (error) {}
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v1/accounts/profile`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => {
            setUserPhone(res.data.phone_number);
          });
    } catch (error) {}
  }, []);

  useEffect(() => {
    lessonIndex && setActiveModuleIndex(parseInt(lessonIndex.slice(0, 1)));
    lessonIndex && setActiveLessonIndex(parseInt(lessonIndex.slice(1)));
  }, [lessonIndex]);

  // save video duration in localeStorage

  useEffect(() => {
    if (videoUrl) {
      let videos = document.querySelector(".coverImg");
      const mainVideo = document.querySelector("video");

      videos.addEventListener("timeupdate", function () {
        localStorage.setItem(
          "duration",
          Math.floor(mainVideo.currentTime)
        );

        if (
          Math.floor(mainVideo.currentTime) ===
            Math.floor(mainVideo.duration / 2) &&
          lessonId !== false
        ) {
          console.log("succes eduon api");
          // console.log(lessonId);

          try {
            lessonId &&
              axios
                .post(
                  `${process.env.REACT_APP_API_KEY}/api/v2/courses/lesson-view-post/${lessonId}`,
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                  }
                )
                .then((res) => {
                  setLessonId(false);
                })
                .catch(() => {});
          } catch (error) {}
        }
      });
    }
  }, [play, lessonId, videoUrl]);

 
  useEffect(() => {
    copied &&
      setTimeout(() => {
        setCopied(false);
      }, 1000);
  }, [copied]);

  useEffect(() => {
    const watermarkMap = () => {
      let watermarkElement = document.getElementById("watermark");
      let watermarkTop = Math.floor(Math.random() * 90);
      let watermarkRight = Math.floor(Math.random() * 90);

      if (watermarkElement) {
        watermarkElement.style.top = `${watermarkTop}%`;
        watermarkElement.style.right = `${watermarkRight}%`;
      }
    };

    setInterval(watermarkMap, 20000);
  }, []);

  const fullHover = () => {
    setHover(true);
  };

  const fullPLay = () => {
    document.querySelector("video").play();
    setPlay(false);
    setPause(true)
    
      setTimeout(() => {
        setPause(false)
      }, 2500)
  };


  const playOrPause = () => {
    if(play) {
      fullPLay()
    }else {
      pauseVideoPlayer()
    }
  }

  //***  add and change course rating METHOD OF POST

  const setRating = async (e) => {
    console.log(`${process.env.REACT_APP_API_KEY}/api/v1/courses/rate-course/`);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/rate-course/`,
          {
            course: resData && parseInt(resData.id),
            rating: parseInt(e.target.value),
          },
          { headers }
        )
        .then((res) => {
          res.data === "You have already rated the course!" &&
            editRating(e.target.value, parseInt(resData.id));
        })
        .catch(() => {});
    } catch (error) {}
  };

  //***  UPDATE and change course RATING METHOD OF PUT

  const editRating = (value, id) => {
    console.log(id);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      axios
        .put(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/edit-rate-course/${id}`,
        
          {
            rating: parseInt(value),
          },
          {
            headers,
          }
        )
        .then((res) => {})
        .catch((err) => {});
    } catch (error) {}
  };


  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/get-rate-course/${id.id}`,
          {
            headers,
          }
        )
        .then((res) => setCourseRate(res.data.rating));
    } catch (error) {}

  }, [id])

  const referalTg = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v2/courses/create-referral-course/${id.id}`,
          {
            headers,
          }
        )
        .then((res) => setReferalToken(res.data.uuid));
    } catch (error) {}

    setShare(!share);
  };

  ////////////////// create new video player for watchinge

  useEffect(() => {
    if (videoUrl) {
      const containerVideo = document.querySelector(".video-container"),
        blurvid = document.querySelector("video"),
        mainVideo = document.querySelector("video"),
        videoTimeline = document.querySelector(".video-timeline"),
        progressBar = document.querySelector(".progress-bar"),
        volumeBtn = document.querySelector(".volume svg"),
        currentVidTime = document.querySelector(".current-time"),
        videoDuration = document.querySelector(".video-duration"),
        skipBackward = document.querySelector(".skip-backward svg"),
        skipForward = document.querySelector(".skip-forward svg"),
        speedOptions = document.querySelector(".speed-options"),
        fullScreenBtn = document.querySelector(".fullscreen svg"),
        volumeSlider = document.querySelector(".left input");
      let timer;

      mainVideo.onloadedmetadata = function () {
        setPlayVideoVolume(mainVideo.volume);
        setPlayVideoDuration(mainVideo.duration);
      };

      const hideControls = () => {
        if (document.querySelector("video")) return;
        timer = setTimeout(() => {
          containerVideo.classList.remove("show-controls");
        }, 3000);
      };

      hideControls();

      blurvid.volume = 1;
      containerVideo.addEventListener("mousemove", () => {
        containerVideo.classList.add("show-controls");
        clearTimeout(timer);
        hideControls();
      });

      const formatTime = (time) => {
        let seconds = Math.floor(time % 60),
          minutes = Math.floor(time / 60) % 60,
          hours = Math.floor(time / 3600);

        seconds = seconds < 10 ? `0${seconds}` : seconds;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        hours = hours < 10 ? `0${hours}` : hours;

        if (hours == 0) {
          return `${minutes}:${seconds}`;
        }
        return `${hours}:${minutes}:${seconds}`;
      };

      videoTimeline.addEventListener("mousemove", (e) => {
        let timelineWidth = videoTimeline.clientWidth;
        let offsetX = e.offsetX;
        let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
        const progressTime = videoTimeline.querySelector("span");
        offsetX =
          offsetX < 20
            ? 20
            : offsetX > timelineWidth - 20
            ? timelineWidth - 20
            : offsetX;
        progressTime.style.left = `${offsetX}px`;
        progressTime.innerText = formatTime(percent);
      });

      videoTimeline.addEventListener("click", (e) => {
        // if (!isFinite(mainVideo.currentTime)) {
          let timelineWidth = videoTimeline.clientWidth;
          mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
          blurvid.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
        // }
      });

      mainVideo.addEventListener("timeupdate", (e) => {
        let percent = (mainVideo.currentTime / mainVideo.duration) * 100;
        progressBar.style.width = `${percent}%`;
        currentVidTime.innerText = formatTime(
          parseInt(mainVideo.currentTime)
        );
        setLoader(false);
      });

      window.addEventListener("offline", (e) => {
        setLoader(true);
      });

        mainVideo.addEventListener("loadeddata", () => {
        videoDuration.innerText = formatTime(mainVideo.duration);
        setLoader(false);
      });

      const draggableProgressBar = (e) => {
        console.log(mainVideo.currentTime);
        let timelineWidth = videoTimeline.clientWidth;
        progressBar.style.width = `${e.offsetX}px`;
        mainVideo.currentTime =
          (e.offsetX / timelineWidth) * mainVideo.duration;
          mainVideo.currentTime =
          (e.offsetX / timelineWidth) * mainVideo.duration;
        currentVidTime.innerText = formatTime(mainVideo.currentTime);
      };

      volumeBtn.addEventListener("click", () => {
        if (!volumeBtn.classList.contains("fa-volume-high")) {
          playVideoVolume.volume = 0.5;
          volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
        } else {
          playVideoVolume = 0.0;
          volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
        }
        volumeSlider.value = playVideoVolume;
      });


      window.addEventListener("keydown", (e) => {
        e.preventDefault()

        // add and take 10s video current time start
        if (e.keyCode === 39) {
          mainVideo.currentTime += 5;
        } else if (e.keyCode === 37) {
          mainVideo.currentTime -= 5;
        }
        // add and take 10s video current time end
  
        // full screen toggle start
        else if(e.keyCode === 70) {
          containerVideo.classList.toggle("fullscreen");
          if (document.fullscreenElement) {
            fullScreenBtn.classList.replace("fa-compress", "fa-expand");
            return document.exitFullscreen();
          }else {
            fullScreenBtn.classList.replace("fa-expand", "fa-compress");
            containerVideo.requestFullscreen();
          }
        }
        // full screen toggle end
  
        // video play and pause start
        else if(e.keyCode === 32) {
          if(mainVideo.paused) {
            fullPLay()
          }else {
            pauseVideoPlayer()
          }
        }
        // video play and pause end
        
        // add and take video volume start
        else if(e.keyCode === 38) {
          if(mainVideo.volume < 1) {
            mainVideo.volume += 0.2;
            volumeSlider.value = mainVideo.volume;          
          }
        }else if(e.keyCode === 40) {
          if(mainVideo.volume > 0.2) {
            mainVideo.volume -= 0.2;
            volumeSlider.value = mainVideo.volume;          
          }
        }
        // add and take video volume end

      });

      volumeSlider.addEventListener("input", (e) => {
        mainVideo.volume = e.target.value;
        if (e.target.value == 0) {
          return volumeBtn.classList.replace(
            "fa-volume-high",
            "fa-volume-xmark"
          );
        }
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
      });

      speedOptions.querySelectorAll("li").forEach((option) => {
        option.addEventListener("click", () => {
          mainVideo.playbackRate = option.dataset.speed;
          blurvid.playbackRate = option.dataset.speed;
          speedOptions.querySelector(".active").classList.remove("active");
          option.classList.add("active");
        });
      });

      fullScreenBtn.addEventListener("click", () => {
        containerVideo.classList.toggle("fullscreen");
        if (document.fullscreenElement) {
          fullScreenBtn.classList.replace("fa-compress", "fa-expand");
          return document.exitFullscreen();
        }
        fullScreenBtn.classList.replace("fa-expand", "fa-compress");
        containerVideo.requestFullscreen();
      });

      skipBackward.addEventListener("click", () => {
        mainVideo.currentTime -= 10;
      });

      skipForward.addEventListener("click", () => {
        mainVideo.currentTime += 10;
      });

      videoTimeline.addEventListener("mousedown", () =>
        videoTimeline.addEventListener("mousemove", draggableProgressBar)
      );
      document.addEventListener("mouseup", () =>
        videoTimeline.removeEventListener("mousemove", draggableProgressBar)
      );


    }
  }, [ currentVideo ]);

  useEffect(() => {
    if (localStorage.getItem("watchIn") == window.location.href && videoUrl) {
      const timeVideo = localStorage.getItem("duration");
      playVideo.current.currentTime = parseInt(timeVideo);
    }
    localStorage.setItem("watchIn", window.location.href);
  }, [videoQuality]);

 
  return (
    <>
      <NavbarSm />
      <NavbarDemo />
      <Sidebar />
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="watchingCourses">
          <div className="container">
            <div className="rowGrid">
              <div className="col-18 col-lg-14 col-md-24 p-0 col-sm-24">
                <div className="video video-container">
                  {/* secrutiy */}
                  <h6 id="watermark" className="watermark">
                    {userPhone}
                  </h6>
                  <div className="wrapper">
                    <div className="video-timeline">
                      <div className="progress-area">
                        <span>00:00</span>
                        <div className="progress-bar"></div>
                      </div>
                    </div>
                    <ul className="video-controls">
                      <li className="options left">
                        <button className="volume">
                          <VolumeUpIcon />
                        </button>
                        <input type="range" min="0" max="1" step="any" />
                        <div className="video-timer">
                          <p className="current-time">00:00</p>
                          <p className="separator"> / </p>
                          <p className="video-duration">00:00</p>
                        </div>
                      </li>
                      <li className="options center">
                        <button className="skip-backward">
                          <RotateLeftIcon />
                        </button>
                        <button id="play-pause">
                          {play ? (
                              <PlayArrowIcon
                                onClick={() => {
                                  fullPLay()
                                }}
                              />
                          ) : (
                            <PauseIcon
                            onClick={() => {
                              pauseVideoPlayer();
                            }}
                            />
                          )}
                        </button>
                        <button className="skip-forward">
                          <RotateRightIcon />
                        </button>
                      </li>
                      <li class="options right">
                        <div class="playback-content">
                          <button class="playback-speed">
                            <span class="material-symbols-rounded">
                              <SlowMotionVideoSharpIcon
                                onClick={() =>
                                  setSpeedOptionsAc(
                                    (speedOptionsAc) => !speedOptionsAc
                                  )
                                }
                              />
                            </span>
                          </button>
                          <ul
                            className={
                              speedOptionsAc
                                ? "speed-options show"
                                : "speed-options"
                            }
                          >
                            <li data-speed="2">2x</li>
                            <li data-speed="1.5">1.5x</li>
                            <li data-speed="1" class="active">
                              Normal
                            </li>
                            <li data-speed="0.75">0.75x</li>
                            <li data-speed="0.5">0.5x</li>
                          </ul>
                        </div>
                        <button className="fullscreen">
                          <FullscreenSharpIcon />
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="videoSetting"
                    onMouseOver={() => setHover(true)}
                    onMouseLeave={() => {
                      setHover(false);
                      setVideoSetting(false);
                    }}
                  >
                    <VideoSettingsIcon
                      onClick={() => setVideoSetting(!VideoSetting)}
                    />
                    {VideoSetting && hover && videoUrl ? (
                      <ul className="resolution">
                        <li className="title">Video tasvirning sifati</li>
                        <Divider color="white" />
                        {videoUrl.resolution_144p ? (
                          <li
                            onClick={() => {
                              setCurrentVideo(videoUrl.resolution_144p);
                              setVideoQuality(true);
                              playVideo.current.currentTime =
                                localStorage.getItem("duration");
                            }}
                          >
                            {currentVideo?.includes("144p") ? (
                              <div className="iconsQuality">
                                <CheckIcon />
                              </div>
                            ) : (
                              <div className="iconsQuality"></div>
                            )}
                            144p
                          </li>
                        ) : null}
                        {videoUrl.resolution_240p ? (
                          <li
                            onClick={() => {
                              setCurrentVideo(videoUrl.resolution_240p);
                              setVideoQuality(videoUrl.resolution_240p);
                              playVideo.current.currentTime =
                                localStorage.getItem("duration");
                            }}
                          >
                            {currentVideo?.includes("240p") ? (
                              <div className="iconsQuality">
                                <CheckIcon />
                              </div>
                            ) : (
                              <div className="iconsQuality"></div>
                            )}
                            240p
                          </li>
                        ) : null}
                        {videoUrl.resolution_360p ? (
                          <li
                            onClick={() => {
                              setCurrentVideo(videoUrl.resolution_360p);
                              setVideoQuality(videoUrl.resolution_360p);
                              playVideo.current.currentTime =
                                localStorage.getItem("duration");
                            }}
                          >
                            {currentVideo?.includes("360p") ? (
                              <div className="iconsQuality">
                                <CheckIcon />
                              </div>
                            ) : (
                              <div className="iconsQuality"></div>
                            )}
                            360p
                          </li>
                        ) : null}
                        {videoUrl.resolution_480p ? (
                          <li
                            onClick={() => {
                              setCurrentVideo(videoUrl.resolution_480p);
                              setVideoQuality(videoUrl.resolution_480p);
                              playVideo.current.currentTime =
                                localStorage.getItem("duration");
                            }}
                          >
                            {currentVideo?.includes("480p") ? (
                              <div className="iconsQuality">
                                <CheckIcon />
                              </div>
                            ) : (
                              <div className="iconsQuality"></div>
                            )}
                            480p
                          </li>
                        ) : null}
                        {videoUrl.resolution_720p ? (
                          <li
                            onClick={() => {
                              setCurrentVideo(videoUrl.resolution_720p);
                              setVideoQuality(videoUrl.resolution_720p);
                              playVideo.current.currentTime =
                                localStorage.getItem("duration");
                            }}
                          >
                            {currentVideo?.includes("720p") ? (
                              <div className="iconsQuality">
                                <CheckIcon />
                              </div>
                            ) : (
                              <div className="iconsQuality"></div>
                            )}
                            720p
                          </li>
                        ) : null}
                        {videoUrl.resolution_1080p ? (
                          <li
                            onClick={() => {
                              setCurrentVideo(videoUrl.resolution_1080p);
                              setVideoQuality(videoUrl.resolution_1080p);
                              playVideo.current.currentTime =
                                localStorage.getItem("duration");
                            }}
                          >
                            {currentVideo?.includes("1080p") ? (
                              <div className="iconsQuality">
                                <CheckIcon />
                              </div>
                            ) : (
                              <div className="iconsQuality"></div>
                            )}
                            1080p
                          </li>
                        ) : null}
                      </ul>
                    ) : null}
                  </div>

                  {loader && (
                    <div className="loader">
                      <BounceLoader color="#006AFF" speedMultiplier={1.2} />
                    </div>
                  )}

                  {/* <FullscreenIcon id="full-screen-icon" onClick={() => secrutiyNum()} style={{position: 'absolute', right: '10%', bottom: '38px', fontSize: '30px', color: '#fff', zIndex: '999'}}/>  */}
                  <div className="img">
                    {loader && (
                      <div className="loader">
                        <BounceLoader color="#006AFF" speedMultiplier={1.2} />
                      </div>
                    )}
                    {videoUrl ? (
                      <>
                        <ReactHlsPlayer
                          // accountId='1234678'
                          config={{
                            file: {
                              forceHLS: true,
                              attributes: {
                                controlsList: "nodownload , nofullscreen",
                              },
                            },
                          }}
                          src={currentVideo}
                          autoPlay={true}
                          disablePictureInPicture={true}
                          width="100%"
                          className="coverImg"
                          // poster={resData.cover_img}
                          onMouseOver={() => fullHover()}
                          onMouseLeave={() => setHover(false)}
                          playerRef={playVideo}
                          onPlay={() => {
                            fullPLay();
                          }}
                          onClick={() => playOrPause()}
                          // onPause={() => {
                          //   setPlay(true);
                          //   setPause(false);
                          // }}
                          // onProgress={() => {setLoader(true); console.log('progres')}}
                          onLoadStart={() => {
                            setLoader(true);
                          }}
                          onLoad={() => {
                            setLoader(false);
                          }}
                        />
                      
                      </>
                    ) : (
                      loader && (
                        <div className="loader">
                          <BounceLoader
                            color="#006AFF"
                            speedMultiplier={1.2}
                          />
                        </div>
                      )
                    )}

                    {play && (
                      <div className="pause">
                        <PlayArrowIcon
                          onClick={() => {
                            fullPLay()
                          }}
                        />
                      </div>
                    )}
                    {pause && (
                      <div
                        className="pause"
                        onMouseLeave={() => setHover(false)}
                        onMouseOver={() => setHover(true)}
                        onClick={() => {
                          pauseVideoPlayer();
                        }}
                      >
                        <PauseIcon
                          style={{
                            borderRadius: "50%",
                            background: "#006AFF",
                            fontSize: "20px",
                            width: "10px",
                          }}
                        />
                      </div>

                    )}
                  </div>
                  {/* <button
                    onClick={() => {
                      prevFunc();
                    }}
                    // disabled={activeModuleIndex === 0 ? true : false}
                    className="navigation n-prev"
                  >
                    <NavigateBeforeIcon />
                  </button>
                  <button
                    onClick={() => {
                      nextFunc();
                    }}
                    disabled={activeModuleIndex === datas.length ? true : false}
                    className="navigation n-next"
                  >
                    <NavigateNextIcon />
                  </button> */}
                </div>
                <div className="courseTitle rowGrid justify-between">
                  <h1
                    style={{ paddingLeft: "15px" }}
                    className="headerText col-sm-block"
                  >
                    {resData.name}
                  </h1>
                  <div className="courseTitle_right">
                    <Rating
                      name="half-rating"
                      defaultValue={0}
                      precision={0.5}
                      onChange={(e) => {
                        setRating(e);
                        setCourseRate(e.target.value)
                      }}
                      value={courseRate}
                    />
                    <div className="rightBlock">
                      <button
                        className={copied ? "bgBlue active" : "bgBlue"}
                        onClick={() => referalTg()}
                      >
                        <svg
                          version="1.1"
                          id="Layer_1"
                          x="0px"
                          y="0px"
                          width="122.88px"
                          height="114.318px"
                          viewBox="0 0 122.88 114.318"
                        >
                          <g>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M122.88,35.289L87.945,70.578v-17.58c-22.091-4.577-39.542,0.468-52.796,17.271 c2.301-34.558,25.907-51.235,52.795-52.339L87.945,0L122.88,35.289L122.88,35.289z"
                            />
                            <path d="M6.908,23.746h35.626c-4.587,3.96-8.71,8.563-12.264,13.815H13.815v62.943h80.603V85.831l13.814-13.579v35.159 c0,3.814-3.093,6.907-6.907,6.907H6.908c-3.815,0-6.908-3.093-6.908-6.907V30.653C0,26.838,3.093,23.746,6.908,23.746L6.908,23.746 z" />
                          </g>
                        </svg>
                        {copied ? "Nusxa olindi" : "Kursni ulashish"}
                      </button>
                      {share ? (
                        <div className="socialIcons">
                          <FacebookShareButton
                            url={`https://eduon.uz/chosenCourse/${id.id}/${referalToken}`}
                            quote="Bizga ulaning"
                            hashtags="#eduon.uz"
                          >
                            <FacebookIcon round={true} />
                          </FacebookShareButton>
                          <TelegramShareButton
                            url={`https://eduon.uz/chosenCourse/${id.id}/${referalToken}`}
                            quote="Bizga ulaning"
                            hashtags="#eduon.uz"
                          >
                            <TelegramIcon round={true} />
                          </TelegramShareButton>
                          <WhatsappShareButton
                            url={`https://eduon.uz/chosenCourse/${id.id}/${referalToken}`}
                            quote="Bizga ulaning"
                            hashtags="#eduon.uz"
                          >
                            <WhatsappIcon round={true} />
                          </WhatsappShareButton>
                          <TwitterShareButton
                            url={`https://eduon.uz/chosenCourse/${id.id}/${referalToken}`}
                            quote="Bizga ulaning"
                            hashtags="#eduon.uz"
                          >
                            <TwitterIcon round={true} />
                          </TwitterShareButton>

                          <svg
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `https://eduon.uz/chosenCourse/${id.id}/${referalToken}`
                              );
                              setCopied(true);
                            }}
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="5120.000000pt"
                            height="5120.000000pt"
                            viewBox="0 0 5120.000000 5120.000000"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <g
                              transform="translate(0.000000,5120.000000) scale(0.100000,-0.100000)"
                              fill="#000000"
                              stroke="none"
                            >
                              <path
                                d="M19960 44793 c-254 -18 -498 -56 -724 -113 -1407 -357 -2514 -1468
-2865 -2875 -65 -260 -97 -484 -111 -778 -5 -111 -10 -599 -10 -1084 l0 -883
-1577 0 c-1624 0 -1796 -4 -2062 -41 -1055 -148 -1998 -710 -2633 -1569 -434
-587 -691 -1266 -758 -2000 -14 -161 -14 -25279 1 -25440 76 -843 401 -1610
950 -2245 113 -130 346 -358 479 -466 605 -496 1318 -794 2105 -881 99 -11
1749 -13 9330 -13 8831 0 9216 1 9355 18 556 70 1052 232 1506 493 791 453
1393 1149 1727 1994 122 308 198 606 242 943 27 213 35 509 35 1405 l0 882
1578 0 c1623 0 1795 4 2061 41 1055 148 1998 710 2633 1569 434 587 691 1266
758 2000 14 161 14 25279 -1 25440 -67 748 -327 1428 -772 2022 -132 178 -238
297 -414 468 -668 652 -1530 1041 -2463 1110 -122 9 -18242 12 -18370 3z
m18456 -1215 c353 -59 590 -134 872 -277 301 -153 583 -369 798 -612 393 -443
622 -949 688 -1519 14 -122 16 -1353 16 -12700 0 -11119 -2 -12580 -15 -12694
-58 -494 -235 -935 -539 -1341 -104 -138 -367 -408 -496 -507 -411 -316 -882
-509 -1390 -569 -166 -20 -18294 -13 -18471 6 -333 38 -698 154 -991 316 -241
133 -415 265 -624 474 -425 424 -679 923 -781 1535 -16 99 -17 761 -23 12625
-3 6886 -2 12592 2 12680 18 390 101 709 278 1070 252 513 651 927 1160 1205
323 177 719 294 1090 323 25 2 4158 3 9185 3 8527 -1 9147 -3 9241 -18z
m-22163 -16750 c2 -8608 6 -11054 15 -11128 44 -338 100 -595 188 -857 151
-450 362 -838 668 -1223 120 -152 451 -484 601 -603 611 -486 1261 -755 2075
-859 73 -9 1681 -13 7023 -15 l6927 -3 0 -878 c0 -482 -5 -954 -10 -1047 -23
-411 -102 -719 -280 -1080 -252 -513 -651 -927 -1160 -1205 -278 -152 -594
-256 -935 -307 -115 -17 -513 -18 -9280 -18 -7575 0 -9177 2 -9260 13 -624 84
-1173 352 -1610 787 -450 448 -723 1019 -795 1660 -6 60 -10 4267 -10 12660 0
11124 2 12585 15 12699 61 524 262 1000 598 1416 99 123 316 337 437 431 433
336 950 538 1480 578 63 4 834 9 1712 10 l1598 1 3 -11032z"
                              />
                            </g>
                          </svg>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="main">
                  <div className="video_title">
                    <TabsUnstyled defaultValue={0}>
                      <div className="aboutCourse">
                        <TabsListUnstyled>
                          {window.innerWidth <= 576 && (
                            <TabUnstyled className="tab">
                              Darslar ro'yxati
                            </TabUnstyled>
                          )}

                          <TabUnstyled className="tab">Kurs haqida</TabUnstyled>
                          <TabUnstyled className="tab">
                            Fikr va izohlar
                          </TabUnstyled>
                          <TabUnstyled className="tab">
                            Kurs reytingi
                          </TabUnstyled>
                        </TabsListUnstyled>
                      </div>
                      {window.innerWidth <= 576 && (
                        <TabPanelUnstyled value={0}>
                          <div className="rowGrid">
                            <div className="col-sm-24 d-sm-block">
                              <section className="StructureMain">
                                <div className="watch__title">
                                  <h1>
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M22 16.7399V4.66994C22 3.46994 21.02 2.57994 19.83 2.67994H19.77C17.67 2.85994 14.48 3.92994 12.7 5.04994L12.53 5.15994C12.24 5.33994 11.76 5.33994 11.47 5.15994L11.22 5.00994C9.44 3.89994 6.26 2.83994 4.16 2.66994C2.97 2.56994 2 3.46994 2 4.65994V16.7399C2 17.6999 2.78 18.5999 3.74 18.7199L4.03 18.7599C6.2 19.0499 9.55 20.1499 11.47 21.1999L11.51 21.2199C11.78 21.3699 12.21 21.3699 12.47 21.2199C14.39 20.1599 17.75 19.0499 19.93 18.7599L20.26 18.7199C21.22 18.5999 22 17.6999 22 16.7399Z"
                                        stroke="#1C1C1C"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M12 5.48999V20.49"
                                        stroke="#1C1C1C"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M7.75 8.48999H5.5"
                                        stroke="#1C1C1C"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M8.5 11.49H5.5"
                                        stroke="#1C1C1C"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    Darslar ro’yhati
                                  </h1>
                                </div>
                                <div className="accordion">
                                  {datas.map((item, index) => (
                                    <Accordion
                                      key={index}
                                      expanded={
                                        expanded === `panel${index + 1}`
                                      }
                                      onChange={handleChange(
                                        `panel${index + 1}`
                                      )}
                                      sx={{
                                        "&.MuiPaper-root": {
                                          boxShadow: "none !important",
                                          background: "fcfcfc",
                                        },
                                      }}
                                    >
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        sx={{
                                          "&.MuiButtonBase-root": {
                                            width: "100%",
                                            height: "100px",
                                            display: "flex",
                                            background: "#fcfcfc",
                                            borderRadius: "14px",
                                            padding: "24px 32px",
                                          },
                                        }}
                                      >
                                        <div
                                          sx={{
                                            "&.MuiTypography-root": {
                                              marginTop: "0 !important",
                                            },
                                          }}
                                        >
                                          <div className="accordion__item">
                                            <div className="acc__left">
                                              <img src={Icon1} alt="..." />
                                              <p>{item.name}</p>
                                            </div>
                                          </div>
                                          {/* <AccordionItem /> */}
                                        </div>
                                      </AccordionSummary>
                                      {item.lessons.map((items, indexL) => (
                                        <AccordionDetails key={indexL}>
                                          <div
                                            sx={{
                                              paddingLeft: "30px",
                                              marginTop: "0 !important",
                                              width: "100%",
                                            }}
                                            className={
                                              lessonIndex ===
                                              index + indexL.toString()
                                                ? "acc__open activeLabel"
                                                : "acc__open"
                                            }
                                            onClick={() => {
                                              setLessonId(items.id);
                                              const url = {
                                                resolution_240p:
                                                  items.resolution_240p,
                                                resolution_360p:
                                                  items.resolution_360p,
                                                resolution_480p:
                                                  items.resolution_480p,
                                                resolution_720p:
                                                  items.resolution_720p,
                                                resolution_1080p:
                                                  items.resolution_1080p,
                                              };
                                              setVideoUrl(url);
                                              if (url.resolution_240p) {
                                                setCurrentVideo(
                                                  url.resolution_240p
                                                );
                                              } else if (url.resolution_360p) {
                                                setCurrentVideo(
                                                  url.resolution_360p
                                                );
                                              } else if (url.resolution_480p) {
                                                setCurrentVideo(
                                                  url.resolution_480p
                                                );
                                              } else if (url.resolution_720p) {
                                                setCurrentVideo(
                                                  url.resolution_720p
                                                );
                                              } else if (url.resolution_1080p) {
                                                setCurrentVideo(
                                                  url.resolution_1080p
                                                );
                                              } else {
                                                setCurrentVideo("");
                                              }
                                              setLessonIndex(
                                                index + indexL.toString()
                                              );
                                            }}
                                          >
                                            <img src={VideoCircle} alt="..." />
                                            <div className="durationVideo">
                                              <div className="leftDurationVideo">
                                                <p className="durationVideo">
                                                  {items.name.replace(/_/g, "")}
                                                </p>
                                                <div className="durationVideoParts">
                                                  <span>
                                                    {items.duration
                                                      ? items.duration.slice(
                                                          0,
                                                          8
                                                        )
                                                      : null}
                                                  </span>
                                                  {items.resource_file ? (
                                                    <a
                                                      // onClick={(e) =>
                                                      //   onDownloadButton(
                                                      //     items.resource_file
                                                      //   )
                                                      // }
                                                      href={`${process.env.REACT_APP_API_KEY}${items.resource_file}`}
                                                      target="_blank"
                                                      className="fileContentDownload"
                                                      rel="noreferrer"
                                                    >
                                                      <svg
                                                        width="16"
                                                        height="15"
                                                        viewBox="0 0 16 15"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                        <path
                                                          d="M14.6654 6.83334V10.8333C14.6654 13.5 13.9987 14.1667 11.332 14.1667H4.66536C1.9987 14.1667 1.33203 13.5 1.33203 10.8333V4.16667C1.33203 1.5 1.9987 0.833336 4.66536 0.833336H5.66536C6.66536 0.833336 6.88536 1.12667 7.26536 1.63334L8.26536 2.96667C8.5187 3.3 8.66536 3.5 9.33203 3.5H11.332C13.9987 3.5 14.6654 4.16667 14.6654 6.83334Z"
                                                          stroke="#1C1C1C"
                                                          strokeWidth="1.5"
                                                          strokeMiterlimit="10"
                                                        />
                                                      </svg>
                                                      Biriktirilgan faylni
                                                      yuklash
                                                    </a>
                                                  ) : null}
                                                </div>
                                              </div>
                                              <button className="CheckboxVideo">
                                                {lessonIndex ===
                                                index + indexL.toString() ? (
                                                  <svg
                                                    width="10"
                                                    height="8"
                                                    viewBox="0 0 10 8"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M0.75 4L3.58 6.83L9.25 1.17"
                                                      stroke="#006AFF"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </svg>
                                                ) : null}
                                              </button>
                                            </div>
                                          </div>
                                        </AccordionDetails>
                                      ))}
                                    </Accordion>
                                  ))}
                                </div>
                              </section>
                            </div>
                          </div>
                        </TabPanelUnstyled>
                      )}
                      <TabPanelUnstyled
                        value={window.innerWidth <= 576 ? 1 : 0}
                      >
                        <CourseAbout resData={resData} />
                      </TabPanelUnstyled>
                      <TabPanelUnstyled
                        value={window.innerWidth <= 576 ? 2 : 1}
                      >
                        <Comments id={id} resData={resData} />
                      </TabPanelUnstyled>
                      <TabPanelUnstyled
                        value={window.innerWidth <= 576 ? 3 : 2}
                      >
                        <CourseRating resData={resData} id={id} />
                      </TabPanelUnstyled>
                    </TabsUnstyled>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-10 col-md-24 p-0 col-sm-24 d-sm-none">
                <section className="StructureMain">
                  <div className="watch__title">
                    <h1>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22 16.7399V4.66994C22 3.46994 21.02 2.57994 19.83 2.67994H19.77C17.67 2.85994 14.48 3.92994 12.7 5.04994L12.53 5.15994C12.24 5.33994 11.76 5.33994 11.47 5.15994L11.22 5.00994C9.44 3.89994 6.26 2.83994 4.16 2.66994C2.97 2.56994 2 3.46994 2 4.65994V16.7399C2 17.6999 2.78 18.5999 3.74 18.7199L4.03 18.7599C6.2 19.0499 9.55 20.1499 11.47 21.1999L11.51 21.2199C11.78 21.3699 12.21 21.3699 12.47 21.2199C14.39 20.1599 17.75 19.0499 19.93 18.7599L20.26 18.7199C21.22 18.5999 22 17.6999 22 16.7399Z"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 5.48999V20.49"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.75 8.48999H5.5"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.5 11.49H5.5"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Darslar ro’yhati
                    </h1>
                  </div>
                  <div className="accordion">
                    {datas.map((item, index) => (
                      <Accordion
                        key={index}
                        expanded={expanded === `panel${index + 1}`}
                        onChange={handleChange(`panel${index + 1}`)}
                        sx={{
                          "&.MuiPaper-root": {
                            boxShadow: "none !important",
                            background: "fcfcfc",
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                          sx={{
                            "&.MuiButtonBase-root": {
                              width: "100%",
                              height: "100px",
                              display: "flex",
                              background: "#fcfcfc",
                              borderRadius: "14px",
                              // padding: "24px 32px",
                            },
                          }}
                        >
                          <div
                            sx={{
                              "&.MuiTypography-root": {
                                marginTop: "0 !important",
                              },
                            }}
                          >
                            <div className="accordion__item">
                              <div className="acc__left">
                                <img src={Icon1} alt="..." />
                                <p>{item.name}</p>
                              </div>
                            </div>
                            {/* <AccordionItem /> */}
                          </div>
                        </AccordionSummary>
                        {item.lessons.map((items, indexL) => (
                          <AccordionDetails key={indexL}>
                            {/* {console.log(items.id)} */}
                            <div
                              sx={{
                                paddingLeft: "30px",
                                marginTop: "0 !important",
                                width: "100%",
                              }}
                              className={
                                lessonIndex === index + indexL.toString()
                                  ? "acc__open activeLabel"
                                  : "acc__open"
                              }
                              onClick={() => {
                                setLessonId(items.id);
                                const url = {
                                  resolution_240p: items.resolution_240p,
                                  resolution_360p: items.resolution_360p,
                                  resolution_480p: items.resolution_480p,
                                  resolution_720p: items.resolution_720p,
                                  resolution_1080p: items.resolution_1080p,
                                };
                                setVideoUrl(url);
                                if (url.resolution_240p) {
                                  setCurrentVideo(url.resolution_240p);
                                  setVideoUrl(url);
                                } else if (url.resolution_360p) {
                                  setCurrentVideo(url.resolution_360p);
                                  setVideoUrl(url);
                                } else if (url.resolution_480p) {
                                  setCurrentVideo(url.resolution_480p);
                                  setVideoUrl(url);
                                } else if (url.resolution_720p) {
                                  setCurrentVideo(url.resolution_720p);
                                  setVideoUrl(url);
                                } else if (url.resolution_1080p) {
                                  setCurrentVideo(url.resolution_1080p);
                                  setVideoUrl(url);
                                } else {
                                  setCurrentVideo("");
                                }

                                setLessonIndex(index + indexL.toString());
                              }}
                            >
                              <img src={VideoCircle} alt="..." />
                              <div className="durationVideo">
                                <div className="leftDurationVideo">
                                  <p className="">{items.name.replace(/_/g, " ")}</p>
                                  <div className="durationVideoParts">
                                    <span>
                                      {items.duration
                                        ? items.duration.slice(0, 8)
                                        : null}
                                    </span>
                                    {items.resource_file ? (
                                      <a
                                        href={`${process.env.REACT_APP_API_KEY}${items.resource_file}`}
                                        // onClick={(e) =>
                                        //   onDownloadButton(items.resource_file)
                                        // }
                                        target="_blank"
                                        download
                                        className="fileContentDownload"
                                        rel="noreferrer"
                                      >
                                        <svg
                                          width="16"
                                          height="15"
                                          viewBox="0 0 16 15"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M14.6654 6.83334V10.8333C14.6654 13.5 13.9987 14.1667 11.332 14.1667H4.66536C1.9987 14.1667 1.33203 13.5 1.33203 10.8333V4.16667C1.33203 1.5 1.9987 0.833336 4.66536 0.833336H5.66536C6.66536 0.833336 6.88536 1.12667 7.26536 1.63334L8.26536 2.96667C8.5187 3.3 8.66536 3.5 9.33203 3.5H11.332C13.9987 3.5 14.6654 4.16667 14.6654 6.83334Z"
                                            stroke="#1C1C1C"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                          />
                                        </svg>
                                        Faylni yuklash
                                      </a>
                                    ) : null}
                                  </div>
                                </div>
                                <button className="CheckboxVideo">
                                  {lessonIndex === index + indexL.toString() ? (
                                    <svg
                                      width="10"
                                      height="8"
                                      viewBox="0 0 10 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M0.75 4L3.58 6.83L9.25 1.17"
                                        stroke="#006AFF"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  ) : null}
                                </button>
                              </div>
                            </div>
                          </AccordionDetails>
                        ))}
                      </Accordion>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Watching;
