import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "../../../assets/icons/eye.png";
import VisibilityOffOutlinedIcon from "../../../assets/icons/eye-slash.png";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { StateContext } from "../../../context/Context";
import ReportIcon from "@mui/icons-material/Report";

import axios from "../../../Apis/api";
import PhoneInput from "react-phone-input-2";
import NavbarFalse from "../../../components/NavbarFalse/NavbarFalse";
import NavbarSm from "../../../components/Navbar/NavbarSm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Login() {
  const [show, setShow] = useState(false);
  // const [open, setOpen] = useState(false);
  const [number, setnumber] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [check, setChek] = useState(false);
  const { setPhoneNumber, registerEmail, setRegisterEmail } = useContext(StateContext);
  
  const PhoneNumberNot = () => toast.error("Telefon raqam kiritilmadi!");
  const PasswordNot = () => toast.error("Parol kiritilmadi!");
  const PassworOrPhoneNumberError = () => toast.error("Telefon raqami yoki parol xato kiritilgan!");
  
  useEffect(() => {
    setPhoneNumber(number);
  }, [number]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendddata(event);
      saveSystems()
    }
  };

  const sendddata = async (e) => {
    e.preventDefault();
    if(number) {
      console.log('boru');
      console.log(number);
      if(password) {
         try {
           const data = await axios.post(
            `${process.env.REACT_APP_API_KEY}/api/v1/accounts/login/`,
            {
              phone_number: number,
              password: password,
            }
            );
            localStorage.setItem("access", data.data.access);
            localStorage.setItem("refresh", data.data.refresh);
            
            if(localStorage.getItem('vendorReg')) {
              navigate('/sotuvchilarMaktabi')
              localStorage.removeItem('vendorReg')
            }else {
            data.data.access ? navigate("/") : navigate("/login");
          }
          window.location.reload();
        } catch (error) {
          PassworOrPhoneNumberError()
        }
      }else {
        PasswordNot()
      }
    }else {
      console.log('qonde');
      PhoneNumberNot()
    }
  };

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("check")) &&
      localStorage.hasOwnProperty("num") &&
      localStorage.hasOwnProperty("pass")
    ) {
      setnumber(localStorage.getItem("num"));
      setpassword(localStorage.getItem("pass"));
      setChek(true);
    } else {
      localStorage.removeItem("num");
      localStorage.removeItem("pass");
    }
  }, []);
  const saveSystems = () => {
    setChek(localStorage.setItem("check", check));
    setChek(localStorage.getItem("check"));

    if (JSON.parse(check) && number && password) {
      localStorage.setItem("num", number);
      localStorage.setItem("pass", password);
    }
  };

  return (
    <>
      <NavbarFalse />
      <NavbarSm />
      <div className="Login">
        <div className="container">
          <h1 className="login-title">Profilga kirish</h1>
          <p className="sign-up">
            Akkauntingiz yo'qmi? Unda{" "}
            <Link to="/register">
              <span> Ro'yxatdan o'ting</span>
            </Link>
          </p>
          <form onSubmit={(e) => sendddata(e)}>
            {!registerEmail ? (
            <div className="phoneInputBox">
              <PhoneInput
              onKeyDown={handleKeyDown}
              inputProps={{
               name: 'phone',
               required: true,
               autoFocus: true
             }}
                country={"uz"}
                value={
                  localStorage.getItem("storageMobile")
                    ? localStorage.getItem("storageMobile")
                    : number
                }
                onChange={(phone) => setnumber(phone)}
                id="phone"
                placeholder="+998 90 123 45 67"
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
                value={number}
                type="email"
                label="Elektron pochtangizni kiriting"
                variant="outlined"
                onChange={(e) => setnumber(e.target.value)}
              />
            )}

            
            <div className="password">
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
                value={password}
                type={!show ? "password" : "text"}
                label="Parolingizni kiriting"
                variant="outlined"
                onChange={(e) => setpassword(e.target.value)}
              />
              {!show ? (
                <img
                  src={VisibilityOutlinedIcon}
                  onClick={() => setShow(!show)}
                  className="eye"
                  alt="..."
                />
              ) : (
                <img
                  src={VisibilityOffOutlinedIcon}
                  onClick={() => setShow(!show)}
                  className="eye eyeSlash"
                  alt="..."
                />
              )}
            </div>
          
            <div className="technicSights">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Tizimda eslab qolish"
                  sx={{
                    "& .MuiTypography-root": {
                      fontFamily: "sans-serif",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "19px",
                    },
                  }}
                  onChange={(e) => {
                    console.log(e.target.checked);
                    setChek(e.target.checked);
                  }}
                  checked={check}
                />
              </FormGroup>
              <p
                onClick={() => navigate("/resetPassword")}
                className="forgot pointer"
              >
                Parolingizni unutdingizmi
              </p>
            </div>
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
              Tizimga kirish
            </Button>
            <ToastContainer />
          </form>

          <p className="sign-up" onClick={() => setRegisterEmail(!registerEmail)}>
              <span>{!registerEmail ? "Elektron pochta" : "Telefon raqam"} orqali profilga kirish </span>
          </p>

          {/* <div className="box_line">
            <div className="line"></div>
            <p>yoki</p>
            <div className="line"></div>
          </div>
          <p className="sign-up">
            Akkauntingiz yo'qmi? Unda{" "}
            <Link to="/register">
              <span> Ro'yxatdan o'ting</span>
            </Link>
          </p> */}
        </div>
      </div>
    </>
  );
}
