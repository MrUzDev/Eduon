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
import { useForm } from "react-hook-form"
import TextField from "@mui/material/TextField";
import { GoogleLogin } from 'react-google-login'
import { gapi } from "gapi-script";

export default function Register() {
  const { phoneNumber, setPhoneNumber, setToken, registerEmail, setRegisterEmail} = useContext(StateContext);
  const [check, setcheck] = useState(false);
  const [againRes, setAgainRes] = useState(false)
  const navigate = useNavigate();

  const {control} = useForm()

  const clientIdGoogle =  "218671596318-3guu90dq107i1d8n2r288pidrpvaekuj.apps.googleusercontent.com"

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendddata(event);
    }
  };


  useEffect(() => {

    if(!localStorage.getItem('referalToken')) {
      const tokenReg = window.location.href.replace('https://eduon.uz/register/', '').replace('http://localhost:3000/register/', '').replace('https://front.eduon-test.uz/register/', '');
      localStorage.setItem('referalToken', tokenReg);
    }
  }, [])
  
    useEffect(() => {
     if(phoneNumber) {
       phoneNumber.length >= 10 ? setcheck(false) : setcheck(true)
     }
      
      setAgainRes(false)
    }, [phoneNumber])

    useEffect(() => {
      setPhoneNumber('')
    }, [registerEmail])

  
  const sendddata = async (event) => {
    event.preventDefault();
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


  const onSuccessLogin = (res) => {

    try {
      axios.post(`${process.env.REACT_APP_API_KEY}/api/v2/accounts/google-auth`,
      {
        email: res.profileObj.email,
        token: res.tokenId
      }).then((resData) => {
        console.log(resData.data.jwt_token);
        localStorage.setItem("access", resData.data.jwt_token.access);
        localStorage.setItem("refresh", resData.data.jwt_token.refresh);
        navigate("/");
        window.location.reload();
      })
    } catch (error) {console.log(error)}
  }

  const onFailureLogin = (res) => {
    console.log('login failure', res);
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientIdGoogle,
        scope: ""
      })
    }

    gapi.load("client:auth2", start)
  })
    
  return (
    <>
      <NavbarFalse />
      <NavbarSm />
      <div className="Login Register">
        <div className="container">
          <h1 className="login-title">Ro'yxatdan o'tish</h1>
          <p className="sign-up">
            Akkountingiz bormi? Unda Akkauntingizga  {" "}
            <Link to="/login">
              <span>kiring</span>
            </Link>
          </p>
          <form onSubmit={(e) => sendddata(e)}>
            <div className="rowGrid">
              <div className="col-24">
                  {!registerEmail ? (

                <div className="phoneInputBox">
                  <p className="label"></p>
                  <PhoneInput
                     onKeyDown={handleKeyDown}
                     inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: true
                    }}
                    control={control}
                    rules={{ required: true }}
                    country={"uz"}
                    enableAreaCodes={true}
                    value={phoneNumber}
                    onChange={(phone , country) => setPhoneNumber(phone)}
                  />

                </div>
                  ): (
                    <>
                    <TextField
                      className="inputs"
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: "15px",
                          height: "70px",
                          border: "2px solid #D9D9D9",
                        },
                        "& .MuiOutlinedInput-input": {
                          height: "70px",
                          padding: "0 0 0 25px",
                          marginTop: "-2px",
                        },
                        "& .MuiInputLabel-root": {
                          top: "4px",
                        },
                        "& .MuiInputLabel-shrink": {
                          top: "0",
                          left: "2px",
                        },
                      }}
                      value={phoneNumber}
                      label="Emailingizni kiriting"
                      variant="outlined"
                      type="email"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <br />
                    <br />
                    </>
                  )}
              </div>
            </div>
            {check && (
              <p className="error-messageee">
                <ReportIcon style={{ marginRight: "10px" }} />{!registerEmail ? "Telefon raqami": "Email"} notog'ri kiritilgan 
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
              type="submit"
            >
              Davom etish
            </Button>
          </form>

          <p className="sign-up">
              <span onClick={() => setRegisterEmail(!registerEmail)}>
                {!registerEmail ? "Elektron pochta" : "Telefon raqam"} orqali ro'yhatdan o'tish
              </span>
          </p>

          <GoogleLogin
            clientId={clientIdGoogle}
            buttonText="Google orqali tizimga kiring"
            onSuccess={onSuccessLogin}
            onFailure={onFailureLogin}
            cookiePolicy="single_host_origin"
            isSignedIn={true}
            className="googleLogin"
          />
          
          <br />
          <br />
          <br />
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