import React, {useContext, useState, useRef, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "../../Apis/api";
import { StateContext } from "../../context/Context";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import ReportIcon from "@mui/icons-material/Report";
import VisibilityOutlinedIcon from "../../assets/icons/eye.png";
import VisibilityOffOutlinedIcon from "../../assets/icons/eye-slash.png";
import PhoneInput from "react-phone-input-2";
import TextField from "@mui/material/TextField";
import OTPInput from "otp-input-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "4px solid #006aff",
  borderRadius: "15px",
  boxShadow: 24,
  p: 5,
};

export default function RegisterAndLoginModal () {

  const [loginError, setLoginError] = useState(false);
  const [open, setOpen] = useState(false);
  const [isBought, setisBought] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setLoginModal(false);
  const navigate = useNavigate();

  const [number, setnumber] = useState("");
  const [password, setpassword] = useState("");
  const [show, setShow] = useState(false);

 
  const [error, setError] = useState(false);
  const [check, setcheck] = useState(false);
  const [registerSendSms, setRegisterSendSms] = useState(false)
  const [registerNum, setRegisterNum] = useState(true)
  const [OTP, setOTP] = useState("");
  const [referal, setReferal] = useState(localStorage.getItem('referalToken'))
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dataInfo, setDataInfo] = useState("");
  const [registerEnterFio, setRegisterEnterFio] = useState(false)
  const [againRes, setAgainRes] = useState(false)
  const [paswordLen, setPaswordLen] = useState(false)
  const [password1Error, setpassword1Error] = useState();
  const [passwordError, setPasswordError] = useState();

  const [surNameError, setSurNameError] = useState();
  const [nameError, setNameError] = useState();

  const { setToken, token,  loginModal,
    setLoginModal,
    registerModal,
    setRegisterModal } = useContext(StateContext);


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      !registerSendSms ? register(event) : smsVerify(event)
    }
  };

  const otpError = () => toast.error("Tasdiqlash kodi noto'g'ri kiritildi!");


  const sendddata = async (e) => {
    e.preventDefault();
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

      // data.data.access ? navigate("/") : navigate("/login");
      window.location.reload();
    } catch (error) {
      setError(true);
      // handleOpen();
    }
    // saveSystems()
  };

  const register = async (event) => {
    event.preventDefault();

    try {
      check === false &&
        (await axios
          .post(`${process.env.REACT_APP_API_KEY}/api/v2/accounts/step-one/`, {
            mobile: number,
            region: "",
            is_forgot: false,
          })
          .then((res) => {res.data.success ? registerNumSuccess(res.data) : setAgainRes(true)}));
    } catch (error) {}
  };

  const registerNumSuccess = (data) => {
    setRegisterSendSms(true); setToken(data.otp_generated); setRegisterNum(false)
  }

  const smsVerify = async (e) => {
    e.preventDefault();

    try {
      OTP && await axios.
      post(`${process.env.REACT_APP_API_KEY}/api/v1/accounts/step-two/`,
      {
        otp: OTP,
        otp_token: token,
      }).then((res) => {
        setDataInfo(res.data);
        res.data.status && setRegisterEnterFio(true);
        res.data.status && setRegisterSendSms(false)
      })
    } catch (error) {
      if(error.response.status === 404) {
        otpError()
      }
    }
  }
  

  const enterFio = async (e) => {
    e.preventDefault()
    errorCheck();
    if( surname &&
      name &&
      password &&
      password === confirmPassword &&
      password.length >= 6 ) {

        try {
          await axios
          .post(`${process.env.REACT_APP_API_KEY}/api/v2/accounts/register`,
          {
            phone_number: number,
            password: password,
            password2: confirmPassword,
            f_name: name,
            l_name: surname,
            sex: null,
            email: email,
            referral : referal && referal
          }).then((res) => login())
        } catch (error) {
      }
      
    }
  }

  useEffect(() => {
    console.log(loginModal, 'loginModal');
  }, [loginModal])


  const login = async () => {
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
      data.data.access ? navigate("/") : navigate("/login");
      window.location.reload();
    } catch (error) {
      setError(true);
      // handleOpen();
    }
  }

  const errorCheck = () => {
    !surname ? setSurNameError(true) : setSurNameError(false);
    !name ? setNameError(true) : setNameError(false);
    !password ? setPasswordError(true) : setPasswordError(false);
    password && password.length <= 7 ? setPaswordLen(true) : setPaswordLen(false)
    !confirmPassword
      ? setpassword1Error(true)
      : password !== confirmPassword
      ? setpassword1Error(true)
      : setpassword1Error(false);
  };

    return (
    <div className="registerAndLoginModal">

           <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={loginModal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div className="modalForLogin">
            <Fade in={loginModal}>
              <Box sx={style} className="container">
                <div className="modalLogin">
                  <h2 style={{ textAlign: "center", margin: "20px" }}>
                    Profilga kirish
                  </h2>
                  <form onSubmit={sendddata}>
                    <div className="phoneInputBox">
                      <PhoneInput
                        country={"uz"}
                        // value={storageLogDetails?storageLogDetails: number}
                        value={
                          localStorage.getItem("storageMobile")
                            ? localStorage.getItem("storageMobile")
                            : number
                        }
                        onChange={(phone) => setnumber(phone)}
                        id="phone"
                      />
                    </div>
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
                    {error ? (
                      <p className="error-messageee">
                        <ReportIcon style={{ marginRight: "10px" }} /> Telefon
                        raqami yoki parol xato kiritilgan{" "}
                      </p>
                    ) : null}
            
                    <p className="sign-up flex">
                      Akkauntingiz yo'qmi? Unda &nbsp;
                      <p style={{color: '#006aff'}}
                        onClick={() => {
                          setLoginModal(false);
                          setRegisterModal(true);
                        }}
                      >
                        <span> Ro'yxatdan o'ting</span>
                      </p>
                    </p>
                    <Button
                      onClick={(e) => {
                        sendddata(e);
                      }}
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
                    >
                      Tizimga kirish
                    </Button>
                  </form>
                </div>
              </Box>
            </Fade>
          </div>
        </Modal>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={registerModal}
          onClose={() => setRegisterModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          
          <div className="modalForLogin modalForRegister">
            <Fade in={registerModal}>
              <Box sx={style} className="container">
                <div className="modalLogin">
                  <h2 style={{ textAlign: "center", margin: "20px" }}>
                    Ro'yhatdan o'tish
                  </h2>
                  {registerNum && (
                    <form onSubmit={(e) => register(e)}>

                      <div className="phoneInputBox">
                        <PhoneInput
                        onKeyDown={handleKeyDown}
                        inputProps={{
                          name: 'phone',
                          required: true,
                          autoFocus: true
                        }}
                        rules={{ required: true }}
                          country={"uz"}
                          value={
                            localStorage.getItem("storageMobile")
                              ? localStorage.getItem("storageMobile")
                              : number
                          }
                          onChange={(phone) => setnumber(phone)}
                          id="phone"
                        />
                      </div>
                          
                      {againRes && (
                      <p className="error-messageee">
                        <ReportIcon style={{ marginRight: "10px" }} /> Siz allaqachon ro'yxatdan o'tgansiz
                      </p>
                       )}

                      {check && (
                        <p className="error-messageee">
                          <ReportIcon style={{ marginRight: "10px" }} />
                          Telefon raqami notog'ri kiritilgan
                        </p>
                      )}

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

                  
                    
                      <p className="sign-up flex">
                        Akkountingiz bormi? Unda Akkauntingizga &nbsp;
                        <p
                          onClick={() => {
                            setRegisterModal(false);
                            setLoginModal(true);
                          }}
                        >
                          <span style={{color: '#006aff'}}> kiring </span>
                        </p>
                      </p>

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
                  )}

                  {registerSendSms && (
                    <form onSubmit={(e) => smsVerify(e)}>
                      
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
                  )}
                  
                  {registerEnterFio && (

                  <form onSubmit={(e) => enterFio(e)}>
                     <div className="rowGrid">
                      <div className="col-24 mb10">
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
                            onChange={(e) => setSurname(e.target.value)}
                            label="Familyangiz"
                            variant="outlined"
                          />

                        {surNameError ? (
                        <p className="error-messageee">
                          <>
                            <ReportIcon style={{ marginRight: "10px" }} />
                            Familya kiritish majburiy
                          </>
                        </p>
                        ) : null}
                        </div>

                        <div className="col-24 mb10">
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
                          onChange={(e) => setName(e.target.value)}
                          label="Ismingiz"
                          variant="outlined"
                        />

                          {nameError && (
                        <p className="error-messageee">
                            <>
                              <ReportIcon style={{ marginRight: "10px" }} />
                              Ismni kiritish majburiy
                            </>
                        </p>
                          ) }
                        </div>

                        <div className="col-24 mb10">
                          <div className="passwordFio" style={{margin: '0'}}>
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
                              padding: "0 55px 0 25px",
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
                          onChange={(e) => setpassword(e.target.value)}
                          type={!show ? "password" : "text"}
                          label="Parol"
                          variant="outlined"
                        />
                        {!show ? (
                          <img
                            src={VisibilityOutlinedIcon}
                            onClick={() => setShow(!show)}
                            className="eye"
                            alt="...."
                          />
                        ) : (
                          <img
                            src={VisibilityOffOutlinedIcon}
                            onClick={() => setShow(!show)}
                            className="eye eyeSlash"
                            alt="...."
                          />
                        )}
                          </div>

                        {passwordError && (
                        <p className="error-messageee">
                          <>
                            <ReportIcon style={{ marginRight: "10px" }} />
                            Parolni kiritish majburiy
                          </>
                        </p>
                        )}
                        
                        {paswordLen && (
                        <div className="error-messageee">
                          <>
                          <ReportIcon style={{ marginRight: "10px" }} />
                            Parol kamida 7ta simvol bo'lishi kerak!
                          </>
                        </div>
                        )}
                        
                        </div>


                        <div className="col-24">
                        <TextField
                            className="inputs mb-0"
                            sx={{
                              width: "100%",
                              marginBottom: "10px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderRadius: "15px",
                                height: "70px",
                                border: "2px solid #D9D9D9",
                              },
                              "& .MuiOutlinedInput-input": {
                                height: "70px",
                                padding: "0 55px 0 25px",
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
                            type={!showConfirm ? "password" : "text"}
                            label="Parolni tasdiqlash"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            variant="outlined"
                          />

                            {password1Error ? (
                          <p className="error-messageee">
                              <>
                                <ReportIcon style={{ marginRight: "10px" }} />
                                Parollar mos emas
                              </>
                          </p>
                            ) : null}
                          <br /> <br />
                        </div>
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
                      Davom etish
                    </Button>
                  </form>

                  )}

                </div>
              </Box>
            </Fade>
          </div>
        </Modal>
    </div>
    )
}