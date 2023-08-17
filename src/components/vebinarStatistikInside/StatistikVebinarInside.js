import React, { useContext, useEffect, useState } from "react";
import "./StatistikVebinarInside.css";
import Sidebar from "../Sidebar/Sidebar";
import NavbarDemo from "../Navbar/Navbar";
import NavbarSm from "../Navbar/NavbarSm";
import Footer from "../Footers/Footer";
import { StateContext } from "../../context/Context";
import SidebarActive from "../Sidebar/SidebarActive";
import {
  VebinarJoinedUsers, VebinarInfo
} from "../../Apis/ApiCourseInside";
import { useParams } from "react-router-dom";
import moment from "moment";


function StatistikVebinarInside(props) {

  const { id } = useParams();
  const { navStretch } = useContext(StateContext);
  const [VebinarStatInfo, setVebinarStatInfo] = useState("");
  const [VebinarInfos, setVebinarInfos] = useState('')
  const [streamStartTime, setStreamStartTime] = useState()
  const { user } = props;
 
  useEffect(() => {
    id && VebinarJoinedUsers(id).then((res) => { console.log(res.data); setVebinarStatInfo(res.data)});
    id && VebinarInfo(id).then((res) => {setStreamStartTime(res.data.start_time.replace('+05:00', '')); setVebinarInfos(res.data)});
  }, [id]);

  return (
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
                  {VebinarInfos.name && VebinarInfos.name}
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
                      <p>Boshlanish vaqti</p>
                      <h2>
                       {moment.utc(streamStartTime).format('Do - MMMM, HH:mm')}
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
                        {VebinarStatInfo && VebinarStatInfo.length}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-8 col-lg-12 col-sm-24 mb-lg-30">
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
                  </div>
                </div>
              </div> */}
          
            </div> 

            <section className="loadedCoursesscroll">
              <h3>Vebinarda qatnashganlar ma’lumotlari</h3>
              <div className="rowGrid">
                <div className="tableList">
                  <table>
                    <tr className="topTitle">
                      <th className="col-5">Foydalanuvchi</th>
                      <th className="col-5">Telefon raqam</th>
                      {/* <th className="col-5">Birinchi foydalanish</th>
                      <th className="col-4">Kirishlar soni</th>
                      <th className="col-5">Summa</th> */}
                    </tr>
                    {VebinarStatInfo && VebinarStatInfo.map((data) => (
                      <tr className="bodyTitle">
                        <td className="col-5 ">
                          {data && data.user.f_name}
                          <span> {data && data.user.l_name}</span>
                        </td>
                        <td className="col-5">+ {data && data.user.phone_number}</td>
                       

                       {/* <td className="col-5">
                         {moment(data && data.user.date_joined).format(
                            "Do-MM-YYYY LTS"
                          )}
                        </td>
                        <td className="col-4">
                          {moment(data && data.user.last_login).format(
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
                        </td>   */}


                      </tr>
                    ))}
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

export default StatistikVebinarInside;
