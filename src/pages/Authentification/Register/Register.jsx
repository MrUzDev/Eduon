import React, { useContext, useEffect, useState } from "react";
import "../Login/Login.css";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { StateContext } from "../../../context/Context";
import axios from "../../../Apis/api";
import ReportIcon from "@mui/icons-material/Report";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import NavbarFalse from "../../../components/NavbarFalse/NavbarFalse";
import NavbarSm from "../../../components/Navbar/NavbarSm";

export default function Register() {
  const { phoneNumber, setPhoneNumber, setToken, token } = useContext(StateContext);
  const [countryCode , setCountryCode] = useState('')
  const [check, setcheck] = useState(false);
  const [againRes, setAgainRes] = useState(false)
  const navigate = useNavigate();




  useEffect(() => {

    if(!localStorage.getItem('referalToken')) {
      const tokenReg = window.location.href.replace('https://eduon.uz/register/', '').replace('http://localhost:3000/register/', '').replace('https://front.eduon-test.uz/register/', '');
      localStorage.setItem('referalToken', tokenReg);
    }
  }, [])
  
    useEffect(() => {
      if(phoneNumber) {
        phoneNumber.length >= 12 ? setcheck(false) : setcheck(true)
      }
    }, [phoneNumber])
  
  const sendddata = async () => {

    const formData = new FormData();
    // formData.append("mobile", phoneNumber);
    // formData.append("region", '');
    // formData.append('is_forgot', false)

   try {
    check === false && await axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v2/accounts/step-one/`,
          {
         mobile: phoneNumber,
         region: '',
         is_forgot: false
          }
        )
        .then((res) => {
          setToken(res.data.otp_generated);
          res.data.success
            ? navigate("/verify")
            : navigate("/register"); console.log(res.data.status); setAgainRes(true)
          localStorage.setItem("mobile", phoneNumber);
        })
        .catch((err) => {});
    } catch (error) {}
  };
    
  return (
    <>
      <NavbarFalse />
      <NavbarSm />
      <div className="Login Register">
        <div className="container">
          <h1 className="login-title">Ro'yxatdan o'tish</h1>
          <p className="sign-up">
            Akkountingiz bormi? Unda Akkauntingizga
            <Link to="/login">
              <span> kiring</span>
            </Link>
          </p>
          <form action="">
            <div className="rowGrid">
              <div className="col-24">
                <div className="phoneInputBox">
                  <p className="label"></p>
                  <PhoneInput
                    country={"uz"}
                    enableAreaCodes={true}
                    value={phoneNumber}
                    onChange={(phone , country) => {setPhoneNumber(phone); console.log(country)}}
                  />
                </div>
              </div>
            </div>
            {check && (
              <p className="error-messageee">
                <ReportIcon style={{ marginRight: "10px" }} /> Telefon raqami
                noto'g'ri kiritildi
              </p>
            )}
             {againRes && (
              <p className="error-messageee">
                <ReportIcon style={{ marginRight: "10px" }} /> Siz allaqachon ro'yxatdan o'tgansiz
              </p>
            )}
            <Button
              sx={{
                width: "100%",
                height: "70px",
                borderRadius: "15px",
                backgroundColor: "#80B5FF;",
                fontFamily: "sans-serif",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "24px",
                lineHeight: "29px",
                textTransform: "none",
                marginBottom: "44px",
              }}
              variant="contained"
              className="btn"
              onClick={sendddata}
            >
              Davom etish
            </Button>
          </form>
          {/* <div className="box_line">
            <div className="line"></div>
            <p>yoki</p>
            <div className="line"></div>
          </div>
          <p className="sign-up">
            Akkountingiz bormi? Unda Akkauntingizga
            <Link to="/login">
              <span> kiring</span>
            </Link>
          </p> */}
        </div>
      </div>
    </>
  );
}