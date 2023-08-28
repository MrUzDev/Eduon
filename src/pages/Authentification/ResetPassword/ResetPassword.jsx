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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";

export default function ResetPassword() {
  const { setToken, registerEmail, setRegisterEmail } = useContext(StateContext);

  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();
  const [check, setcheck] = useState(true);

  const phoneNumberNotFound = () => toast.error("Telefon raqam topilmadi!");

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendddata(event);
    }
  };

  const sendddata = async (e) => {
    e.preventDefault()
    if(mobile.length >= 12) {
      setcheck(true)
      try {
        await axios
          .post(`${process.env.REACT_APP_API_KEY}/api/v2/accounts/step-one/`, {
            mobile: mobile,
            region: '',
            is_forgot: true
          })
          .then((res) => {
            setToken(res.data.otp_generated);
            navigate("/resetVerify")
          });
      } catch (error) {
        phoneNumberNotFound()
      }
    }else {
      setcheck(false);
    }
  };
  return (
    <>
      <NavbarFalse />
      <NavbarSm />
      <div className="Login Register">
        <div className="container">
          <h1 className="login-title">Parolni tiklash</h1>
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
                    country={"uz"}
                    onChange={(phone) => setMobile(phone)}
                  />
                </div>
                ): (
                  <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    marginBottom: '30px',
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
                  value={mobile}
                  label="Emailingizni kiriting"
                  variant="outlined"
                  type="email"
                  onChange={(e) => setMobile(e.target.value)}
                />
                )}
              </div>
            </div>
            {check ? null : (
              <p className="error-messageee">
                <ReportIcon style={{ marginRight: "10px" }} />{!registerEmail ? "Telefon raqami": "Elektron pochta"} noto'g'ri kiritildi
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
              Tasdiqlash kodini yuborish
            </Button>
            <ToastContainer />

          </form>

          <p className="sign-up">
              <span onClick={() => setRegisterEmail(!registerEmail)}>
                {!registerEmail ? "Elektron pochta" : "Telefon raqam"} orqali parolni tiklash
              </span>
          </p>
        </div>
      </div>
      
    </>
  );
}
