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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Courses() {
  const {
    navStretch,
    addedToCart,
    addedToFav,
    loggedIn,
    isremoved,
    boughtCourses,
  } = useContext(StateContext);
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const [categories, setCategories] = useState([]);

  const [courseData, setCourseData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState([]);

  const [favItems, setFavItems] = useState([]);
  const [favData, setFavData] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [stCartItem, setStCartItem] = useState([]);
  const [stCartData, setStCartData] = useState([]);

  const [webinarCard, setWebinarCart] = useState([]);

  const [voucherData, setVoucherData] = useState([]);
  const [fullProfile, setFullProfile] = useState(true)

  let profileDataFill;
  let nowRegisterAlert;

  const navigateToCourses = (id, name) => {
    name === "Barchasi" ? navigate("/") : navigate(`/courses/${id}`);
    localStorage.setItem("activeCategory", name);
  };

  const toastNotf = () => (<div>Click <a href="https://example.com">here</a> to visit a link.</div>)

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
            err.response.status && refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
  }, [addedToCart, isremoved]);

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
          err.response.status && refresh(err.response.status, err.response.status.text);
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
            err.response.status && refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
  }, [addedToCart, isremoved]);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v2/stream/webinar-list/`, {})
        .then((res) => setWebinarCart(res.data))
        .catch((err) => {
          err.response.status && refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, []);

  
  const updateToastData = (value) => {
    if(loggedIn) {
      profileDataFill = () => toast.info(`Profil malumotlarini to'ldiring va ${currency(parseInt(value) / 100, 'UZS').replace(/,/g, ".").slice(0, -3)} so'm vaucherga ega bo'ling`);
      profileDataFill()
    }else {
      nowRegisterAlert = () => toast.info(`Profil malumotlarini to'ldiring va ${currency(parseInt(value) / 100, 'UZS').replace(/,/g, ".").slice(0, -3)} so'm vaucherga ega bo'ling`);
      nowRegisterAlert()
    toastNotf()

    }
  }

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
            setFullProfile(!res.data.is_full)
          });
        } catch (error) {}
      }, []);
      
  useEffect(()=> {
    loggedIn && fullProfile && voucherData.forEach((item) => item.name === "full_account_voucher" && item.value !== 0 && updateToastData(item.value))
    !loggedIn && voucherData.forEach((item) => item.name === "registr" && item.value !== 0 && updateToastData(item.value))
  }, [voucherData, fullProfile])

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v2/courses/voucher/`, {})
        .then((res) => {
          setVoucherData(res.data);
        });
    } catch (error) {}
  }, []);

  

  const fnctest = async () => {

    const api = await axios.get("https://ipapi.co/json")

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
      <div className={navStretch ? "ml-240" : loggedIn && "ml-100"}>
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

      <div className={navStretch ? "courses ml-240" : loggedIn && "courses ml-100"}>
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
        <ToastContainer style={{ marginTop: "50px" }} limit={1}/>
    </div>
  );
}
