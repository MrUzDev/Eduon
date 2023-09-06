import React, { useState, useContext, useEffect } from "react";
import "./Action.css";
import ActionImg from "../../assets/images/banner2.png";
import { StateContext } from "../../context/Context";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import axios from "../../Apis/api";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Fade from "@mui/material/Fade";
// import Backdrop from "@mui/material/Backdrop";
// import Button from "@mui/material/Button";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "4px solid #006aff",
//   borderRadius: "15px",
//   boxShadow: 24,
//   p: 5,
// };

function Action() {
  const {
    loggedIn,
    setAddedToFav,
  } = useContext(StateContext);

  const [loginError, setLoginError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [days, setDay] = useState();
  const [hours, setHour] = useState();
  const [minutes, setMinut] = useState();
  const [seconds, setSecond] = useState();
  const [bannerActive, setBannerActive] = useState(false);
  const [bannerImg, setBannerImg] = useState();
  const [bannerData, setBannerData] = useState([]);

  const navigate = useNavigate();
  const addToAction = async (e, id) => {
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
            `${process.env.REACT_APP_API_KEY}/api/v1/orders/cart`,
            {
              course: id,
              is_referral: false,
            },
            { headers }
          )
          .then((res) => {
            // res.data.message === "This course already exists"
            //   ? setAlertError(true)
            //   : setAddedToCart(true);
            navigate("/cart");
          })
          .catch((err) => {
            err.response.status && refresh(err.response.status, err.response.status.text);
          }));

      // setIsRemoved(!isremoved);
    } catch (error) {}
  };

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v2/courses/banner/`)
        .then((res) => {
          setBannerActive(res.data.is_active);
          setBannerImg(res.data.image);
          setBannerData(res.data);
          // console.log(res.data);
        });
    } catch (error) {}
  }, []);

  useEffect(() => {
    var countDownDate = new Date("January 1, 2023 00:00:00").getTime();
    var x = setInterval(function () {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setDay(days);
      setHour(hours);
      setMinut(minutes);
      setSecond(seconds);
      if (document.getElementById("demo")) {
        document.getElementById("demo").innerHTML =
          days + " : " + hours + " : " + minutes + " : " + seconds + " ";
      }
      if (distance < 0) {
        clearInterval(x);
        // document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);
  }, []);


  return (
    <div className='actionBody'>
    
    {bannerData && (
          <Swiper
          modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={500}
          loop={true}
          navigation
          observer={true}
          observeParents={true}
        >
        {bannerData.map(banner => 
        banner.is_active && (
          <SwiperSlide>
            {/* {console.log(banner)} */}
            {/* {console.log(window.innerWidth > 767)} */}
            {banner.banner_link && <a href={banner.banner_link} target="_blank"> {window.innerWidth > 767 ? <img src={`${process.env.REACT_APP_API_KEY}${banner.image}`} class='actionBannerImg'/> : <img src={`${process.env.REACT_APP_API_KEY}${banner.mobile_image}`} class='actionBannerImg'/>} </a>}
            {banner.banner_button_text && <button className='vendor-btn eduon-brand-btn'>{banner.banner_button_link && <a href={banner.banner_button_link} target="_blank"> {banner.banner_button_text} </a> }</button>}
          </SwiperSlide>
        )
          )}
        </Swiper>
    )}

      {/* {bannerActive ? (
        <>
          {close ? (
            <div className="actionBody">
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
              >
                <SwiperSlide>
                <img
                  id="bannerYanvar"
                  src={`${process.env.REACT_APP_API_KEY}${bannerImg}`}
                  alt="bannerYanvar"
                />
                </SwiperSlide>
            
                
              </Swiper>

              <button className="vendor-btn" style={{width: '300px'}} onClick={() => navigate('/Quiz')}>Ovoz berish</button>
              <svg
              className="close"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              onClick={() => setClose(false)}
            >
              <path
                d="M16 29.8333C8.36948 29.8333 2.16667 23.6305 2.16667 16C2.16667 8.36944 8.36948 2.16663 16 2.16663C23.6305 2.16663 29.8333 8.36944 29.8333 16C29.8333 23.6305 23.6305 29.8333 16 29.8333ZM16 3.16663C8.92386 3.16663 3.16667 8.92382 3.16667 16C3.16667 23.0761 8.92386 28.8333 16 28.8333C23.0761 28.8333 28.8333 23.0761 28.8333 16C28.8333 8.92382 23.0761 3.16663 16 3.16663Z"
                fill="#006AFF"
                stroke="#006AFF"
              />
              <path
                d="M12.5798 20.1264L12.5737 20.1325L12.5678 20.1388C12.4909 20.2212 12.3654 20.2733 12.2267 20.2733C12.0988 20.2733 11.9748 20.2277 11.8736 20.1264L11.5238 20.4762L11.8736 20.1264C11.6821 19.935 11.6821 19.6116 11.8736 19.4202L19.4202 11.8735C19.6116 11.6821 19.935 11.6821 20.1264 11.8735L20.479 11.5209L20.1264 11.8735C20.3179 12.0649 20.3179 12.3884 20.1264 12.5798L20.48 12.9333L20.1264 12.5798L12.5798 20.1264Z"
                fill="#006AFF"
                stroke="#006AFF"
              />
              <path
                d="M19.7733 20.2733C19.6455 20.2733 19.5215 20.2277 19.4202 20.1264L11.8736 12.5798C11.6821 12.3884 11.6821 12.0649 11.8736 11.8735C12.065 11.6821 12.3884 11.6821 12.5798 11.8735L20.1264 19.4202C20.3179 19.6116 20.3179 19.935 20.1264 20.1264C20.0252 20.2277 19.9012 20.2733 19.7733 20.2733Z"
                fill="#006AFF"
                stroke="#006AFF"
              />
            </svg>

              <div className="rowGrid justify-center align-center ">
                  <div className="col-12 col-lg-12 col-md-24 col-sm-24">
                    <div className="actionCard">
                      <h1>
                        <span style={{ color: "red" }}>YANGI YILGA</span> <br />
                        <span>YANGI CHEGIRMALAR</span> <br />
                        <b style={{ color: "#006aff" }}>70% </b>
                        gacha bo'lgan bayramona <br /> chegirmalarni qarshi
                        oling
                      </h1>
                      <div className="btns">
                    <button onClick={(e) => addToAction(e, 235)}>
                      Xarid qilish
                    </button>
                    <button onClick={() => navigate("chosenCourse/235")}>
                      Batafsil
                    </button>
                   
                  </div>

                      <div className="demos" style={{marginTop: '10px'}}>
                        <p style={{fontWeight: '900'}}>Chegirmaning tugashi</p>
                        <h4 id="demo"></h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-11 col-md-24 col-sm-24">
                    <div className="cardImg">
                      <img src={ActionImg} />
                    </div>
                  </div>
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
            </div>
          ) : null}
        </>
      ) : null} */}
      
    </div>
  );
}

export default Action;
