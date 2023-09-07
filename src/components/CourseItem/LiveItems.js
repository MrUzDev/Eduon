import React, { useState, useEffect,  useContext } from 'react'
import "./CourseItem.css";
import liveImg from '../../assets/images/livephoto.jpg'
import { useNavigate } from 'react-router-dom';
import "moment/locale/uz-latn";
import moment from "moment";
import axios from "../../Apis/api";
import { StateContext } from "../../context/Context";
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
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import ReactHtmlParser from 'react-html-parser';

export default function LiveItems(props) {
  // const [chosenStream, setChoosenStream] = useState()
  const [popupSelfShow, setpopupSelfShow] = useState(false);
  const [popupShow, setpopupShow] = useState(false);
  const [isBought, setisBought] = useState(false);
  const [artificialAddedToCart, setArtificialAddedToCart] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setLoginModal(true);
  const handleClose = () => setOpen(false);
  const [enrolledStream, setEnrolledStream] = useState([])
  const [show, setShow] = useState(false);
  const [number, setnumber] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(false);

  const {
    isremoved,
    setIsRemoved,
    loggedIn,
    setAddedToCart,
    setLoginModal,
  } = useContext(StateContext);

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
  

  const navigate = useNavigate();

  const chosenStream = (e, id) => {
    e.preventDefault();
    navigate(`/chosenStream/${id}`);
  };

  const navigateToWatch = (e, id) => {
    e.preventDefault();
    navigate(`/stream/${id}`);
  };

  const addToCart = async (e, id) => {
    const headers = {
      Authorization: loggedIn
        ? `Bearer ${localStorage.getItem("access")}`
        : setLoginError(true),
    };
    !loggedIn && handleOpen();
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
              : setAddedToCart(true);
          })
          .catch((err) => {
            err.response.status && refresh(err.response.status, err.response.status.text);
          }));

      setIsRemoved(!isremoved);
    } catch (error) { }
  };

  const DeleteFromCart = (e, id) => {
    e.preventDefault();
    let delId = props.cartData.items.filter((item) => item.webinar.id == id)[0].id;
    try { 
      loggedIn &&
        axios
          .delete(
            `${process.env.REACT_APP_API_KEY}/api/v2/orders/webinar-cart/${delId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((res) => {
            setAddedToCart(true);
            setTimeout(() => {
              setAddedToCart(false);
            }, 10);
            setIsRemoved(!isremoved);
          });
    } catch (error) { }
  };

  const addToCart2 = async (e, id) => {
    const headers = {
      Authorization: loggedIn
        ? `Bearer ${localStorage.getItem("access")}`
        : setLoginError(true),
    };
    !loggedIn && handleOpen();
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
              : setAddedToCart(true);
          })
          .catch((err) => {
            err.response.status && refresh(err.response.status, err.response.status.text);
          }));

      setIsRemoved(!isremoved);
    } catch (error) { }

    loggedIn && navigate('/buy')

  };

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
            setisBought(res.data.some((item) => item.webinar.id == props.id));
          })
          .catch((err) => {
            err.response.status && refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
  }, []);

  const leave = () => {
    setTimeout(() => {
      setpopupShow(false);
    }, 100);
  };
  
  const popupShowTime = () => {
    setTimeout(() => {
      setpopupShow(true)
    }, 100)
  }
  
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


  const currency = (number, currency, lang = undefined) => 
  Intl.NumberFormat(lang, {style: 'currency', currency}).format(number)


  return (
    <div className='wrapper'>


<div className={props.class}>
<div
  className="course-item pointer"
  // HOVER UCHUN
  onMouseOver={() => {
    popupShowTime()
  }}
  onMouseLeave={() => {
    leave();
  
  }}
>
  <div className="item-header">
    <img
      className="courseImage pointer"
      src={
        props.cover_img
            ? `${process.env.REACT_APP_API_KEY}${props.cover_img}`
            : liveImg
      }
      alt="....."
      onClick={(e) => chosenStream(e, props.id)}
    />
     <div className={"bg-red label"} style={{padding: '5px 30px'}}>{props.is_started ? <h6>Vebinar boshlandi!</h6>: <h6>{moment.utc(props.start_time).format('Do - MMMM, HH:mm')}</h6>}</div>
  </div>

  <div className="item-row">
    <p  className="title" onClick={() => navigate(`chosenStream/${props.id}`)}>
      {props.name && props.name.length > 25
        ? props.name.slice(0,25) + "..."
        : props.name} 
    </p>
    

 {isBought ? (
      <div
        onClick={() => navigate(`/stream/${props.id}`)}
        className="course-start"
      >
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#006aff"
        >
          <path
            d="M9.10001 12.5005V11.0205C9.10001 9.11048 10.45 8.34048 12.1 9.29048L13.38 10.0305L14.66 10.7705C16.31 11.7205 16.31 13.2805 14.66 14.2305L13.38 14.9705L12.1 15.7105C10.45 16.6605 9.10001 15.8805 9.10001 13.9805V12.5005Z"
            stroke="#006aff"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
            stroke="#006aff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ) : props.addedCart || artificialAddedToCart ? (
      <div
        onClick={(e) => {
          props.price
            ? DeleteFromCart(e, props.id)
            : navigateToWatch(e, props.id);
          setArtificialAddedToCart(false);
        }}
        className="course-start">
        {props.price ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            // fill="none"
            xmlns="http://www.w3.org/2000/svg"
            fill="#006aff"
          >
            <path
              d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
              stroke="#1c1c1c"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
              stroke="#1c1c1c"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
              stroke="#1c1c1c"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 8H21"
              stroke="#1c1c1c"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 16.74V4.67C22 3.47 21.02 2.58 19.83 2.68H19.77C17.67 2.86 14.48 3.93 12.7 5.05L12.53 5.16C12.24 5.34 11.76 5.34 11.47 5.16L11.22 5.01C9.44 3.9 6.26 2.84 4.16 2.67C2.97 2.57 2 3.47 2 4.66V16.74C2 17.7 2.78 18.6 3.74 18.72L4.03 18.76C6.2 19.05 9.55 20.15 11.47 21.2L11.51 21.22C11.78 21.37 12.21 21.37 12.47 21.22C14.39 20.16 17.75 19.05 19.93 18.76L20.26 18.72C21.22 18.6 22 17.7 22 16.74Z"
              stroke="#006aff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 5.49V20.49"
              stroke="#006aff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.75 8.49H5.5"
              stroke="#006aff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 11.49H5.5"
              stroke="#006aff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    ) : (
      <div
        onClick={(e) => {
          props.price
            ? addToCart(e, props.id)
            : navigateToWatch(e, props.id);
          loggedIn && setArtificialAddedToCart(true);
        }}
        className="course-start"
      >
        {props.price ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
              stroke="#006aff"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
              stroke="#006aff"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
              stroke="#006aff"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 8H21"
              stroke="#006aff"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 16.74V4.67C22 3.47 21.02 2.58 19.83 2.68H19.77C17.67 2.86 14.48 3.93 12.7 5.05L12.53 5.16C12.24 5.34 11.76 5.34 11.47 5.16L11.22 5.01C9.44 3.9 6.26 2.84 4.16 2.67C2.97 2.57 2 3.47 2 4.66V16.74C2 17.7 2.78 18.6 3.74 18.72L4.03 18.76C6.2 19.05 9.55 20.15 11.47 21.2L11.51 21.22C11.78 21.37 12.21 21.37 12.47 21.22C14.39 20.16 17.75 19.05 19.93 18.76L20.26 18.72C21.22 18.6 22 17.7 22 16.74Z"
              stroke="#006aff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 5.49V20.49"
              stroke="#006aff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.75 8.49H5.5"
              stroke="#006aff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 11.49H5.5"
              stroke="#006aff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    )} 
  </div>
  <p
    // onClick={(e) => navigateToSpeaker(e, item.speaker)}
    className="trainer pointer"
  >
    {props.spekarName ? props.spekarName: ''}
  </p>
  <div className="item-footer">
    <div className="footer-row">
    {props.type == "FREE" ? (
      <p>Bepul</p>
    ): (
    <p> UZS&nbsp;	
      {/* {currency(props.price, 'UZS')} */}
    {currency(props.price, 'UZS').replace(/,/g, '.').replace(/ /g, '.').replace("UZS", "").replace("soʻm", "").slice(0, -3)} 
    </p>
    )}
    </div>
      {isBought || props.price == 0 ? (
            null
                        
                      ) : (
                       <div className="course-start">
                         <button onClick={(e) => {addToCart2(e, props.id);}}>Xarid qilish</button>
                       </div>
                      )}
  </div>
</div>

<div className={
            `${popupSelfShow || popupShow ? "cards_popup" : "visibilityNone"} `
          }
          onMouseOver={() => setpopupSelfShow(true)}
          onMouseLeave={() => setpopupSelfShow(false)}
        >
          <div className={popupSelfShow || popupShow ? "popup" : "scale0"}>
            <h1 onClick={() => navigate(`/chosenStream/${props.id}`)}>
              { props.name }
            </h1>
            <div className="btn_popup">
              {props.priceLine ? <button>Chegirmadagi vebinar</button> : null}
              <p>
                Yangilangan:{" "}
                <span>{moment().locale("uz-latn").format("MMMM YYYY")}</span>
              </p>
            </div>
            <p style={{ textAlign: "justify" }} className="product">
              {props.about && props.about.length >= 300
                ? (ReactHtmlParser(props.about)).slice(0, 300) + "..."
                : ReactHtmlParser(props.about)}
            </p>
            <div className="add_cart">
               {isBought || props.price == 0  ? (
                <button onClick={(e) => navigate(`/stream/${props.id}`)}>
                  vebinarga kirish
                </button>
              ) : (
                <button style={{width: '100%', marginRight: '20px'}} onClick={(e) => addToCart2(e, props.id)}>
                  Xarid qilish
                </button>
              )}
                 {isBought || props.price == 0 ? (
                  null
                ): props.isAddedToCart || artificialAddedToCart ? (
                  <div
                  onClick={(e) => {
                    props.price
                      ? DeleteFromCart(e, props.id)
                      : navigateToWatch(e, props.id);
                    setArtificialAddedToCart(false);
                  }}
                >
                  {props.price ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      // fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#006aff"
                      className="modalAddCart"
                    >
                      <path
                        d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                        stroke="#1c1c1c"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                        stroke="#1c1c1c"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                        stroke="#1c1c1c"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 8H21"
                        stroke="#1c1c1c"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 16.74V4.67C22 3.47 21.02 2.58 19.83 2.68H19.77C17.67 2.86 14.48 3.93 12.7 5.05L12.53 5.16C12.24 5.34 11.76 5.34 11.47 5.16L11.22 5.01C9.44 3.9 6.26 2.84 4.16 2.67C2.97 2.57 2 3.47 2 4.66V16.74C2 17.7 2.78 18.6 3.74 18.72L4.03 18.76C6.2 19.05 9.55 20.15 11.47 21.2L11.51 21.22C11.78 21.37 12.21 21.37 12.47 21.22C14.39 20.16 17.75 19.05 19.93 18.76L20.26 18.72C21.22 18.6 22 17.7 22 16.74Z"
                        stroke="#006aff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 5.49V20.49"
                        stroke="#006aff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.75 8.49H5.5"
                        stroke="#006aff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.5 11.49H5.5"
                        stroke="#006aff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                  ) : (
                    <>
                  <svg
                 onClick={(e) => {
                  props.price
                    ? addToCart(e, props.id)
                    : navigateToWatch(e, props.id);
                  loggedIn && setArtificialAddedToCart(true);
                }}
                width="30"
                height="30"
                viewBox="0 0 24 24"
                // fill="none"
                className="modalAddCart"
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                >
                <path
                  d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                  stroke="#1c1c1c"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                  stroke="#1c1c1c"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                  stroke="#1c1c1c"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 8H21"
                  stroke="#1c1c1c"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                </svg>
                    </>
                )}
            </div>
          </div>
        </div>

     

</div>  

    </div>
  )
}
