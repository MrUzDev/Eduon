import React, { useContext, useEffect, useState, useRef } from "react";
import "./ChosenCourse.css";
import "../../assets/css/Grid.css";
import { StateContext } from "../../context/Context";
import CourseAbout from "../CourseAbout/CourseAbout";
import Comments from "../Comments/comments";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabUnstyled from "@mui/base/TabUnstyled";
import CourseStructure from "../CourseStructure/CourseStructure";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../Apis/api";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation, Autoplay } from "swiper";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SwiperItem from "../SwiperItem/SwiperItem";
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";
import Sidebar from "../Sidebar/Sidebar";
import FooterN from "../Footers/Footer";
import NavbarDemo from "../Navbar/Navbar";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import { Alert } from "@mui/material";
import NavbarSm from "../Navbar/NavbarSm";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import ReportIcon from "@mui/icons-material/Report";
import VisibilityOutlinedIcon from "../../assets/icons/eye.png";
import VisibilityOffOutlinedIcon from "../../assets/icons/eye-slash.png";
import PhoneInput from "react-phone-input-2";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import FullscreenSharpIcon from "@mui/icons-material/FullscreenSharp";
import SlowMotionVideoSharpIcon from "@mui/icons-material/SlowMotionVideoSharp";
import PauseSharpIcon from "@mui/icons-material/PauseSharp";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "4px solid #006aff",
  borderRadius: "15px",
  boxShadow: 24,
  p: 5,
};

export default function ChosenCourse(props) {
  const {
    navStretch,
    isremoved,
    setIsRemoved,
    loggedIn,
    addedToCart,
    setAddedToCart,
  } = useContext(StateContext);
  var id = useParams();
  var token = useParams();
  const [alertError, setAlertError] = useState(false);
  const [resData, setResData] = useState("");
  const [slidePerView, setSlidePerView] = useState(0);
  const [alertErrorFav, setAlertErrorFav] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [play, setPlay] = useState(true);
  const [hover, setHover] = useState(false);
  const [pause, setPause] = useState(false);
  const [sameCourses, setSameCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [isBought, setisBought] = useState(false);
  const handleOpen = () => setOpen(true);
  const [copied, setCopied] = useState(false);
  const [share, setShare] = useState(false);
  const [referalToken, setReferalToken] = useState("");
  const [show, setShow] = useState(false);
  const [number, setnumber] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(false);
  const [check, setChek] = useState(false);
  const [myCarts, setMycarts] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [speedOptionsAc, setSpeedOptionsAc] = useState(false);
  const [speakerCourses, setSpeakerCourses] = useState([]);
  const [spakerId, setSpeakerId] = useState(0);
  const [allSomeCourses, setAllSomeCourses] = useState([]);

  const playVideo = useRef();

  const handleClose = () => setOpen(false);

  const fullPLay = () => {
    document.querySelector("video").play();
    setPlay(false);
    setPause(true)
    
      setTimeout(() => {
        setPause(false)
      }, 2500)
  };

  const pauseVideoPlayer = () => {
    document.querySelector("video").pause();
    playVideo.current.currentTime = localStorage.getItem("duration");
    setPlay(true);
    setPause(false);
  };


  useEffect(() => {
    if (!localStorage.getItem("referalToken")) {
      localStorage.setItem("referalToken", token && token.token);
    }
  }, []);

  const saveSystems = () => {
    setChek(localStorage.setItem("check", check));
    setChek(localStorage.getItem("check"));

    if (JSON.parse(check) && number && password) {
      localStorage.setItem("num", number);
      localStorage.setItem("pass", password);
    }
  };

  const sendddata = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/v1/accounts/login/`,
        {
          phone_number: number,
          password: password,
        }
      );
      localStorage.setItem("access", data.data.access);
      localStorage.setItem("refresh", data.data.refresh);

      // data.data.access ? navigate("/") : navigate("/login");
      window.location.reload();
    } catch (error) {
      setError(true);
      // handleOpen();
    }
    // saveSystems()
  };

  useEffect(() => {
    alertError
      ? setTimeout(() => {
          setAlertError(false);
        }, 3000)
      : setAlertError(false);
    alertErrorFav
      ? setTimeout(() => {
          setAlertErrorFav(false);
        }, 3000)
      : setAlertErrorFav(false);
  }, [alertError, alertErrorFav]);

  useEffect(() => {
    loginError
      ? setTimeout(() => {
          setLoginError(false);
        }, 4000)
      : setLoginError(false);
  }, [loginError]);
  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/${id.id}`)
        .then((res) => {
          setResData(res.data);
          setSpeakerId(res.data.course_owner.id);
        })
        .catch((err) => {
          err.response.status && refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, [id]);
  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(
            `${process.env.REACT_APP_API_KEY}/api/v1/courses/enrolled-courses/`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((res) => {
            setisBought(res.data.some((item) => item.course.id === resData.id));
          })
          .catch((err) => {
            err.response.status && refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
  }, [resData]);
  const buyCourse = async (e, id) => {
    !loggedIn && handleOpen();
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      loggedIn &&
        (await axios
          .post(
            `${process.env.REACT_APP_API_KEY}/api/v1/orders/cart`,
            {
              course: id,
              is_referral: false,
            },
            { headers }
          )
          .then((res) => {
            res.data.message === "This course already exists"
              ? setAlertError(true)
              : setAlertError(false);
            navigate("/cart");
          })
          .catch((err) => {
            err.response.status && refresh(err.response.status, err.response.status.text);
          }));

      setIsRemoved(!isremoved);
    } catch (error) {}
  };

  const addToFav = async (e, id) => {
    e.preventDefault();
    !loggedIn && handleOpen();
    try {
      const data = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_KEY}/api/v1/courses/fav-courses/`,
        data: {
          course: id,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      }).catch((err) => {
        err.response.status && refresh(err.response.status, err.response.status.text);
      });
      data.data.message === "This course is already in the list!"
        ? setAlertErrorFav(true)
        : setAlertErrorFav(false);
    } catch (error) {}
  };

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

  useEffect(() => {
    if (window.innerWidth >= 900 && window.innerWidth < 1300) {
      // navStretch? setSlidePerView(2):setSlidePerView(2)
      setSlidePerView(2);
    } else {
      setSlidePerView(4);
    }
  }, [navStretch]);
  const navigateToSpeaker = (e, id) => {
    e.preventDefault();
    navigate(`/speakerAbout/${id}`);
  };

  const navigate = useNavigate();

  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v1/orders/cart`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => {
            setMycarts(res.data.items.map((item) => item.course.id));
            setCartData(res.data);
            // res.data.message === "This course already exists"
            //   ? setAlertError(true)
            //   : setAddedToCart(true);
          });
    } catch (error) {}
  }, [addedToCart]);

  useEffect(() => {
    if (resData.category) {
      try {
        axios
          .get(
            `${process.env.REACT_APP_API_KEY}/api/v1/courses/filter/?category=${resData.category}`
          )
          .then((res) => {
            setSameCourses(res.data);
          });
      } catch (error) {}
    }
  }, [resData]);

  useEffect(() => {
    if (spakerId !== 0) {
      try {
        loggedIn &&
          axios
            .get(
              `${process.env.REACT_APP_API_KEY}/api/v1/courses/speaker/${spakerId}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
              }
            )
            .then((res) => {
              setSpeakerCourses(res.data);
            });
      } catch (error) {}
    }
  }, [spakerId]);

  // useEffect(() => {
  //   setAllSomeCourses([...sameCourses, ...speakerCourses])
  //   console.log(allSomeCourses)
  // }, [sameCourses, speakerCourses])

  useEffect(() => {
    const containerVideo = document.querySelector(".video-container"),
      blurvid = containerVideo.querySelector("video"),
      mainVideo = containerVideo.querySelector("video"),
      videoTimeline = containerVideo.querySelector(".video-timeline"),
      progressBar = containerVideo.querySelector(".progress-bar"),
      volumeBtn = containerVideo.querySelector(".volume svg"),
      currentVidTime = containerVideo.querySelector(".current-time"),
      videoDuration = containerVideo.querySelector(".video-duration"),
      skipBackward = containerVideo.querySelector(".skip-backward svg"),
      skipForward = containerVideo.querySelector(".skip-forward svg"),
      playPauseBtn = containerVideo.querySelector(".play-pause svg"),
      speedBtn = containerVideo.querySelector(".playback-speed span"),
      speedOptions = containerVideo.querySelector(".speed-options"),
      fullScreenBtn = containerVideo.querySelector(".fullscreen svg"),
      volumeSlider = containerVideo.querySelector(".left input");
    let timer;

    const hideControls = () => {
      if (mainVideo.paused) return;
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
      let timelineWidth = videoTimeline.clientWidth;
      mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
      blurvid.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    });

    mainVideo.addEventListener("timeupdate", (e) => {
      let { currentTime, duration } = e.target;
      let percent = (currentTime / duration) * 100;
      progressBar.style.width = `${percent}%`;
      currentVidTime.innerText = formatTime(currentTime);
    });

    mainVideo.addEventListener("loadeddata", () => {
      videoDuration.innerText = formatTime(mainVideo.duration);
    });

    const draggableProgressBar = (e) => {
      let timelineWidth = videoTimeline.clientWidth;
      progressBar.style.width = `${e.offsetX}px`;
      mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
      blurvid.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
      currentVidTime.innerText = formatTime(mainVideo.currentTime);
    };

    volumeBtn.addEventListener("click", () => {
      if (!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
      } else {
        mainVideo.volume = 0.0;
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
      }
      volumeSlider.value = mainVideo.volume;
    });

    volumeSlider.addEventListener("input", (e) => {
      mainVideo.volume = e.target.value;
      if (e.target.value == 0) {
        return volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
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
      }else {
        fullScreenBtn.classList.replace("fa-expand", "fa-compress");
        containerVideo.requestFullscreen();
      }
    });

    speedBtn.addEventListener("click", () => {
      setSpeedOptionsAc((speedOptionsAc) => !speedOptionsAc);
    });

    window.addEventListener("keydown", (e) => {
      e.preventDefault()

      // add and take 10s video current time start
      if (e.keyCode === 39) {
        mainVideo.currentTime += 5;
        blurvid.currentTime += 5;
      } else if (e.keyCode === 37) {
        mainVideo.currentTime -= 5;
        blurvid.currentTime -= 5;
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
          mainVideo.volume += 0.2;
          volumeSlider.value = mainVideo.volume;          
      }else if(e.keyCode === 40) {
        mainVideo.volume -= 0.2;
        volumeSlider.value = mainVideo.volume;          
      }
      // add and take video volume end

    });

    skipBackward.addEventListener("click", () => {
      mainVideo.currentTime -= 5;
      blurvid.currentTime -= 5;
    });
    skipForward.addEventListener("click", () => {
      mainVideo.currentTime += 5;
      blurvid.currentTime += 5;
    });
    videoTimeline.addEventListener("mousedown", () =>
      videoTimeline.addEventListener("mousemove", draggableProgressBar)
    );
    document.addEventListener("mouseup", () =>
      videoTimeline.removeEventListener("mousemove", draggableProgressBar)
    );
  }, []);

  

  const currency = (number, currency, lang = undefined) =>
    Intl.NumberFormat(lang, { style: "currency", currency }).format(number);

  return (
    <>
      <NavbarDemo />
      <NavbarSm />
      <Sidebar />
      <div className={navStretch ? "ml-240" : "ml-100"}>
        <section id="courseAbout">
          <div className="container">
            <div className="rowGrid justify-between">
              <div className="col-16 col-lg-15 col-sm-24 px-sm-0">
                <div className="video">
                  <div className="img video-container show-controls">
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
                          <button className="play-pause">
                            {play ? (
                              <PlayArrowIcon
                                onClick={() =>
                                  fullPLay()
                                }
                              />
                            ) : (
                              <PauseSharpIcon
                                onClick={() =>
                                  pauseVideoPlayer()
                                }
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
                                <SlowMotionVideoSharpIcon />
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
                    <video
                      onMouseOver={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                      className="coverImg"
                      src={resData.trailer_file}
                      poster={resData.cover_img}
                      autoPlay={true}
                      playerRef={playVideo}
                      onPlay={() => {
                        setPlay(false);
                        setPause(true);
                      }}
                      onPause={() => {
                        setPlay(true);
                        setPause(false);
                      }}
                    ></video>
                    {play && hover ? (
                      <div className="pause">
                        <PlayArrowIcon
                          style={{
                            borderRadius: "50%",
                            background: "#006AFF",
                            color: "#fff",
                          }}
                          onClick={() => {
                            fullPLay()
                          }}
                          onMouseOver={() => setHover(true)}
                          onMouseLeave={() => setHover(false)}
                        />
                      </div>
                    ) : null}
                    {pause && hover ? (
                      <div
                        className="pause"
                        onMouseLeave={() => {
                          setHover(false);
                        }}
                        onMouseOver={() => setHover(true)}
                        onClick={() => {
                          pauseVideoPlayer()
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
                    ) : null}
                  </div>
                </div>
                <div className="fundamentals d-none d-sm-block">
                  <div className="fundamentals_title">
                    <h1>{resData.name}</h1>
                    <div className="spikers">
                      <div className="img">
                        {resData ? (
                          resData.course_owner.profile_picture === `${process.env.REACT_APP_API_KEY}/media/NULL` ||
                          resData.course_owner.profile_picture === `${process.env.REACT_APP_API_KEY}/media/` ? (
                            <>
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
                           </>
                          ) : (
                            <div className="img">
                              <img
                                src={`${resData.course_owner.profile_picture}`}
                                alt="jpg"
                              />
                            </div>
                          )
                        ) : null}
                        {/* {resData ? (
                          resData.course_owner.profile_picture === "NULL" ||
                          " " ? null : (
                            <img
                              src={`https://eduon-backend.uz/media/${resData.course_owner.profile_picture}`}
                              alt="jpg"
                            />
                          )
                        ) : null} */}
                      </div>
                      <div className="spikers_title">
                        <span>Spiker:</span>
                        <p
                          className="pointer"
                          onClick={(e) =>
                            navigateToSpeaker(e, resData.course_owner.id)
                          }
                        >
                          {resData ? resData.course_owner.full_name : null}
                        </p>
                      </div>
                    </div>
                    <a className="titleCourse">Kurs haqida qisqacha:</a>
                    <ul>
                      <li>
                        <a>
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.7099 15.18L12.6099 13.33C12.0699 13.01 11.6299 12.24 11.6299 11.61V7.51"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {resData
                            ? new Date(
                                resData.course_duration
                                  ? resData.course_duration * 1000
                                  : 0
                              )
                                .toISOString()
                                .substring(11, 19)
                            : null}{" "}
                          soatlik videodarslik
                        </a>
                      </li>
                      <li>
                        <a>
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M12.53 20.42H6.21C3.05 20.42 2 18.32 2 16.21V7.79C2 4.63 3.05 3.58 6.21 3.58H12.53C15.69 3.58 16.74 4.63 16.74 7.79V16.21C16.74 19.37 15.68 20.42 12.53 20.42Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M19.5202 17.1L16.7402 15.15V8.84L19.5202 6.89C20.8802 5.94 22.0002 6.52 22.0002 8.19V15.81C22.0002 17.48 20.8802 18.06 19.5202 17.1Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5C10 10.3284 10.6716 11 11.5 11Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {resData && resData.video_count + " ta videolar"}
                        </a>
                      </li>

                      <li>
                        <a>
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M19.0598 18.67L16.9198 14.4L14.7798 18.67"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.1699 17.91H18.6899"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16.9198 22C14.1198 22 11.8398 19.73 11.8398 16.92C11.8398 14.12 14.1098 11.84 16.9198 11.84C19.7198 11.84 21.9998 14.11 21.9998 16.92C21.9998 19.73 19.7298 22 16.9198 22Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.02 2H8.94C11.01 2 12.01 3.00002 11.96 5.02002V8.94C12.01 11.01 11.01 12.01 8.94 11.96H5.02C3 12 2 11 2 8.92999V5.01001C2 3.00001 3 2 5.02 2Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.0097 5.84998H4.94971"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.96973 5.16998V5.84998"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.98994 5.84003C7.98994 7.59003 6.61994 9.01001 4.93994 9.01001"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.01015 9.01001C8.28015 9.01001 7.62016 8.62 7.16016 8"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 15C2 18.87 5.13 22 9 22L7.95 20.25"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22 9C22 5.13 18.87 2 15 2L16.05 3.75"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {resData.lang === "O'zbekcha"
                            ? "O'zbekcha"
                            : resData.lang === "RUSSIAN"
                            ? "Русский"
                            : resData.lang === "ENGLISH" && "English"}
                        </a>
                      </li>
                      {/* <li className="percent">
                        <div className="stark">
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M13.7299 3.51L15.4899 7.03C15.7299 7.52 16.3699 7.99 16.9099 8.08L20.0999 8.61C22.1399 8.95 22.6199 10.43 21.1499 11.89L18.6699 14.37C18.2499 14.79 18.0199 15.6 18.1499 16.18L18.8599 19.25C19.4199 21.68 18.1299 22.62 15.9799 21.35L12.9899 19.58C12.4499 19.26 11.5599 19.26 11.0099 19.58L8.01991 21.35C5.87991 22.62 4.57991 21.67 5.13991 19.25L5.84991 16.18C5.97991 15.6 5.74991 14.79 5.32991 14.37L2.84991 11.89C1.38991 10.43 1.85991 8.95 3.89991 8.61L7.08991 8.08C7.61991 7.99 8.25991 7.52 8.49991 7.03L10.2599 3.51C11.2199 1.6 12.7799 1.6 13.7299 3.51Z"
                              fill="#006AFF"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p>
                            {resData ? resData.course_rating.rating : null}
                            <span>
                              (
                              {resData
                                ? resData.course_rating.voters_number
                                : null}
                              )
                            </span>
                          </p>
                        </div>
                        <div className="teacher">
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M10.05 2.53001L4.03002 6.46001C2.10002 7.72001 2.10002 10.54 4.03002 11.8L10.05 15.73C11.13 16.44 12.91 16.44 13.99 15.73L19.98 11.8C21.9 10.54 21.9 7.73001 19.98 6.47001L13.99 2.54001C12.91 1.82001 11.13 1.82001 10.05 2.53001Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.63012 13.08L5.62012 17.77C5.62012 19.04 6.60012 20.4 7.80012 20.8L10.9901 21.86C11.5401 22.04 12.4501 22.04 13.0101 21.86L16.2001 20.8C17.4001 20.4 18.3801 19.04 18.3801 17.77V13.13"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21.3999 15V9"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p>{resData.enrolled_students}</p>
                        </div>
                      </li> */}
                    </ul>
                    <p className="twelve">
                      <div className="price mr-20">
                        {resData.discount_price ? (
                          <>
                            {" "}
                            <span
                              style={{ textDecoration: "line-through" }}
                              className="t-gray line-through"
                            >
                              UZS
                              {resData.price
                                ? currency(resData.price, "UZS")
                                    .replace("UZS", "")
                                    .replace("soʻm", "")
                                    .replace(/,/g, ".")
                                    .slice(0, -3)
                                : 0}
                            </span>
                            <p style={{ color: "red" }}>
                              UZS
                              {currency(
                                parseInt(resData.price) -
                                  parseInt(resData.discount_price),
                                "UZS"
                              )
                                .replace("UZS", "")
                                .replace("soʻm", "")
                                .replace(/,/g, ".")
                                .slice(0, -3)}
                              <span className="gray ml-5"></span>
                            </p>
                          </>
                        ) : (
                          <p>
                            UZS
                            {resData.price
                              ? currency(resData.price, "UZS")
                                  .replace("UZS", "")
                                  .replace("soʻm", "")
                                  .replace(/,/g, ".")
                                  .slice(0, -3)
                              : 0}
                            <span className="gray ml-5"></span>
                          </p>
                        )}
                      </div>
                      {/* eski holati */}
                      {/* {resData
                        ? resData.discount_price
                          ? (
                              resData.price - resData.discount_price
                            ).toLocaleString("uz-UZ", {
                              style: "currency",
                              currency: "UZS",
                            })
                          : resData.price.toLocaleString("uz-UZ", {
                              style: "currency",
                              currency: "UZS",
                            })
                        : 0} */}
                    </p>
                    <div className="courseTitle">
                      <div className="courseTitle_right">
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
                                  transform="translate(0.000000,5120.000000) scale(0.110000,-0.100000)"
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
                    {resData.price === 0 || isBought ? (
                      <button
                        onClick={() => navigate(`/watch/${resData.id}`)}
                        className="btn_one btn"
                      >
                        Kursni davom ettirish
                      </button>
                    ) : (
                      <button
                        onClick={(e) => buyCourse(e, resData.id)}
                        className="btn_one btn"
                      >
                        Xarid qilish
                      </button>
                    )}

                    {/* <button
                      onClick={(e) => addToFav(e, resData.id)}
                      className="btn_two"
                    >
                      Sevimlilarga qo'shish
                    </button> */}
                  </div>
                </div>
                <div className="video_title">
                  <TabsUnstyled defaultValue={0}>
                    <div className="aboutCourse">
                      <TabsListUnstyled>
                        <TabUnstyled className="tab">Kurs haqida</TabUnstyled>
                        <TabUnstyled className="tab">Kurs tarkibi</TabUnstyled>
                        <TabUnstyled className="tab">
                          Fikr va izohlar
                        </TabUnstyled>
                      </TabsListUnstyled>
                    </div>
                    <TabPanelUnstyled value={0}>
                      <CourseAbout resData={resData} />
                    </TabPanelUnstyled>
                    <TabPanelUnstyled value={1}>
                      <CourseStructure
                        isBought={isBought}
                        id={id}
                        resData={resData}
                      />
                    </TabPanelUnstyled>
                    <TabPanelUnstyled value={2}>
                      <Comments id={id} resData={resData} />
                    </TabPanelUnstyled>
                  </TabsUnstyled>
                </div>
              </div>
              <div className="col-8 col-lg-9 col-sm-24">
                <div className="fundamentals d-sm-none">
                  <div className="fundamentals_title">
                    <h1>{resData.name}</h1>
                    <div className="spikers">
                      {resData ? (
                        resData.course_owner.profile_picture === `${process.env.REACT_APP_API_KEY}/media/NULL` ||
                        resData.course_owner.profile_picture === `${process.env.REACT_APP_API_KEY}/media/` ? (
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
                            <img
                              src={`${resData.course_owner.profile_picture}`}
                              alt="jpg"
                            />
                          </div>
                        )
                      ) : null}
                      {/* <div className="img">
                        {resData ? (
                          resData.course_owner.profile_picture ===
                          "NULL" || " " ? null : (
                            <img
                              src={`https://eduon-backend.uz/media/${resData.course_owner.profile_picture}`}
                              alt="jpg"
                            />
                          )
                        ) : null}
                      </div> */}
                      <div className="spikers_title">
                        <span>Spiker:</span>
                        <p
                          className="pointer"
                          onClick={(e) =>
                            navigateToSpeaker(e, resData.course_owner.id)
                          }
                        >
                          {resData ? resData.course_owner.full_name : null}
                        </p>
                      </div>
                    </div>
                    <a className="titleCourse">Kurs haqida qisqacha:</a>
                    <ul>
                      <li>
                        <a>
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.7099 15.18L12.6099 13.33C12.0699 13.01 11.6299 12.24 11.6299 11.61V7.51"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {resData
                            ? new Date(
                                resData.course_duration
                                  ? resData.course_duration * 1000
                                  : 0
                              )
                                .toISOString()
                                .substring(11, 19)
                            : null}{" "}
                          soatlik videodarslik
                        </a>
                      </li>
                      <li>
                        <a>
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M12.53 20.42H6.21C3.05 20.42 2 18.32 2 16.21V7.79C2 4.63 3.05 3.58 6.21 3.58H12.53C15.69 3.58 16.74 4.63 16.74 7.79V16.21C16.74 19.37 15.68 20.42 12.53 20.42Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M19.5202 17.1L16.7402 15.15V8.84L19.5202 6.89C20.8802 5.94 22.0002 6.52 22.0002 8.19V15.81C22.0002 17.48 20.8802 18.06 19.5202 17.1Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5C10 10.3284 10.6716 11 11.5 11Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {resData && resData.video_count + " ta videolar"}{" "}
                        </a>
                      </li>

                      <li>
                        <a>
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M19.0598 18.67L16.9198 14.4L14.7798 18.67"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.1699 17.91H18.6899"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16.9198 22C14.1198 22 11.8398 19.73 11.8398 16.92C11.8398 14.12 14.1098 11.84 16.9198 11.84C19.7198 11.84 21.9998 14.11 21.9998 16.92C21.9998 19.73 19.7298 22 16.9198 22Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.02 2H8.94C11.01 2 12.01 3.00002 11.96 5.02002V8.94C12.01 11.01 11.01 12.01 8.94 11.96H5.02C3 12 2 11 2 8.92999V5.01001C2 3.00001 3 2 5.02 2Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.0097 5.84998H4.94971"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.96973 5.16998V5.84998"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.98994 5.84003C7.98994 7.59003 6.61994 9.01001 4.93994 9.01001"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.01015 9.01001C8.28015 9.01001 7.62016 8.62 7.16016 8"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 15C2 18.87 5.13 22 9 22L7.95 20.25"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22 9C22 5.13 18.87 2 15 2L16.05 3.75"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {resData.lang === "O'zbekcha"
                            ? "O'zbekcha"
                            : resData.lang === "RUSSIAN"
                            ? "Русский"
                            : resData.lang === "ENGLISH" && "English"}
                        </a>
                      </li>
                      {/* <li className="percent">
                        <div className="stark">
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M13.7299 3.51L15.4899 7.03C15.7299 7.52 16.3699 7.99 16.9099 8.08L20.0999 8.61C22.1399 8.95 22.6199 10.43 21.1499 11.89L18.6699 14.37C18.2499 14.79 18.0199 15.6 18.1499 16.18L18.8599 19.25C19.4199 21.68 18.1299 22.62 15.9799 21.35L12.9899 19.58C12.4499 19.26 11.5599 19.26 11.0099 19.58L8.01991 21.35C5.87991 22.62 4.57991 21.67 5.13991 19.25L5.84991 16.18C5.97991 15.6 5.74991 14.79 5.32991 14.37L2.84991 11.89C1.38991 10.43 1.85991 8.95 3.89991 8.61L7.08991 8.08C7.61991 7.99 8.25991 7.52 8.49991 7.03L10.2599 3.51C11.2199 1.6 12.7799 1.6 13.7299 3.51Z"
                              fill="#006AFF"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p>
                            {resData ? resData.course_rating.rating : null}
                            <span>
                              (
                              {resData
                                ? resData.course_rating.voters_number
                                : null}
                              )
                            </span>
                          </p>
                        </div>
                        <div className="teacher">
                          <svg width="24" height="24" fill="none">
                            <path
                              d="M10.05 2.53001L4.03002 6.46001C2.10002 7.72001 2.10002 10.54 4.03002 11.8L10.05 15.73C11.13 16.44 12.91 16.44 13.99 15.73L19.98 11.8C21.9 10.54 21.9 7.73001 19.98 6.47001L13.99 2.54001C12.91 1.82001 11.13 1.82001 10.05 2.53001Z"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.63012 13.08L5.62012 17.77C5.62012 19.04 6.60012 20.4 7.80012 20.8L10.9901 21.86C11.5401 22.04 12.4501 22.04 13.0101 21.86L16.2001 20.8C17.4001 20.4 18.3801 19.04 18.3801 17.77V13.13"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21.3999 15V9"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p>{resData.enrolled_students}</p>
                        </div>
                      </li> */}
                    </ul>
                    <p className="twelve">
                      <div className="price mr-20">
                        {resData.discount_price ? (
                          <>
                            {" "}
                            <span
                              style={{ textDecoration: "line-through" }}
                              className="t-gray line-through"
                            >
                              UZS
                              {resData.price
                                ? currency(resData.price, "UZS")
                                    .replace("UZS", "")
                                    .replace("soʻm", "")
                                    .replace(/,/g, ".")
                                    .slice(0, -3)
                                : 0}
                            </span>
                            <p style={{ color: "red" }}>
                              UZS
                              {currency(
                                parseInt(resData.price) -
                                  parseInt(resData.discount_price),
                                "UZS"
                              )
                                .replace("UZS", "")
                                .replace("soʻm", "")
                                .replace(/,/g, ".")
                                .slice(0, -3)}
                              <span className="gray ml-5"></span>
                            </p>
                          </>
                        ) : (
                          <p>
                            UZS
                            {resData.price
                              ? currency(resData.price, "UZS")
                                  .replace("UZS", "")
                                  .replace("soʻm", "")
                                  .replace(/,/g, ".")
                                  .slice(0, -3)
                              : 0}
                            <span className="gray ml-5"></span>
                          </p>
                        )}
                      </div>

                      {/* eski holati */}
                      {/* {resData
                        ? resData.discount_price
                          ? (
                              resData.price - resData.discount_price
                            ).toLocaleString("uz-UZ", {
                              style: "currency",
                              currency: "UZS",
                            })
                          : resData.price.toLocaleString("uz-UZ", {
                              style: "currency",
                              currency: "UZS",
                            })
                        : 0} */}
                    </p>
                    <div className="courseTitle">
                      <div className="courseTitle_right">
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
                                  transform="translate(0.000000,5120.000000) scale(0.110000,-0.100000)"
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
                    {resData.price === 0 || isBought ? (
                      <button
                        onClick={() => navigate(`/watch/${resData.id}`)}
                        className="btn_one btn"
                      >
                        Kursni davom ettirish
                      </button>
                    ) : (
                      <button
                        onClick={(e) => buyCourse(e, resData.id)}
                        className="btn_one btn"
                      >
                        Xarid qilish
                      </button>
                    )}
                    {/* <button
                      onClick={(e) => addToFav(e, resData.id)}
                      className="btn_two"
                    >
                      Sevimlilarga qo'shish
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="spikers">
          <div className="container">
            <h1 className="spiker_title">Spiker va o'xshash kurslar</h1>
            <div className="rowGrid" style={{ flexWrap: "nowrap" }}>
              <div className="col-4 col-lg-6 col-sm-24">
                <div className="cards_one">
                  <div className="spiker_card_one">
                    <div className="d-sm-flex justify-sm-between">
                      {resData ? (
                        resData.course_owner.profile_picture === `${process.env.REACT_APP_API_KEY}/media/NULL` ||
                        resData.course_owner.profile_picture === `${process.env.REACT_APP_API_KEY}/media/` ? (
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
                            <img
                              src={`${resData.course_owner.profile_picture}`}
                              alt="jpg"
                            />
                          </div>
                        )
                      ) : null}
                      <div>
                        <h3>
                          {resData && resData.course_owner.full_name}
                          {/* {resData
                            ? speaker.slice(0, index) +
                              " " +
                              (speaker[index + 1] + ".")
                            : null} */}
                        </h3>
                        <div className="stark">
                          <svg width="22" height="22" fill="none">
                            <path
                              d="M12.7299 2.51001L14.4899 6.03001C14.7299 6.52001 15.3699 6.99001 15.9099 7.08001L19.0999 7.61001C21.1399 7.95001 21.6199 9.43001 20.1499 10.89L17.6699 13.37C17.2499 13.79 17.0199 14.6 17.1499 15.18L17.8599 18.25C18.4199 20.68 17.1299 21.62 14.9799 20.35L11.9899 18.58C11.4499 18.26 10.5599 18.26 10.0099 18.58L7.01991 20.35C4.87991 21.62 3.57991 20.67 4.13991 18.25L4.84991 15.18C4.97991 14.6 4.74991 13.79 4.32991 13.37L1.84991 10.89C0.389909 9.43001 0.859909 7.95001 2.89991 7.61001L6.08991 7.08001C6.61991 6.99001 7.25991 6.52001 7.49991 6.03001L9.25991 2.51001C10.2199 0.600015 11.7799 0.600015 12.7299 2.51001Z"
                              fill="#006AFF"
                              stroke="#006AFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p>
                            {resData ? resData.course_rating.rating : 0}{" "}
                            <span>
                              {resData ? resData.enrolled_students : 0}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      className="pointer btn"
                      onClick={(e) =>
                        navigateToSpeaker(e, resData.course_owner.id)
                      }
                    >
                      Profilni ko'rish
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-20 col-lg-18 d-sm-none">
                {sameCourses && sameCourses.length > 3 ? (
                  <Swiper
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    navigation={true}
                    spaceBetween={50}
                    pagination={{
                      clickable: true,
                    }}
                    centeredSlides={true}
                    modules={[Autoplay, Navigation]}
                    className="mySwiper"
                    style={{ overflowX: "hidden" }}
                    slidesPerView={slidePerView}
                    loop={true}
                  >
                    {sameCourses.map((item, index) => (
                      <SwiperSlide className="swiperSlide">
                        <SwiperItem
                          alertError={alertError}
                          alertErrorFav={alertErrorFav}
                          loginError={loginError}
                          setAlertError={setAlertError}
                          setAlertErrorFav={setAlertErrorFav}
                          setLoginError={setLoginError}
                          resData={resData}
                          sameCourse={item}
                          cartData={cartData}
                          myCarts={
                            myCarts && myCarts.some((items) => items == item.id)
                          }
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div style={{ flexWrap: "nowrap" }} className="rowGrid">
                    {sameCourses.map((item, index) => (
                      <SwiperItem
                        key={index}
                        className={"col-5"}
                        alertError={alertError}
                        alertErrorFav={alertErrorFav}
                        loginError={loginError}
                        setAlertError={setAlertError}
                        setAlertErrorFav={setAlertErrorFav}
                        setLoginError={setLoginError}
                        resData={resData}
                        sameCourse={item}
                        cartData={cartData}
                        myCarts={
                          myCarts && myCarts.some((items) => items == item.id)
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="container d-sm-block">
            <div className="rowGrid">
              {sameCourses.map((item, index) => (
                <>
                  <SwiperItem
                    key={index}
                    className={"col-24"}
                    alertError={alertError}
                    alertErrorFav={alertErrorFav}
                    loginError={loginError}
                    setAlertError={setAlertError}
                    setAlertErrorFav={setAlertErrorFav}
                    setLoginError={setLoginError}
                    resData={resData}
                    sameCourse={item}
                    cartData={cartData}
                    myCarts={
                      myCarts && myCarts.some((items) => items == item.id)
                    }
                  />
                </>
              ))}
            </div>
          </div>
        </section>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div className="modalForLogin">
            <Fade in={open}>
              <Box sx={style} className="container">
                <div className="modalLogin">
                  <h2 style={{ textAlign: "center", margin: "20px" }}>
                    Profilga kirish
                  </h2>
                  <form onSubmit={sendddata}>
                    <div className="phoneInputBox">
                      <PhoneInput
                        country={"uz"}
                        // value={storageLogDetails?storageLogDetails: number}
                        value={
                          localStorage.getItem("storageMobile")
                            ? localStorage.getItem("storageMobile")
                            : number
                        }
                        onChange={(phone) => setnumber(phone)}
                        id="phone"
                      />
                    </div>
                    <div className="password">
                      <TextField
                        className="inputs"
                        sx={{
                          width: "100%",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderRadius: "15px",
                            height: "70px",
                            border: "2px solid #D9D9D9",
                          },
                          "& .MuiOutlinedInput-input": {
                            height: "70px",
                            padding: "0 0 0 25px",
                            marginTop: "-2px",
                          },
                          "& .MuiInputLabel-root": {
                            top: "4px",
                          },
                          "& .MuiInputLabel-shrink": {
                            top: "0",
                            left: "2px",
                          },
                        }}
                        value={password}
                        type={!show ? "password" : "text"}
                        label="Parolingizni kiriting"
                        variant="outlined"
                        onChange={(e) => setpassword(e.target.value)}
                      />
                      {!show ? (
                        <img
                          src={VisibilityOutlinedIcon}
                          onClick={() => setShow(!show)}
                          className="eye"
                          alt="..."
                        />
                      ) : (
                        <img
                          src={VisibilityOffOutlinedIcon}
                          onClick={() => setShow(!show)}
                          className="eye eyeSlash"
                          alt="..."
                        />
                      )}
                    </div>
                    {error ? (
                      <p className="error-messageee">
                        <ReportIcon style={{ marginRight: "10px" }} /> Telefon
                        raqami yoki parol xato kiritilgan{" "}
                      </p>
                    ) : null}
                    <p className="sign-up">
                      Akkauntingiz yo'qmi? Unda{" "}
                      <Link to="/register">
                        <span> Ro'yxatdan o'ting</span>
                      </Link>
                    </p>
                    <Button
                      onClick={(e) => {
                        sendddata(e);
                        saveSystems();
                      }}
                      sx={{
                        width: "100%",
                        height: "70px",
                        borderRadius: "15px",
                        backgroundColor: "#80B5FF;",
                        fontFamily: "sans-serif",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "24px",
                        lineHeight: "29px",
                        textTransform: "none",
                        marginBottom: "44px",
                      }}
                      variant="contained"
                      className="btn"
                    >
                      Tizimga kirish
                    </Button>
                  </form>
                </div>
              </Box>
            </Fade>
          </div>
        </Modal>
        <Alert
          className={alertError ? "alert animation" : "alert"}
          severity="error"
        >
          <strong>Bu kurs savatchaga qo'shilgan!</strong>
        </Alert>
        {/* <Alert
          className={alertErrorFav ? "alert animation" : "alert"}
          severity="error"
        >
          <strong>Bu kurs sevimlilarga qo'shilgan!</strong>
        </Alert> */}
        <Alert
          className={loginError ? "alert animation" : "alert"}
          severity="error"
        >
          <strong>
            Iltimos ushbu amaliyotni bajarish uchun tizimga kiring!
          </strong>
          <br />
        </Alert>
      </div>
      <FooterN />
    </>
  );
}
