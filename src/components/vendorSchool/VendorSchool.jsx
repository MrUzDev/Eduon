import React, { useContext, useEffect, useState } from "react";
import "./VendorSchool.css";
import { StateContext } from "../../context/Context";
import axios from "../../Apis/api";
import Sidebar from "../Sidebar/Sidebar";
import NavbarDemo from "../Navbar/Navbar";
import NavbarSm from "../Navbar/NavbarSm";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";

import Logo from "../../assets/images/sotuvchilarMaktabi.png";
import Partner1 from "../../assets/images/partner1.jpg";
import Partner2 from "../../assets/images/partner2.jpg";
import Partner3 from "../../assets/images/partner3.jpg";
import MFaktorLogo from "../../assets/images/MFaktor greY.png";
import EduonLogo from "../../assets/images/logo white white.png";
import JalingaLogo from "../../assets/images/Jalinga Logotype.png";
import FintechLogo from "../../assets/images/FintechLogo.png";
import UniredLogo from "../../assets/images/uniredLogo.png";
import VendorAbout from "../../assets/images/vendor-about.jpg";
import Spiker1 from "../../assets/images/vendor-spiker1.jpg";
import Spiker2 from "../../assets/images/vendor-spiker2.jpg";
import Spiker3 from "../../assets/images/vendor-spiker3.jpg";
import Spiker4 from "../../assets/images/vendor-spiker4.jpg";
import Spiker5 from "../../assets/images/vendor-spiker5.jpg";
import Spiker6 from "../../assets/images/vendor-spiker6.jpg";
import MantQuestionImg from "../../assets/images/questionsimg.jpg";
import SignUpVendorImg from "../../assets/images/SignUpVendorImg.jpg";
import VendorSchoolLogoRemove from "../../assets/images/sotuvchilarMaktabi.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import ReportIcon from "@mui/icons-material/Report";
import VisibilityOutlinedIcon from "../../assets/icons/eye.png";
import VisibilityOffOutlinedIcon from "../../assets/icons/eye-slash.png";
import PhoneInput from "react-phone-input-2";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import DoneIcon from '@mui/icons-material/Done';
import { BounceLoader } from "react-spinners";

function VendorSchool() {
  const { navStretch, loggedIn } = useContext(StateContext);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); localStorage.removeItem("vendorReg");};

  const [expanded, setExpanded] = React.useState(false);
  const [error, setError] = useState(false);
  const [number, setnumber] = useState("");
  const [password, setpassword] = useState("");
  const [show, setShow] = useState(false);

  const [IsRegVS, setIsRegVs] = useState(false);
  const [showDistrictModal, setShowDistrickModal] = useState(false);
  const [loader, setLoader] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setLoader(true)
    if(loggedIn) {
      if(IsRegVS) {
        setLoader(false)
      }
    }else {
      setLoader(false)
    }
  }, [IsRegVS])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendddata(event);
    }
  };

  useEffect(() => {
    const navbarBar = document.getElementById("navbar-bar");
    const navbarClose = document.getElementById("navbar-close");

    navbarBar.addEventListener("click", () => {
      const navList = document.querySelector(".Vendor-School .nav-smalll");
      navList.style.right = "0";
      navbarClose.style.display = "block";
      navbarBar.style.display = "none";
    });

    navbarClose.addEventListener("click", () => {
      const navList = document.querySelector(".Vendor-School .nav-smalll");
      navList.style.right = "-70%";
      navbarClose.style.display = "none";
      navbarBar.style.display = "block";
    });
  }, []);

  useEffect(() => {
    const vendorSchool = document.querySelector(".Vendor-School");

    const VendorParentApp = vendorSchool.parentElement.parentElement;

    const vendorSidebar = VendorParentApp.querySelector("#sidebarsm");
    vendorSidebar.style.opacity = "0";
  }, []);

  const RegCheckVS = () => {
    if (loggedIn) {
      if (IsRegVS) {
        navigate("/sotuvchilarMaktabi/MyCourses");
      } else {
        navigate("/registerVendorSchool");
      }
    } else {
      handleOpen();
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
      ).catch((err) => {
        refresh(err.response.status, err.response.status.text);
      });
      localStorage.setItem("access", data.data.access);
      localStorage.setItem("refresh", data.data.refresh);
      localStorage.setItem("vsModalRegNow", true);
      window.location.reload()
      
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
     loggedIn && axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/accounts/profile`, {
          headers,
        })
        .then((res) => {setIsRegVs(res.data.to_school); console.log(res.data.to_school);})
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, [open]);

  useEffect(() => {
    if(localStorage.getItem('vsModalRegNow') == 'true') {
      if (IsRegVS) {
        navigate("/sotuvchilarMaktabi/MyCourses");
        localStorage.removeItem('vsModalRegNow')
      }
    }
  }, [IsRegVS])


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

  return (
    <>
      <div>
        <div className="Vendor-School">
          <nav className="vendor-nav">
            <div className="vendor-nav-logo pointer">
              <img src={Logo} alt="" />
            </div>

            <DensityMediumIcon id="navbar-bar" />
            <CloseIcon id="navbar-close" />

            <div className="nav-smalll">
              <div className="vendor-nav-lists">
                <ul>
                  <li>
                    <a href="#aboutVendor">Biz haqimizda</a>
                  </li>
                  <li>
                    <a href="#vendor-school-spikers">Mentorlarimiz</a>
                  </li>
                  <li>
                    <a href="#vendor-school-price">Narxlar</a>
                  </li>
                  <li>
                    <a href="https://t.me/Eduon_Admin">Biz bilan aloqa</a>
                  </li>
                </ul>
              </div>
              <div className="vendor-nav-net">
                <div className="vendor-nav-icons bg-sm">
                  <a
                    className="nav-icon-link-container"
                    target="_blank"
                    href="https://instagram.com/sotuvchilar_maktabi?igshid=MzRlODBiNWFlZA=="
                  >
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M12 16.75C9.66 16.75 7.75 14.84 7.75 12.5C7.75 10.16 9.66 8.25 12 8.25C14.34 8.25 16.25 10.16 16.25 12.5C16.25 14.84 14.34 16.75 12 16.75ZM12 9.75C10.48 9.75 9.25 10.98 9.25 12.5C9.25 14.02 10.48 15.25 12 15.25C13.52 15.25 14.75 14.02 14.75 12.5C14.75 10.98 13.52 9.75 12 9.75Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M17 8C16.87 8 16.74 7.97 16.62 7.92C16.5 7.87 16.39 7.8 16.29 7.71C16.2 7.61 16.12 7.5 16.07 7.38C16.02 7.26 16 7.13 16 7C16 6.87 16.02 6.74 16.07 6.62C16.13 6.49 16.2 6.39 16.29 6.29C16.34 6.25 16.39 6.2 16.44 6.17C16.5 6.13 16.56 6.1 16.62 6.08C16.68 6.05 16.74 6.03 16.81 6.02C17.13 5.95 17.47 6.06 17.71 6.29C17.8 6.39 17.87 6.49 17.92 6.62C17.97 6.74 18 6.87 18 7C18 7.13 17.97 7.26 17.92 7.38C17.87 7.5 17.8 7.61 17.71 7.71C17.61 7.8 17.5 7.87 17.38 7.92C17.26 7.97 17.13 8 17 8Z"
                        fill="#F9F9F9"
                      />
                    </svg>
                  </a>
                </div>

                <div className="vendor-nav-icons bg-sm">
                  <a
                    className="nav-icon-link-container"
                    target="_blank"
                    href="https://instagram.com/sotuvchilar_maktabi?igshid=MzRlODBiNWFlZA=="
                  >
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.75 23.25H10.25V16H9.29999C8.71999 16 8.25 15.53 8.25 14.95V13.05C8.25 12.47 8.71999 12 9.29999 12H10.25V9.5C10.25 7.43 11.93 5.75 14 5.75H16.7C17.28 5.75 17.75 6.21999 17.75 6.79999V9.20001C17.75 9.78001 17.28 10.25 16.7 10.25H14.75V12H16.63C16.95 12 17.24 12.14 17.44 12.38C17.64 12.62 17.72 12.94 17.66 13.25L17.28 15.15C17.18 15.64 16.75 15.99 16.25 15.99H14.75V23.25ZM11.75 21.75H13.25V14.5H15.89L16.09 13.5H13.26V9.79999C13.26 9.21999 13.73 8.75 14.31 8.75H16.26V7.25H14C12.76 7.25 11.75 8.26 11.75 9.5V13.5H9.75V14.5H11.75V21.75Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z"
                        fill="#F9F9F9"
                      />
                    </svg>
                  </a>
                </div>

                <div className="vendor-nav-icons bg-sm">
                  <a
                    className="nav-icon-link-container"
                    target="_blank"
                    href="https://t.me/sotuvmaktabi"
                  >
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.22 22.13C13.04 22.13 11.37 21.3 10.05 17.33L9.33 15.17L7.17 14.45C3.21 13.13 2.38 11.46 2.38 10.28C2.38 9.11001 3.21 7.43001 7.17 6.10001L15.66 3.27001C17.78 2.56001 19.55 2.77001 20.64 3.85001C21.73 4.93001 21.94 6.71001 21.23 8.83001L18.4 17.32C17.07 21.3 15.4 22.13 14.22 22.13ZM7.64 7.53001C4.86 8.46001 3.87 9.56001 3.87 10.28C3.87 11 4.86 12.1 7.64 13.02L10.16 13.86C10.38 13.93 10.56 14.11 10.63 14.33L11.47 16.85C12.39 19.63 13.5 20.62 14.22 20.62C14.94 20.62 16.04 19.63 16.97 16.85L19.8 8.36001C20.31 6.82001 20.22 5.56001 19.57 4.91001C18.92 4.26001 17.66 4.18001 16.13 4.69001L7.64 7.53001Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M10.11 14.9C9.92 14.9 9.73 14.83 9.58 14.68C9.29 14.39 9.29 13.91 9.58 13.62L13.16 10.03C13.45 9.74 13.93 9.74 14.22 10.03C14.51 10.32 14.51 10.8 14.22 11.09L10.64 14.68C10.5 14.83 10.3 14.9 10.11 14.9Z"
                        fill="#F9F9F9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="vendor-nav-btn">
                <button
                  onClick={() => {
                    localStorage.setItem("vendorReg", true);
                    RegCheckVS();
                  }}
                  className="vendor-btn"
                >
                  O'qishga ariza topshirish
                </button>
              </div>
            </div>
          </nav>
          <div className="container">
            <section className="vendor-showcase">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                speed={1000}
                loop={true}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
              >
                <SwiperSlide>
                  <div className="vendor-showcase-bg vendor-showcase-bg1">
                    <div className="vendor-showcase-content vendor-showcase-content">
                      <h1>
                        Sotuvchilar maktabida yangi bilmlarni oling va
                        hayotingizni keyingi pog’onaga ko’taring!
                      </h1>
                      <div className="vendor-showcase-btns">
                        <button
                          onClick={() => {
                            setShowDistrickModal(true)
                          }}
                          className="vendor-btn"
                        >
                          Grantga ariza topshirish
                        </button>
                        <a
                          href={`https://telegram.me/share/url?url=${window.location.href}`}
                          target="_blank"
                        >
                          <span className="vendor-showcase-svg bg-sm">
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.22 22.13C13.04 22.13 11.37 21.3 10.05 17.33L9.33 15.17L7.17 14.45C3.21 13.13 2.38 11.46 2.38 10.28C2.38 9.11001 3.21 7.43001 7.17 6.10001L15.66 3.27001C17.78 2.56001 19.55 2.77001 20.64 3.85001C21.73 4.93001 21.94 6.71001 21.23 8.83001L18.4 17.32C17.07 21.3 15.4 22.13 14.22 22.13ZM7.64 7.53001C4.86 8.46001 3.87 9.56001 3.87 10.28C3.87 11 4.86 12.1 7.64 13.02L10.16 13.86C10.38 13.93 10.56 14.11 10.63 14.33L11.47 16.85C12.39 19.63 13.5 20.62 14.22 20.62C14.94 20.62 16.04 19.63 16.97 16.85L19.8 8.36001C20.31 6.82001 20.22 5.56001 19.57 4.91001C18.92 4.26001 17.66 4.18001 16.13 4.69001L7.64 7.53001Z"
                                fill="#F9F9F9"
                              />
                              <path
                                d="M10.11 14.9C9.92 14.9 9.73 14.83 9.58 14.68C9.29 14.39 9.29 13.91 9.58 13.62L13.16 10.03C13.45 9.74 13.93 9.74 14.22 10.03C14.51 10.32 14.51 10.8 14.22 11.09L10.64 14.68C10.5 14.83 10.3 14.9 10.11 14.9Z"
                                fill="#F9F9F9"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="vendor-showcase-bg vendor-showcase-bg2">
                    <div className="vendor-showcase-content vendor-showcase-content">
                      <h1>
                        Sotuvchilar maktabida yangi bilmlarni oling va
                        hayotingizni keyingi pog’onaga ko’taring!
                      </h1>
                      <div className="vendor-showcase-btns">
                        <button
                          onClick={() => {
                            // navigate("/registerVendorSchool");
                            setShowDistrickModal(true)
                            localStorage.setItem("vendorReg", true);
                          }}
                          className="vendor-btn"
                        >
                          Grantga ariza topshirish
                        </button>
                        <a
                          href={`https://telegram.me/share/url?url=${window.location.href}`}
                          target="_blank"
                        >
                          <span className="vendor-showcase-svg bg-sm">
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.22 22.13C13.04 22.13 11.37 21.3 10.05 17.33L9.33 15.17L7.17 14.45C3.21 13.13 2.38 11.46 2.38 10.28C2.38 9.11001 3.21 7.43001 7.17 6.10001L15.66 3.27001C17.78 2.56001 19.55 2.77001 20.64 3.85001C21.73 4.93001 21.94 6.71001 21.23 8.83001L18.4 17.32C17.07 21.3 15.4 22.13 14.22 22.13ZM7.64 7.53001C4.86 8.46001 3.87 9.56001 3.87 10.28C3.87 11 4.86 12.1 7.64 13.02L10.16 13.86C10.38 13.93 10.56 14.11 10.63 14.33L11.47 16.85C12.39 19.63 13.5 20.62 14.22 20.62C14.94 20.62 16.04 19.63 16.97 16.85L19.8 8.36001C20.31 6.82001 20.22 5.56001 19.57 4.91001C18.92 4.26001 17.66 4.18001 16.13 4.69001L7.64 7.53001Z"
                                fill="#F9F9F9"
                              />
                              <path
                                d="M10.11 14.9C9.92 14.9 9.73 14.83 9.58 14.68C9.29 14.39 9.29 13.91 9.58 13.62L13.16 10.03C13.45 9.74 13.93 9.74 14.22 10.03C14.51 10.32 14.51 10.8 14.22 11.09L10.64 14.68C10.5 14.83 10.3 14.9 10.11 14.9Z"
                                fill="#F9F9F9"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="vendor-showcase-bg vendor-showcase-bg3">
                    <div className="vendor-showcase-content vendor-showcase-content">
                      <h1>
                        Sotuvchilar maktabida yangi bilmlarni oling va
                        hayotingizni keyingi pog’onaga ko’taring!
                      </h1>
                      <div className="vendor-showcase-btns">
                        <button
                          onClick={() => {
                            // navigate("/registerVendorSchool");
                            setShowDistrickModal(true)
                            localStorage.setItem("vendorReg", true);
                          }}
                          className="vendor-btn"
                        >
                          Grantga ariza topshirish
                        </button>
                        <a
                          href={`https://telegram.me/share/url?url=${window.location.href}`}
                          target="_blank"
                        >
                          <span className="vendor-showcase-svg bg-sm">
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.22 22.13C13.04 22.13 11.37 21.3 10.05 17.33L9.33 15.17L7.17 14.45C3.21 13.13 2.38 11.46 2.38 10.28C2.38 9.11001 3.21 7.43001 7.17 6.10001L15.66 3.27001C17.78 2.56001 19.55 2.77001 20.64 3.85001C21.73 4.93001 21.94 6.71001 21.23 8.83001L18.4 17.32C17.07 21.3 15.4 22.13 14.22 22.13ZM7.64 7.53001C4.86 8.46001 3.87 9.56001 3.87 10.28C3.87 11 4.86 12.1 7.64 13.02L10.16 13.86C10.38 13.93 10.56 14.11 10.63 14.33L11.47 16.85C12.39 19.63 13.5 20.62 14.22 20.62C14.94 20.62 16.04 19.63 16.97 16.85L19.8 8.36001C20.31 6.82001 20.22 5.56001 19.57 4.91001C18.92 4.26001 17.66 4.18001 16.13 4.69001L7.64 7.53001Z"
                                fill="#F9F9F9"
                              />
                              <path
                                d="M10.11 14.9C9.92 14.9 9.73 14.83 9.58 14.68C9.29 14.39 9.29 13.91 9.58 13.62L13.16 10.03C13.45 9.74 13.93 9.74 14.22 10.03C14.51 10.32 14.51 10.8 14.22 11.09L10.64 14.68C10.5 14.83 10.3 14.9 10.11 14.9Z"
                                fill="#F9F9F9"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </section>

            <section id="aboutVendor" className="about-vendor">
              <div className="about-vendor-left-container">
                <div className="about-vendor-type-btns">
                  <span className="type-btn-vendor bg-sm">online</span>
                  <span className="type-btn-vendor bg-sm">offline</span>
                </div>

                <div className="about-vendor-tittle">
                  <h2>Sotuvchilar maktabi haqida</h2>
                </div>
                <div className="about-vendor-content">
                  <p>
                    Sotuvchilar maktabida o'qib o'z ko'nikma va bilimlaringizni
                    kengaytiring. Bu yerda siz nafaqat o'z sohasini ekspertlari
                    va balki real amalyotchilar va MFaktor loyihasining mashhur
                    spikerlari tomonidan dars olishingiz va bilimlaringizni
                    oshirib yuqori maoshlik ish o'rinlariga ega bo'lishingiz
                    mumkin.
                  </p>
                  <button
                   onClick={() => {
                    localStorage.setItem("vendorReg", true);
                    RegCheckVS();
                  }}
                    className="vendor-btn"
                  >
                    Darslarni boshlash
                  </button>
                </div>
              </div>

              <div className="about-vendor-img">
                <img src={VendorAbout} alt="VendorAbout" />
              </div>
            </section>
          </div>

          <section>
            <div className="partners">
              <div className="partner-imgs ">
                <Swiper
                  modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                  slidesPerView={1}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  speed={1000}
                  loop={true}
                  navigation
                  observer={true}
                  observeParents={true}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                      slideToClickedSlide: true,
                    },

                    // when window width is >= 640px
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 0,
                      slideToClickedSlide: true,
                    },
                    900: {
                      slidesPerView: 3,
                      spaceBetween: 0,
                      slideToClickedSlide: true,
                    },
                  }}
                >
                  <SwiperSlide>
                    <img src={Partner1} alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={Partner2} alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={Partner3} alt="" />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="all-partnerts-logo-container">
                <div className="all-partnert-logos">
                  <Swiper
                    modules={[
                      Autoplay,
                      Navigation,
                      Pagination,
                      Scrollbar,
                      A11y,
                    ]}
                    spaceBetween={50}
                    slidesPerView={2}
                    autoplay={{
                      delay: 1,
                      disableOnInteraction: false,
                    }}
                    speed={3000}
                    loop={true}
                    // navigation
                    observer={true}
                    observeParents={true}
                    breakpoints={{
                      320: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                        slideToClickedSlide: true,
                      },

                      // when window width is >= 640px
                      640: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                        slideToClickedSlide: true,
                      },
                      900: {
                        slidesPerView: 5,
                        spaceBetween: 0,
                        slideToClickedSlide: true,
                      },
                    }}
                  >
                    <SwiperSlide>
                      <img src={MFaktorLogo} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={EduonLogo} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={JalingaLogo} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={FintechLogo} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={UniredLogo} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={MFaktorLogo} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={EduonLogo} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={JalingaLogo} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={FintechLogo} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={UniredLogo} alt="" />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </section>

          <div className="container">
            <div className="get-vendor-school">
              <div className="get-ven-school-tittle">
                <h2>
                  Sotuvchilar maktabi kursi orqali quyidagilarga ega bo’lasiz:
                </h2>
              </div>
              <div className="get-vendor-school-container">
                <div className="get-vendor-school-box">
                  <span className="get-vendor-school-box-img">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 28.4251C14.07 28.4251 10.875 25.23 10.875 21.3C10.875 17.37 14.07 14.175 18 14.175C21.93 14.175 25.125 17.37 25.125 21.3C25.125 25.23 21.93 28.4251 18 28.4251ZM18 16.425C15.315 16.425 13.125 18.615 13.125 21.3C13.125 23.985 15.315 26.1751 18 26.1751C20.685 26.1751 22.875 23.985 22.875 21.3C22.875 18.615 20.685 16.425 18 16.425Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M17.16 23.7449C16.68 23.7449 16.2 23.5649 15.84 23.2049L14.865 22.2299C14.43 21.7949 14.43 21.0749 14.865 20.6399C15.3 20.2049 16.02 20.2049 16.455 20.6399L17.175 21.3599L19.59 19.1399C20.04 18.7199 20.76 18.7499 21.18 19.1999C21.6 19.6499 21.57 20.3699 21.12 20.7899L18.45 23.2499C18.075 23.5799 17.625 23.7449 17.16 23.7449Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M24 34.125H12C5.07001 34.125 3.78001 30.9 3.45001 27.765L2.32501 15.75C2.16001 14.175 2.11501 11.85 3.67501 10.11C5.02501 8.61001 7.26001 7.89001 10.5 7.89001H25.5C28.755 7.89001 30.99 8.62501 32.325 10.11C33.885 11.85 33.84 14.175 33.675 15.765L32.55 27.75C32.22 30.9 30.93 34.125 24 34.125ZM10.5 10.125C7.96501 10.125 6.22501 10.62 5.34001 11.61C4.60501 12.42 4.36501 13.665 4.56001 15.525L5.68501 27.54C5.94001 29.91 6.58501 31.875 12 31.875H24C29.4 31.875 30.06 29.91 30.315 27.525L31.44 15.54C31.635 13.665 31.395 12.42 30.66 11.61C29.775 10.62 28.035 10.125 25.5 10.125H10.5Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M24 10.125C23.385 10.125 22.875 9.615 22.875 9V7.8C22.875 5.13 22.875 4.125 19.2 4.125H16.8C13.125 4.125 13.125 5.13 13.125 7.8V9C13.125 9.615 12.615 10.125 12 10.125C11.385 10.125 10.875 9.615 10.875 9V7.8C10.875 5.16 10.875 1.875 16.8 1.875H19.2C25.125 1.875 25.125 5.16 25.125 7.8V9C25.125 9.615 24.615 10.125 24 10.125Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M24.015 21.585C23.505 21.585 23.055 21.24 22.92 20.73C22.77 20.13 23.13 19.515 23.73 19.365C26.655 18.63 29.37 17.355 31.8 15.585C32.295 15.225 33 15.33 33.375 15.84C33.735 16.335 33.63 17.04 33.12 17.415C30.45 19.35 27.48 20.745 24.27 21.555C24.195 21.57 24.105 21.585 24.015 21.585Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M12 21.63C11.91 21.63 11.82 21.615 11.73 21.6C8.715 20.865 5.88 19.59 3.285 17.82C2.775 17.475 2.64 16.77 2.985 16.26C3.33 15.75 4.035 15.615 4.545 15.96C6.915 17.58 9.495 18.735 12.255 19.41C12.855 19.56 13.23 20.16 13.08 20.775C12.975 21.285 12.51 21.63 12 21.63Z"
                        fill="#F9F9F9"
                      />
                    </svg>
                  </span>
                  <div className="get-vendor-school-box-content">
                    <h3>Diplom</h3>
                    <p>
                      Barcha modullar muvaffaqiyatli yakunlangandan so'ng diplom taqdim qilinadi.
                    </p>
                  </div>
                </div>

                <div className="get-vendor-school-box">
                  <span className="get-vendor-school-box-img">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 22.875C15.315 22.875 13.125 20.685 13.125 18C13.125 15.315 15.315 13.125 18 13.125C20.685 13.125 22.875 15.315 22.875 18C22.875 20.685 20.685 22.875 18 22.875ZM18 15.375C16.56 15.375 15.375 16.56 15.375 18C15.375 19.44 16.56 20.625 18 20.625C19.44 20.625 20.625 19.44 20.625 18C20.625 16.56 19.44 15.375 18 15.375Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M27.75 22.875C27.135 22.875 26.625 22.365 26.625 21.75V14.25C26.625 13.635 27.135 13.125 27.75 13.125C28.365 13.125 28.875 13.635 28.875 14.25V21.75C28.875 22.365 28.365 22.875 27.75 22.875Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M7.5 34.125C5.01 34.125 2.67 32.805 1.41 30.66C0.735004 29.58 0.375 28.305 0.375 27C0.375 23.07 3.57 19.875 7.5 19.875C11.43 19.875 14.625 23.07 14.625 27C14.625 28.305 14.265 29.58 13.59 30.675C12.33 32.805 9.99 34.125 7.5 34.125ZM7.5 22.125C4.815 22.125 2.625 24.315 2.625 27C2.625 27.885 2.865 28.755 3.33 29.505C4.2 30.975 5.805 31.875 7.5 31.875C9.195 31.875 10.8 30.975 11.67 29.52C12.135 28.755 12.375 27.9 12.375 27C12.375 24.315 10.185 22.125 7.5 22.125Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M6.64481 29.6101C6.35981 29.6101 6.07481 29.5051 5.84981 29.2801L4.36482 27.7951C3.92982 27.3601 3.92982 26.6401 4.36482 26.2051C4.79982 25.7701 5.51982 25.7701 5.95482 26.2051L6.67484 26.9251L9.0748 24.7051C9.5248 24.2851 10.2448 24.3151 10.6648 24.7651C11.0848 25.2151 11.0548 25.9351 10.6048 26.3551L7.40982 29.3101C7.18482 29.5051 6.91481 29.6101 6.64481 29.6101Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M25.5 31.125H12.75C12.135 31.125 11.625 30.615 11.625 30C11.625 29.385 12.135 28.875 12.75 28.875H25.5C29.79 28.875 31.875 26.79 31.875 22.5V13.5C31.875 9.21 29.79 7.125 25.5 7.125H10.5C6.21 7.125 4.125 9.21 4.125 13.5V22.95C4.125 23.565 3.615 24.075 3 24.075C2.385 24.075 1.875 23.565 1.875 22.95V13.5C1.875 8.025 5.025 4.875 10.5 4.875H25.5C30.975 4.875 34.125 8.025 34.125 13.5V22.5C34.125 27.975 30.975 31.125 25.5 31.125Z"
                        fill="#F9F9F9"
                      />
                    </svg>
                  </span>
                  <div className="get-vendor-school-box-content">
                    <h3>Online va offline darslar</h3>
                    <p>
                      Darslar gibrid formatda: offline va online formatda olib
                      boriladi
                    </p>
                  </div>
                </div>

                <div className="get-vendor-school-box">
                  <span className="get-vendor-school-box-img">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 34.125C9.105 34.125 1.875 26.895 1.875 18C1.875 9.105 9.105 1.875 18 1.875C26.895 1.875 34.125 9.105 34.125 18C34.125 18.615 33.615 19.125 33 19.125C32.385 19.125 31.875 18.615 31.875 18C31.875 10.35 25.65 4.125 18 4.125C10.35 4.125 4.125 10.35 4.125 18C4.125 25.65 10.35 31.875 18 31.875C18.615 31.875 19.125 32.385 19.125 33C19.125 33.615 18.615 34.125 18 34.125Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M13.5004 32.625H12.0004C11.3854 32.625 10.8754 32.115 10.8754 31.5C10.8754 30.885 11.3554 30.39 11.9704 30.375C9.61535 22.335 9.61535 13.665 11.9704 5.625C11.3704 5.61 10.8754 5.115 10.8754 4.5C10.8754 3.885 11.3854 3.375 12.0004 3.375H13.5004C13.8604 3.375 14.2054 3.555 14.4154 3.84C14.6254 4.14 14.6854 4.51499 14.5654 4.85999C11.7454 13.335 11.7454 22.68 14.5654 31.155C14.6854 31.5 14.6254 31.875 14.4154 32.175C14.2054 32.475 13.8604 32.625 13.5004 32.625Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M24.6899 19.1249C24.0749 19.1249 23.5649 18.6149 23.5649 17.9999C23.5649 13.5299 22.8449 9.10493 21.4349 4.85993C21.2399 4.27493 21.5549 3.62991 22.1399 3.43491C22.7249 3.23991 23.3699 3.55496 23.5649 4.13996C25.0499 8.60996 25.8149 13.2749 25.8149 17.9999C25.8149 18.6149 25.3049 19.1249 24.6899 19.1249Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M18 25.8152C13.8 25.8152 9.645 25.2152 5.625 24.0302C5.61 24.6302 5.115 25.1252 4.5 25.1252C3.885 25.1252 3.375 24.6152 3.375 24.0002V22.5002C3.375 22.1402 3.555 21.7952 3.84 21.5852C4.125 21.3752 4.51501 21.3152 4.86001 21.4352C9.10501 22.8452 13.53 23.5652 18 23.5652C18.615 23.5652 19.125 24.0752 19.125 24.6902C19.125 25.3052 18.615 25.8152 18 25.8152Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M31.5003 14.6251C31.3803 14.6251 31.2603 14.6101 31.1403 14.5651C22.6653 11.7451 13.3203 11.7451 4.84526 14.5651C4.26026 14.7601 3.61527 14.4451 3.42027 13.8601C3.22527 13.2751 3.54027 12.63 4.12527 12.435C13.0653 9.45004 22.9053 9.45004 31.8303 12.435C32.4153 12.63 32.7303 13.2751 32.5353 13.8601C32.4153 14.3251 31.9653 14.6251 31.5003 14.6251Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M23.7301 34.125C23.1601 34.125 22.6201 33.915 22.2301 33.525C21.7651 33.06 21.5551 32.385 21.6601 31.68L21.9451 29.655C22.0201 29.13 22.3351 28.5 22.7101 28.125L28.0201 22.815C28.7401 22.095 29.4451 21.72 30.2101 21.645C31.1551 21.555 32.0701 21.945 32.9401 22.815C33.8101 23.685 34.2001 24.6 34.1101 25.545C34.0351 26.295 33.6451 27.015 32.9401 27.735L27.6301 33.045C27.2551 33.42 26.6401 33.735 26.1151 33.81L24.0901 34.095C23.9551 34.11 23.8501 34.125 23.7301 34.125ZM30.4651 23.88C30.4501 23.88 30.4351 23.88 30.4201 23.88C30.2101 23.895 29.9251 24.075 29.6101 24.405L24.3001 29.715C24.2551 29.76 24.1801 29.91 24.1801 29.97L23.9101 31.845L25.7851 31.575C25.8451 31.56 25.9951 31.485 26.0401 31.44L31.3501 26.13C31.6651 25.815 31.8601 25.53 31.8751 25.32C31.9051 25.02 31.6051 24.66 31.3501 24.405C31.1101 24.165 30.7651 23.88 30.4651 23.88Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M31.3801 28.83C31.2751 28.83 31.1702 28.8151 31.0802 28.7851C29.1002 28.2301 27.5251 26.6551 26.9701 24.6751C26.8051 24.0751 27.1501 23.4601 27.7501 23.2951C28.3501 23.1301 28.9651 23.475 29.1451 24.075C29.4901 25.305 30.4652 26.2801 31.6952 26.6251C32.2952 26.7901 32.6401 27.42 32.4751 28.005C32.3251 28.5 31.8751 28.83 31.3801 28.83Z"
                        fill="#F9F9F9"
                      />
                    </svg>
                  </span>
                  <div className="get-vendor-school-box-content">
                    <h3>Ish o’rni</h3>
                    <p>
                      Barcha modullar muvaffaqiyatli yakunlangandan so'ng munosib kompaniyalarga sizni tavsiya qilamiz
                    </p>
                  </div>
                </div>

                <div className="get-vendor-school-box">
                  <span className="get-vendor-school-box-img">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.0002 34.1249C16.9952 34.1249 15.9752 33.8699 15.0752 33.3449L6.16523 28.1999C4.36523 27.1499 3.24023 25.2149 3.24023 23.1299V12.8699C3.24023 10.7849 4.36523 8.84992 6.16523 7.79992L15.0752 2.65493C16.8752 1.60493 19.1102 1.60493 20.9252 2.65493L29.8352 7.79992C31.6352 8.84992 32.7602 10.7849 32.7602 12.8699V23.1299C32.7602 25.2149 31.6352 27.1499 29.8352 28.1999L20.9252 33.3449C20.0252 33.8699 19.0052 34.1249 18.0002 34.1249ZM18.0002 4.1249C17.3852 4.1249 16.7552 4.28991 16.2002 4.60491L7.29023 9.7499C6.18023 10.3949 5.49023 11.5799 5.49023 12.8699V23.1299C5.49023 24.4049 6.18023 25.6049 7.29023 26.2499L16.2002 31.3949C17.3102 32.0399 18.6902 32.0399 19.8002 31.3949L28.7102 26.2499C29.8202 25.6049 30.5102 24.4199 30.5102 23.1299V12.8699C30.5102 11.5949 29.8202 10.3949 28.7102 9.7499L19.8002 4.60491C19.2452 4.28991 18.6152 4.1249 18.0002 4.1249Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M17.9999 17.6252C15.4499 17.6252 13.3799 15.5552 13.3799 13.0052C13.3799 10.4552 15.4499 8.38525 17.9999 8.38525C20.5499 8.38525 22.6199 10.4552 22.6199 13.0052C22.6199 15.5552 20.5499 17.6252 17.9999 17.6252ZM17.9999 10.6353C16.6949 10.6353 15.6299 11.7002 15.6299 13.0052C15.6299 14.3102 16.6949 15.3752 17.9999 15.3752C19.3049 15.3752 20.3699 14.3102 20.3699 13.0052C20.3699 11.7002 19.3049 10.6353 17.9999 10.6353Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M24 26.115C23.385 26.115 22.875 25.605 22.875 24.99C22.875 22.92 20.685 21.2251 18 21.2251C15.315 21.2251 13.125 22.92 13.125 24.99C13.125 25.605 12.615 26.115 12 26.115C11.385 26.115 10.875 25.605 10.875 24.99C10.875 21.675 14.07 18.9751 18 18.9751C21.93 18.9751 25.125 21.675 25.125 24.99C25.125 25.605 24.615 26.115 24 26.115Z"
                        fill="#F9F9F9"
                      />
                    </svg>
                  </span>
                  <div className="get-vendor-school-box-content">
                    <h3>Grantlar imkoni</h3>
                    <p>
                      Tahsil olish uchun grant yutib olish imkoni.
                    </p>
                  </div>
                </div>

                <div className="get-vendor-school-box">
                  <span className="get-vendor-school-box-img">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7394 17.43C13.6944 17.43 13.6644 17.43 13.6194 17.43C13.5444 17.415 13.4394 17.415 13.3494 17.43C8.99942 17.295 5.71442 13.875 5.71442 9.66C5.71442 5.37 9.20942 1.875 13.4994 1.875C17.7894 1.875 21.2844 5.37 21.2844 9.66C21.2694 13.875 17.9694 17.295 13.7844 17.43C13.7694 17.43 13.7544 17.43 13.7394 17.43ZM13.4994 4.125C10.4544 4.125 7.96442 6.615 7.96442 9.66C7.96442 12.66 10.3044 15.075 13.2894 15.18C13.3794 15.165 13.5744 15.165 13.7694 15.18C16.7094 15.045 19.0194 12.63 19.0344 9.66C19.0344 6.615 16.5444 4.125 13.4994 4.125Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M24.8094 17.625C24.7644 17.625 24.7194 17.625 24.6744 17.61C24.0594 17.67 23.4294 17.235 23.3694 16.62C23.3094 16.005 23.6844 15.45 24.2994 15.375C24.4794 15.36 24.6744 15.36 24.8394 15.36C27.0294 15.24 28.7394 13.44 28.7394 11.235C28.7394 8.955 26.8944 7.11 24.6144 7.11C23.9994 7.125 23.4894 6.615 23.4894 6C23.4894 5.385 23.9994 4.875 24.6144 4.875C28.1244 4.875 30.9894 7.74 30.9894 11.25C30.9894 14.7 28.2894 17.49 24.8544 17.625C24.8394 17.625 24.8244 17.625 24.8094 17.625Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M13.7544 33.825C10.8144 33.825 7.85941 33.075 5.62441 31.575C3.53941 30.195 2.39941 28.305 2.39941 26.25C2.39941 24.195 3.53941 22.29 5.62441 20.895C10.1244 17.91 17.4144 17.91 21.8844 20.895C23.9544 22.275 25.1094 24.165 25.1094 26.22C25.1094 28.275 23.9694 30.18 21.8844 31.575C19.6344 33.075 16.6944 33.825 13.7544 33.825ZM6.86941 22.785C5.42941 23.745 4.64941 24.975 4.64941 26.265C4.64941 27.54 5.44441 28.77 6.86941 29.715C10.6044 32.22 16.9044 32.22 20.6394 29.715C22.0794 28.755 22.8594 27.525 22.8594 26.235C22.8594 24.96 22.0644 23.73 20.6394 22.785C16.9044 20.295 10.6044 20.295 6.86941 22.785Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M27.5094 31.125C26.9844 31.125 26.5194 30.765 26.4144 30.225C26.2944 29.61 26.6844 29.025 27.2844 28.89C28.2294 28.695 29.0994 28.32 29.7744 27.795C30.6294 27.15 31.0944 26.34 31.0944 25.485C31.0944 24.63 30.6294 23.82 29.7894 23.19C29.1294 22.68 28.3044 22.32 27.3294 22.095C26.7294 21.96 26.3394 21.36 26.4744 20.745C26.6094 20.145 27.2094 19.755 27.8244 19.89C29.1144 20.175 30.2394 20.685 31.1544 21.39C32.5494 22.44 33.3444 23.925 33.3444 25.485C33.3444 27.045 32.5344 28.53 31.1394 29.595C30.2094 30.315 29.0394 30.84 27.7494 31.095C27.6594 31.125 27.5844 31.125 27.5094 31.125Z"
                        fill="#F9F9F9"
                      />
                    </svg>
                  </span>
                  <div className="get-vendor-school-box-content">
                    <h3>Amaliyot</h3>
                    <p>
                      2 modul va undan kattaroq kurs egalari uchun amaliyot
                      o’tash imkoniyati
                    </p>
                  </div>
                </div>

                <div className="get-vendor-school-box">
                  <span className="get-vendor-school-box-img">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M29.13 17.625H24C23.385 17.625 22.875 17.115 22.875 16.5V6.015C22.875 4.905 23.31 3.87 24.09 3.09C24.87 2.31 25.905 1.875 27.015 1.875H27.03C28.905 1.89 30.675 2.625 32.025 3.96C33.375 5.325 34.11 7.125 34.11 9V12.63C34.125 15.615 32.115 17.625 29.13 17.625ZM25.125 15.375H29.13C30.87 15.375 31.875 14.37 31.875 12.63V9C31.875 7.71 31.365 6.48 30.45 5.55C29.535 4.65 28.305 4.14 27.03 4.125C27.03 4.125 27.03 4.125 27.015 4.125C26.52 4.125 26.04 4.32 25.68 4.68C25.32 5.04 25.125 5.505 25.125 6.015V15.375Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M13.4997 34.995C12.7947 34.995 12.1346 34.725 11.6396 34.215L9.14965 31.71C9.01465 31.575 8.80465 31.56 8.65465 31.68L6.08965 33.6C5.29465 34.2 4.24465 34.305 3.34465 33.855C2.44465 33.405 1.88965 32.505 1.88965 31.5V9C1.88965 4.47 4.48465 1.875 9.01465 1.875H27.0146C27.6296 1.875 28.1396 2.385 28.1396 3C28.1396 3.615 27.6296 4.125 27.0146 4.125C25.9796 4.125 25.1396 4.965 25.1396 6V31.5C25.1396 32.505 24.5847 33.405 23.6847 33.855C22.7847 34.305 21.7346 34.215 20.9396 33.615L18.3747 31.695C18.2247 31.575 18.0147 31.605 17.8947 31.725L15.3747 34.245C14.8647 34.725 14.2047 34.995 13.4997 34.995ZM8.86465 29.355C9.55465 29.355 10.2297 29.61 10.7397 30.135L13.2297 32.64C13.3197 32.73 13.4397 32.745 13.4997 32.745C13.5597 32.745 13.6797 32.73 13.7697 32.64L16.2897 30.12C17.2197 29.19 18.6897 29.1 19.7247 29.895L22.2746 31.8C22.4396 31.92 22.5897 31.875 22.6647 31.83C22.7397 31.785 22.8747 31.695 22.8747 31.5V6C22.8747 5.325 23.0396 4.68 23.3246 4.125H8.99965C5.66965 4.125 4.12465 5.67 4.12465 9V31.5C4.12465 31.71 4.25965 31.8 4.33465 31.845C4.42465 31.89 4.57465 31.92 4.72465 31.8L7.28965 29.88C7.75465 29.535 8.30965 29.355 8.86465 29.355Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M17.1453 21.1201C16.3053 21.1201 15.6453 20.4451 15.6453 19.6201C15.6453 18.7951 16.3203 18.1201 17.1453 18.1201C17.9703 18.1201 18.6453 18.7951 18.6453 19.6201C18.6453 20.4451 17.9703 21.1201 17.1453 21.1201Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M9.85474 15.0449C9.01474 15.0449 8.35474 14.3699 8.35474 13.5449C8.35474 12.7199 9.02974 12.0449 9.85474 12.0449C10.6797 12.0449 11.3547 12.7199 11.3547 13.5449C11.3547 14.3699 10.6797 15.0449 9.85474 15.0449Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M9.40494 21.7199C9.11994 21.7199 8.83494 21.6149 8.60994 21.3899C8.17494 20.9549 8.17494 20.2349 8.60994 19.7999L16.7999 11.6099C17.2349 11.1749 17.9549 11.1749 18.3899 11.6099C18.8249 12.0449 18.8249 12.7649 18.3899 13.1999L10.1999 21.3899C9.98994 21.5999 9.68994 21.7199 9.40494 21.7199Z"
                        fill="#F9F9F9"
                      />
                    </svg>
                  </span>
                  <div className="get-vendor-school-box-content">
                    <h3>Chegirmalar</h3>
                    <p>
                      1 oylik va undan yuqori kusga 100% to’lovni oldindan
                      amalga oshirsangiz chegirmalar mavjud
                    </p>
                  </div>
                </div>

                <div className="get-vendor-school-box">
                  <span className="get-vendor-school-box-img">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26.61 34.1251H11.445C10.965 34.1251 10.545 33.8251 10.38 33.3901C10.215 32.9401 10.35 32.4451 10.71 32.1451C11.07 31.8451 11.4 31.4551 11.64 31.0351C12.12 30.2701 12.36 29.4001 12.36 28.5151C12.36 25.8301 10.17 23.6401 7.48501 23.6401C6.37501 23.6401 5.32501 24.0151 4.44001 24.7201C4.11001 24.9901 3.645 25.0351 3.255 24.8551C2.865 24.6751 2.625 24.2701 2.625 23.8351V17.2802C2.625 13.5452 5.65499 10.5151 9.38999 10.5151H26.61C30.345 10.5151 33.375 13.5452 33.375 17.2802V19.4402C33.375 20.0552 32.865 20.5652 32.25 20.5652H29.22C28.695 20.5652 28.215 20.7601 27.87 21.1201L27.855 21.1352C27.435 21.5402 27.24 22.0951 27.285 22.6651C27.375 23.6551 28.32 24.4501 29.4 24.4501H32.25C32.865 24.4501 33.375 24.9601 33.375 25.5751V27.3601C33.375 31.0951 30.345 34.1251 26.61 34.1251ZM13.77 31.8751H26.61C29.1 31.8751 31.125 29.8501 31.125 27.3601V26.7001H29.4C27.135 26.7001 25.215 25.0201 25.035 22.8601C24.915 21.6301 25.365 20.4152 26.265 19.5302C27.045 18.7352 28.095 18.3001 29.22 18.3001H31.125V17.2651C31.125 14.7751 29.1 12.7501 26.61 12.7501H9.38999C6.89999 12.7501 4.875 14.7751 4.875 17.2651V21.8852C5.715 21.5552 6.6 21.3751 7.5 21.3751C11.43 21.3751 14.625 24.5701 14.625 28.5001C14.625 29.6851 14.325 30.8551 13.77 31.8751Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M3.75 19.74C3.135 19.74 2.625 19.23 2.625 18.615V11.7601C2.625 9.52509 4.035 7.50001 6.12 6.70501L18.03 2.20501C19.26 1.74001 20.625 1.90508 21.69 2.65508C22.77 3.40508 23.4 4.62007 23.4 5.92507V11.6251C23.4 12.2401 22.89 12.7501 22.275 12.7501C21.66 12.7501 21.15 12.2401 21.15 11.6251V5.92507C21.15 5.35507 20.88 4.83005 20.4 4.50005C19.92 4.17005 19.35 4.09504 18.81 4.30504L6.90001 8.80504C5.68501 9.27004 4.86001 10.4551 4.86001 11.7601V18.615C4.87501 19.245 4.365 19.74 3.75 19.74Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M29.4 26.6998C27.135 26.6998 25.215 25.0198 25.035 22.8598C24.915 21.6148 25.3649 20.3998 26.2649 19.5148C27.0299 18.7348 28.08 18.2998 29.205 18.2998H32.325C33.81 18.3448 34.95 19.5147 34.95 20.9547V24.0448C34.95 25.4848 33.81 26.6548 32.37 26.6998H29.4ZM32.295 20.5498H29.2199C28.6949 20.5498 28.215 20.7448 27.87 21.1048C27.435 21.5248 27.225 22.0948 27.285 22.6648C27.375 23.6548 28.32 24.4498 29.4 24.4498H32.34C32.535 24.4498 32.715 24.2698 32.715 24.0448V20.9547C32.715 20.7297 32.535 20.5648 32.295 20.5498Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M21 19.125H10.5C9.885 19.125 9.375 18.615 9.375 18C9.375 17.385 9.885 16.875 10.5 16.875H21C21.615 16.875 22.125 17.385 22.125 18C22.125 18.615 21.615 19.125 21 19.125Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M7.5 35.625C5.01 35.625 2.67 34.305 1.41 32.16C0.735004 31.08 0.375 29.805 0.375 28.5C0.375 26.31 1.35 24.285 3.045 22.935C4.305 21.93 5.895 21.375 7.5 21.375C11.43 21.375 14.625 24.57 14.625 28.5C14.625 29.805 14.265 31.08 13.59 32.175C13.23 32.805 12.735 33.375 12.165 33.855C10.92 34.995 9.255 35.625 7.5 35.625ZM7.5 23.625C6.39 23.625 5.34 24 4.455 24.705C3.3 25.62 2.625 27.015 2.625 28.5C2.625 29.385 2.865 30.255 3.33 31.005C4.215 32.505 5.775 33.375 7.5 33.375C8.685 33.375 9.82501 32.94 10.695 32.16C11.085 31.83 11.415 31.44 11.655 31.02C12.135 30.255 12.375 29.385 12.375 28.5C12.375 25.815 10.185 23.625 7.5 23.625Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M6.64481 31.1101C6.35981 31.1101 6.07481 31.0051 5.84981 30.7801L4.36482 29.2951C3.92982 28.8601 3.92982 28.1401 4.36482 27.7051C4.79982 27.2701 5.51982 27.2701 5.95482 27.7051L6.67481 28.4251L9.07482 26.2051C9.52482 25.7851 10.2448 25.8151 10.6648 26.2651C11.0848 26.7151 11.0548 27.4351 10.6048 27.8551L7.40982 30.8101C7.18482 31.0051 6.91481 31.1101 6.64481 31.1101Z"
                        fill="#F9F9F9"
                      />
                    </svg>
                  </span>
                  <div className="get-vendor-school-box-content">
                    <h3>Imtihonlar</h3>
                    <p>
                      Ta'lim olishni nazorat qilish uchun har modul yakunlangach boshqa modulga o'tish uchun imtihon olinadi.
                    </p>
                  </div>
                </div>

                <div className="get-vendor-school-box">
                  <span className="get-vendor-school-box-img">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.7547 34.1249C7.1847 34.1249 4.25977 31.53 4.25977 28.335V25.2749C4.25977 24.6599 4.76977 24.1499 5.38477 24.1499C5.99977 24.1499 6.50977 24.6599 6.50977 25.2749C6.50977 27.1499 8.3247 28.5599 10.7547 28.5599C13.1847 28.5599 14.9997 27.1499 14.9997 25.2749C14.9997 24.6599 15.5097 24.1499 16.1247 24.1499C16.7397 24.1499 17.2497 24.6599 17.2497 25.2749V28.335C17.2497 31.53 14.3397 34.1249 10.7547 34.1249ZM6.89969 29.8049C7.55969 31.0349 9.0447 31.8749 10.7547 31.8749C12.4647 31.8749 13.9497 31.0199 14.6097 29.8049C13.5447 30.4499 12.2247 30.8249 10.7547 30.8249C9.2847 30.8249 7.96469 30.4499 6.89969 29.8049Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M10.7547 26.6999C8.2947 26.6999 6.08975 25.5749 4.99475 23.7899C4.51475 23.0099 4.25977 22.0949 4.25977 21.1649C4.25977 19.5899 4.94975 18.1199 6.20975 17.0249C8.63975 14.8949 12.8247 14.895 15.2697 17.01C16.5297 18.12 17.2347 19.5899 17.2347 21.1649C17.2347 22.0949 16.9797 23.0099 16.4997 23.7899C15.4197 25.5749 13.2147 26.6999 10.7547 26.6999ZM10.7547 17.6249C9.5847 17.6249 8.50473 18.0149 7.69473 18.7199C6.92973 19.3799 6.50977 20.2499 6.50977 21.1649C6.50977 21.6899 6.6447 22.1699 6.9147 22.6199C7.6047 23.7599 9.0747 24.4649 10.7547 24.4649C12.4347 24.4649 13.9047 23.76 14.5797 22.635C14.8497 22.2 14.9847 21.7049 14.9847 21.1799C14.9847 20.2649 14.5647 19.3949 13.7997 18.7199C13.0047 18.0149 11.9247 17.6249 10.7547 17.6249Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M10.7547 30.825C7.0497 30.825 4.25977 28.44 4.25977 25.29V21.165C4.25977 17.97 7.1697 15.375 10.7547 15.375C12.4497 15.375 14.0697 15.96 15.2847 17.01C16.5447 18.12 17.2497 19.59 17.2497 21.165V25.29C17.2497 28.44 14.4597 30.825 10.7547 30.825ZM10.7547 17.625C8.4147 17.625 6.50977 19.215 6.50977 21.165V25.29C6.50977 27.165 8.3247 28.575 10.7547 28.575C13.1847 28.575 14.9997 27.165 14.9997 25.29V21.165C14.9997 20.25 14.5798 19.38 13.8148 18.705C13.0048 18.015 11.9247 17.625 10.7547 17.625Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M28.5598 22.1998C26.2948 22.1998 24.3749 20.5198 24.1949 18.3598C24.0749 17.1148 24.5249 15.8998 25.4249 15.0148C26.1749 14.2348 27.2398 13.7998 28.3648 13.7998H31.4999C32.9849 13.8448 34.1249 15.0147 34.1249 16.4547V19.5448C34.1249 20.9848 32.9849 22.1548 31.5449 22.1998H28.5598ZM31.4548 16.0498H28.3798C27.8548 16.0498 27.3749 16.2448 27.0299 16.6048C26.5949 17.0248 26.3849 17.5948 26.4449 18.1648C26.5199 19.1548 27.4798 19.9498 28.5598 19.9498H31.4999C31.6949 19.9498 31.8749 19.7698 31.8749 19.5448V16.4547C31.8749 16.2297 31.6948 16.0648 31.4548 16.0498Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M24.0004 31.875H20.2504C19.6354 31.875 19.1254 31.365 19.1254 30.75C19.1254 30.135 19.6354 29.625 20.2504 29.625H24.0004C27.8704 29.625 30.3754 27.12 30.3754 23.25V22.2H28.5603C26.2953 22.2 24.3754 20.52 24.1954 18.36C24.0754 17.115 24.5254 15.9 25.4254 15.015C26.1754 14.235 27.2403 13.8 28.3653 13.8H30.3604V12.75C30.3604 9.24 28.3054 6.82497 24.9754 6.43497C24.6154 6.37497 24.3004 6.375 23.9854 6.375H10.4854C10.1254 6.375 9.78033 6.40498 9.43533 6.44998C6.13533 6.86998 4.11035 9.27 4.11035 12.75V15.75C4.11035 16.365 3.60035 16.875 2.98535 16.875C2.37035 16.875 1.86035 16.365 1.86035 15.75V12.75C1.86035 8.13 4.71041 4.78501 9.13541 4.23001C9.54041 4.17001 10.0054 4.125 10.4854 4.125H23.9854C24.3454 4.125 24.8103 4.14 25.2903 4.215C29.7153 4.725 32.6104 8.085 32.6104 12.75V14.925C32.6104 15.54 32.1004 16.05 31.4854 16.05H28.3653C27.8403 16.05 27.3604 16.245 27.0154 16.605C26.5804 17.025 26.3704 17.595 26.4304 18.165C26.5054 19.155 27.4654 19.95 28.5454 19.95H31.5004C32.1154 19.95 32.6254 20.46 32.6254 21.075V23.25C32.6254 28.41 29.1604 31.875 24.0004 31.875Z"
                        fill="#F9F9F9"
                      />
                    </svg>
                  </span>
                  <div className="get-vendor-school-box-content">
                    <h3>Bo’lib to’lash</h3>
                    <p>
                      1 oylik va undan kattaroq kurs egalari uchun bo’lib
                      to’lash imkoni mavjud
                    </p>
                  </div>
                </div>

                <div className="get-vendor-school-box">
                  <span className="get-vendor-school-box-img">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.015 25.4999C16.74 25.4999 15.45 25.1699 14.445 24.5249L5.415 18.6299C3.735 17.5349 2.73 15.6899 2.73 13.6799C2.73 11.6699 3.735 9.82493 5.415 8.72993L14.46 2.84993C16.47 1.54493 19.605 1.54493 21.6 2.86493L30.585 8.75993C32.25 9.85493 33.255 11.6999 33.255 13.6949C33.255 15.6899 32.25 17.5349 30.585 18.6299L21.6 24.5249C20.595 25.1849 19.305 25.4999 18.015 25.4999ZM18.015 4.12493C17.16 4.12493 16.305 4.31993 15.69 4.73993L6.66 10.6199C5.61 11.3099 4.995 12.4199 4.995 13.6799C4.995 14.9399 5.595 16.0499 6.66 16.7399L15.69 22.6349C16.935 23.4449 19.125 23.4449 20.37 22.6349L29.355 16.7399C30.405 16.0499 31.005 14.9399 31.005 13.6799C31.005 12.4199 30.405 11.3099 29.355 10.6199L20.37 4.72493C19.74 4.33493 18.885 4.12493 18.015 4.12493Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M18 34.1249C17.34 34.1249 16.665 34.0349 16.125 33.8549L11.34 32.2649C9.07499 31.5149 7.28999 29.0399 7.30499 26.6549L7.32 19.6199C7.32 19.0049 7.83 18.4949 8.445 18.4949C9.06 18.4949 9.57 19.0049 9.57 19.6199L9.555 26.6549C9.555 28.0649 10.725 29.6849 12.06 30.1349L16.845 31.7249C17.445 31.9199 18.555 31.9199 19.155 31.7249L23.94 30.1349C25.275 29.6849 26.445 28.0649 26.445 26.6699V19.7099C26.445 19.0949 26.955 18.5849 27.57 18.5849C28.185 18.5849 28.695 19.0949 28.695 19.7099V26.6699C28.695 29.0549 26.925 31.5149 24.66 32.2799L19.875 33.8699C19.335 34.0349 18.66 34.1249 18 34.1249Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M32.1 23.625C31.485 23.625 30.975 23.115 30.975 22.5V13.5C30.975 12.885 31.485 12.375 32.1 12.375C32.715 12.375 33.225 12.885 33.225 13.5V22.5C33.225 23.115 32.715 23.625 32.1 23.625Z"
                        fill="#F9F9F9"
                      />
                    </svg>
                  </span>
                  <div className="get-vendor-school-box-content">
                    <h3>Mehmon spikerlar</h3>
                    <p>
                      Sizga o’z sohasida professional bo’lgan mehmon
                      spikerlarimiz dars beradilar
                    </p>
                  </div>
                </div>

                <div className="get-vendor-school-box">
                  <span className="get-vendor-school-box-img">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 8.625C11.385 8.625 10.875 8.115 10.875 7.5V3C10.875 2.385 11.385 1.875 12 1.875C12.615 1.875 13.125 2.385 13.125 3V7.5C13.125 8.115 12.615 8.625 12 8.625Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M24 8.625C23.385 8.625 22.875 8.115 22.875 7.5V3C22.875 2.385 23.385 1.875 24 1.875C24.615 1.875 25.125 2.385 25.125 3V7.5C25.125 8.115 24.615 8.625 24 8.625Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M12.75 21.7501C12.555 21.7501 12.36 21.7051 12.18 21.6301C11.985 21.5551 11.835 21.4501 11.685 21.3151C11.415 21.0301 11.25 20.6401 11.25 20.2501C11.25 19.8601 11.415 19.4701 11.685 19.1851C11.835 19.0501 12 18.9451 12.18 18.8701C12.54 18.7201 12.96 18.7201 13.32 18.8701C13.5 18.9451 13.665 19.0501 13.815 19.1851C13.875 19.2601 13.95 19.3351 13.995 19.4101C14.055 19.5001 14.1 19.5901 14.13 19.6801C14.175 19.7701 14.205 19.8601 14.22 19.9501C14.235 20.0551 14.25 20.1601 14.25 20.2501C14.25 20.6401 14.085 21.0301 13.815 21.3151C13.665 21.4501 13.5 21.5551 13.32 21.6301C13.14 21.7051 12.945 21.7501 12.75 21.7501Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M18 21.7498C17.805 21.7498 17.61 21.7048 17.43 21.6298C17.235 21.5548 17.085 21.4498 16.935 21.3148C16.665 21.0298 16.5 20.6398 16.5 20.2498C16.5 20.1598 16.515 20.0548 16.53 19.9498C16.545 19.8598 16.575 19.7698 16.62 19.6798C16.65 19.5898 16.695 19.4998 16.755 19.4098C16.815 19.3348 16.875 19.2598 16.935 19.1848C17.49 18.6298 18.495 18.6298 19.065 19.1848C19.125 19.2598 19.185 19.3348 19.245 19.4098C19.305 19.4998 19.35 19.5898 19.38 19.6798C19.425 19.7698 19.455 19.8598 19.47 19.9498C19.485 20.0548 19.5 20.1598 19.5 20.2498C19.5 20.6398 19.335 21.0298 19.065 21.3148C18.78 21.5848 18.405 21.7498 18 21.7498Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M12.75 27.0001C12.555 27.0001 12.36 26.9551 12.18 26.8801C12 26.8051 11.835 26.7001 11.685 26.5651C11.415 26.2801 11.25 25.8901 11.25 25.5001C11.25 25.4101 11.265 25.3051 11.28 25.2151C11.295 25.1101 11.325 25.0201 11.37 24.9301C11.4 24.8401 11.445 24.7501 11.505 24.6601C11.55 24.5851 11.625 24.5101 11.685 24.4351C11.835 24.3001 12 24.1951 12.18 24.1201C12.54 23.9701 12.96 23.9701 13.32 24.1201C13.5 24.1951 13.665 24.3001 13.815 24.4351C13.875 24.5101 13.95 24.5851 13.995 24.6601C14.055 24.7501 14.1 24.8401 14.13 24.9301C14.175 25.0201 14.205 25.1101 14.22 25.2151C14.235 25.3051 14.25 25.4101 14.25 25.5001C14.25 25.8901 14.085 26.2801 13.815 26.5651C13.665 26.7001 13.5 26.8051 13.32 26.8801C13.14 26.9551 12.945 27.0001 12.75 27.0001Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M30.75 14.76H5.25C4.635 14.76 4.125 14.25 4.125 13.635C4.125 13.02 4.635 12.51 5.25 12.51H30.75C31.365 12.51 31.875 13.02 31.875 13.635C31.875 14.25 31.365 14.76 30.75 14.76Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M23.7301 34.1699C23.1601 34.1699 22.6201 33.9599 22.2301 33.5699C21.7651 33.1049 21.5551 32.4299 21.6601 31.7249L21.9451 29.6999C22.0201 29.1749 22.3351 28.5449 22.7101 28.1699L28.0201 22.8599C28.7401 22.1399 29.4451 21.7649 30.2101 21.6899C31.1551 21.5999 32.0701 21.9899 32.9401 22.8599C33.8551 23.7749 35.0851 25.6349 32.9401 27.7799L27.6301 33.0899C27.2551 33.4649 26.6251 33.7799 26.1001 33.8549L24.0751 34.1399C23.9551 34.1549 23.8501 34.1699 23.7301 34.1699ZM30.4651 23.9249C30.4501 23.9249 30.4351 23.9249 30.4201 23.9249C30.2101 23.9399 29.9251 24.1349 29.6101 24.4499L24.3001 29.7599C24.2551 29.8049 24.1801 29.9549 24.1801 30.0149L23.9101 31.8899L25.7851 31.6199C25.8451 31.6049 25.9951 31.5299 26.0401 31.4849L31.3501 26.1749C32.0101 25.5149 32.1001 25.1849 31.3501 24.4349C31.1101 24.2099 30.7651 23.9249 30.4651 23.9249Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M31.3801 28.8749C31.2751 28.8749 31.1701 28.8599 31.0801 28.8299C29.1001 28.2749 27.5251 26.6999 26.9701 24.7199C26.8051 24.1199 27.1501 23.5049 27.7501 23.3249C28.3501 23.1599 28.9651 23.5049 29.1451 24.1049C29.4901 25.3349 30.4651 26.3099 31.6951 26.6549C32.2951 26.8199 32.6401 27.4499 32.4751 28.0499C32.3251 28.5449 31.8751 28.8749 31.3801 28.8749Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M18 34.125H12C6.525 34.125 3.375 30.975 3.375 25.5V12.75C3.375 7.275 6.525 4.125 12 4.125H24C29.475 4.125 32.625 7.275 32.625 12.75V18C32.625 18.615 32.115 19.125 31.5 19.125C30.885 19.125 30.375 18.615 30.375 18V12.75C30.375 8.46 28.29 6.375 24 6.375H12C7.71 6.375 5.625 8.46 5.625 12.75V25.5C5.625 29.79 7.71 31.875 12 31.875H18C18.615 31.875 19.125 32.385 19.125 33C19.125 33.615 18.615 34.125 18 34.125Z"
                        fill="#F9F9F9"
                      />
                    </svg>
                  </span>
                  <div className="get-vendor-school-box-content">
                    <h3>Kurs davomiyligi</h3>
                    <p>
                      O’zingizga mos modul tanlab tahsil olish imkoni</p>
                  </div>
                </div>

                <div className="get-vendor-school-box">
                  <span className="get-vendor-school-box-img">
                    <svg
                      width="36"
                      height="37"
                      viewBox="0 0 36 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27.975 13.925C24.99 13.925 22.575 11.495 22.575 8.525C22.575 7.31 22.98 6.155 23.73 5.195C23.76 5.15 23.805 5.12 23.835 5.075C24.855 3.83 26.355 3.125 27.975 3.125C30.945 3.125 33.375 5.555 33.375 8.525C33.375 10.19 32.625 11.735 31.305 12.77C30.345 13.52 29.19 13.925 27.975 13.925ZM25.425 6.68C25.035 7.22 24.825 7.85 24.825 8.525C24.825 10.265 26.235 11.675 27.975 11.675C28.68 11.675 29.355 11.435 29.91 11C30.675 10.4 31.125 9.5 31.125 8.525C31.125 6.785 29.715 5.375 27.975 5.375C27 5.375 26.1 5.81 25.515 6.575C25.485 6.62 25.455 6.65 25.425 6.68Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M8.025 13.925C6.81 13.925 5.655 13.52 4.695 12.77C3.375 11.735 2.625 10.19 2.625 8.525C2.625 5.555 5.055 3.125 8.025 3.125C9.69 3.125 11.235 3.875 12.27 5.195C13.02 6.155 13.425 7.31 13.425 8.525C13.425 11.495 10.995 13.925 8.025 13.925ZM8.025 5.375C6.285 5.375 4.875 6.785 4.875 8.525C4.875 9.5 5.31 10.4 6.09 11C6.645 11.435 7.32 11.675 8.025 11.675C9.765 11.675 11.175 10.265 11.175 8.525C11.175 7.82 10.935 7.145 10.5 6.59C9.9 5.81 9 5.375 8.025 5.375Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M27.975 33.8752C26.355 33.8752 24.855 33.1702 23.835 31.9252C23.79 31.8952 23.76 31.8502 23.73 31.8052C22.98 30.8452 22.575 29.6902 22.575 28.4752C22.575 25.4902 25.005 23.0752 27.975 23.0752C29.19 23.0752 30.345 23.4802 31.305 24.2302C31.35 24.2602 31.38 24.3052 31.425 24.3352C32.67 25.3552 33.375 26.8552 33.375 28.4752C33.375 31.4452 30.945 33.8752 27.975 33.8752ZM25.425 30.3202C25.455 30.3502 25.485 30.3802 25.515 30.4252C26.1 31.1902 27 31.6252 27.975 31.6252C29.715 31.6252 31.125 30.2152 31.125 28.4752C31.125 27.5002 30.69 26.6002 29.925 26.0152C29.88 25.9852 29.85 25.9552 29.82 25.9252C29.28 25.5352 28.65 25.3252 27.975 25.3252C26.235 25.3252 24.825 26.7352 24.825 28.4752C24.825 29.1502 25.035 29.7802 25.425 30.3202Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M8.025 33.8752C5.055 33.8752 2.625 31.4452 2.625 28.4752C2.625 26.8552 3.33 25.3552 4.575 24.3352C4.605 24.2902 4.65 24.2602 4.695 24.2302C5.655 23.4802 6.81 23.0752 8.025 23.0752C11.01 23.0752 13.425 25.5052 13.425 28.4752C13.425 29.6902 13.02 30.8452 12.27 31.8052C11.235 33.1252 9.69 33.8752 8.025 33.8752ZM6.18 25.9252C6.15 25.9552 6.12 25.9852 6.075 26.0152C5.31 26.6002 4.875 27.5002 4.875 28.4752C4.875 30.2152 6.285 31.6252 8.025 31.6252C9 31.6252 9.9 31.1902 10.5 30.4102C10.935 29.8552 11.175 29.1802 11.175 28.4752C11.175 26.7352 9.765 25.3252 8.025 25.3252C7.35 25.3252 6.72 25.5352 6.18 25.9252Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M18 33.875C15.51 33.875 13.035 33.26 10.86 32.105C10.56 31.955 10.365 31.67 10.29 31.34C10.215 31.01 10.29 30.68 10.5 30.41C10.935 29.855 11.175 29.18 11.175 28.475C11.175 26.735 9.765 25.325 8.025 25.325C7.32 25.325 6.645 25.565 6.09 26C5.835 26.21 5.49 26.285 5.16 26.21C4.83 26.135 4.56 25.94 4.395 25.64C3.225 23.435 2.625 21.035 2.625 18.5C2.625 16.01 3.24 13.535 4.395 11.36C4.545 11.06 4.83 10.865 5.16 10.79C5.49 10.715 5.82 10.805 6.09 11C6.645 11.435 7.32 11.675 8.025 11.675C9.765 11.675 11.175 10.265 11.175 8.525C11.175 7.82 10.935 7.145 10.5 6.59C10.29 6.335 10.215 5.99 10.29 5.66C10.365 5.33 10.56 5.06 10.86 4.895C13.035 3.74 15.51 3.125 18 3.125C20.535 3.125 22.935 3.725 25.14 4.895C25.44 5.045 25.635 5.33 25.71 5.66C25.785 5.99 25.695 6.32 25.5 6.59C25.065 7.145 24.825 7.82 24.825 8.525C24.825 10.265 26.235 11.675 27.975 11.675C28.68 11.675 29.355 11.435 29.91 11C30.165 10.79 30.51 10.715 30.84 10.79C31.17 10.865 31.44 11.06 31.605 11.36C32.76 13.535 33.375 16.01 33.375 18.5C33.375 21.035 32.775 23.435 31.605 25.64C31.455 25.94 31.17 26.135 30.84 26.21C30.51 26.285 30.18 26.195 29.91 26C29.355 25.565 28.68 25.325 27.975 25.325C26.235 25.325 24.825 26.735 24.825 28.475C24.825 29.18 25.065 29.855 25.5 30.41C25.71 30.665 25.785 31.01 25.71 31.34C25.635 31.67 25.44 31.94 25.14 32.105C22.935 33.275 20.535 33.875 18 33.875ZM12.975 30.62C16.155 31.955 19.875 31.94 23.01 30.62C22.71 29.945 22.56 29.225 22.56 28.475C22.56 25.49 24.99 23.075 27.96 23.075C28.71 23.075 29.43 23.225 30.105 23.525C30.765 21.95 31.11 20.27 31.11 18.5C31.11 16.775 30.765 15.05 30.105 13.475C29.43 13.775 28.71 13.925 27.96 13.925C24.975 13.925 22.56 11.495 22.56 8.525C22.56 7.775 22.71 7.055 23.01 6.38C19.875 5.06 16.14 5.06 12.975 6.38C13.275 7.055 13.425 7.775 13.425 8.525C13.425 11.51 10.995 13.925 8.025 13.925C7.275 13.925 6.555 13.775 5.88 13.475C5.22 15.05 4.875 16.775 4.875 18.5C4.875 20.255 5.205 21.935 5.88 23.525C6.555 23.225 7.275 23.075 8.025 23.075C11.01 23.075 13.425 25.505 13.425 28.475C13.425 29.225 13.275 29.945 12.975 30.62Z"
                        fill="#F9F9F9"
                      />
                    </svg>
                  </span>
                  <div className="get-vendor-school-box-content">
                    <h3>Workshoplar</h3>
                    <p>
                      Barcha turdagi kurslarda siz workshoplarda qatnasha olasiz
                    </p>
                  </div>
                </div>

                <div className="get-vendor-school-box">
                  <span className="get-vendor-school-box-img">
                    <svg
                      width="36"
                      height="37"
                      viewBox="0 0 36 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 34.6251C17.1 34.6251 16.215 34.4151 15.495 34.0101L8.4 29.9151C5.46 27.9351 5.265 27.5751 5.265 24.4701V17.0301C5.265 13.9251 5.46 13.5651 8.34 11.6301L15.51 7.49009C16.935 6.66509 19.08 6.66509 20.505 7.49009L27.6 11.5851C30.54 13.5651 30.735 13.9251 30.735 17.0301V24.4701C30.735 27.5751 30.54 27.9351 27.66 29.8701L20.49 34.0101C19.785 34.4301 18.885 34.6251 18 34.6251ZM18 9.12509C17.49 9.12509 16.98 9.23009 16.62 9.44009L9.525 13.5351C7.515 14.9001 7.515 14.9001 7.515 17.0301V24.4701C7.515 26.6001 7.515 26.6001 9.6 28.0101L16.635 32.0601C17.355 32.4801 18.66 32.4801 19.38 32.0601L26.475 27.9651C28.485 26.6001 28.485 26.6001 28.485 24.4701V17.0301C28.485 14.9001 28.485 14.9001 26.4 13.4901L19.365 9.44009C19.02 9.23009 18.51 9.12509 18 9.12509Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M26.25 13.07C25.635 13.07 25.125 12.56 25.125 11.945V8C25.125 5.63 24.12 4.625 21.75 4.625H14.25C11.88 4.625 10.875 5.63 10.875 8V11.84C10.875 12.455 10.365 12.965 9.75 12.965C9.135 12.965 8.625 12.47 8.625 11.84V8C8.625 4.37 10.62 2.375 14.25 2.375H21.75C25.38 2.375 27.375 4.37 27.375 8V11.945C27.375 12.56 26.865 13.07 26.25 13.07Z"
                        fill="#F9F9F9"
                      />
                      <path
                        d="M20.445 26.9449C20.13 26.9449 19.8 26.8849 19.47 26.7499L18 26.1799L16.53 26.7649C15.735 27.0799 14.925 27.0049 14.325 26.5699C13.725 26.1349 13.41 25.3849 13.455 24.5299L13.545 22.9549L12.54 21.7399C12 21.0649 11.82 20.2849 12.06 19.5649C12.285 18.8599 12.9 18.3199 13.725 18.1099L15.255 17.7199L16.11 16.3849C17.025 14.9449 18.99 14.9449 19.905 16.3849L20.76 17.7199L22.29 18.1099C23.115 18.3199 23.73 18.8599 23.955 19.5649C24.18 20.2699 24 21.0649 23.46 21.7249L22.455 22.9399L22.545 24.5149C22.59 25.3699 22.275 26.1049 21.675 26.5549C21.315 26.8099 20.895 26.9449 20.445 26.9449ZM14.28 20.2999L15.285 21.5149C15.63 21.9199 15.825 22.5649 15.795 23.0899L15.705 24.6649L17.175 24.0799C17.67 23.8849 18.33 23.8849 18.825 24.0799L20.295 24.6649L20.205 23.0899C20.175 22.5649 20.37 21.9349 20.715 21.5149L21.72 20.2999L20.19 19.9099C19.68 19.7749 19.14 19.3849 18.855 18.9499L18.015 17.6299L17.16 18.9499C16.875 19.3999 16.335 19.7899 15.825 19.9249L14.28 20.2999Z"
                        fill="#F9F9F9"
                      />
                    </svg>
                  </span>
                  <div className="get-vendor-school-box-content">
                    <h3>Sertifikat</h3>
                    <p>
                      Tanlangan kurs yakunlangach sizga sertefikat taqdim etamiz
                    </p>
                  </div>
                </div>
              </div>

              <div className="get-vendor-school-question">
                  <h2 className="get-vendor-school-question-title">Kursdan nima olasiz?</h2>

                  <div className="get-vendor-school-question-container">
                    <div className="get-vendor-school-question-box flex align-center mb-24">
                      <div>
                      <span className="flex align-center justify-center"> <DoneIcon/> </span>
                      </div>
                      <div>
                        <h3>Katta daromadga chiqish imkoni</h3>
                        <p>O'zbekistonda sotuv menejerlari o'rtacha 2,400,000 so'mdan - 9,000,000 so'mgacha oylik maosh olishadi va bonuslar bilan bu summa 40,000,000 so'mdan oshishi mumkin. Bizning kursni qunt bilan o'qib tamomlasangiz ushbu imkoniyatga ega bo'lasiz.</p>
                      </div>
                    </div>

                    <div className="get-vendor-school-question-box flex align-center mb-24">
                      <div>
                      <span className="flex align-center justify-center"> <DoneIcon/> </span>
                      </div>
                      <div>
                        <h3>Mutaxasisslardan sotuv bo'yicha bilim va ko'nikmalar</h3>
                        <p>O'zbekistondagi yetuk sotuv bo'yicha katta tajribaga ega mutaxasisslardan bilim olish imkoniyati.</p>
                      </div>
                    </div>

                    <div className="get-vendor-school-question-box flex align-center mb-24">
                      <div>
                      <span className="flex align-center justify-center"> <DoneIcon/> </span>
                      </div>
                      <div>
                        <h3>Biznes bo'yicha umumiy bilimlar.</h3>
                        <p>Sotuvdan tashqari yirik tadbirkorlardan biznes ko'nikmalarini olish imkoniyati.</p>
                      </div>
                    </div>
                  </div>
              </div>

              <div className="uzb-monthly-salary">
                  <h2 className="uzb-monthly-salary-title">O'zbekistondagi oylik maoshlar solishtiruvi</h2>

                  <div className="uzb-monthly-salary-container">
                    <div className="uzb-monthly-salary-box flex align-center justify-between">
                      <h4>Loyiha bosh menejeri</h4>
                      <h4>2,080,000 - 9,065,000 so'm</h4>
                    </div>

                    <div className="uzb-monthly-salary-box uzb-monthly-salary-box-red flex align-center justify-between">
                      <h4>Sotuv menejeri</h4>
                      <h4>2,400,000 - 9,047,000 so'm</h4>
                    </div>

                    <div className="uzb-monthly-salary-box flex align-center justify-between">
                      <h4>Bo'lim mudiri</h4>
                      <h4>2,007,000 - 8,382,000 so'm</h4>
                    </div>

                    <div className="uzb-monthly-salary-box flex align-center justify-between">
                      <h4>Kadrlar bo'yicha direktor</h4>
                      <h4>680,000 - 8,010,000 so'm</h4>
                    </div>

                    <div className="uzb-monthly-salary-box flex align-center justify-between">
                      <h4>Bosh muharrir</h4>
                      <h4>2,637,000 - 6,545,000 so'm</h4>
                    </div>

                    <div className="uzb-monthly-salary-box flex align-center justify-between">
                      <h4>Ob'ekt menejeri</h4>
                      <h4>2,231,000 - 6,114,000 so'm</h4>
                    </div>

                    <div className="uzb-monthly-salary-box flex align-center justify-between">
                      <h4>Loyiha boshqaruvchini yordamchisi</h4>
                      <h4>1,567,000 - 6,030,000 so'm</h4>
                    </div>
                  </div>
              </div>
            </div>

            <div id="vendor-school-spikers" className="vendor-school-spikers">
              <div className="vendor-school-spikers-tittle">
                <h2>Sotuvchilar maktabi kursining mentor va spikerlari:</h2>
              </div>

              <div className="vendor-school-spikers-img-container">
                <Swiper
                  modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={50}
                  slidesPerView={1}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  speed={500}
                  loop={true}
                  navigation
                  observer={true}
                  observeParents={true}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                      slideToClickedSlide: true,
                    },

                    // when window width is >= 640px
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 0,
                      slideToClickedSlide: true,
                    },
                    900: {
                      slidesPerView: 4,
                      spaceBetween: 0,
                      slideToClickedSlide: true,
                    },
                  }}
                >
                  <SwiperSlide>
                    <div className="vendor-school-spiker-box">
                      <div className="vendor-school-spiker-img">
                        <img src={Spiker1} alt="Spiker1" />
                      </div>
                      <div className="vendor-school-spiker-about">
                        <h5>Sherzod Beknazarov</h5>
                        <p>Alvon oilaviy kiyim brendi asoschisi</p>

                        <div className="vendor-nav-net">
                          <div className="vendor-nav-icons">
                            <a
                              target="_blank"
                              href="https://www.instagram.com/sherzod_bekhnazarov/"
                            >
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z"
                                  fill="red"
                                />
                                <path
                                  d="M12 16.75C9.66 16.75 7.75 14.84 7.75 12.5C7.75 10.16 9.66 8.25 12 8.25C14.34 8.25 16.25 10.16 16.25 12.5C16.25 14.84 14.34 16.75 12 16.75ZM12 9.75C10.48 9.75 9.25 10.98 9.25 12.5C9.25 14.02 10.48 15.25 12 15.25C13.52 15.25 14.75 14.02 14.75 12.5C14.75 10.98 13.52 9.75 12 9.75Z"
                                  fill="red"
                                />
                                <path
                                  d="M17 8C16.87 8 16.74 7.97 16.62 7.92C16.5 7.87 16.39 7.8 16.29 7.71C16.2 7.61 16.12 7.5 16.07 7.38C16.02 7.26 16 7.13 16 7C16 6.87 16.02 6.74 16.07 6.62C16.13 6.49 16.2 6.39 16.29 6.29C16.34 6.25 16.39 6.2 16.44 6.17C16.5 6.13 16.56 6.1 16.62 6.08C16.68 6.05 16.74 6.03 16.81 6.02C17.13 5.95 17.47 6.06 17.71 6.29C17.8 6.39 17.87 6.49 17.92 6.62C17.97 6.74 18 6.87 18 7C18 7.13 17.97 7.26 17.92 7.38C17.87 7.5 17.8 7.61 17.71 7.71C17.61 7.8 17.5 7.87 17.38 7.92C17.26 7.97 17.13 8 17 8Z"
                                  fill="red"
                                />
                              </svg>
                            </a>
                          </div>

                          <div className="vendor-nav-icons">
                            <a
                              target="_blank"
                              href="https://m.facebook.com/sherzod.beknazarov.33?wtsid=rdr_07UGJhyGPe79IC8bH"
                            >
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.75 23.25H10.25V16H9.29999C8.71999 16 8.25 15.53 8.25 14.95V13.05C8.25 12.47 8.71999 12 9.29999 12H10.25V9.5C10.25 7.43 11.93 5.75 14 5.75H16.7C17.28 5.75 17.75 6.21999 17.75 6.79999V9.20001C17.75 9.78001 17.28 10.25 16.7 10.25H14.75V12H16.63C16.95 12 17.24 12.14 17.44 12.38C17.64 12.62 17.72 12.94 17.66 13.25L17.28 15.15C17.18 15.64 16.75 15.99 16.25 15.99H14.75V23.25ZM11.75 21.75H13.25V14.5H15.89L16.09 13.5H13.26V9.79999C13.26 9.21999 13.73 8.75 14.31 8.75H16.26V7.25H14C12.76 7.25 11.75 8.26 11.75 9.5V13.5H9.75V14.5H11.75V21.75Z"
                                  fill="red"
                                />
                                <path
                                  d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z"
                                  fill="red"
                                />
                              </svg>
                            </a>
                          </div>

                          <div className="vendor-nav-icons">
                            <a
                              target="_blank"
                              href="https://t.me/sherzod_bekhnazarov"
                            >
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.22 22.13C13.04 22.13 11.37 21.3 10.05 17.33L9.33 15.17L7.17 14.45C3.21 13.13 2.38 11.46 2.38 10.28C2.38 9.11001 3.21 7.43001 7.17 6.10001L15.66 3.27001C17.78 2.56001 19.55 2.77001 20.64 3.85001C21.73 4.93001 21.94 6.71001 21.23 8.83001L18.4 17.32C17.07 21.3 15.4 22.13 14.22 22.13ZM7.64 7.53001C4.86 8.46001 3.87 9.56001 3.87 10.28C3.87 11 4.86 12.1 7.64 13.02L10.16 13.86C10.38 13.93 10.56 14.11 10.63 14.33L11.47 16.85C12.39 19.63 13.5 20.62 14.22 20.62C14.94 20.62 16.04 19.63 16.97 16.85L19.8 8.36001C20.31 6.82001 20.22 5.56001 19.57 4.91001C18.92 4.26001 17.66 4.18001 16.13 4.69001L7.64 7.53001Z"
                                  fill="red"
                                />
                                <path
                                  d="M10.11 14.9C9.92 14.9 9.73 14.83 9.58 14.68C9.29 14.39 9.29 13.91 9.58 13.62L13.16 10.03C13.45 9.74 13.93 9.74 14.22 10.03C14.51 10.32 14.51 10.8 14.22 11.09L10.64 14.68C10.5 14.83 10.3 14.9 10.11 14.9Z"
                                  fill="red"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="vendor-school-spiker-box">
                      <div className="vendor-school-spiker-img">
                        <img src={Spiker2} alt="Spiker1" />
                      </div>
                      <div className="vendor-school-spiker-about">
                        <h5>Islombek Ibragimov</h5>
                        <p>
                          Sotuv operatorlarini tayyorlovchi Shark Sales School
                          asoschisi
                        </p>

                        <div className="vendor-nav-net">
                          <div className="vendor-nav-icons">
                            <a
                              target="_blank"
                              href="https://www.instagram.com/islombek.ibragimovs/"
                            >
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z"
                                  fill="red"
                                />
                                <path
                                  d="M12 16.75C9.66 16.75 7.75 14.84 7.75 12.5C7.75 10.16 9.66 8.25 12 8.25C14.34 8.25 16.25 10.16 16.25 12.5C16.25 14.84 14.34 16.75 12 16.75ZM12 9.75C10.48 9.75 9.25 10.98 9.25 12.5C9.25 14.02 10.48 15.25 12 15.25C13.52 15.25 14.75 14.02 14.75 12.5C14.75 10.98 13.52 9.75 12 9.75Z"
                                  fill="red"
                                />
                                <path
                                  d="M17 8C16.87 8 16.74 7.97 16.62 7.92C16.5 7.87 16.39 7.8 16.29 7.71C16.2 7.61 16.12 7.5 16.07 7.38C16.02 7.26 16 7.13 16 7C16 6.87 16.02 6.74 16.07 6.62C16.13 6.49 16.2 6.39 16.29 6.29C16.34 6.25 16.39 6.2 16.44 6.17C16.5 6.13 16.56 6.1 16.62 6.08C16.68 6.05 16.74 6.03 16.81 6.02C17.13 5.95 17.47 6.06 17.71 6.29C17.8 6.39 17.87 6.49 17.92 6.62C17.97 6.74 18 6.87 18 7C18 7.13 17.97 7.26 17.92 7.38C17.87 7.5 17.8 7.61 17.71 7.71C17.61 7.8 17.5 7.87 17.38 7.92C17.26 7.97 17.13 8 17 8Z"
                                  fill="red"
                                />
                              </svg>
                            </a>
                          </div>

                          <div className="vendor-nav-icons">
                            <a
                              target="_blank"
                              href="https://www.instagram.com/islombek.ibragimovs/"
                            >
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.75 23.25H10.25V16H9.29999C8.71999 16 8.25 15.53 8.25 14.95V13.05C8.25 12.47 8.71999 12 9.29999 12H10.25V9.5C10.25 7.43 11.93 5.75 14 5.75H16.7C17.28 5.75 17.75 6.21999 17.75 6.79999V9.20001C17.75 9.78001 17.28 10.25 16.7 10.25H14.75V12H16.63C16.95 12 17.24 12.14 17.44 12.38C17.64 12.62 17.72 12.94 17.66 13.25L17.28 15.15C17.18 15.64 16.75 15.99 16.25 15.99H14.75V23.25ZM11.75 21.75H13.25V14.5H15.89L16.09 13.5H13.26V9.79999C13.26 9.21999 13.73 8.75 14.31 8.75H16.26V7.25H14C12.76 7.25 11.75 8.26 11.75 9.5V13.5H9.75V14.5H11.75V21.75Z"
                                  fill="red"
                                />
                                <path
                                  d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z"
                                  fill="red"
                                />
                              </svg>
                            </a>
                          </div>

                          <div className="vendor-nav-icons">
                            <a target="_blank" href="https://t.me/ibragimovsi">
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.22 22.13C13.04 22.13 11.37 21.3 10.05 17.33L9.33 15.17L7.17 14.45C3.21 13.13 2.38 11.46 2.38 10.28C2.38 9.11001 3.21 7.43001 7.17 6.10001L15.66 3.27001C17.78 2.56001 19.55 2.77001 20.64 3.85001C21.73 4.93001 21.94 6.71001 21.23 8.83001L18.4 17.32C17.07 21.3 15.4 22.13 14.22 22.13ZM7.64 7.53001C4.86 8.46001 3.87 9.56001 3.87 10.28C3.87 11 4.86 12.1 7.64 13.02L10.16 13.86C10.38 13.93 10.56 14.11 10.63 14.33L11.47 16.85C12.39 19.63 13.5 20.62 14.22 20.62C14.94 20.62 16.04 19.63 16.97 16.85L19.8 8.36001C20.31 6.82001 20.22 5.56001 19.57 4.91001C18.92 4.26001 17.66 4.18001 16.13 4.69001L7.64 7.53001Z"
                                  fill="red"
                                />
                                <path
                                  d="M10.11 14.9C9.92 14.9 9.73 14.83 9.58 14.68C9.29 14.39 9.29 13.91 9.58 13.62L13.16 10.03C13.45 9.74 13.93 9.74 14.22 10.03C14.51 10.32 14.51 10.8 14.22 11.09L10.64 14.68C10.5 14.83 10.3 14.9 10.11 14.9Z"
                                  fill="red"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="vendor-school-spiker-box">
                      <div className="vendor-school-spiker-img">
                        <img src={Spiker3} alt="Spiker1" />
                      </div>
                      <div className="vendor-school-spiker-about">
                        <h5>Husan Mamasaidov</h5>
                        <p>Deli, EduOn, MFaktor kompaniyalar rahbari</p>

                        <div className="vendor-nav-net">
                          <div className="vendor-nav-icons">
                            <a
                              target="_blank"
                              href="https://www.instagram.com/husan_mamasaidov/"
                            >
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z"
                                  fill="red"
                                />
                                <path
                                  d="M12 16.75C9.66 16.75 7.75 14.84 7.75 12.5C7.75 10.16 9.66 8.25 12 8.25C14.34 8.25 16.25 10.16 16.25 12.5C16.25 14.84 14.34 16.75 12 16.75ZM12 9.75C10.48 9.75 9.25 10.98 9.25 12.5C9.25 14.02 10.48 15.25 12 15.25C13.52 15.25 14.75 14.02 14.75 12.5C14.75 10.98 13.52 9.75 12 9.75Z"
                                  fill="red"
                                />
                                <path
                                  d="M17 8C16.87 8 16.74 7.97 16.62 7.92C16.5 7.87 16.39 7.8 16.29 7.71C16.2 7.61 16.12 7.5 16.07 7.38C16.02 7.26 16 7.13 16 7C16 6.87 16.02 6.74 16.07 6.62C16.13 6.49 16.2 6.39 16.29 6.29C16.34 6.25 16.39 6.2 16.44 6.17C16.5 6.13 16.56 6.1 16.62 6.08C16.68 6.05 16.74 6.03 16.81 6.02C17.13 5.95 17.47 6.06 17.71 6.29C17.8 6.39 17.87 6.49 17.92 6.62C17.97 6.74 18 6.87 18 7C18 7.13 17.97 7.26 17.92 7.38C17.87 7.5 17.8 7.61 17.71 7.71C17.61 7.8 17.5 7.87 17.38 7.92C17.26 7.97 17.13 8 17 8Z"
                                  fill="red"
                                />
                              </svg>
                            </a>
                          </div>

                          <div className="vendor-nav-icons">
                            <a
                              target="_blank"
                              href="https://www.instagram.com/husan_mamasaidov/"
                            >
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.75 23.25H10.25V16H9.29999C8.71999 16 8.25 15.53 8.25 14.95V13.05C8.25 12.47 8.71999 12 9.29999 12H10.25V9.5C10.25 7.43 11.93 5.75 14 5.75H16.7C17.28 5.75 17.75 6.21999 17.75 6.79999V9.20001C17.75 9.78001 17.28 10.25 16.7 10.25H14.75V12H16.63C16.95 12 17.24 12.14 17.44 12.38C17.64 12.62 17.72 12.94 17.66 13.25L17.28 15.15C17.18 15.64 16.75 15.99 16.25 15.99H14.75V23.25ZM11.75 21.75H13.25V14.5H15.89L16.09 13.5H13.26V9.79999C13.26 9.21999 13.73 8.75 14.31 8.75H16.26V7.25H14C12.76 7.25 11.75 8.26 11.75 9.5V13.5H9.75V14.5H11.75V21.75Z"
                                  fill="red"
                                />
                                <path
                                  d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z"
                                  fill="red"
                                />
                              </svg>
                            </a>
                          </div>

                          <div className="vendor-nav-icons">
                            <a target="_blank" href="https://t.me/MFaktorUz">
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.22 22.13C13.04 22.13 11.37 21.3 10.05 17.33L9.33 15.17L7.17 14.45C3.21 13.13 2.38 11.46 2.38 10.28C2.38 9.11001 3.21 7.43001 7.17 6.10001L15.66 3.27001C17.78 2.56001 19.55 2.77001 20.64 3.85001C21.73 4.93001 21.94 6.71001 21.23 8.83001L18.4 17.32C17.07 21.3 15.4 22.13 14.22 22.13ZM7.64 7.53001C4.86 8.46001 3.87 9.56001 3.87 10.28C3.87 11 4.86 12.1 7.64 13.02L10.16 13.86C10.38 13.93 10.56 14.11 10.63 14.33L11.47 16.85C12.39 19.63 13.5 20.62 14.22 20.62C14.94 20.62 16.04 19.63 16.97 16.85L19.8 8.36001C20.31 6.82001 20.22 5.56001 19.57 4.91001C18.92 4.26001 17.66 4.18001 16.13 4.69001L7.64 7.53001Z"
                                  fill="red"
                                />
                                <path
                                  d="M10.11 14.9C9.92 14.9 9.73 14.83 9.58 14.68C9.29 14.39 9.29 13.91 9.58 13.62L13.16 10.03C13.45 9.74 13.93 9.74 14.22 10.03C14.51 10.32 14.51 10.8 14.22 11.09L10.64 14.68C10.5 14.83 10.3 14.9 10.11 14.9Z"
                                  fill="red"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="vendor-school-spiker-box">
                      <div className="vendor-school-spiker-img">
                        <img src={Spiker4} alt="Spiker1" />
                      </div>
                      <div className="vendor-school-spiker-about">
                        <h5>Hasan Mamasaidov</h5>
                        <p>Dekos, EduOn, MFaktor kompaniyalar rahbari</p>

                        <div className="vendor-nav-net">
                          <div className="vendor-nav-icons">
                            <a
                              target="_blank"
                              href="https://www.instagram.com/hasan_mamasaidov/"
                            >
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z"
                                  fill="red"
                                />
                                <path
                                  d="M12 16.75C9.66 16.75 7.75 14.84 7.75 12.5C7.75 10.16 9.66 8.25 12 8.25C14.34 8.25 16.25 10.16 16.25 12.5C16.25 14.84 14.34 16.75 12 16.75ZM12 9.75C10.48 9.75 9.25 10.98 9.25 12.5C9.25 14.02 10.48 15.25 12 15.25C13.52 15.25 14.75 14.02 14.75 12.5C14.75 10.98 13.52 9.75 12 9.75Z"
                                  fill="red"
                                />
                                <path
                                  d="M17 8C16.87 8 16.74 7.97 16.62 7.92C16.5 7.87 16.39 7.8 16.29 7.71C16.2 7.61 16.12 7.5 16.07 7.38C16.02 7.26 16 7.13 16 7C16 6.87 16.02 6.74 16.07 6.62C16.13 6.49 16.2 6.39 16.29 6.29C16.34 6.25 16.39 6.2 16.44 6.17C16.5 6.13 16.56 6.1 16.62 6.08C16.68 6.05 16.74 6.03 16.81 6.02C17.13 5.95 17.47 6.06 17.71 6.29C17.8 6.39 17.87 6.49 17.92 6.62C17.97 6.74 18 6.87 18 7C18 7.13 17.97 7.26 17.92 7.38C17.87 7.5 17.8 7.61 17.71 7.71C17.61 7.8 17.5 7.87 17.38 7.92C17.26 7.97 17.13 8 17 8Z"
                                  fill="red"
                                />
                              </svg>
                            </a>
                          </div>

                          <div className="vendor-nav-icons">
                            <a
                              target="_blank"
                              href="https://www.instagram.com/hasan_mamasaidov/"
                            >
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.75 23.25H10.25V16H9.29999C8.71999 16 8.25 15.53 8.25 14.95V13.05C8.25 12.47 8.71999 12 9.29999 12H10.25V9.5C10.25 7.43 11.93 5.75 14 5.75H16.7C17.28 5.75 17.75 6.21999 17.75 6.79999V9.20001C17.75 9.78001 17.28 10.25 16.7 10.25H14.75V12H16.63C16.95 12 17.24 12.14 17.44 12.38C17.64 12.62 17.72 12.94 17.66 13.25L17.28 15.15C17.18 15.64 16.75 15.99 16.25 15.99H14.75V23.25ZM11.75 21.75H13.25V14.5H15.89L16.09 13.5H13.26V9.79999C13.26 9.21999 13.73 8.75 14.31 8.75H16.26V7.25H14C12.76 7.25 11.75 8.26 11.75 9.5V13.5H9.75V14.5H11.75V21.75Z"
                                  fill="red"
                                />
                                <path
                                  d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z"
                                  fill="red"
                                />
                              </svg>
                            </a>
                          </div>

                          <div className="vendor-nav-icons">
                            <a target="_blank" href="https://t.me/MFaktorUz">
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.22 22.13C13.04 22.13 11.37 21.3 10.05 17.33L9.33 15.17L7.17 14.45C3.21 13.13 2.38 11.46 2.38 10.28C2.38 9.11001 3.21 7.43001 7.17 6.10001L15.66 3.27001C17.78 2.56001 19.55 2.77001 20.64 3.85001C21.73 4.93001 21.94 6.71001 21.23 8.83001L18.4 17.32C17.07 21.3 15.4 22.13 14.22 22.13ZM7.64 7.53001C4.86 8.46001 3.87 9.56001 3.87 10.28C3.87 11 4.86 12.1 7.64 13.02L10.16 13.86C10.38 13.93 10.56 14.11 10.63 14.33L11.47 16.85C12.39 19.63 13.5 20.62 14.22 20.62C14.94 20.62 16.04 19.63 16.97 16.85L19.8 8.36001C20.31 6.82001 20.22 5.56001 19.57 4.91001C18.92 4.26001 17.66 4.18001 16.13 4.69001L7.64 7.53001Z"
                                  fill="red"
                                />
                                <path
                                  d="M10.11 14.9C9.92 14.9 9.73 14.83 9.58 14.68C9.29 14.39 9.29 13.91 9.58 13.62L13.16 10.03C13.45 9.74 13.93 9.74 14.22 10.03C14.51 10.32 14.51 10.8 14.22 11.09L10.64 14.68C10.5 14.83 10.3 14.9 10.11 14.9Z"
                                  fill="red"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="vendor-school-spiker-box">
                      <div className="vendor-school-spiker-img">
                        <img src={Spiker5} alt="Spiker1" />
                      </div>
                      <div className="vendor-school-spiker-about">
                        <h5>Alisher Rustamov</h5>
                        <p>
                          Servis, savdo-sotiq va menejment bo'yicha 18 yil
                          tajribaga ega ekspert
                        </p>

                        <div className="vendor-nav-net">
                          <div className="vendor-nav-icons">
                            <a
                              target="_blank"
                              href="https://www.instagram.com/alisher.rustam.expert/"
                            >
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z"
                                  fill="red"
                                />
                                <path
                                  d="M12 16.75C9.66 16.75 7.75 14.84 7.75 12.5C7.75 10.16 9.66 8.25 12 8.25C14.34 8.25 16.25 10.16 16.25 12.5C16.25 14.84 14.34 16.75 12 16.75ZM12 9.75C10.48 9.75 9.25 10.98 9.25 12.5C9.25 14.02 10.48 15.25 12 15.25C13.52 15.25 14.75 14.02 14.75 12.5C14.75 10.98 13.52 9.75 12 9.75Z"
                                  fill="red"
                                />
                                <path
                                  d="M17 8C16.87 8 16.74 7.97 16.62 7.92C16.5 7.87 16.39 7.8 16.29 7.71C16.2 7.61 16.12 7.5 16.07 7.38C16.02 7.26 16 7.13 16 7C16 6.87 16.02 6.74 16.07 6.62C16.13 6.49 16.2 6.39 16.29 6.29C16.34 6.25 16.39 6.2 16.44 6.17C16.5 6.13 16.56 6.1 16.62 6.08C16.68 6.05 16.74 6.03 16.81 6.02C17.13 5.95 17.47 6.06 17.71 6.29C17.8 6.39 17.87 6.49 17.92 6.62C17.97 6.74 18 6.87 18 7C18 7.13 17.97 7.26 17.92 7.38C17.87 7.5 17.8 7.61 17.71 7.71C17.61 7.8 17.5 7.87 17.38 7.92C17.26 7.97 17.13 8 17 8Z"
                                  fill="red"
                                />
                              </svg>
                            </a>
                          </div>

                          <div className="vendor-nav-icons">
                            <a
                              target="_blank"
                              href="https://www.facebook.com/people/%D0%90%D0%BB%D0%B8%D1%88%D0%B5%D1%80-%D0%A0%D1%83%D1%81%D1%82%D0%B0%D0%BC/pfbid0C2Tms8DWBDKSjWcGafvpyd8NQmR2joVV8kpd4Z5hxkG5qMcXTaaq8Nq3bQVZLHv5l/"
                            >
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.75 23.25H10.25V16H9.29999C8.71999 16 8.25 15.53 8.25 14.95V13.05C8.25 12.47 8.71999 12 9.29999 12H10.25V9.5C10.25 7.43 11.93 5.75 14 5.75H16.7C17.28 5.75 17.75 6.21999 17.75 6.79999V9.20001C17.75 9.78001 17.28 10.25 16.7 10.25H14.75V12H16.63C16.95 12 17.24 12.14 17.44 12.38C17.64 12.62 17.72 12.94 17.66 13.25L17.28 15.15C17.18 15.64 16.75 15.99 16.25 15.99H14.75V23.25ZM11.75 21.75H13.25V14.5H15.89L16.09 13.5H13.26V9.79999C13.26 9.21999 13.73 8.75 14.31 8.75H16.26V7.25H14C12.76 7.25 11.75 8.26 11.75 9.5V13.5H9.75V14.5H11.75V21.75Z"
                                  fill="red"
                                />
                                <path
                                  d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z"
                                  fill="red"
                                />
                              </svg>
                            </a>
                          </div>

                          <div className="vendor-nav-icons">
                            <a
                              target="_blank"
                              href="https://t.me/alisher_rustamov"
                            >
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.22 22.13C13.04 22.13 11.37 21.3 10.05 17.33L9.33 15.17L7.17 14.45C3.21 13.13 2.38 11.46 2.38 10.28C2.38 9.11001 3.21 7.43001 7.17 6.10001L15.66 3.27001C17.78 2.56001 19.55 2.77001 20.64 3.85001C21.73 4.93001 21.94 6.71001 21.23 8.83001L18.4 17.32C17.07 21.3 15.4 22.13 14.22 22.13ZM7.64 7.53001C4.86 8.46001 3.87 9.56001 3.87 10.28C3.87 11 4.86 12.1 7.64 13.02L10.16 13.86C10.38 13.93 10.56 14.11 10.63 14.33L11.47 16.85C12.39 19.63 13.5 20.62 14.22 20.62C14.94 20.62 16.04 19.63 16.97 16.85L19.8 8.36001C20.31 6.82001 20.22 5.56001 19.57 4.91001C18.92 4.26001 17.66 4.18001 16.13 4.69001L7.64 7.53001Z"
                                  fill="red"
                                />
                                <path
                                  d="M10.11 14.9C9.92 14.9 9.73 14.83 9.58 14.68C9.29 14.39 9.29 13.91 9.58 13.62L13.16 10.03C13.45 9.74 13.93 9.74 14.22 10.03C14.51 10.32 14.51 10.8 14.22 11.09L10.64 14.68C10.5 14.83 10.3 14.9 10.11 14.9Z"
                                  fill="red"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="vendor-school-spiker-box">
                      <div className="vendor-school-spiker-img">
                        <img src={Spiker6} alt="Spiker1" />
                      </div>
                      <div className="vendor-school-spiker-about">
                        <h5>Abdulaziz Sattorov</h5>
                        <p>Unired, Universalbank, Fintechhub asoschisi</p>

                        {/* <div className="vendor-nav-net">
                      <div className="vendor-nav-icons">
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z"
                            fill="red"
                          />
                          <path
                            d="M12 16.75C9.66 16.75 7.75 14.84 7.75 12.5C7.75 10.16 9.66 8.25 12 8.25C14.34 8.25 16.25 10.16 16.25 12.5C16.25 14.84 14.34 16.75 12 16.75ZM12 9.75C10.48 9.75 9.25 10.98 9.25 12.5C9.25 14.02 10.48 15.25 12 15.25C13.52 15.25 14.75 14.02 14.75 12.5C14.75 10.98 13.52 9.75 12 9.75Z"
                            fill="red"
                          />
                          <path
                            d="M17 8C16.87 8 16.74 7.97 16.62 7.92C16.5 7.87 16.39 7.8 16.29 7.71C16.2 7.61 16.12 7.5 16.07 7.38C16.02 7.26 16 7.13 16 7C16 6.87 16.02 6.74 16.07 6.62C16.13 6.49 16.2 6.39 16.29 6.29C16.34 6.25 16.39 6.2 16.44 6.17C16.5 6.13 16.56 6.1 16.62 6.08C16.68 6.05 16.74 6.03 16.81 6.02C17.13 5.95 17.47 6.06 17.71 6.29C17.8 6.39 17.87 6.49 17.92 6.62C17.97 6.74 18 6.87 18 7C18 7.13 17.97 7.26 17.92 7.38C17.87 7.5 17.8 7.61 17.71 7.71C17.61 7.8 17.5 7.87 17.38 7.92C17.26 7.97 17.13 8 17 8Z"
                            fill="red"
                          />
                        </svg>
                      </div>

                      <div className="vendor-nav-icons">
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.75 23.25H10.25V16H9.29999C8.71999 16 8.25 15.53 8.25 14.95V13.05C8.25 12.47 8.71999 12 9.29999 12H10.25V9.5C10.25 7.43 11.93 5.75 14 5.75H16.7C17.28 5.75 17.75 6.21999 17.75 6.79999V9.20001C17.75 9.78001 17.28 10.25 16.7 10.25H14.75V12H16.63C16.95 12 17.24 12.14 17.44 12.38C17.64 12.62 17.72 12.94 17.66 13.25L17.28 15.15C17.18 15.64 16.75 15.99 16.25 15.99H14.75V23.25ZM11.75 21.75H13.25V14.5H15.89L16.09 13.5H13.26V9.79999C13.26 9.21999 13.73 8.75 14.31 8.75H16.26V7.25H14C12.76 7.25 11.75 8.26 11.75 9.5V13.5H9.75V14.5H11.75V21.75Z"
                            fill="red"
                          />
                          <path
                            d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z"
                            fill="red"
                          />
                        </svg>
                      </div>

                      <div className="vendor-nav-icons">
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.22 22.13C13.04 22.13 11.37 21.3 10.05 17.33L9.33 15.17L7.17 14.45C3.21 13.13 2.38 11.46 2.38 10.28C2.38 9.11001 3.21 7.43001 7.17 6.10001L15.66 3.27001C17.78 2.56001 19.55 2.77001 20.64 3.85001C21.73 4.93001 21.94 6.71001 21.23 8.83001L18.4 17.32C17.07 21.3 15.4 22.13 14.22 22.13ZM7.64 7.53001C4.86 8.46001 3.87 9.56001 3.87 10.28C3.87 11 4.86 12.1 7.64 13.02L10.16 13.86C10.38 13.93 10.56 14.11 10.63 14.33L11.47 16.85C12.39 19.63 13.5 20.62 14.22 20.62C14.94 20.62 16.04 19.63 16.97 16.85L19.8 8.36001C20.31 6.82001 20.22 5.56001 19.57 4.91001C18.92 4.26001 17.66 4.18001 16.13 4.69001L7.64 7.53001Z"
                            fill="red"
                          />
                          <path
                            d="M10.11 14.9C9.92 14.9 9.73 14.83 9.58 14.68C9.29 14.39 9.29 13.91 9.58 13.62L13.16 10.03C13.45 9.74 13.93 9.74 14.22 10.03C14.51 10.32 14.51 10.8 14.22 11.09L10.64 14.68C10.5 14.83 10.3 14.9 10.11 14.9Z"
                            fill="red"
                          />
                        </svg>
                      </div>
                    </div> */}
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>

            <div id="vendor-school-price" className="vendor-school-price">
              <div className="vendor-school-tittle">
                <h2>
                  Sotuvchilar maktabi kursida o’qish narxlari bilan
                  tanishtiramiz:
                </h2>
                <p>
                  *Narxlar o’sib borishi bilan kursning foydali elementlari ham
                  paralell o’sib boradi
                </p>
              </div>

              <div className="vendor-school-price-table">
                <table>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>
                      <button className="vendor-btn">Eng yaxshi taklif</button>
                    </th>
                    <th></th>
                  </tr>
                  <tr>
                    <th></th>
                    <th>Modul SM-1</th>
                    <th>Modul SM-2</th>
                    <th>Modul SM-3</th>
                    <th>Modul SM-4</th>
                  </tr>
                  <tr>
                    <th></th>
                    <th>
                      <button
                      onClick={() => {
                        localStorage.setItem("vendorReg", true);
                        RegCheckVS();
                      }}
                        className="vendor-btn"
                      >
                        Ariza qoldirish
                      </button>
                    </th>
                    <th>
                      <button
                      onClick={() => {
                        localStorage.setItem("vendorReg", true);
                        RegCheckVS();
                      }}
                        className="vendor-btn"
                      >
                        Ariza qoldirish
                      </button>
                    </th>
                    <th>
                      <button
                       onClick={() => {
                        localStorage.setItem("vendorReg", true);
                        RegCheckVS();
                      }}
                        className="vendor-btn"
                      >
                        Ariza qoldirish
                      </button>
                    </th>
                    <th>
                      <button
                       onClick={() => {
                        localStorage.setItem("vendorReg", true);
                        RegCheckVS();
                      }}
                        className="vendor-btn"
                      >
                        Ariza qoldirish
                      </button>
                    </th>
                  </tr>

                  <tr>
                    <td>Davomiyligi:</td>
                    <td>1 oy</td>
                    <td>2 oy</td>
                    <td>3 oy</td>
                    <td>4 oy</td>
                  </tr>
                  <tr>
                    <td>Online darslar:</td>
                    <td>8 ta</td>
                    <td>16 ta</td>
                    <td>24 ta</td>
                    <td>32 ta</td>
                  </tr>
                  <tr>
                    <td>Mehmon spikerlar: (Online|Offline)</td>
                    <td>3 ta</td>
                    <td>6 ta</td>
                    <td>9 ta</td>
                    <td>12 ta</td>
                  </tr>
                  <tr>
                    <td>Offline Workshoplar:</td>
                    <td>8 ta</td>
                    <td>16 ta</td>
                    <td>24 ta</td>
                    <td>32 ta</td>
                  </tr>
                  <tr>
                    <td>Imtihonlar (Online|Offline):</td>
                    <td>1 ta</td>
                    <td>2 ta</td>
                    <td>3 ta</td>
                    <td>4 ta</td>
                  </tr>
                  <tr>
                    <td>Jami online darslar:</td>
                    <td>20 ta</td>
                    <td>40 ta</td>
                    <td>60 ta</td>
                    <td>80 ta</td>
                  </tr>
                  <tr>
                    <td>Amaliyot o’tash imkoni:</td>
                    <td>一</td>
                    <td>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </td>

                    <td>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </td>

                    <td>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td>Amaliyotda stipendiya olish imkoniyati:</td>
                    <td>一</td>
                    <td>~ 2 mln sum</td>
                    <td>~ 2 mln sum</td>
                    <td>~ 2 mln sum</td>
                  </tr>

                  <tr>
                    <td>Ish topishga yordam</td>
                    <td>一</td>
                    <td>一</td>
                    <td>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </td>
                    <td>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </td>
                  </tr>

                  <tr>
                    <td>Tavsiya etiladigan oylik maosh:</td>
                    <td>一</td>
                    <td>一</td>
                    <td>~ 3 mln + sum</td>
                    <td>~ 4 mln + sum</td>
                  </tr>

                  <tr>
                    <td>Bahosi:</td>
                    <td>4 900 000</td>
                    <td>4 900 000</td>
                    <td>4 900 000</td>
                    <td>4 900 000</td>
                  </tr>

                  <tr>
                    <td>Umumiy narxi:</td>
                    <td>
                      4.900.000 <br /> <span>(1 oy uchun)</span>
                    </td>
                    <td>
                      9.800.000 <br /> <span>(2 oy uchun)</span>
                    </td>
                    <td>
                      14.700.000 <br /> <span>(3 oy uchun)</span>
                    </td>
                    <td>
                      19.600.000 <br /> <span>(4 oy uchun)</span>
                    </td>
                  </tr>

                  <tr>
                    <td>100% to'lovga beriladigan chegirmalar</td>
                    <td>5%</td>
                    <td>10%</td>
                    <td>15%</td>
                    <td>20%</td>
                  </tr>

                  <tr>
                    <td>Chegirmada tejaladigan summa:</td>
                    <td>245 000</td>
                    <td>980 000</td>
                    <td>2 205 000</td>
                    <td>3 920 000</td>
                  </tr>

                  <tr>
                    <td>Chegirmadan keyingi summa:</td>
                    <td>4 655 000</td>
                    <td>8 820 000</td>
                    <td>12 495 000</td>
                    <td>15 680 000</td>
                  </tr>

                  <tr>
                    <td>1 oyga to`g`ri keladigan summa:</td>
                    <td>4 655 000</td>
                    <td>4 410 000</td>
                    <td>4 165 000</td>
                    <td>3 920 000</td>
                  </tr>

                  <tr>
                    <td>Bo’lib to’lash imkoniyati (Anor Bank orqali)</td>
                    <td>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <p>12 oy</p>
                      <p>408 333 UZS</p>
                    </td>
                    <td>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <p>12 oy</p>
                      <p>816 667 UZS</p>
                    </td>
                    <td>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <p>12 oy</p>
                      <p>1 225 000 UZS</p>
                    </td>
                    <td>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <p>12 oy</p>
                      <p>1 633 333 UZS</p>
                    </td>
                  </tr>

                  <tr>
                    <td>Grant yutish imkoni</td>
                    <td>一</td>
                    <td>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </td>
                    <td>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </td>
                    <td>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                          stroke="red"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </td>
                  </tr>

                  <tr>
                    <th></th>
                    <th>
                      <button
                        onClick={() => {
                          localStorage.setItem("vendorReg", true);
                          RegCheckVS();
                        }}
                        className="vendor-btn"
                      >
                        Ariza qoldirish
                      </button>
                    </th>
                    <th>
                      <button
                      onClick={() => {
                        localStorage.setItem("vendorReg", true);
                        RegCheckVS();
                      }}
                        className="vendor-btn"
                      >
                        Ariza qoldirish
                      </button>
                    </th>
                    <th>
                      <button
                       onClick={() => {
                        localStorage.setItem("vendorReg", true);
                        RegCheckVS();
                      }}
                        className="vendor-btn"
                      >
                        Ariza qoldirish
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => {
                          localStorage.setItem("vendorReg", true);
                          RegCheckVS();
                        }}
                        className="vendor-btn"
                      >
                        Ariza qoldirish
                      </button>
                    </th>
                  </tr>
                </table>
              </div>
            </div>

            <div className="many-questions">
              <div className="many-questions-tittle">
                <h2>Ko’p beriladigan savollar</h2>
                <p>
                  Bu yurda eng ko’p beriladigan savollarga javob olishingiz
                  mumkin, agar sizda boshqa savollar mavjud bo’lsa pastroqda biz
                  bilan bog’lanishingiz mumkin
                </p>
              </div>

              <div className="many-questions-accardion-container">
                <div className="many-questions-accardion-img">
                  <img src={MantQuestionImg} alt="" />
                </div>
                <div className="many-questions-container">
                  <div className="many-questions-right-content">
                    <Accordion
                      expanded={expanded === "panel1"}
                      onChange={handleChange("panel1")}
                    >
                      <AccordionSummary
                        expandIcon={
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                              stroke="#1C1C1C"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <p>
                          {" "}
                          Agar kurs yoqmasa pulimni qaytarib olish imkoni bormi?
                        </p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p>
                          - Xa albatta, 1 xafta ichida pulingizni qaytarib
                          olishingiz mumkin.
                        </p>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion
                      expanded={expanded === "panel2"}
                      onChange={handleChange("panel2")}
                    >
                      <AccordionSummary
                        expandIcon={
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                              stroke="#1C1C1C"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <p>
                          {" "}
                          Faqatgina bitta modulni sotib olish imkoni bormi ?
                        </p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p>
                          - Xa albatta , o'zingiz xoxlagan biron - bir modulni
                          xarid qilishingiz mumkin.
                        </p>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion
                      expanded={expanded === "panel3"}
                      onChange={handleChange("panel3")}
                    >
                      <AccordionSummary
                        expandIcon={
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                              stroke="#1C1C1C"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <p>
                          Bu kurs to'liq onlaynmi yoki darslarga offlayn shaklda
                          ham borish kerakmi ?
                        </p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p>
                          - Kurs gibrid shaklda, ya'ni onlayn va offlayn shaklda
                          bo'ladi.
                        </p>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion
                      expanded={expanded === "panel4"}
                      onChange={handleChange("panel4")}
                    >
                      <AccordionSummary
                        expandIcon={
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                              stroke="#1C1C1C"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <p>Kurs qaysi tilda olib boriladi ?</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p>- Kurs xozircha faqat o'zbek tilida bo'lib o'tadi</p>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion
                      expanded={expanded === "panel5"}
                      onChange={handleChange("panel5")}
                    >
                      <AccordionSummary
                        expandIcon={
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                              stroke="#1C1C1C"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <p>Kursni bitirganimdan so'ng nima qila olaman ?</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p>
                          - Bitirganingizdan so'ng aynan shu soxada ishlashingiz
                          va o'qish davomida amaliyotda qilingan ishlarni real
                          ishlarda sinab ko'ra olasiz.
                        </p>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion
                      expanded={expanded === "panel6"}
                      onChange={handleChange("panel6")}
                    >
                      <AccordionSummary
                        expandIcon={
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                              stroke="#1C1C1C"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <p>Kurs pulini bo'lib to'lash imkoni bormi ?</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p>- Albatta mavjud</p>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion
                      expanded={expanded === "panel7"}
                      onChange={handleChange("panel7")}
                    >
                      <AccordionSummary
                        expandIcon={
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
                              stroke="#1C1C1C"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <p>
                          Kurs uchun to'lovni onlayn to'lasa ham bo'ladimi ?
                        </p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p>
                          - Xa bo'ladi, siz EduOn.uz platformasi orqali to'lov
                          qila olasiz.
                        </p>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>

            <div className="SignUpVendor-container">
              <span>
                <img src={SignUpVendorImg} alt="" />
                <button
                 onClick={() => {
                  localStorage.setItem("vendorReg", true);
                  RegCheckVS();
                }}
                  className="vendor-btn"
                >
                  Kursga ro’yxatdan o’tish
                </button>
              </span>
            </div>
          </div>

          <footer>
            <nav className="vendor-footer">
              <div className="vendor-nav-logo pointer">
                <img src={VendorSchoolLogoRemove} alt="" />
              </div>
              <div className="vendor-small">
                <div className="vendor-nav-lists">
                  <ul>
                    <li>
                      <a href="#aboutVendor">Biz haqimizda</a>
                    </li>
                    <li>
                      <a href="#vendor-school-spikers">Mentorlarimiz</a>
                    </li>
                    <li>
                      <a href="#vendor-school-price">Narxlar</a>
                    </li>
                    <li>
                      <a href="https://t.me/Eduon_Admin">Biz bilan aloqa</a>
                    </li>
                  </ul>
                </div>
                <div className="vendor-nav-net">
                  <div className="vendor-nav-icons">
                    <a
                      className="nav-icon-link-container"
                      target="_blank"
                      href="https://instagram.com/sotuvchilar_maktabi?igshid=MzRlODBiNWFlZA=="
                    >
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z"
                          fill="red"
                        />
                        <path
                          d="M12 16.75C9.66 16.75 7.75 14.84 7.75 12.5C7.75 10.16 9.66 8.25 12 8.25C14.34 8.25 16.25 10.16 16.25 12.5C16.25 14.84 14.34 16.75 12 16.75ZM12 9.75C10.48 9.75 9.25 10.98 9.25 12.5C9.25 14.02 10.48 15.25 12 15.25C13.52 15.25 14.75 14.02 14.75 12.5C14.75 10.98 13.52 9.75 12 9.75Z"
                          fill="red"
                        />
                        <path
                          d="M17 8C16.87 8 16.74 7.97 16.62 7.92C16.5 7.87 16.39 7.8 16.29 7.71C16.2 7.61 16.12 7.5 16.07 7.38C16.02 7.26 16 7.13 16 7C16 6.87 16.02 6.74 16.07 6.62C16.13 6.49 16.2 6.39 16.29 6.29C16.34 6.25 16.39 6.2 16.44 6.17C16.5 6.13 16.56 6.1 16.62 6.08C16.68 6.05 16.74 6.03 16.81 6.02C17.13 5.95 17.47 6.06 17.71 6.29C17.8 6.39 17.87 6.49 17.92 6.62C17.97 6.74 18 6.87 18 7C18 7.13 17.97 7.26 17.92 7.38C17.87 7.5 17.8 7.61 17.71 7.71C17.61 7.8 17.5 7.87 17.38 7.92C17.26 7.97 17.13 8 17 8Z"
                          fill="red"
                        />
                      </svg>
                    </a>
                  </div>

                  <div className="vendor-nav-icons">
                    <a
                      className="nav-icon-link-container"
                      target="_blank"
                      href="https://instagram.com/sotuvchilar_maktabi?igshid=MzRlODBiNWFlZA=="
                    >
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.75 23.25H10.25V16H9.29999C8.71999 16 8.25 15.53 8.25 14.95V13.05C8.25 12.47 8.71999 12 9.29999 12H10.25V9.5C10.25 7.43 11.93 5.75 14 5.75H16.7C17.28 5.75 17.75 6.21999 17.75 6.79999V9.20001C17.75 9.78001 17.28 10.25 16.7 10.25H14.75V12H16.63C16.95 12 17.24 12.14 17.44 12.38C17.64 12.62 17.72 12.94 17.66 13.25L17.28 15.15C17.18 15.64 16.75 15.99 16.25 15.99H14.75V23.25ZM11.75 21.75H13.25V14.5H15.89L16.09 13.5H13.26V9.79999C13.26 9.21999 13.73 8.75 14.31 8.75H16.26V7.25H14C12.76 7.25 11.75 8.26 11.75 9.5V13.5H9.75V14.5H11.75V21.75Z"
                          fill="red"
                        />
                        <path
                          d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H15C20.43 1.75 22.75 4.07 22.75 9.5V15.5C22.75 20.93 20.43 23.25 15 23.25ZM9 3.25C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V9.5C21.25 4.89 19.61 3.25 15 3.25H9Z"
                          fill="red"
                        />
                      </svg>
                    </a>
                  </div>

                  <div className="vendor-nav-icons">
                    <a
                      className="nav-icon-link-container"
                      target="_blank"
                      href="https://t.me/sotuvmaktabi"
                    >
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.22 22.13C13.04 22.13 11.37 21.3 10.05 17.33L9.33 15.17L7.17 14.45C3.21 13.13 2.38 11.46 2.38 10.28C2.38 9.11001 3.21 7.43001 7.17 6.10001L15.66 3.27001C17.78 2.56001 19.55 2.77001 20.64 3.85001C21.73 4.93001 21.94 6.71001 21.23 8.83001L18.4 17.32C17.07 21.3 15.4 22.13 14.22 22.13ZM7.64 7.53001C4.86 8.46001 3.87 9.56001 3.87 10.28C3.87 11 4.86 12.1 7.64 13.02L10.16 13.86C10.38 13.93 10.56 14.11 10.63 14.33L11.47 16.85C12.39 19.63 13.5 20.62 14.22 20.62C14.94 20.62 16.04 19.63 16.97 16.85L19.8 8.36001C20.31 6.82001 20.22 5.56001 19.57 4.91001C18.92 4.26001 17.66 4.18001 16.13 4.69001L7.64 7.53001Z"
                          fill="red"
                        />
                        <path
                          d="M10.11 14.9C9.92 14.9 9.73 14.83 9.58 14.68C9.29 14.39 9.29 13.91 9.58 13.62L13.16 10.03C13.45 9.74 13.93 9.74 14.22 10.03C14.51 10.32 14.51 10.8 14.22 11.09L10.64 14.68C10.5 14.83 10.3 14.9 10.11 14.9Z"
                          fill="red"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="vendor-nav-btn">
                  <button
                   onClick={() => {
                    localStorage.setItem("vendorReg", true);
                    RegCheckVS();
                  }}
                    className="vendor-btn"
                  >
                    Ro’yxatdan o’tish
                  </button>
                </div>
              </div>
            </nav>
          </footer>
        </div>
      </div>

      {loader && (
                        <div className="loader">
                          <BounceLoader color="#006AFF" speedMultiplier={1.2} />
                        </div>
                      )}

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
                <form onSubmit={(e) => sendddata(e)}>
                  <div className="phoneInputBox">
                    <PhoneInput
                     onKeyDown={handleKeyDown}
                     inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: true
                    }}
                      country={"uz"}
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
                      <span style={{textDecoration: 'underline', color:'#006aff'}}>Ro'yxatdan o'ting</span>
                    </Link>
                  </p>
                  <Button
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
                    type="submit"
                  >
                    Tizimga kirish
                  </Button>
                </form>
              </div>
            </Box>
          </Fade>
        </div>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showDistrictModal}
        onClose={() => setShowDistrickModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className="modalForLogin">
          <Fade in={showDistrictModal}>
            <Box sx={style2} className="container">
              <div className="rowGrid">
                <div className="flex justify-end width-100"><CloseIcon className="pointer" onClick={() => setShowDistrickModal(false)}/></div>
                <div className="col-24 text-center mb-24"><h3>Hududingizni tanlang</h3></div>
                <div className="col-12 col-sm-24"><a href="https://forms.gle/YJC1JXUVZKMD3YD48" target="_blank"><button className="vendor-btn-2 width-100 mb-24">Shayxontohur tumani</button></a></div>
                <div className="col-12 col-sm-24"><a href="https://forms.gle/z5emR2py8ugWfXFz8" target="_blank"><button className="vendor-btn-2 width-100 mb-24">Boshqa hudud</button></a></div>
              </div>
            </Box>
          </Fade>
        </div>
      </Modal>;
    </>
  );
}

export default VendorSchool;
