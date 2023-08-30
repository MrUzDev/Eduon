import React, { useContext, useState, useEffect } from "react";
import "./Sidebar.css";
import { StateContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "../../Apis/api";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Button from "@mui/material/Button";
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

export default function   Sidebar(props) {
  const { navStretch, setNavStretch, balance, loggedIn , isremoved, vaucherBlanceData} =
    useContext(StateContext);
  const [favCourses, setfavCourses] = useState();
  const navigate = useNavigate();
  const { active } = props;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const [webinarLength, setwebinarLength] = useState(0)
  const [referalToken, setReferalToken] = useState("");
  const [share, setShare] = useState(false);
  const handleOpen = () => setOpen(true);


  const handleClose = () => setOpen(false);

  function copyToClipboard() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    setCopied(true);
  }

  const referalTg = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v2/courses/create-referral-eduon/`,
          {
            headers,
          }
        )
        .then((res) => setReferalToken(res.data.uuid));
    } catch (error) {}
    setShare(!share);
  };

  useEffect(() => {
    copied &&
      setTimeout(() => {
        setCopied(false);
        handleClose();
      }, 500);
  }, [copied]);

  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(
            `${process.env.REACT_APP_API_KEY}/api/v1/orders/cart`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((res) => {
            setCartLength(res.data.items.length);
          });
    } catch (error) {}
  }, [isremoved]);
  // handleOpen()

  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(
            `${process.env.REACT_APP_API_KEY}/api/v2/orders/webinar-cart`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((res) => {
            setwebinarLength(res.data.items.length);
          });
    } catch (error) {}
  }, [isremoved]);

  useEffect(() => {
    if(navStretch === true) {
      setTimeout(() => {
        navStretch && setNavStretch(false)
      }, 20000)
    }
  }, [navStretch])

  const currency = (number, currency, lang = undefined) => 
  Intl.NumberFormat(lang, {style: 'currency', currency}).format(number)

  return (
    // <div className={"sidebar w-240"}>
    <div className={navStretch ? "sidebar w-240" : "sidebar w-100"}>
      <div className="containerr">
        <div style={{ width: "100%" }}>
          {loggedIn && (
            <div
              className="pl-40 top "
              onClick={() => navigate("/moneyOperations")}
            >
              <div className={navStretch ? 'd-flex align-center' : ''}>
                <svg
                  className="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke={active === 0 ? "#006AFF" : "#1C1C1C"}
                >
                  <path
                    d="M14.2617 15.998H9.26172"
                    // stroke="#1C1C1C"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.66 2.51814L12.63 2.58814L9.72996 9.31814H6.87996C6.19996 9.31814 5.54996 9.45814 4.95996 9.70814L6.70996 5.52814L6.74996 5.42814L6.81996 5.26814C6.83996 5.20814 6.85996 5.14814 6.88996 5.09814C8.19996 2.06814 9.67996 1.37814 12.66 2.51814Z"
                    // stroke="#1C1C1C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.05 9.51819C17.6 9.37819 17.12 9.31819 16.64 9.31819H9.72998L12.63 2.58819L12.66 2.51819C12.81 2.56819 12.95 2.63819 13.1 2.69819L15.31 3.62819C16.54 4.13819 17.4 4.66819 17.92 5.30819C18.02 5.42819 18.1 5.53819 18.17 5.66819C18.26 5.80819 18.33 5.94819 18.37 6.09819C18.41 6.18819 18.44 6.27819 18.46 6.35819C18.73 7.19819 18.57 8.22819 18.05 9.51819Z"
                    // stroke="#1C1C1C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.5217 14.1984V16.1484C21.5217 16.3484 21.5117 16.5484 21.5017 16.7484C21.3117 20.2384 19.3617 21.9984 15.6617 21.9984H7.86172C7.62172 21.9984 7.38172 21.9784 7.15172 21.9484C3.97172 21.7384 2.27172 20.0384 2.06172 16.8584C2.03172 16.6284 2.01172 16.3884 2.01172 16.1484V14.1984C2.01172 12.1884 3.23172 10.4584 4.97172 9.70836C5.57172 9.45836 6.21172 9.31836 6.89172 9.31836H16.6517C17.1417 9.31836 17.6217 9.38836 18.0617 9.51836C20.0517 10.1284 21.5217 11.9884 21.5217 14.1984Z"
                    // stroke="#1C1C1C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.71 5.52808L4.96 9.70808C3.22 10.4581 2 12.1881 2 14.1981V11.2681C2 8.42808 4.02 6.05808 6.71 5.52808Z"
                    // stroke="#1C1C1C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.5186 11.2677V14.1977C21.5186 11.9977 20.0586 10.1277 18.0586 9.52766C18.5786 8.22766 18.7286 7.20766 18.4786 6.35766C18.4586 6.26766 18.4286 6.17766 18.3886 6.09766C20.2486 7.05766 21.5186 9.02766 21.5186 11.2677Z"
                    // stroke="#1C1C1C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {navStretch ? null: <h6 className={` ${active === 0 && 'active'} noActiveText`}>Mening Hisobim</h6> }
              <p className={active === 0 ? "active " : ""}>Mening Hisobim</p>
              </div>
              <p className="summa">{balance && vaucherBlanceData && currency((balance) + parseInt(vaucherBlanceData.balance / 100), "UZS").replace("UZS", '').replace('soʻm', '').replace(/,/g, ".").slice(0, -3)} so'm</p>
            </div>
          )}

          <div className="divider"></div>
          <ul>
            <li
              onClick={() => navigate("/")}
              className={navStretch ? 'pointer d-flex pl-40 align-center' : 'pointer'}
            >
              <svg
                className="icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke={active === 1 ? "#006AFF" : "#1C1C1C"}
              >
                <path
                  d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {navStretch ? null: <h6 className={`${active === 1 && 'active'} noActiveText`}>Bosh sahifa</h6> }
              {/* <p className={active === 1 ? "active w100-d-block w240-d-none" : ""}>Bosh sahifa</p> */}
              <p className={active === 1 ? "active " : ""}>Bosh sahifa</p>
            </li>
            <li
              onClick={() => navigate("/myEnrolledCourses")}
              className={navStretch ? 'pointer d-flex pl-40 align-center' : 'pointer'}
            >
              <svg
                className="icon "
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke={active === 2 ? "#006AFF" : "#1C1C1C"}
              >
                <path
                  d="M10.05 2.53004L4.03002 6.46004C2.10002 7.72004 2.10002 10.54 4.03002 11.8L10.05 15.73C11.13 16.44 12.91 16.44 13.99 15.73L19.98 11.8C21.9 10.54 21.9 7.73004 19.98 6.47004L13.99 2.54004C12.91 1.82004 11.13 1.82004 10.05 2.53004Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.63 13.08L5.62 17.77C5.62 19.04 6.6 20.4 7.8 20.8L10.99 21.86C11.54 22.04 12.45 22.04 13.01 21.86L16.2 20.8C17.4 20.4 18.38 19.04 18.38 17.77V13.13"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.4 15V9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {navStretch ? null: <h6 className={`${active === 2 && 'active'} noActiveText`}>Mening Kurslarim</h6> }
              {/* <p className={active === 2 ? "active w100-d-block w240-d-none" : "w100-d-block w240-d-none"}>Mening Kurslarim</p> */}
              <p className={active === 2 ? "active " : ""}>Mening Kurslarim</p>
            </li>
            <li
              onClick={() => navigate("/cart")}
              className={navStretch ? 'pointer d-flex pl-40 align-center favourite' : 'pointer pl-40 align-center favourite'}
            >
              <div className="favCount">
                {/* <svg
                  className="icon "
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke={active === 3 ? "#006AFF" : "#1C1C1C"}
                >
                  <path
                    d="M9.25 9.05005C11.03 9.70005 12.97 9.70005 14.75 9.05005"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.8199 2H7.17995C5.04995 2 3.31995 3.74 3.31995 5.86V19.95C3.31995 21.75 4.60995 22.51 6.18995 21.64L11.0699 18.93C11.5899 18.64 12.4299 18.64 12.9399 18.93L17.8199 21.64C19.3999 22.52 20.6899 21.76 20.6899 19.95V5.86C20.6799 3.74 18.9499 2 16.8199 2Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    // fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fff"
                    stroke={active === 3 ? "#006AFF" : "#1C1C1C"}
                  >
                    <path
                      d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 8H21"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                {cartLength || webinarLength ? (
                  <span className="count">{cartLength + webinarLength}</span>
                ) : null}
              </div>
              {navStretch ? null: <h6 className={` ${active === 3 && 'active'} noActiveText`}>Savatchadagi kurslar</h6> }
              {/* <p className={active === 3 ? "active w100-d-block w240-d-none" : "w100-d-block w240-d-none"}>Savatchadagi kurslar</p> */}
              <p className={active === 3 ? "active " : ""}>Savatchadagi kurslar</p>
            </li>
            <li
              onClick={() => handleOpen()}
              className={navStretch ? 'pointer d-flex pl-40 align-center' : 'pointer'}
            >
              <svg
                className="icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.40005 6.32003L15.8901 3.49003C19.7001 2.22003 21.7701 4.30003 20.5101 8.11003L17.6801 16.6C15.7801 22.31 12.6601 22.31 10.7601 16.6L9.92005 14.08L7.40005 13.24C1.69005 11.34 1.69005 8.23003 7.40005 6.32003Z"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.11 13.6501L13.69 10.0601"
                  stroke="#1C1C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {navStretch ? null: <h6 className="noActiveText">Yaqinlarga jo'natish</h6> }
              {/* <p className="w100-d-block w240-d-none">Yaqinlarga jo'natish</p> */}
              <p>Yaqinlarga jo'natish</p>
            </li>
          </ul>
          <div className="divider"></div>
        </div>

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
          style={{
            border: "none",
          }}
        >
          <Fade in={open}>
            <Box sx={style} className="container">
                  <div className="courseTitle ">
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
                                {copied ? "Nusxa olindi" : "eduOn.uz platformasini ulashish"}
                              </button>
                              {share ? (
                                <div className="socialIcons">
                                  <FacebookShareButton
                                    url={`https://eduon.uz/register/${referalToken}`}
                                    quote="Bizga ulaning"
                                    hashtags="#eduon.uz"
                                  >
                                    <FacebookIcon round={true} />
                                  </FacebookShareButton>
                                  <TelegramShareButton
                                    url={`https://eduon.uz/register/${referalToken}`}
                                    quote="Bizga ulaning"
                                    hashtags="#eduon.uz"
                                  >
                                    <TelegramIcon round={true} />
                                  </TelegramShareButton>
                                  <WhatsappShareButton
                                    url={`https://eduon.uz/register/${referalToken}`}
                                    quote="Bizga ulaning"
                                    hashtags="#eduon.uz"
                                  >
                                    <WhatsappIcon round={true} />
                                  </WhatsappShareButton>
                                  <TwitterShareButton
                                    url={`https://eduon.uz/register/${referalToken}`}
                                    quote="Bizga ulaning"
                                    hashtags="#eduon.uz"
                                  >
                                    <TwitterIcon round={true} />
                                  </TwitterShareButton>
                               
<svg  onClick={() => {
                                      navigator.clipboard.writeText(
                                        `https://eduon.uz/register/${referalToken}`
                                      );
                                      setCopied(true);
                                    }} version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="5120.000000pt" height="5120.000000pt" viewBox="0 0 5120.000000 5120.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,5120.000000) scale(0.110000,-0.100000)"
fill="#000000" stroke="none">
<path d="M19960 44793 c-254 -18 -498 -56 -724 -113 -1407 -357 -2514 -1468
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
336 950 538 1480 578 63 4 834 9 1712 10 l1598 1 3 -11032z"/>
</g>
</svg>

                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
              {/* {copied ? (
                <p
                  style={{
                    color: "#0CC14A",
                    padding: "12px 20px",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                  className="col-24 d-flex align-center justify-center"
                >
                  <ContentCopyIcon style={{ marginRight: "15px" }} />
                  Nusxa olindi
                </p>
              ) : (
                <div className="rowGrid align-center">
                  <input
                    style={{
                      color: "black",
                      padding: "12px 20px",
                      backgroundColor: "#F6F6F6",
                      fontSize: "14px",
                      outline: "none",
                      border: "none",
                      borderRadius: "15px",
                    }}
                    disabled
                    type="text"
                    value="https://eduon.uz/main"
                    id="myInput"
                    className="col-14"
                  ></input>
                  <div className="col-10">
                    <Button
                      sx={{
                        width: "100%",
                        backgroundColor: "#80B5FF",
                        borderRadius: "15px",
                        height: "49px",
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                      className="btn"
                      onClick={() => copyToClipboard()}
                    >
                      Nusxa olish
                    </Button>
                  </div>
                </div>
              )} */}
            </Box>
          </Fade>
        </Modal>
        <p className="copyRight">© 2022 EduON LLC</p>
      </div>
    </div>
  );
}
