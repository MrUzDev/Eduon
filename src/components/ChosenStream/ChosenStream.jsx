import React, { useContext, useEffect, useState } from "react";
import "../../assets/css/Grid.css";
import "./ChosenStream.css";
import { StateContext } from "../../context/Context";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../Apis/api";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation, Autoplay } from "swiper";
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
import liveImg from "../../assets/images/livephoto.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { EditorState } from "draft-js";
import ReactHtmlParser from "react-html-parser";
import { BounceLoader } from "react-spinners";

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
  const { navStretch, isremoved, setIsRemoved, loggedIn } =
    useContext(StateContext);
  var id = useParams();
  const [alertError, setAlertError] = useState(false);
  const [resData, setResData] = useState("");
  const [slidePerView, setSlidePerView] = useState(0);
  const [alertErrorFav, setAlertErrorFav] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [vebinarId, setVebinarId] = useState();
  const [sameCourses, setSameCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [isBought, setisBought] = useState(false);
  const handleOpen = () => setOpen(true);
  const [vebinarDesk, setVebinarDesk] = useState(EditorState.createEmpty());
  const handleClose = () => setOpen(false);
  const [loaderr, setLoaderr] = useState(false);

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
    setLoaderr(true);

    if(resData && sameCourses && vebinarId) {
     setLoaderr(false)
    }
  }, [resData, sameCourses, vebinarId]);
  
  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v2/stream/get-webinar/${id.id}`
        )
        .then((res) => {
          setResData(res.data);
          setVebinarId(res.data.id);
          setVebinarDesk(res.data.short_descr);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, [id]);

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
            setisBought(res.data.some((item) => item.webinar.id == vebinarId));
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
  }, [vebinarId]);

  const buyCourse = async (e, id) => {
    !loggedIn && handleOpen();
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      loggedIn &&
        (await axios
          .post(
            `${process.env.REACT_APP_API_KEY}/api/v2/orders/webinar-cart`,
            {
              webinar: id,
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
            refresh(err.response.status, err.response.status.text);
          }));

      setIsRemoved(!isremoved);
    } catch (error) {}
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
    if (resData.speaker) {
      try {
        axios
          .get(
            `${process.env.REACT_APP_API_KEY}/api/v1/courses/speaker/${resData.speaker.id}`
          )
          .then((res) => {
            console.log(res.data);
            setSameCourses(res.data);
          });
      } catch (error) {}
    }
  }, []);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <>
      <NavbarDemo />
      <NavbarSm />
      <Sidebar />

      <div className={navStretch ? "ml-240" : "ml-100"}>
        <section id="courseAbout">
          <div className="container" id="stream-choosen-course">
            <div className="rowGrid justify-between">
              <div className="col-16 col-lg-15 col-sm-24 px-sm-0">
                <div className="video">
                  <div className="img" style={{ width: "100% !important" }}>
                    {resData.trailer_file ? (
                      <>
                        <video id="streamTreilerVideo" controls>
                          <source
                            src={`${process.env.REACT_APP_API_KEY}${resData.trailer_file}`}
                          />
                        </video>
                      </>
                    ) : (
                      resData.cover_img && (
                        <img
                          src={`${process.env.REACT_APP_API_KEY}${resData.cover_img}`}
                          alt=""
                          className="coverImg"
                        />
                      )
                    )}
                    {resData.trailer_file || resData.cover_img ? null : (
                      <img src={liveImg} />
                    )}
                  </div>
                </div>
                <div className="fundamentals d-none d-sm-block">
                  <div className="fundamentals_title">
                    <h1>{resData.name}</h1>
                    <div className="spikers">
                      <div className="img">
                        {resData ? (
                          resData.speaker.profile_picture === "" ||
                          resData.speaker.profile_picture === null ? (
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
                                src={`${process.env.REACT_APP_API_KEY}${resData.speaker.profile_picture}`}
                                alt="jpg"
                              />
                            </div>
                          )
                        ) : null}
                        {resData ? (
                          resData.speaker.profile_picture === "NULL" ||
                          " " ? null : (
                            <img
                              src={`${process.env.REACT_APP_API_KEY}/media/${resData.speaker.profile_picture}`}
                              alt="jpg"
                            />
                          )
                        ) : null}
                      </div>
                      <div className="spikers_title">
                        <span>Spiker:</span>
                        <p
                          className="pointer"
                          onClick={(e) =>
                            navigateToSpeaker(e, resData.speaker.id)
                          }
                        >
                          {resData.speaker
                            ? `${resData.speaker.f_name} ${resData.speaker.l_name}`
                            : null}
                        </p>
                      </div>
                    </div>
                    <a className="titleCourse">vebinar haqida qisqacha:</a>
                    <ul>
                      <li>
                        {resData.lang ? (
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
                              : resData.lang === "Russian"
                              ? "Русский"
                              : resData.lang === "ENGLISH" && "English"}
                          </a>
                        ) : null}
                      </li>
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
                              {resData.price
                                ? resData.price
                                    .toLocaleString("uz-UZ", {
                                      style: "currency",
                                      currency: "UZS",
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    })
                                    .replace(",", " ")
                                : 0}
                            </span>
                            <p>
                              {(
                                parseInt(resData.price) -
                                parseInt(resData.discount_price)
                              )
                                .toLocaleString("uz-UZ", {
                                  style: "currency",
                                  currency: "UZS",
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                })
                                .replace(",", " ")}
                              <span className="gray ml-5"></span>
                            </p>
                          </>
                        ) : (
                          <p>
                            {resData.price
                              ? resData.price
                                  .toLocaleString("uz-UZ", {
                                    style: "currency",
                                    currency: "UZS",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })
                                  .replace(",", " ")
                              : resData.price == 0
                              ? "Bepul"
                              : null}
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
                    {isBought || resData.price == 0 ? (
                      <button
                        onClick={() => navigate(`/stream/${resData.id}`)}
                        className="btn_one btn"
                      >
                        vebinarga kirish
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
                  <div className="aboutCourse">
                    {resData.short_descr && (
                      <>
                        {" "}
                        <h3>Vebinar haqida </h3>{" "}
                        <>{ReactHtmlParser(vebinarDesk)}</>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-8 col-lg-9 col-sm-24">
                <div className="fundamentals d-sm-none">
                  <div className="fundamentals_title">
                    <h1>{resData.name}</h1>
                    <div className="spikers">
                      {resData.speaker ? (
                        resData.speaker.profile_picture === "" ||
                        resData.speaker.profile_picture === "NULL" ? (
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
                            {resData.speaker.profile_picture ? (
                              <img
                                src={`${process.env.REACT_APP_API_KEY}${resData.speaker.profile_picture}`}
                                alt="jpg"
                              />
                            ) : (
                              <AccountCircleIcon
                                aria-describedby={id}
                                // onClick={handleClick}
                                className="avatar pointer"
                                style={{ fontSize: "40px" }}
                              />
                            )}
                          </div>
                        )
                      ) : null}

                      <div className="spikers_title">
                        <span>Spiker:</span>
                        <p
                          className="pointer"
                          onClick={(e) =>
                            navigateToSpeaker(e, resData.speaker.id)
                          }
                        >
                          {resData.speaker
                            ? `${resData.speaker.f_name} ${resData.speaker.l_name}`
                            : null}
                        </p>
                      </div>
                    </div>
                    <a className="titleCourse">vebinar haqida qisqacha:</a>
                    <ul>
                      <li>
                        {resData.lang ? (
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
                              : resData.lang === "Russian"
                              ? "Русский"
                              : resData.lang === "ENGLISH" && "English"}
                          </a>
                        ) : null}
                      </li>
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
                              {resData.price
                                ? resData.price
                                    .toLocaleString("uz-UZ", {
                                      style: "currency",
                                      currency: "UZS",
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    })
                                    .replace(",", " ")
                                : 0}
                            </span>
                            <p>
                              {(
                                parseInt(resData.price) -
                                parseInt(resData.discount_price)
                              )
                                .toLocaleString("uz-UZ", {
                                  style: "currency",
                                  currency: "UZS",
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                })
                                .replace(",", " ")}
                              <span className="gray ml-5"></span>
                            </p>
                          </>
                        ) : (
                          <p>
                            {resData.price
                              ? resData.price
                                  .toLocaleString("uz-UZ", {
                                    style: "currency",
                                    currency: "UZS",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })
                                  .replace(",", " ")
                              : resData.price == 0
                              ? "Bepul"
                              : null}
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
                    {isBought || resData.price == 0 ? (
                      <button
                        onClick={() => navigate(`/stream/${resData.id}`)}
                        className="btn_one btn"
                      >
                        vebinarga kirish
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
            <h1 className="spiker_title">Spiker</h1>
            <div className="rowGrid" style={{ flexWrap: "nowrap" }}>
              <div className="col-4 col-lg-6 col-sm-24">
                <div className="cards_one">
                  <div className="spiker_card_one">
                    <div className="d-sm-flex justify-sm-between">
                      {resData.speaker ? (
                        resData.speaker.profile_picture === "" ||
                        resData.speaker.profile_picture === "NULL" ? (
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
                            {resData.speaker.profile_picture ? (
                              <img
                                src={`${process.env.REACT_APP_API_KEY}${resData.speaker.profile_picture}`}
                                alt="jpg"
                              />
                            ) : (
                              <AccountCircleIcon
                                aria-describedby={id}
                                // onClick={handleClick}
                                className="avatar pointer"
                                style={{ fontSize: "50px" }}
                              />
                            )}
                          </div>
                        )
                      ) : null}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <h3 style={{ margin: "15px 0" }}>
                          {resData.speaker
                            ? `${resData.speaker.f_name} ${
                                resData.speaker.l_name &&
                                resData.speaker.l_name.length > 7
                                  ? resData.speaker.l_name.slice(0, 7) + "..."
                                  : resData.speaker.l_name
                              }`
                            : null}
                        </h3>
                      </div>
                    </div>
                    <button
                      className="pointer btn"
                      onClick={(e) => navigateToSpeaker(e, resData.speaker.id)}
                    >
                      Profilni ko'rish
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-20 col-lg-18 d-sm-none">
                {sameCourses.length > 3 ? (
                  <Swiper
                    autoplay={{
                      delay: 2000,
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
                      <SwiperSlide key={index} className="swiperSlide">
                        <SwiperItem
                          alertError={alertError}
                          alertErrorFav={alertErrorFav}
                          loginError={loginError}
                          setAlertError={setAlertError}
                          setAlertErrorFav={setAlertErrorFav}
                          setLoginError={setLoginError}
                          resData={resData}
                          sameCourse={item}
                          stream={true}
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
                        stream={true}
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
                  stream={true}
                />
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
          <Fade in={open}>
            <Box sx={style} className="container">
              <div className="rowGrid">
                <p style={{ color: "#1c1c1c" }} className="col-24">
                  Akkauntingiz yo'qmi? Unda
                </p>
                <div className="col-24">
                  <Button
                    sx={{
                      width: "100%",
                      marginTop: "20px",
                      backgroundColor: "#80B5FF",
                      borderRadius: "15px",
                      height: "59px",
                      color: "white",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                    className="btn"
                    onClick={() => navigate("/register")}
                  >
                    Ro'yxatdan o'ting
                  </Button>
                </div>
              </div>
            </Box>
          </Fade>
        </Modal>
        <Alert
          className={alertError ? "alert animation" : "alert"}
          severity="error"
        >
          <strong>Bu vebinar savatchaga qo'shilgan!</strong>
        </Alert>
        <Alert
          className={alertErrorFav ? "alert animation" : "alert"}
          severity="error"
        >
          <strong>Bu vebinar sevimlilarga qo'shilgan!</strong>
        </Alert>
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

      {loaderr  && (
          <div className="loader">
            <BounceLoader color="#006AFF" speedMultiplier={1.2} />
          </div>
        )}

      <FooterN />
    </>
  );
}
