import React, { useContext, useState } from "react";
import "./VendorSchoolPaymets.css";
import VendorSchoolSidebar from "../VendorSchoolSidebar/VendorSchoolSidebar";
import VendorSchoolNavbar from "../VendorSchoolNavbar/VendorSchoolNavbar";
import { StateContext } from "../../context/Context";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "react-modal";

import axios from "axios";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import moment from "moment";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function VendorSchoolPaymets() {
  const { sidebarOpen, vaucherBlanceData, balance } = useContext(StateContext);
  const [addMoneyModal, setAddMoneyModal] = useState(false);
  const [pySuccessModal, setPySuccessModal] = useState(false);

  const [pySum, setPySum] = useState();
  const [pyCartNum, setPyCartNum] = useState();
  const [pyCartExpire, setPyCartExpire] = useState();
  const [tr_id, setTr_id] = useState("");
  const [OTP, setOTP] = useState();

  const [TransData, setTransData] = useState([])

  const [manualVideo, setManualVideo] = useState();

  const navigate = useNavigate();

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

  useEffect(() => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      };
        console.log(moment().format("YYYY-MM-Do"));
      axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v1/wallet/history`,
          {
            start_date: "2021-07-17",
            end_date: moment().format("YYYY-MM-Do"),
          },
          {
            headers,
          }
        )
        .then((res) => setTransData(res.data.result));
    } catch (error) {}
  }, []);

  const showOtpPanel = () => {
    document.querySelector(".py-Otp").classList.add("active");
  };

  const pyError = () => toast.error("Xatolik yuz berdi");
  const technicalError = () =>
    toast.error("Bu bo'limda texnik ishlar olib borilmoqda!");
  const addMoneyError = () =>
    toast.error("Iltimos, ma'lumotlarni to'liq kiriting!");

  const currency = (number, currency, lang = undefined) =>
    Intl.NumberFormat(lang, { style: "currency", currency }).format(number);

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

  useEffect(() => {
    if(TransData) {
      for(let i = 0; i<TransData.length; i++) {
       console.log(TransData[i]);
     }
    }
  }, [TransData])

  return (
    <div>
      <VendorSchoolNavbar />
      <VendorSchoolSidebar active={"transaction"} />

      <div
        className={`${
          sidebarOpen ? "vs-content" : "vs-content-noactive"
        } vs-big-container`}
      >
        <div className="container">
          <div className="flex justify-between align-center mb-24 vs-title-video-box">
            <div className="vendor-title">
              <h2 className="text-black">To’lovlar</h2>
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
                    fill="#F9F9F9"
                  />
                </svg>
                Video qo’llanma
              </button>
            </div>
          </div>

          <div className="vs-paymets-container">
            <div className="vs-paymets-box">
              <div className="vs-paymets-box-title flex justify-between align-center">
                <h3>To’lov</h3>
                <h3>To’lov vaqti</h3>
                <h3>Sababi</h3>
              </div>
              {TransData ? TransData.map((item, index) => 
                item.amount > 100000 && 
                <div className="flex justify-between align-center vs-paymets-box-content">
                <p>
                  {currency( item.amount && item.amount / 100, "UZS")
                      .replace("UZS", "")
                      .replace("soʻm", "")
                      .replace(/,/g, ".")
                      .slice(0, -3)}{" "}
                     UZS</p>
                <p className="mr0">{item.date}</p>
                <p className="mr0">STM-1-1.1</p>
              </div> 
               
              ): (
                <h6 className="text-center mt-50">To’lovlar mavjud emas!</h6>
              )}

            </div>

            <div className="vs-paymets-balans">
              <div className="vs-paymets-balans-container">
                <div className="text-center">
                  <h3>
                    {currency(
                      (vaucherBlanceData
                        ? vaucherBlanceData.balance / 100
                        : 0) + balance,
                      "UZS"
                    )
                      .replace("UZS", "")
                      .replace("soʻm", "")
                      .replace(/,/g, ".")
                      .slice(0, -3)}{" "}
                    so'm
                  </h3>
                  <h6>Mening umumiy balansim</h6>
                </div>
                <div className="align-center justify-between vs-paymets-balans-box">
                  <div className="vs-paymets-real-balans">
                    <p>Real balans</p>
                    <h6>
                      {currency(balance, "UZS")
                        .replace("UZS", "")
                        .replace("soʻm", "")
                        .replace(/,/g, ".")
                        .slice(0, -3)}{" "}
                      so'm
                    </h6>
                  </div>
                  <div className="vs-paymets-noreal-balans">
                    <p>Vaucher</p>
                    <h6>
                      {" "}
                      {vaucherBlanceData &&
                        currency(vaucherBlanceData.balance / 100, "UZS")
                          .replace("UZS", "")
                          .replace("soʻm", "")
                          .replace(/,/g, ".")
                          .slice(0, -3)}{" "}
                      so'm
                    </h6>
                  </div>
                </div>
              </div>
              <div className="vs-paymets-add-balans">
                <button onClick={() => setAddMoneyModal(true)}>
                  ➕ To’ldirish
                </button>
                <button onClick={() => technicalError()}>🎟️ Vaucher</button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            To’lovlar haqida video qo’llanma
          </p>
        </div>
      </Modal>
    </div>
  );
}
