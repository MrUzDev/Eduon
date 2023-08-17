import React, { useContext, useEffect, useState } from "react";
import "./AboutPremium.css";
import { StateContext } from "../../context/Context";
import axios from "../../Apis/api";
import SidebarActive from "../Sidebar/SidebarActive";
import Sidebar from "../Sidebar/Sidebar";
import NavbarDemo from "../Navbar/Navbar";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import NavbarSm from "../Navbar/NavbarSm";
import prImgBox1 from "../../assets/images/aboutPremium/imgbox1.png";
import prImgBox12 from "../../assets/images/aboutPremium/imgbox1.2.png";
import prImgBox2 from "../../assets/images/aboutPremium/imgbox2.png";
import prImgBox22 from "../../assets/images/aboutPremium/imgbox2.2.png";
import prImgBox3 from "../../assets/images/aboutPremium/imgbox3.png";
import prImgBox4 from "../../assets/images/aboutPremium/imgbox4.png";
import prImgBox5 from "../../assets/images/aboutPremium/imgbox5.png";
import TextField from "@mui/material/TextField";


function AboutPremium(props) {
  const { navStretch, responseData, setresponseData, loggedIn } =
    useContext(StateContext);
  const [status, setStatus] = useState(null);

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
            setresponseData(res.data);
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
    setStatus(JSON.parse(localStorage.getItem("status")));
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <NavbarSm />
      <NavbarDemo />
      {status ? <SidebarActive active={3} /> : <Sidebar />}
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="about-premium container">
          <div className="about-premium-title">
            <p>LMS premium nima?</p>
            <h2>LMS premium haqida batafsil</h2>
          </div>
          <div className="about-premium-content-box">
           <div className="sm-container-pr">
           <div className="about-pr-box1-container">
              <div className="about-pr-box about-pr-box-con">
                <h3>To’lov tizimi</h3>
                <p>
                  Bizning platformamizda hozirda aktual bo’lgan HUMO, UZCARD,
                  Click va Payme to’lov tizimlari orqali to’lovni amalga
                  oshirish imkoniyati mavjud!
                </p>
              </div>
              <div className="about-pr-box">
                <img src={prImgBox1} />
              </div>
              <div className="about-pr-box about-pr-box-con">
                <h3>Platformani o’zingizga moslashtiring</h3>
                <p>
                  Kursingizda o’qiyotgan o’quvchilaringiz bilan to’gridan to’gri
                  va guruh chatlarida muloqot qilishingiz, fayllar, audio
                  fayllar ham platformaning o’zida yubora olish imkoniyati
                </p>
              </div>
              <div className="about-pr-box">
                <img src={prImgBox12} alt="" />
              </div>
            </div>
            <div className="about-pr-box2-container">
              <div className="about-pr-box">
                <img src={prImgBox2} />
              </div>
              <div className="about-pr-box about-pr-box-con">
                <h3>Vebinar yaratish imkoni</h3>
                <p>
                  Agar siz onlayn dars olib borsangiz yoki o’quvchilaringiz
                  bilan onlayn translyatsiya qilmoqchi bo’lshaniz vebinar
                  yaratib bu ishni bemalol amalga oshirishingiz mumkin bo’ladi.
                </p>
              </div>
              <div className="about-pr-box">
                <img src={prImgBox22} alt="" />
              </div>
            </div>
           </div>

            <div className="about-pr-box3-container">
              <div className="full-about-pr">
                <div className="about-pr-box about-pr-box-con">
                  <h3>O’quvchilarning to’liq statistikasi</h3>
                  <p>
                    Agar siz onlayn dars olib borsangiz yoki o’quvchilaringiz
                    bilan onlayn translyatsiya qilmoqchi bo’lshaniz vebinar
                    yaratib bu ishni bemalol amalga oshirishingiz mumkin
                    bo’ladi.
                  </p>
                </div>
              </div>

              <div className="contents-display">
                <div className="about-pr-box about-pr-box-con">
                  <h3>O’quvchilar bilan chat orqali muloqot</h3>
                  <p>
                  Kursingizda o’qiyotgan o’quvchilaringiz bilan to’gridan to’gri va guruh chatlarida muloqot qilishingiz, fayllar, audio fayllar ham platformaning o’zida yubora olish imkoniyati
                  </p>
                </div>

                <div className="about-pr-box ">
                  <img src={prImgBox3} />
                </div>
              </div>

              <div className="full-about-pr">
                <div className="about-pr-box ">
                  <img src={prImgBox4} alt="" />
                </div>
              </div>


              <div className="contents-display contents-displays">
                <div className="about-pr-box about-pr-box-con">
                  <h3>Umumiy statistikani kuzatish va tahlil qilish</h3>
                  <p>
                  Siz o’quvchilaringiz haqidagi statistikadan tashqari umumiy o’zingiznig profilingiz haqidagi umumiy statistikalarni: o’quvchilar soni, umumiy tushum va shu kabi ko’plab boshqa statistikalarni ko’rish imkoni beriladi
                  </p>
                </div>

                <div className="about-pr-box">
                  <img src={prImgBox5} />
                </div>
              </div>
            </div>
          </div>

          <div className="school-name-input-container">
          <TextField id="sch-input" label="Sizning onlayn maktabingiz nomi" variant="outlined" />
          <button className="start-btn">Boshlash</button>

          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPremium;
