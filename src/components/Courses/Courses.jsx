import React, { useContext, useEffect, useState } from "react";
import CourseItem from "../CourseItem/CourseItem";
import "../../assets/css/Grid.css";
import "./Courses.css";
import { StateContext } from "../../context/Context";
import axios from "../../Apis/api";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import CoursesSkeleton from "../CoursesSkeleton/CoursesSkeleton";
import { useNavigate } from "react-router-dom";
import Action from "../Action/Action";
import { Alert, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import LiveItems from "../CourseItem/LiveItems";
// import alanBtn from '@alan-ai/alan-sdk-web';

export default function Courses() {
  const {
    navStretch,
    addedToCart,
    addedToFav,
    loggedIn,
    boughtCourses,
    setAddedToCart,
    isremoved,
    setIsRemoved,
  } = useContext(StateContext);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loginError, setLoginError] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const [categories, setCategories] = useState([]);

  const [courseData, setCourseData] = useState([]);
  // console.log(courseData);
  const [activeCategory, setActiveCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState([]);

  const [favItems, setFavItems] = useState([]);
  const [favData, setFavData] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [stCartItem, setStCartItem] = useState([]);
  const [stCartData, setStCartData] = useState([]);

  const [webinarCard, setWebinarCart] = useState([]);
  const [notfullProfile, setnotFullProfile] = useState(true);

  const [voucherData, setVoucherData] = useState([]);



  const navigateToCourses = (id, name) => {
    name === "Barchasi" ? navigate("/") : navigate(`/courses/${id}`);
    localStorage.setItem("activeCategory", name);
  };
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
            setCartData(res.data);
            setCartItems(res.data.items.map((item) => item.course.id));
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
  }, [addedToCart]);

  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(
            `${process.env.REACT_APP_API_KEY}/api/v1/courses/list-fav-courses/`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((res) => {
            setFavData(res.data);
            setFavItems(res.data.map((item) => item.id));
          })
          .catch((err) => {});
    } catch (error) {}
  }, [addedToFav]);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/`)
        .then((res) => {
          setCourseData(res.data);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/categories/`)
        .then((res) => {
          setCategories(res.data);
        });
    } catch (error) {}
  }, []);

  for (let i = 0; i < webinarCard.length; i++) {
    if (window.innerWidth > 1300) {
      if ((i + 1) % 4 === 0) {
        webinarCard[i].className = "cards-left";
      } else {
        webinarCard[i].className = "cards-right";
      }
    } else if (window.innerWidth < 1300) {
      if ((i + 1) % 3 === 0) {
        webinarCard[i].className = "cards-left";
      } else {
        webinarCard[i].className = "cards-right";
      }
    }
  }

  for (let i = 0; i < courseData.length; i++) {
    if (window.innerWidth > 1300) {
      if ((i + webinarCard.length + 1) % 4 === 0) {
        courseData[i].className = "cards-left";
      } else {
        courseData[i].className = "cards-right";
      }
    } else if (window.innerWidth < 1300) {
      if ((i + webinarCard.length + 1) % 3 === 0) {
        courseData[i].className = "cards-left";
      } else {
        courseData[i].className = "cards-right";
      }
    }
  }

  useEffect(() => {
    setActiveCategory(localStorage.getItem("activeCategory"));
  }, [navigate]);
  localStorage.setItem("activeCategory", "Barchasi");

  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v2/orders/webinar-cart`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => {
            // console.log(res.data.map((item) => item));
            setStCartData(res.data);
            setStCartItem(res.data.items.map((item) => item.webinar.id));
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
  }, [addedToCart]);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v2/stream/webinar-list/`, {})
        .then((res) => setWebinarCart(res.data))
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
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
            setnotFullProfile(res.data.is_full);
          });
    } catch (error) {}
  }, []);


  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v2/courses/voucher/`, {})
        .then((res) => {
          setVoucherData(res.data);
        });
    } catch (error) {}
  }, []);

  // useEffect(() => {
  //   try {
  //   const api = axios.get("https://api.ipify.org")
  //   console.log(api);
  //   // .then((res) => console.log(res.data)); 
  //   } catch (error) {}
  // }, []);

//   useEffect(() => {
//     Axios({
//       method: 'post',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       url: 'https://localhost:44346/Order/Order/GiveOrder',
//       data: order
//     }).then(function (response) {
//       console.log(response.data);
//     });


//     // axios.get(`http://localhost:4000/api`,{ crossdomain: true }).then((result)=>{
//     //     console.log("result",result);
//     //   }).catch((error)=>{
//     //     console.log("Error",error);
//     //   });
//  },[]);

  const fnctest = async () => {

    const api = await axios.get("https://ipapi.co/json")
    console.log(api.data);

    // fetch("https://ipapi.co/json")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   });
  };

  if (localStorage.getItem("vendorReg")) {
    localStorage.removeItem("vendorReg");
  }

  
  const currency = (number, currency, lang = undefined) => 
  Intl.NumberFormat(lang, {style: 'currency', currency}).format(number)



  return (
    <div className="pt-0">
      <div className={navStretch ? "ml-240" : "ml-100"}>
        <div>
          <div>
            <div className="navBotMenu ">
              <ul>
                {categories.map((item, index) => (
                  <li
                    key={index}
                    className={
                      activeCategory === item.name ? "activeCategory" : ""
                    }
                    onClick={() => navigateToCourses(item.id, item.name)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <Action />
        <div className="container">
          {(courseData.length !== 0 || webinarCard.length !== 0) ? (
            <div className="rowGrid">
              {/* <button onClick={fnctest}>sasa</button> */}
              {webinarCard.length !== 0 ? (
                <>
                  {webinarCard.map((item, index) => (
                    <div
                      className="col-6 col-lg-8 col-md-12 col-sm-24  course-card"
                      key={index}
                    >
                      <LiveItems
                        name={item.name}
                        cover_img={item.cover_img}
                        id={item.id}
                        price={item.price}
                        type={item.type}
                        about={item.short_descr}
                        discount_price={item.discount_price}
                        lang={item.lang}
                        class={item.className}
                        start_time={String(item.start_time).replace(
                          "+05:00",
                          ""
                        )}
                        addedCart={stCartItem.some((cart) => cart == item.id)}
                        cartData={stCartData}
                        spekarName={`${item.speaker.f_name} ${item.speaker.l_name}`}
                        is_started={item.is_started}
                      />
                    </div>
                  ))}
                </>
              ) : null}

              {courseData.map((course, index) => (
                <div
                  key={index}
                  className="col-6 col-lg-8 col-md-12 col-sm-24  course-card"
                >
                  <CourseItem
                    key={index}
                    id={course.id}
                    video={course.video}
                    label={null}
                    title={course.name}
                    trainer={course.course_owner.full_name}
                    trainerId={course.course_owner.id}
                    rating={course.null}
                    ratersNumber={null}
                    graduates={course.enrolled_students}
                    priceLine={course.discount_price}
                    price={course.price}
                    dicountAvailable={null}
                    updated_at={course.updated_at}
                    level={course.level}
                    about={course.short_descr}
                    coverImg={course.cover_img}
                    recommendation={course.recommendation}
                    exchange_url={course.exchange_url}
                    ratings={course.course_rating}
                    key_words={course.key_words}
                    trailer_url={course.trailer_url}
                    trailer_file={course.trailer_file}
                    category={course.category}
                    subcategory={course.subcategory}
                    type={course.type}
                    lang={course.lang}
                    class={course.className}
                    cartItemsIds={cartItems}
                    isAddedToCart={cartItems.some((item) => item == course.id)}
                    isAddedToFav={favItems.some((item) => item == course.id)}
                    cartData={cartData}
                    favData={favData}
                    boughtCourses={boughtCourses}
                    is_top={course.is_top}
                    is_best={course.is_best}
                  />
                </div>
              ))}
            </div>
          ) : (
            <CoursesSkeleton />
          )}
        </div>
      </div>

      {!loggedIn
        ? voucherData.map(
            (num, index) =>
              num.name == "registr" && num.value !== 0 && (
                <div className="courRegPop">
                  <Collapse in={open}>
                    <Alert
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
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
                        <p style={{ fontSize: "18px" }}>
                          Hoziroq ro'yxatdan o'ting va {currency(parseInt(num.value) / 100, 'UZS').replace(/,/g, ".").slice(0, -3)}{" "} so'm <br />{" "}
                          vaucherga ega bo'ling
                        </p>
                      </strong>
                      <div
                        style={{ textAlign: "center", marginTop: "10px" }}
                      ></div>
                      <Button
                        className="alertBtn"
                        style={{
                          borderRadius: "15px",
                          backgroundColor: "rgba(0, 106, 255, 1)",
                        }}
                        variant="contained"
                        onClick={() => navigate("/register")}
                      >
                        Ro'yxatdan o'tish
                      </Button>
                    </Alert>
                  </Collapse>
                </div>
              )
          )
        : null}

      {loggedIn && !notfullProfile
        ? voucherData.map(
            (num, index) =>
              num.name === "full_account_voucher" && num.value !== 0 && (
                <div className="courRegPop">
                  <Collapse in={open}>
                    <Alert
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
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
                        <p style={{ fontSize: "18px" }}>
                          Profil malumotlarini to'ldiring va <br /> {currency(parseInt(num.value) / 100, 'UZS').replace(/,/g, ".").slice(0, -3)}{" "}
                          so'm vaucherga ega bo'ling
                        </p>
                      </strong>
                      <div
                        style={{ textAlign: "center", marginTop: "10px" }}
                      ></div>
                      <Button
                        className="alertBtn"
                        style={{
                          borderRadius: "15px",
                          backgroundColor: "rgba(0, 106, 255, 1)",
                        }}
                        variant="contained"
                        onClick={() => navigate("/profile")}
                      >
                        Profilni to'ldirish
                      </Button>
                    </Alert>
                  </Collapse>
                </div>
              )
          )
        : null}
    </div>
  );
}
