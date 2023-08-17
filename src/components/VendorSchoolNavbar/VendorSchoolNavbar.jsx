import React, { useState, useContext, useEffect } from "react";
import "./VendorSchoolNavbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { StateContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import VendorSchoolChat from "../Vendor-SchoolChat/VendorSchoolChat";
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from "../../assets/images/sotuvchilarMaktabi.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "react-modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VendorSchoolNavbar() {
  const { sidebarOpen, setSidebarOpen, name, profilePhoto, showVsChat, setShowVsChat, addMoneyModal, setAddMoneyModal } =
    useContext(StateContext);
  const [showVsProfMenu, setShowVsProfMenu] = useState(false);

  const [pySum, setPySum] = useState();
  const [pyCartNum, setPyCartNum] = useState();
  const [pyCartExpire, setPyCartExpire] = useState();
  const [tr_id, setTr_id] = useState("");
  const [OTP, setOTP] = useState();
  const [pySuccessModal, setPySuccessModal] = useState(false);

  const navigate = useNavigate()

  const pyError = () => toast.error("Xatolik yuz berdi");
  const addMoneyError = () =>
    toast.error("Iltimos, ma'lumotlarni to'liq kiriting!");

    const showOtpPanel = () => {
      document.querySelector(".py-Otp").classList.add("active");
    };

  const closeSidebar = () => {
    const sidebar = document.querySelector(".vs-nav");

    sidebar.classList.toggle("active");
    sidebarOpen ? setSidebarOpen(false) : setSidebarOpen(true);
  };

  try {
    useEffect(() => {
      const sidebar = document.querySelector(".vs-nav");
      const vsbigcontainer = document.querySelector(".vs-big-container");
      const vsNavbarName = document.querySelector('.vs-navbar-name')

      if (window.innerWidth < 800) {
        setSidebarOpen(false);
        sidebar.classList.add("active");
        // sidebar.style.position = 'absolute'
        vsbigcontainer.style.margin = "80px 0 0 0px";
        vsNavbarName.style.display = 'none'
      }
    }, []);
  } catch (error) {}

  const transfer = async () => {
    if (pyCartNum && pySum && pyCartExpire) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      };

      try {
        await axios
          .post(
            `${process.env.REACT_APP_API_KEY}/api/v1/wallet/transfer`,
            {
              number: pyCartNum.replace(/ /g, ""),
              expire: pyCartExpire.replace(/\//g, ""),
              amount: pySum,
              is_saved_card: false,
            },
            {
              headers,
            }
          )
          .then((res) => {
            setTr_id(res.data.result.tr_id);
            showOtpPanel();
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
            console.log(err);
          });
      } catch (error) {}
    } else {
      addMoneyError();
    }
  };

  const confirmTransfer = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v1/wallet/confirm-transfer`,
          {
            tr_id: tr_id,
            code: OTP,
          },
          {
            headers,
          }
        )
        .then((res) => {
          console.log(res);
          // setLoader(false)
          // setAlert(false);
          // setbalanceToggle(!balanceToggle);
          // res.data.status ? setsuccessPayload(true) : setLoginError(true);
          // setConfigBalance(true);
          setPySuccessModal(true);
          setAddMoneyModal(false);
        })  
        .catch((err) => {
          // console.log(err);
          pyError();
          refresh(err.response.status, err.response.status.text);
        });

      // setPySum("");
      setPyCartNum("");
      setPyCartExpire("");
    } catch (error) {
      pyError();
    }
  };

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
      minWidth: "400px",
    },
  };

  const customStyles2 = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "15px",
      zIndex: "2",
      minWidth: "400px",
      padding: "20px 0px !important",
      paddingTop: "20px",
    },
  };

  const currency = (number, currency, lang = undefined) =>
  Intl.NumberFormat(lang, { style: "currency", currency }).format(number);

  return (
    <div>
      <nav className="vs-navbar flex justify-between align-center">
        <div className="flex align-center gap-2">
          <div>
            <MenuIcon onClick={closeSidebar} className="pointer" />
          </div>

          <div>
            <img src={Logo} alt="" className="w-100"/>
          </div>
          <button className="vendor-btn sm-navbar-btn" onClick={() => setAddMoneyModal(true)}>O'qishga to'lov qilish</button>
        </div>


        <div className="flex align-center">
          <div className="mr20 flex align-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="pointer"
              onClick={() => setShowVsChat(!showVsChat)}
            >
              <path
                d="M29.3337 8.33268V15.1327C29.3337 16.826 28.7737 18.2527 27.7737 19.2393C26.787 20.2393 25.3603 20.7993 23.667 20.7993V23.2126C23.667 24.1193 22.6536 24.666 21.907 24.1593L20.6137 23.306C20.7337 22.8927 20.787 22.4393 20.787 21.9593V16.5327C20.787 13.8127 18.9737 11.9993 16.2537 11.9993H7.20032C7.01365 11.9993 6.84033 12.0127 6.66699 12.026V8.33268C6.66699 4.93268 8.93366 2.66602 12.3337 2.66602H23.667C27.067 2.66602 29.3337 4.93268 29.3337 8.33268Z"
                stroke="#1C1C1C"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.787 16.5334V21.96C20.787 22.44 20.7337 22.8933 20.6137 23.3066C20.1203 25.2666 18.4937 26.4933 16.2537 26.4933H12.627L8.60032 29.1733C8.00032 29.5867 7.20032 29.1467 7.20032 28.4267V26.4933C5.84032 26.4933 4.707 26.04 3.92033 25.2533C3.12033 24.4533 2.66699 23.32 2.66699 21.96V16.5334C2.66699 14 4.24033 12.2534 6.66699 12.0267C6.84033 12.0134 7.01365 12 7.20032 12H16.2537C18.9737 12 20.787 13.8134 20.787 16.5334Z"
                stroke="#1C1C1C"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div className="flex align-center">
            <div className="mr20 vs-navbar-name">
              <h5 className="vs-navbar-name"> {name && name}</h5>
            </div>
            <div className="mr20" onClick={() => setShowVsProfMenu(!showVsProfMenu)}>
              {profilePhoto ? (
                <img
                  src={`${process.env.REACT_APP_API_KEY}/${profilePhoto}`}
                  alt=""
                  className="profilePhoto pointer"
                />
              ): (
                  <AccountCircleIcon style={{width:'40px', height: '40px', cursor: 'pointer'}}/>
                )}
              
            </div>
            {showVsProfMenu && (
              <div className="vs-profile-menu">
                <h4> {name && name}</h4>
                <p onClick={() => navigate('/profile')} className="flex align-center"><EditIcon className="mr-10" style={{color:'red'}}/> Profilni tahrirlash</p>
                <p onClick={() => navigate('/')} className="flex align-center"> <LogoutIcon className="mr-10" style={{color:'red'}}/> Chiqish</p>
              </div>
            )}
          </div>
        </div>
      </nav>
      {showVsChat && (
        <VendorSchoolChat/>
      )}

<Modal
        isOpen={addMoneyModal}
        onRequestClose={() => setAddMoneyModal(false)}
        style={customStyles2}
        contentLabel="Example Modal"
        ariaHideApp={false}
        id="modal modalPayment"
      >
        <div className="iconButtonModal">
          <IconButton
            aria-label="close"
            color="inherit"
            size="normal"
            onClick={() => {
              setAddMoneyModal(false);
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
          <h4
            id="addMoneyMtcTitle"
            className="p-horizontal15"
            style={{ marginBottom: "20px" }}
          >
            Hisobni to’ldirish
          </h4>

          <div className="flex vs-py-modal p-horizontal15 pBottom20">
            <div className="mr-30">
              <div>
                <div className="password">
                  <TextField
                    className="inputs"
                    id="TransparentInput"
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "15px",
                        border: "2px solid #D9D9D9",
                        // background: "#F6F6F6",
                        boxShadow: "5px 0px 20px 2px rgba(0, 0, 0, 0.15)",
                        color: "transparent !important",
                      },
                    }}
                    type="number"
                    label="To'ldirish miqdori"
                    variant="outlined"
                    autoComplete="off"
                    onChange={(e) => setPySum(e.target.value)}
                  />
                  <p id="inputNum">
                    {pySum &&
                      currency(pySum, "UZS")
                        .replace("UZS", "")
                        .replace("soʻm", "")
                        .replace(/,/g, ".")
                        .slice(0, -3)}
                  </p>
                  <h1 className="eye">UZS</h1>
                </div>
              </div>
              <div className="vs-modal-grid">
                <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "10px",
                      border: "2px solid #D9D9D9",
                      // background: "#F6F6F6",
                      boxShadow: "0px 0px 20px 5px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                  type="text"
                  label="Karta raqami"
                  variant="outlined"
                  autoComplete="off"
                  onChange={(e) => {
                    let res = e.target.value
                      .replace(/[^\dA-Z]/g, "")
                      .replace(/(.{4})/g, "$1 ")
                      .trim();
                    res.length > 20 ? e.preventDefault() : setPyCartNum(res);
                  }}
                  value={pyCartNum}
                />

                <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      border: "2px solid #D9D9D9",
                      // background: "#F6F6F6",
                      boxShadow: "0px 0px 20px 5px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                  type="text"
                  label="Muddati"
                  variant="outlined"
                  autoComplete="off"
                  placeholder="mm/yy"
                  onChange={(e) => {
                    let res = e.target.value
                      .replace(/[^0-9]/g, "")
                      .replace(/^([2-9])$/g, "0$1")
                      .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
                      .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
                    setPyCartExpire(res);
                  }}
                  value={pyCartExpire}
                />
              </div>
              {/* <div className="flex align-center">
                <input type="checkbox" className="mr-10" />
                <p>Kartani saqlab qolish</p>
              </div> */}
              <button
                className="vendor-btn bg-red"
                style={{ marginTop: "20px" }}
                onClick={transfer}
              >
                To’ldirish
              </button>
            </div>

            <div className="py-Otp">
              <TextField
                className="inputs"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "15px",
                    border: "2px solid #D9D9D9",
                    // background: "#F6F6F6",
                    boxShadow: "0px 0px 20px 5px rgba(0, 0, 0, 0.15)",
                  },
                }}
                type="number"
                label="SMS ni tasdiqlash"
                variant="outlined"
                autoComplete="off"
                onChange={(e) => setOTP(e.target.value)}
              />
              <button
                className="vendor-btn bg-red"
                style={{ marginTop: "20px" }}
                onClick={confirmTransfer}
              >
                Tasdiqlash
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer style={{ marginTop: "50px" }} />

      <Modal
        isOpen={pySuccessModal}
        onRequestClose={() => setPySuccessModal(false)}
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
              setPySuccessModal(false);
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
          <h4
            id="addMoneyMtcTitle"
            style={{
              marginBottom: "20px",
              textAlign: "center",
              color: "#006AFF",
            }}
          >
            🎉 AJOYIB!
          </h4>

          <p className="text-center" style={{ fontSize: "22px" }}>
            Hurmatli foydalanuvhi siz xisobingizni
            {currency(pySum, "UZS")
              .replace("UZS", "")
              .replace("soʻm", "")
              .replace(/,/g, ".")
              .slice(0, -3)}{" "}
            so`mga to’ldirdingiz.
          </p>

          <div className="text-center">
            <button
              className="vendor-btn bg-red mr-30 mt-50"
              onClick={() => setPySuccessModal(false)}
            >
              Orqaga qaytish
            </button>
            <button
              className="vendor-btn bg-red"
              onClick={() => navigate("/sotuvchilarMaktabi/allCourses")}
            >
              Barcha kurslar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
