import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "../Login/Login.css";
import "./SmsVerify.css";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "otp-input-react";
import { StateContext } from "../../../context/Context";
import axios from "../../../Apis/api";
import ReportIcon from "@mui/icons-material/Report";
import NavbarFalse from "../../../components/NavbarFalse/NavbarFalse";
import NavbarSm from "../../../components/Navbar/NavbarSm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BounceLoader } from "react-spinners";

export default function SmsVerify() {
  const [OTP, setOTP] = useState("");
  const { navStretch, phoneNumber, token, setToken, registerEmail } = useContext(StateContext);
  const [dataInfo, setDataInfo] = useState("");
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState();
  const [sec, setSec] = useState(60);
  const [loader, setLoader] = useState(true);

  const navigate = useNavigate();

  const otpError = () => toast.error("Tasdiqlash kodi noto'g'ri kiritildi!");
  const refreshSmsAlert = () => toast.info("Kod yuborilishi mumkin bo'lgan vaqt tugaganidan so'ng qayta urinib ko'ring");
  const refreshSmsSuccess = () => toast.success("Kod qayta yuborildi!");

  useEffect(() => {
    phoneNumber ? setLoader(false) : navigate('/register')
  })

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (sec > 0) {
        setSec(sec - 1);
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  const refreshSms = async () => {
    if (sec === 0) {
      refreshSmsSuccess()
      try {
        const data = await axios.post(
          `${process.env.REACT_APP_API_KEY}/api/v2/accounts/step-one/`,
          {
            mobile: phoneNumber,
            region: '',
            is_forgot: false
          }
        );
        setToken(data.data.otp_generated);
        setSec(60);
      } catch (error) {}
    }else {
      refreshSmsAlert()
    }
  };


  const sendddata = async (e) => {
    e.preventDefault()
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/v1/accounts/step-two/`,
        {
          otp: OTP,
          otp_token: token,
        }
      );
      setDataInfo(data.data);
      setCheck(true);
      data.data.status ? navigate("/fio") : navigate("/verify");
      data.data.jwt_token
        ? setMessage(data.data.jwt_token.message)
        : setMessage(data.data.message);
    } catch (error) {
      if(error.response.status === 404) {
        otpError()
      }
    }
  };

  return (
    <>
      <NavbarFalse />
      <NavbarSm />
      <div className="Login Verify">
        <div className="container">
          <h1 className="login-title">Ro'yxatdan o'tish</h1>
          <form action="" onSubmit={(e) => sendddata(e)}>
            <p className="phone-number">
              {!registerEmail && phoneNumber && ` +${phoneNumber.slice(0, 5)}  ***-**-${phoneNumber.slice(
                    10,
                    12
                  )} raqamingizga tasdiqlash kodi yuborildi`
                }
                {registerEmail && phoneNumber && ` ${phoneNumber.slice(0, 5)}  *****${phoneNumber.slice(10, phoneNumber.length )} elektron pochtasiga tasdiqlash kodi yuborildi`}
            </p>
            <div className="wrapper">
              <OTPInput
                value={OTP}
                onChange={setOTP}
                autoFocus
                OTPLength={5}
                otpType="number"
                disabled={false}
                type="number"
              />
            </div>
            <ToastContainer />

            {dataInfo ? (
              dataInfo.jwt_token ? (
                <p className="error-messageee">
                  <ReportIcon style={{ marginRight: "10px" }} />
                  Bu akkaunt ro'yxatdan o'tgan
                </p>
              ) : (
                <p className="error-messageee">
                  <ReportIcon style={{ marginRight: "10px" }} />
                  Kod xato kiritilgan
                </p>
              )
            ) : null}
            <div className="resendMsg">
              <p className="pointer" onClick={refreshSms}>
                Tasdiqlash kodini qayta yuborish{" "}
              </p>
              <span>{sec < 10 ? `00 : 0${sec}` : `00:${sec}`}</span>
            </div>
            {/* {dataInfo ? (dataInfo.message === "The code is not correct"  ?  <p className="error-messageee"><ReportIcon style={{ marginRight: "10px", }} />Tasdiqlash kodi xato kiritildi</p>:null):null}
            {dataInfo ? (dataInfo.jwt_token.message === "This user had been registered before" ?  <p className="error-messageee"><ReportIcon style={{ marginRight: "10px", }} />Bu akkaunt ro'yxatdan o'tgan</p>:null) :null} */}
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
              type="submit"
            >
              Davom etish
            </Button>
          </form>
          <div className="box_line">
            <div className="line"></div>
            <p>yoki</p>
            <div className="line"></div>
          </div>
          <p className="sign-up">
            Akkountingiz bormi? Unda Akkauntingizga{" "}
            <Link to="/">
              <span> kiring</span>
            </Link>
          </p>
        </div>

                  { loader && (
                        <div className="loader">
                          <BounceLoader
                            color="#006AFF"
                            speedMultiplier={1.2}
                          />
                        </div>
                      )}

      </div>
    </>
  );
}
