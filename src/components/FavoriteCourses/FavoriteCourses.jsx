import axios from "../../Apis/api";
import React, { useContext, useEffect, useState } from "react";
import "./FavoriteCourses.css";
import { useNavigate } from "react-router-dom";
// import courseImg from "./img/Rectangle 7.png";
import courseReact from "./img/Rectangle 96.png";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
// import { StateContext } from "../../context/Context";
import { BounceLoader } from "react-spinners";
import { StateContext } from "../../context/Context";
import Sidebar from "../Sidebar/Sidebar";
// import SidebarActive from "../Sidebar/SidebarActive";
import SidebarSm from "../Sidebar/SidebarSm";
  
function FavoriteCourses() {
  const [favCourses, setfavCourses] = useState([]);
  const [loader, setLoader] = useState(true);
  const [boughtCourses, setboughtCourses] = useState([]);

  const { loggedIn } = useContext(StateContext);

  const navigate = useNavigate();

  const singleCourse = (e, id) => {
    e.preventDefault();
    navigate(`/chosenCourse/${id}`);
  };
  // const speakerAbout = (e, id) => {
  //   e.preventDefault();
  //   navigate(`/chosenCourse/${id}`);
  // };
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
            setfavCourses(res.data);
            console.log(res.data);
            setTimeout(() => {
              setLoader(false);
            }, 100);
          });
    } catch (error) {}
  }, []);
  const addToCart = async (e, id) => {
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
            navigate("/cart");
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          }));
    } catch (error) {}
  };
  useEffect(() => {
    try {
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
          setboughtCourses(res.data);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, []);

  return (
    <>
     <Sidebar active={3} />
      <SidebarSm active={3} />
    <div className="FavoriteCourses">
      <div style={{ margin: "0px" }} className="Courserow rowGrid">
        {favCourses.length !== 0 ? (
          favCourses.map((favorites, index) => (
            <div
              key={index}
              className="second_card col-6 col-lg-8 col-md-12 col-sm-24"
            >
              <div className="smFavoiteCard">
                <img
                  src={
                    favorites.cover_img
                      ? `${process.env.REACT_APP_API_KEY}${favorites.cover_img}`
                      : courseReact
                  }
                  alt="..."
                />
                <div className="smFavoriteText">
                  <h4 onClick={(e) => singleCourse(e, favorites.id)}>
                    {favorites.name.length > 20
                      ? favorites.name.slice(0, 40) + "..."
                      : favorites.name}
                  </h4>
                  <p onClick>{favorites.course_owner.full_name}</p>
                </div>
              </div>
              <div
                onClick={(e) => singleCourse(e, favorites.id)}
                className="reviews"
              >
                <div className="left">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.73 2.51L14.49 6.03C14.73 6.52 15.37 6.99 15.91 7.08L19.1 7.61C21.14 7.95 21.62 9.43 20.15 10.89L17.67 13.37C17.25 13.79 17.02 14.6 17.15 15.18L17.86 18.25C18.42 20.68 17.13 21.62 14.98 20.35L11.99 18.58C11.45 18.26 10.56 18.26 10.01 18.58L7.02 20.35C4.88 21.62 3.58 20.67 4.14 18.25L4.85 15.18C4.98 14.6 4.75 13.79 4.33 13.37L1.85 10.89C0.390001 9.43 0.860001 7.95 2.9 7.61L6.09 7.08C6.62 6.99 7.26 6.52 7.5 6.03L9.26 2.51C10.22 0.6 11.78 0.6 12.73 2.51Z"
                      fill="#006AFF"
                      stroke="#006AFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p>
                    {favorites.course_rating.rating + " "}
                    <span className="t-gray">
                      {" "}
                      ({favorites.course_rating.voters_number})
                    </span>
                  </p>
                </div>
                <div className="right">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.05 2.53L4.02999 6.46C2.09999 7.72 2.09999 10.54 4.02999 11.8L10.05 15.73C11.13 16.44 12.91 16.44 13.99 15.73L19.98 11.8C21.9 10.54 21.9 7.73 19.98 6.47L13.99 2.54C12.91 1.82 11.13 1.82 10.05 2.53Z"
                      stroke="#006AFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.63 13.08L5.62 17.77C5.62 19.04 6.6 20.4 7.8 20.8L10.99 21.86C11.54 22.04 12.45 22.04 13.01 21.86L16.2 20.8C17.4 20.4 18.38 19.04 18.38 17.77V13.13"
                      stroke="#006AFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.4 15V9"
                      stroke="#006AFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>{favorites.enrolled_students}</p>
                </div>
              </div>
              <div className="footer-row">
                {favorites.type === "PAID" ? (
                  <div onClick={(e) => singleCourse(e, favorites.id)}>
                    <div className="price mr-20">
                      {favorites.discount_price ? (
                        <>
                          {" "}
                          <span className="t-gray line-through">
                            {favorites.price
                              ? favorites.price
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
                            {(parseInt(favorites.price) - parseInt(favorites.discount_price))
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
                          {favorites.price
                            ? favorites.price
                                .toLocaleString("uz-UZ", {
                                  style: "currency",
                                  currency: "UZS",
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                })
                                .replace(",", " ")
                            : 0}
                          <span className="gray ml-5"></span>
                        </p>
                      )}
                    </div>
                    {favorites.dicountAvailable ? (
                      <div className="price">
                        <span className="t-gray">Chegirma tugashi</span>
                        <p>{favorites.dicountAvailable}</p>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="price">
                    <p>Bepul</p>
                  </div>
                )}
              </div>
              {boughtCourses.some((item) => item.course.id == favorites.id) ? (
                <button
                  onClick={() => navigate(`/watch/${favorites.id}`)}
                  className="begin_course_btn"
                >
                  Kursni davom ettirish
                </button>
              ) : (
                <button
                  onClick={(e) => addToCart(e, favorites.id)}
                  className="begin_course_btn"
                >
                  {/* Kursni boshlash */}
                  Savatchaga qo'shish
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="col-24">
            <p style={{ textDecoration: "none" }} className="alertMessage">
              Sizda sevimli kurslar mavjud emas
            </p>
          </div>
        )}
      </div>
      {loader && (
        <div className="loader">
          <BounceLoader color="#006AFF" speedMultiplier={1.2} />
        </div>
      )}
    </div>
    </>
  );
}

export default FavoriteCourses;
