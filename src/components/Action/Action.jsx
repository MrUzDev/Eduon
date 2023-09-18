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

function Action() {
  const {
    loggedIn,
    setAddedToFav,
  } = useContext(StateContext);

  const [loginError, setLoginError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // const [days, setDay] = useState();
  // const [hours, setHour] = useState();
  // const [minutes, setMinut] = useState();
  // const [seconds, setSecond] = useState();
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
         
            navigate("/cart");
          })
          .catch((err) => {
            err.response.status && refresh(err.response.status, err.response.status.text);
          }));

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
        });
    } catch (error) {}
  }, []);

  // useEffect(() => {
  //   var countDownDate = new Date("January 1, 2023 00:00:00").getTime();
  //   var x = setInterval(function () {
  //     var now = new Date().getTime();
  //     var distance = countDownDate - now;
  //     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //     var hours = Math.floor(
  //       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     );
  //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //     setDay(days);
  //     setHour(hours);
  //     setMinut(minutes);
  //     setSecond(seconds);
  //     if (document.getElementById("demo")) {
  //       document.getElementById("demo").innerHTML =
  //         days + " : " + hours + " : " + minutes + " : " + seconds + " ";
  //     }
  //     if (distance < 0) {
  //       clearInterval(x);
  //     }
  //   }, 1000);
  // }, []);


  return (
    <div className={`actionBody`} >
    
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

    </div>
  );
}

export default Action;
