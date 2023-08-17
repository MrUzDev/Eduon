import React, { useContext, useEffect, useState } from "react";
import VendorSchoolSidebar from "../VendorSchoolSidebar/VendorSchoolSidebar";
import VendorSchoolNavbar from "../VendorSchoolNavbar/VendorSchoolNavbar";
import { StateContext } from "../../context/Context";
import "./VendorSchoolAllCourses.css";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";


export default function VendorSchoolAllCourses() {
  const { sidebarOpen, setAddMoneyModal } = useContext(StateContext);
  const [manualVideo, setManualVideo] = React.useState();
  const [showTable, setShowTable] = useState(true);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "15px",
      zIndex: "2",
      width: "600px",
    },
  };

  return (
    <div>
      <VendorSchoolNavbar />
      <VendorSchoolSidebar active={"AllCourses"} />

      <div
        className={`${
          sidebarOpen ? "vs-content" : "vs-content-noactive"
        } vs-big-container allCourses`}
      >
        <div className="container">
          <div className="flex justify-between align-center mb-24 vs-title-video-box">
            <div className="vendor-title">
              <h2 className="text-black">Barcha kurslar</h2>
            </div>
            <div onClick={() => setManualVideo(true)}>
              <button className="vendor-btn bg-red flex align-center justify-center radius10 pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  className="mr-10"
                >
                  <path
                    d="M17.999 3C9.71902 3 2.99902 9.72 2.99902 18C2.99902 26.28 9.71902 33 17.999 33C26.279 33 32.999 26.28 32.999 18C32.999 9.72 26.279 3 17.999 3ZM21.989 20.595L20.069 21.705L18.149 22.815C15.674 24.24 13.649 23.07 13.649 20.22V18V15.78C13.649 12.915 15.674 11.76 18.149 13.185L20.069 14.295L21.989 15.405C24.464 16.83 24.464 19.17 21.989 20.595Z"
                    fill="#fff"
                  />
                </svg>
                Video qo’llanma
              </button>
            </div>
          </div>

          <div className="mb-24 vs-prog">
            {!showTable ? (
              <div className="vs-module-container">
                <div className="rowGrid">
                  <div className="col-6 col-md-12 col-sm-24 mb-24">
                    <div className="vs-module-box">
                      <div className="vs-module-header">
                        <div className="vs-module-header-title">
                          <h2>Modul - 1</h2>
                        </div>
                        <div className="vs-module-header-tn flex">
                          <span>12</span>
                          <p>darslar soni</p>
                        </div>
                      </div>
                      <div className="vs-module-body flex align-center justify-center">
                        <div className="mb-24">
                          <div className="vs-module-body-title">
                            <h6>O'quv programmasi:</h6>
                          </div>
                          <div className="vs-module-body-container">
                            <p>1 - Kirish</p>
                            <p>2 - Bir burun qoidasi</p>
                            <p>3 - Voronka</p>
                            <p>4 - Klient portreti</p>
                            <p>5 - Kirish</p>
                            <p>6 - Bir burun qoidasi</p>
                            <p>7 - Voronka</p>
                            <p>8 - Klient portreti</p>
                            <p>9 - Kirish</p>
                            <p>10 - Bir burun qoidasi</p>
                            <p>11 - Voronka</p>
                            <p>12 - Klient portreti</p>
                          </div>
                        </div>
                        <button
                          className="sv-black-btn"
                          onClick={() => setShowTable(true)}
                        >
                          Batafsil
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-12 col-sm-24 mb-24">
                    <div className="vs-module-box">
                      <div className="vs-module-header">
                        <div className="vs-module-header-title">
                          <h2>Modul - 1</h2>
                        </div>
                        <div className="vs-module-header-tn flex">
                          <span>12</span>
                          <p>darslar soni</p>
                        </div>
                      </div>
                      <div className="vs-module-body flex align-center justify-center">
                        <div className="mb-24">
                          <div className="vs-module-body-title">
                            <h6>O'quv programmasi:</h6>
                          </div>
                          <div className="vs-module-body-container">
                            <p>1 - Kirish</p>
                            <p>2 - Bir burun qoidasi</p>
                            <p>3 - Voronka</p>
                            <p>4 - Klient portreti</p>
                            <p>5 - Kirish</p>
                            <p>6 - Bir burun qoidasi</p>
                            <p>7 - Voronka</p>
                            <p>8 - Klient portreti</p>
                            <p>9 - Kirish</p>
                            <p>10 - Bir burun qoidasi</p>
                            <p>11 - Voronka</p>
                            <p>12 - Klient portreti</p>
                          </div>
                        </div>
                        <button
                          className="sv-black-btn"
                          onClick={() => setShowTable(true)}
                        >
                          Batafsil
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-12 col-sm-24 mb-24">
                    <div className="vs-module-box">
                      <div className="vs-module-header">
                        <div className="vs-module-header-title">
                          <h2>Modul - 1</h2>
                        </div>
                        <div className="vs-module-header-tn flex">
                          <span>12</span>
                          <p>darslar soni</p>
                        </div>
                      </div>
                      <div className="vs-module-body flex align-center justify-center">
                        <div className="mb-24">
                          <div className="vs-module-body-title">
                            <h6>O'quv programmasi:</h6>
                          </div>
                          <div className="vs-module-body-container">
                            <p>1 - Kirish</p>
                            <p>2 - Bir burun qoidasi</p>
                            <p>3 - Voronka</p>
                            <p>4 - Klient portreti</p>
                            <p>5 - Kirish</p>
                            <p>6 - Bir burun qoidasi</p>
                            <p>7 - Voronka</p>
                            <p>8 - Klient portreti</p>
                            <p>9 - Kirish</p>
                            <p>10 - Bir burun qoidasi</p>
                            <p>11 - Voronka</p>
                            <p>12 - Klient portreti</p>
                          </div>
                        </div>
                        <button
                          className="sv-black-btn"
                          onClick={() => setShowTable(true)}
                        >
                          Batafsil
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-12 col-sm-24 mb-24">
                    <div className="vs-module-box">
                      <div className="vs-module-header">
                        <div className="vs-module-header-title">
                          <h2>Modul - 1</h2>
                        </div>
                        <div className="vs-module-header-tn flex">
                          <span>12</span>
                          <p>darslar soni</p>
                        </div>
                      </div>
                      <div className="vs-module-body flex align-center justify-center">
                        <div className="mb-24">
                          <div className="vs-module-body-title">
                            <h6>O'quv programmasi:</h6>
                          </div>
                          <div className="vs-module-body-container">
                            <p>1 - Kirish</p>
                            <p>2 - Bir burun qoidasi</p>
                            <p>3 - Voronka</p>
                            <p>4 - Klient portreti</p>
                            <p>5 - Kirish</p>
                            <p>6 - Bir burun qoidasi</p>
                            <p>7 - Voronka</p>
                            <p>8 - Klient portreti</p>
                            <p>9 - Kirish</p>
                            <p>10 - Bir burun qoidasi</p>
                            <p>11 - Voronka</p>
                            <p>12 - Klient portreti</p>
                          </div>
                        </div>
                        <button
                          className="sv-black-btn"
                          onClick={() => setShowTable(true)}
                        >
                          Batafsil
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="vendor-school-price-table">
                <table>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th className="sm-bg-brand-color-2">
                      <button className="vendor-btn">Eng yaxshi taklif</button>
                    </th>
                    <th></th>
                  </tr>
                  <tr>
                    <th></th>
                    <th>Modul SM-1</th>
                    <th>Modul SM-2</th>
                    <th className="sm-bg-brand-color-2">Modul SM-3</th>
                    <th>Modul SM-4</th>
                  </tr>
                  <tr>
                    <th></th>
                    <th>
                      <button
                        onClick={() => {
                          setAddMoneyModal(true);
                        }}
                        className="vendor-btn"
                      >
                        To'lov qilish
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => {
                          setAddMoneyModal(true);
                        }}
                        className="vendor-btn"
                      >
                        To'lov qilish
                      </button>
                    </th>
                    <th className="sm-bg-brand-color-2">
                      <button
                        onClick={() => {
                          setAddMoneyModal(true);
                        }}
                        className="vendor-btn"
                      >
                        To'lov qilish
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => {
                          setAddMoneyModal(true);
                        }}
                        className="vendor-btn"
                      >
                        To'lov qilish
                      </button>
                    </th>
                  </tr>

                  <tr>
                    <td>Davomiyligi:</td>
                    <td>1 oy</td>
                    <td>2 oy</td>
                    <td className="sm-bg-brand-color-2">3 oy</td>
                    <td>4 oy</td>
                  </tr>
                  <tr>
                    <td>Online darslar:</td>
                    <td>8 ta</td>
                    <td>16 ta</td>
                    <td className="sm-bg-brand-color-2">24 ta</td>
                    <td>32 ta</td>
                  </tr>
                  <tr>
                    <td>Mehmon spikerlar: (Online|Offline)</td>
                    <td>3 ta</td>
                    <td>6 ta</td>
                    <td className="sm-bg-brand-color-2">9 ta</td>
                    <td>12 ta</td>
                  </tr>
                  <tr>
                    <td>Offline Workshoplar:</td>
                    <td>8 ta</td>
                    <td>16 ta</td>
                    <td className="sm-bg-brand-color-2">24 ta</td>
                    <td>32 ta</td>
                  </tr>
                  <tr>
                    <td>Imtihonlar (Online|Offline):</td>
                    <td>1 ta</td>
                    <td>2 ta</td>
                    <td className="sm-bg-brand-color-2">3 ta</td>
                    <td>4 ta</td>
                  </tr>
                  <tr>
                    <td>Jami online darslar:</td>
                    <td>20 ta</td>
                    <td>40 ta</td>
                    <td className="sm-bg-brand-color-2">60 ta</td>
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

                    <td className="sm-bg-brand-color-2">
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
                    <td className="sm-bg-brand-color-2">~ 2 mln sum</td>
                    <td>~ 2 mln sum</td>
                  </tr>

                  <tr>
                    <td>Ish topishga yordam</td>
                    <td>一</td>
                    <td>一</td>
                    <td className="sm-bg-brand-color-2">
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
                    <td className="sm-bg-brand-color-2">~ 3 mln + sum</td>
                    <td>~ 4 mln + sum</td>
                  </tr>

                  <tr>
                    <td>Bahosi:</td>
                    <td>4 900 000</td>
                    <td>4 900 000</td>
                    <td className="sm-bg-brand-color-2">4 900 000</td>
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
                    <td className="sm-bg-brand-color-2">
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
                    <td className="sm-bg-brand-color-2">15%</td>
                    <td>20%</td>
                  </tr>

                  <tr>
                    <td>Chegirmada tejaladigan summa:</td>
                    <td>245 000</td>
                    <td>980 000</td>
                    <td className="sm-bg-brand-color-2">2 205 000</td>
                    <td>3 920 000</td>
                  </tr>

                  <tr>
                    <td>Chegirmadan keyingi summa:</td>
                    <td>4 655 000</td>
                    <td>8 820 000</td>
                    <td className="sm-bg-brand-color-2">12 495 000</td>
                    <td>15 680 000</td>
                  </tr>

                  <tr>
                    <td>1 oyga to`g`ri keladigan summa:</td>
                    <td>4 655 000</td>
                    <td>4 410 000</td>
                    <td className="sm-bg-brand-color-2">4 165 000</td>
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
                    <td className="sm-bg-brand-color-2">
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
                    <td className="sm-bg-brand-color-2">
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
                          setAddMoneyModal(true);
                        }}
                        className="vendor-btn"
                      >
                        To'lov qilish
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => {
                          setAddMoneyModal(true);
                        }}
                        className="vendor-btn"
                      >
                        To'lov qilish
                      </button>
                    </th>
                    <th className="sm-bg-brand-color-2">
                      <button
                        onClick={() => {
                          setAddMoneyModal(true);
                        }}
                        className="vendor-btn"
                      >
                        To'lov qilish
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => {
                          setAddMoneyModal(true);
                        }}
                        className="vendor-btn"
                      >
                        To'lov qilish
                      </button>
                    </th>
                  </tr>
                </table>
              </div>
            )}

          </div>
        </div>
      </div>

      <Modal
        isOpen={manualVideo}
        onRequestClose={() => setManualVideo(false)}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        id="modal"
      >
        <div className="iconButtonModal">
          <IconButton
            aria-label="close"
            color="inherit"
            size="normal"
            onClick={() => {
              setManualVideo(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div
          style={{
            background: "#fff",
            position: "relative",
            overflowY: "hidden",
          }}
        >
          <iframe
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "10px",
              margin: "20px 0",
            }}
            src="https://www.youtube.com/embed/z6S3J45rTrg"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>

          <p style={{ color: "#000", fontSize: "22px" }}>
            Barcha kurslar haqida video qo’llanma
          </p>
        </div>
      </Modal>
    </div>
  );
}
