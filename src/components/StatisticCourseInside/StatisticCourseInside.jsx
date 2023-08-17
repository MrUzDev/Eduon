import React, { useContext, useEffect, useState } from "react";
import "./StatisticCourseInside.css";
// import SidebarActive from "../Sidebar/SidebarActive";
// import { useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import NavbarDemo from "../Navbar/Navbar";
import NavbarSm from "../Navbar/NavbarSm";
import Footer from "../Footers/Footer";
import { StateContext } from "../../context/Context";
import SidebarActive from "../Sidebar/SidebarActive";
import {
  StudentCourseInside,
  exchangeRateGain,
  statisticCourses,
} from "../../Apis/ApiCourseInside";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/uz-latn";
function StatisticCourseInside(props) {
  const { id } = useParams();
  const { navStretch } = useContext(StateContext);
  const [courseInside, setCourseIndide] = useState([]);
  // console.log(courseInside);
  const [exchangeRate, setExchangeRate] = useState("");
  const [courseInfo, setCourseInfo] = useState("");
  const { user } = props;
  // console.log(exchangeRate);
  // console.log(exchangeRate);

  useEffect(() => {
    id && StudentCourseInside(id).then((res) => setCourseIndide(res.data));
    id && exchangeRateGain(id).then((res) => setExchangeRate(res.data));
    id && statisticCourses(id).then((res) => setCourseInfo(res.data));
  }, [id]);
  // console.log(courseInfo && courseInfo);
  // useEffect(() => {}, []);

  // console.log(id)
  return (
    // <section id="CRMbiznes"  classNameName={navStretch ? "ml-240" : "ml-100"}>
    <>
      <NavbarDemo />
      <NavbarSm />
      {user ? user.is_speaker ? <SidebarActive /> : <Sidebar /> : <Sidebar />}
      {/* <Sidebar /> */}
      <div className={navStretch ? "ml-240" : "ml-100"}>
        <div className="statisticCourseInside">
          <div className="container">
            <div className="headerRow rowGrid">
              <div className="col-24 col-sm-24">
                <h1 className="statisticCourseInsideTitle">
                  {courseInfo.name && courseInfo.name}
                </h1>
              </div>
            </div>
            <div className="boxes_line rowGrid">
              <div className="col-8 col-lg-12 col-sm-24 mb-lg-30">
                <div className="box">
                  <div className="box_item">
                    {/* <img src={walet} alt="" /> */}
                    <div className="img">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.5 13.7502C9.5 14.7202 10.25 15.5002 11.17 15.5002H13.05C13.85 15.5002 14.5 14.8202 14.5 13.9702C14.5 13.0602 14.1 12.7302 13.51 12.5202L10.5 11.4702C9.91 11.2602 9.51001 10.9402 9.51001 10.0202C9.51001 9.18023 10.16 8.49023 10.96 8.49023H12.84C13.76 8.49023 14.51 9.27023 14.51 10.2402"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 7.5V16.5"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17 3V7H21"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 2L17 7"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="box_p">
                      <p>Kurs daromadi</p>
                      <h2>
                        {exchangeRate.sum &&
                          exchangeRate.sum.toLocaleString("uz-Uz", {
                            currency: "UZS",
                            style: "currency",
                          })}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-8 col-lg-12 col-sm-24 mb-lg-30">
                <div className="box">
                  <div className="box_item">
                    {/* <img src={walet} alt="" /> */}
                    <div className="img">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.0495 2.52979L4.02953 6.45979C2.09953 7.71979 2.09953 10.5398 4.02953 11.7998L10.0495 15.7298C11.1295 16.4398 12.9095 16.4398 13.9895 15.7298L19.9795 11.7998C21.8995 10.5398 21.8995 7.72979 19.9795 6.46979L13.9895 2.53979C12.9095 1.81979 11.1295 1.81979 10.0495 2.52979Z"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.63012 13.0801L5.62012 17.7701C5.62012 19.0401 6.60012 20.4001 7.80012 20.8001L10.9901 21.8601C11.5401 22.0401 12.4501 22.0401 13.0101 21.8601L16.2001 20.8001C17.4001 20.4001 18.3801 19.0401 18.3801 17.7701V13.1301"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21.4004 15V9"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="box_p">
                      <p>O’quvchilar soni</p>
                      <h2>
                        {courseInfo && courseInfo.enrolled_students
                          ? courseInfo.enrolled_students
                          : 0}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-8 col-lg-12 col-sm-24 mb-lg-30">
                <div className="box">
                  <div className="box_item">
                    <div className="img">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 2V19C2 20.66 3.34 22 5 22H22"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 17L9.59 11.64C10.35 10.76 11.7 10.7 12.52 11.53L13.47 12.48C14.29 13.3 15.64 13.25 16.4 12.37L21 7"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="box_p">
                      <p>Kurs reytingi</p>
                      <h2>
                        {courseInfo &&
                          (courseInfo.course_rating.five_rating +
                            courseInfo.course_rating.four_rating +
                            courseInfo.course_rating.three_rating +
                            courseInfo.course_rating.five_rating +
                            courseInfo.course_rating.one_rating) /
                            courseInfo.course_rating.voters_number}
                        (
                        {courseInfo && courseInfo.course_rating.voters_number
                          ? courseInfo.course_rating.voters_number
                          : 0}
                        )
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-6 col-lg-12 col-sm-24 mb-lg-30">
                <div className="box">
                  <div className="box_item">
                    <div className="img">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.5 12.5C19.5 11.12 20.62 10 22 10V9C22 5 21 4 17 4H7C3 4 2 5 2 9V9.5C3.38 9.5 4.5 10.62 4.5 12C4.5 13.38 3.38 14.5 2 14.5V15C2 19 3 20 7 20H17C21 20 22 19 22 15C20.62 15 19.5 13.88 19.5 12.5Z"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 14.75L15 8.75"
                          stroke="#1C1C1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.9945 14.75H15.0035"
                          stroke="#1C1C1C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.99451 9.25H9.00349"
                          stroke="#1C1C1C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="box_p">
                      <p>Kurs promo kodlari</p>
                      <h2>341</h2>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            {/* <div className="divScrool">
              <div className="statisticCourseInsideVauchers">
                <h3>Ma'lumotlar</h3>
                <div className="borderBott ">
                  <div className="rowGrid  align-center justify-between">
                    <div className="col-5">
                      <h3>Foydalanuvchi</h3>
                    </div>
                    <div className="col-5">
                      <h3>Telefon raqam</h3>
                    </div>
                    <div className="col-5">
                      <h3>Birinchi foydalanish</h3>
                    </div>
                    <div className="col-4">
                      <h3>Kirishlar soni</h3>
                    </div>
                    <div className="col-5">
                      <h3>Summa</h3>
                    </div>
                  </div>
                </div>
                {courseInside.map((data) => (
                  <div className="borderBott">
                    <div className="rowGrid align-center justify-between ">
                      <div className="col-5">
                        <p>
                          {data && data.f_name}
                          <span> {data && data.l_name}</span>
                        </p>
                      </div>
                      <div className="col-5">
                        <p>+ {data && data.phone_number}</p>
                      </div>
                      <div className="col-5">
                        <p>
                          {moment(data && data.date_joined).format(
                            "Do-MM-YYYY LTS"
                          )}
                        </p>
                      </div>
                      <div className="col-4">
                        <p>
                          {moment(data && data.last_login).format(
                            "Do-MM-YYYY LTS"
                          )}
                        </p>
                      </div>
                      <div className="col-5">
                        <p className="flexD">
                          {data.course_total_price
                            ? data.course_total_price
                                .toLocaleString("uz-Uz", {
                                  currency: "UZS",
                                  style: "currency",
                                })
                                .replace("UZS", " ")
                            : 0}
                          <span> UZS </span> <br />
                          <span className="vauch">
                            {data.user_voucher_amount ? (
                              data.user_voucher_amount
                                .toLocaleString("uz-Uz", {
                                  currency: "UZS",
                                  style: "currency",
                                })
                                .replace("UZS", " ")
                            ) : (
                              <span style={{ fontSize: "12px" }}> 0 </span>
                            )}
                            <span style={{ fontSize: "12px" }}>
                              UZS Vaucher{" "}
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            <section className="loadedCoursesscroll">
              <h3>Studentlar ma’lumotlari</h3>
              <div className="rowGrid">
                <div className="tableList">
                  <table>
                    <tr className="topTitle">
                      <th className="col-5">Foydalanuvchi</th>
                      <th className="col-5">Telefon raqam</th>
                      <th className="col-5">Birinchi foydalanish</th>
                      <th className="col-4">Kirishlar soni</th>
                      <th className="col-5">Summa</th>
                    </tr>
                    {courseInside.map((data) => (
                      <tr className="bodyTitle">
                        <td className="col-5 ">
                          {data && data.f_name}
                          <span> {data && data.l_name}</span>
                        </td>
                        <td className="col-5">+ {data && data.phone_number}</td>
                        <td className="col-5">
                          {moment(data && data.date_joined).format(
                            "Do-MM-YYYY LTS"
                          )}
                        </td>
                        <td className="col-4">
                          {moment(data && data.last_login).format(
                            "Do-MM-YYYY LTS"
                          )}
                        </td>
                        <td className="col-5 ">
                          <span className="vauch">
                            {data.course_total_price
                              ? (parseInt(data.course_total_price) / 100)
                                  .toLocaleString("uz-Uz", {
                                    currency: "UZS",
                                    style: "currency",
                                  })
                                  .replace("UZS", " ")
                              : 0}
                          </span>
                          <span> UZS </span> <br />
                          <span className="syllabic">
                            {data.user_voucher_amount ? (
                              data.user_voucher_amount
                                .toLocaleString("uz-Uz", {
                                  currency: "UZS",
                                  style: "currency",
                                })
                                .replace("UZS", " ")
                            ) : (
                              <span style={{ fontSize: "12px" }}> 0</span>
                            )}
                            <span style={{ fontSize: "12px" }}>
                              UZS Vaucher
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                    {/* <tr className="bodyTitle">
                      <td>asdjfbdsh</td>
                      <td>alkfnkldanafdsk</td>
                      <td>a,sdfmklsdmfd</td>
                      <td>ads,mflsdmfdas</td>
                      <td className="vauch">a,sdmfsdm</td>
                    </tr> */}
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StatisticCourseInside;
