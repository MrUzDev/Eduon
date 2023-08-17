import axios from "../../Apis/api";
import React, { useContext, useEffect, useState, useReducer } from "react";
import { StateContext } from "../../context/Context";
import "./ShoppingCourses.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footers/Footer";
import NavbarDemo from "../Navbar/Navbar";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import NavbarSm from "../Navbar/NavbarSm";
import image from "../../assets/images/Rectangle 1.png";
import { vaucherReducer } from "../../reducer/ShoppingCourse";
import { initialState } from "../../reducer/ShoppingCourse";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Button from "@mui/material/Button";
import OTPInput from "otp-input-react";
import Alert from "@mui/material/Alert";
import moment from "moment";
import CartImg from "../../assets/images/Rectangle 7.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShoppingCourses(props) {
  const [cartItems, setCartItems] = useState([]);
  const [overallCost, setOverallCost] = useState(0);
  const { navStretch, balance, loggedIn, setIsRemoved, isremoved } = useContext(StateContext);
  const [errorMoney, setErrorMoney] = useState(false);
  const [buyCourses, setBuyCourse] = useState("");
  const [vaucherBlance, setVaucherBlance] = useState();
  const [streamCost, setStreamCost] = useState(0);
  const [streamCart, setStreamCart] = useState([]);
  const [courseBuying, setCourseBuying] = useState([]);
  const [savedCards, setsavedCards] = useState();
  const [copyCard, setCopyCard] = useState();
  const [tr_id, setTr_id] = useState("");
  const [cartTime, setCartTime] = useState(120);
  const [OTP, setOTP] = useState("");
  const [addMoneyMin, setAdddMoneyMin] = useState();
  const [sec, setSec] = useState();
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(vaucherReducer, initialState);

  useEffect(() => {
    setAdddMoneyMin(parseInt(cartTime / 60, 10));
    setSec(parseInt(cartTime % 60, 10));
  }, [cartTime]);

  useEffect(() => {
    if (alert) {
      let myInterval = setInterval(() => {
        if (cartTime > 0) {
          setCartTime(cartTime - 1);
        }
      }, 1000);

      return () => {
        clearInterval(myInterval);
      };
    }
  });

  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v1/orders/cart`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => {
            setCartItems(res.data.items);
            setOverallCost(res.data.total);
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
  }, [buyCourses]);

  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(
            `${process.env.REACT_APP_API_KEY}/api/v2/orders/voucher-wallet-balance`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((res) => {
            setVaucherBlance(res.data);
          })
          .catch((err) => console.log("xatolik yuz berdi"));
    } catch (error) {}
  }, []);

  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v2/orders/webinar-cart`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => {
            setStreamCart(res.data.items);
            setStreamCost(res.data.total);
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
    setCartItems([]);
  }, [buyCourses]);

  const typeFilterBuy = () => {
    if (vaucherBlance && vaucherBlance.balance == 0) {
      return "ucoin";
    }
    if (
      vaucherBlance &&
      parseInt(vaucherBlance.balance) / 100 >= overallCost + streamCost
    ) {
      return "voucher";
    }
    if (
      vaucherBlance &&
      parseInt(vaucherBlance.balance) / 100 + balance >=
        overallCost + streamCost &&
      balance !== 0
    ) {
      return "ucoin&voucher";
    }
  };

  const buyCourse = async () => {
    if (overallCost + streamCost <= (Math.floor(balance) + (Math.floor(vaucherBlance.balance) / 100))) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      };


      if(overallCost) {
        try {
          await axios
            .post(
              `${process.env.REACT_APP_API_KEY}/api/v2/orders/dynamic-payment-proceed`,
              {
                // voucher_ids: state.vauchers,
                type: typeFilterBuy(),
              },
              {
                headers,
              }
            )
            .then((res) => {
              setBuyCourse(res.data.eduon);
              setCourseBuying(res.data);
            })
            .catch((err) => {
              refresh(err.response.status, err.response.status.text);
            });
        } catch (error) {}
      }

      if(streamCost) {
        try {
          await axios
            .post(
              `${process.env.REACT_APP_API_KEY}/api/v2/orders/dynamic-payment-webinar-proceed`,
              {
                // voucher_ids: state.vauchers,  
                type: typeFilterBuy(),
              },
              {
                headers,
              }
            )
            .then((res) => {
              setBuyCourse(res.data.eduon);
            })
            .catch((err) => {
              refresh(err.response.status, err.response.status.text);
            });
        } catch (error) {}
      }
    } else {
      setErrorMoney(true);
    }

    if (overallCost + streamCost <= Math.floor(balance) + (Math.floor(vaucherBlance.balance) / 100)) {
      navigate("/myEnrolledCourses");
      setErrorMoney(false);
    } else if (
      overallCost + streamCost >= Math.floor(balance) + (Math.floor(vaucherBlance.balance) / 100)) {
      setErrorMoney(true);
      setTimeout(() => {
        setErrorMoney(false);
      }, 5000);
    } else {
      console.log("tizimda muammo yuzaga keldi");
    }

    // if (courseBuying.epos_response.every((res) => res.status) || vebinarBuying.epos_response.every((res) => res.status) ) {
    //   navigate("/myEnrolledCourses");
    //   setErrorMoney(false);
    // } else {
    //   setErrorMoney(true);
    //   setTimeout(() => {
    //     setErrorMoney(false);
    //   }, 5000);
    // }
  };

  const deleteVebinar = (e, id) => {
    e.preventDefault();
    console.log(id);
    try {
      loggedIn &&
        axios
          .delete(
            `${process.env.REACT_APP_API_KEY}/api/v2/orders/webinar-cart/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((res) => {
            setIsRemoved(!isremoved);
          });
    } catch (error) {}
  }

  const deleteFromCart = (e, id) => {
    e.preventDefault();
    try {
      loggedIn &&
        axios
          .delete(
            `${process.env.REACT_APP_API_KEY}/api/v1/orders/cart-remove/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((res) => {
            setIsRemoved(!isremoved);
          });
    } catch (error) {}
  };

  const transfer = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v1/wallet/transfer`,
          {
            number: savedCards.card_uuid,
            expire: savedCards.expire,
            amount: streamCost + overallCost,
            is_saved_card: true,
          },
          {
            headers,
          }
        )
        .then((res) => {
          setAlert(true)
          setTr_id(res.data.result.tr_id);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
          // console.log(err);
        });
    } catch (error) {}
  };

  const confirmTransfer = async () => {
    // setLoader(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v2/wallet/vuzcard-to-wallet-to-payment`,
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
          setAlert(false);
          // setbalanceToggle(!balanceToggle);
          // res.data.status ? setsuccessPayload(true) : setLoginError(true);
          // setConfigBalance(true);
        })
        .catch((err) => {
          // console.log(err);
          refresh(err.response.status, err.response.status.text);
        });

    } catch (error) {}
  }

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  // const chooseVoucher = async (vaucher, e) => {
  //   console.log('kirdi vashe')
  //   e.target.classList.add('active')

  //   e.target.parentElement.classList.remove('active')

  //   let res = state.vauchers.every((element) => element !== vaucher.id)

  //   if(res) {
  //     dispatch({type: 'ADD_VAUCHER', payload: vaucher})
  //   }
  // }

  // const deleteVauchers = (vaucher, e) => {
  //   e.target.classList.toggle('active')

  //     dispatch({type: 'REMOVE_VAUCHER', payload: vaucher})
  // }

  useEffect(() => {
    console.log(state.vauchersPrice);
  }, []);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/wallet/card`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          res.data.map((item) => item.type == "virtual" && setsavedCards(item));
        })
        .catch((err) => {});
    } catch (error) {}
  }, []);

  const CopyNotf = () => toast.success("Nusxa olindi.");

  const currency = (number, currency, lang = undefined) => 
  Intl.NumberFormat(lang, {style: 'currency', currency}).format(number)


  return (
    <>
      <NavbarDemo />
      <NavbarSm />
      <Sidebar />
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="shoppingCourses">
          <div className="container">
            <h1>Kurs xarid qilish</h1>
            <div className="rowGrid nowrap justify-lg-end">
              <div className="col-7 col-sm-24 hisob">
                <p>Hisobdagi joriy balans</p>

                <div className="carta">
                  <h1>
                    {balance ? currency(balance, 'UZS').replace(/,/g, ".").slice(0, -3) : 0}
                  </h1>
                </div>
                {vaucherBlance && (
                  <>
                    <p>Hisobdagi vaucher balans</p>
                  </>
                )}
                {vaucherBlance && (
                  <div className="carta">
                    <div>
                      <h1>
                      {vaucherBlance.balance ? currency((vaucherBlance.balance / 100), 'UZS').replace(/,/g, ".").slice(0, -3) : 0}
                      </h1>
                      <h6>Yaroqlik muddati {moment
                          .utc(vaucherBlance.expire_date)
                          .format("Do - MMMM YYYY")}</h6>
                    </div>
                  </div>
                )}

{savedCards && (
                  <div className="shoppingTotoalUzcard">
                    <h5>Uzcard orqali xarid qilish:</h5>
                    <div
                      className="flex align-center"
                      style={{ margin: "10px 0", color: "#000" }}
                    >
                      <h4 style={{ margin: "0px 5px 0 0" }}>
                        {/* {savedCards.card_number
                          .replace(/[^\dA-Z]/g, "")
                          .replace(/(.{4})/g, "$1 ")
                          .trim()} */}

                        {savedCards.card_number.slice(0, 4)} **** ****{" "}
                        {savedCards.card_number.slice(12)}
                      </h4>
                      <ContentCopyIcon
                        className="c-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(`${savedCards.card_number}`);
                          CopyNotf();
                        }}
                      />
                      <ToastContainer style={{ marginTop: "50px" }} />
                    </div>
                    <h5 style={{marginBottom: '10px'}}>Balans: {(savedCards.balance / 100).toLocaleString("uz-UZ", {
                      style: "currency",
                      currency: "UZS",
                    })}</h5>
                     <h6 className="mb-24">
                        Yaroqlik muddati{" "}
                          {savedCards.expire?.slice(0, 2) +
                          "/" +
                          savedCards.expire?.slice(2, 4)}
                      </h6>
                    <button className="shopBtn" onClick={transfer}>
                      Xarid qilish
                    </button>
                  </div>
                )}
                <button
                  onClick={() => navigate("/moneyOperations")}
                  className="pointer cartaBtn"
                >
                  Balansni to’ldirish
                </button>
              </div>

              <div className="col-12 hisob col-lg-17 col-sm-24 mb-lg-30">
                <p>Xarid xulosasi</p>
                {cartItems.length + streamCart.length > 0 ? (
                  <div className="purchaseSummary">
                    {streamCart.map((item, index) => (
                      <div key={index} className="summary">
                        <div className="summaryImg">
                          <img
                            src={
                              item.webinar.cover_img
                                ? `${process.env.REACT_APP_API_KEY}${item.webinar.cover_img}`
                                : image
                            }
                            alt="jpg"
                          />
                          <h1>{item.webinar.name}</h1>
                        </div>
                          
                        <h1>
                          {item.webinar.discount_price
                            ? (
                                item.price - item.webinar.discount_price
                              ).toLocaleString("uz-UZ", {
                                style: "currency",
                                currency: "UZS",
                              })
                            : item.price.toLocaleString("uz-UZ", {
                                style: "currency",
                                currency: "UZS",
                              })}
                        </h1>
                      </div>
                    ))}

                    {cartItems.map((item, index) => (
                      <div key={index} className="summary">
                        <div className="summaryImg">
                          <img
                            src={
                              item.course.cover_img
                                ? `${process.env.REACT_APP_API_KEY}${item.course.cover_img}`
                                : image
                            }
                            alt="jpg"
                          />
                          <h1>{item.course.name}</h1>
                        </div>
                        <div>
                        <h1>
                          {item.course.discount_price
                            ? (currency(item.course.price - item.course.discount_price, 'UZS'))
                            : currency(item.course.price, 'UZS').replace(/,/g, ".").slice(0, -3)}
                        </h1>
                        {/* <p
                              className="pointer"
                              onClick={(e) => deleteVebinar(e, item.id)}
                            >
                              Savatdan o’chirish
                            </p> */}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              
              </div>
              <div className="col-6 col-lg-9 col-sm-24">
                <div className="shoppingTotoal">
                  <h2>Jami:</h2>
                  <h1>  
                    {overallCost || streamCost ? currency(streamCost + overallCost, 'UZS').replace(/,/g, ".").slice(0, -3): 0}
                  </h1>
                  <button onClick={buyCourse}>Xarid qilish</button>
                </div>

              
              </div>
            </div>
          </div>
          {errorMoney && (
            <div className="errorMessage">
              <h2 className="error-messageee">
                Hisobingizda yetarli mablag' yo'q
              </h2>
            </div>
          )}

          <Alert
            className={alert ? "alert animation" : "alert"}
            style={{
              // MinHeight: "350px",
              borderRadius: "15px",
              background: "white",
            }}
          >
            <p>
              <strong>
                Plastik karta aktivlashtirilgan telefon raqamiga sms kod
                jo'natildi.
              </strong>
            </p>
            <p style={{ marginTop: "15px" }}>
              Qolgan vaqt:{" "}
              <span>{`0${addMoneyMin} : ${sec > 10 ? "" : "0"} ${sec}`}</span>
            </p>

            <div className="wrapper">
              <OTPInput
                value={OTP}
                onChange={setOTP}
                autoFocus
                OTPLength={5}
                otpType="number"
                disabled={cartTime === 0 ? true : false}
                type="number"
              />
              <p className="alertTitle">Tasdiqlash kodi</p>
            </div>
            <p
              className="reSendSms"
              onClick={() => {
                transfer();
                setCartTime(120);
              }}
            >
              Qaytadan yuborish
            </p>
            <Button
              sx={{
                width: "100%",
                height: "50px",
                borderRadius: "15px",
                backgroundColor: "#80B5FF;",
                fontFamily: "sans-serif",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "24px",
                textTransform: "none",
                marginTop: " 30px",
              }}
              variant="contained"
              className="btn"
              onClick={() => {
                 confirmTransfer();
              }}
            >
              O’tkazmani tasdiqlash
            </Button>
            <ToastContainer style={{ marginTop: "50px" }} />
          </Alert>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShoppingCourses;

// import axios from "../../Apis/api";
// import React, { useContext, useEffect, useState } from "react";
// import { StateContext } from "../../context/Context";
// import "./ShoppingCourses.css";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../Sidebar/Sidebar";
// import Footer from "../Footers/Footer";
// import NavbarDemo from "../Navbar/Navbar";
// import { refresh } from "../../Apis/RefreshToken/RefreshToken";
// import NavbarSm from "../Navbar/NavbarSm";
// import image from "../../assets/images/Rectangle 1.png";

// function ShoppingCourses(props) {
//   const [cartItems, setCartItems] = useState([]);
//   const [overallCost, setOverallCost] = useState(0);
//   const { navStretch, balance, loggedIn } = useContext(StateContext);
//   const [errorMoney, setErrorMoney] = useState(false);
//   const [buyCourses, setBuyCourse] = useState("");
//   const [vaucherBlance, setVaucherBlance] = useState();
//   const [vebinarBuying, setVebinarBuying] = useState([])
//   const [streamCost, setStreamCost] = useState(0)
//   const [streamCart, setStreamCart] = useState([])
//   const [courseBuying, setCourseBuying] = useState([])

//   // console.log(vaucherBlance);
//   const navigate = useNavigate();

//   useEffect(() => {
//     try {
//       loggedIn &&
//         axios
//           .get(`${process.env.REACT_APP_API_KEY}/api/v1/orders/cart`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           })
//           .then((res) => {
//             setCartItems(res.data.items);
//             setOverallCost(res.data.total);
//           })
//           .catch((err) => {
//             refresh(err.response.status, err.response.status.text);
//           });
//     } catch (error) {}
//   }, [buyCourses]);

//   useEffect(() => {
//     try {
//       loggedIn &&
//         axios
//           .get(`${process.env.REACT_APP_API_KEY}/api/v2/orders/webinar-cart`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           })
//           .then((res) => {
//             console.log(res.data);
//             setStreamCart(res.data.items);
//             setStreamCost(res.data.total);
//           })
//           .catch((err) => {
//             refresh(err.response.status, err.response.status.text);
//           });
//     } catch (error) {}
//   }, [buyCourses]);

//   const buyCourse = async () => {
//     if(balance + vaucherBlance.voucher_summa >= (overallCost + streamCost)) {
//     const headers = {
//       Authorization: `Bearer ${localStorage.getItem("access")}`,
//     };
//     try {
//       await axios
//         .post(
//           `${process.env.REACT_APP_API_KEY}/api/v2/orders/payment-proceed`,
//           null,
//           {
//             headers,
//           }
//         )
//         .then((res) => {
//           setBuyCourse(res.data.eduon);
//           setCourseBuying(res.data)
//           // if (overallCost <= (balance + vaucherBlance.voucher_summa)) {
//           //   navigate("/myEnrolledCourses");
//           //   setErrorMoney(false);
//           // } else if(overallCost >= (balance + vaucherBlance.voucher_summa)) {
//           //   setErrorMoney(true);
//           //   setTimeout(() => {
//           //     setErrorMoney(false);
//           //   }, 5000);
//           // }else{
//           //   console.log('tizimda muammo yuzaga keldi')
//           // }
//         })
//         .catch((err) => {
//           refresh(err.response.status, err.response.status.text);
//         });
//     } catch (error) {}

//     try {
//       await axios
//         .post(
//           `${process.env.REACT_APP_API_KEY}/api/v2/orders/webinar-proceed`,
//           {

//           },
//           {
//             headers,
//           }
//         )
//         .then((res) => {
//           setBuyCourse(res.data.eduon);
//           setVebinarBuying(res.data)
//         })
//         .catch((err) => {
//           refresh(err.response.status, err.response.status.text);
//         });
//     } catch (error) {}

//   }
//   else {
//     setErrorMoney(true)
//   }

//     if ((overallCost + streamCost) <= (balance + vaucherBlance.voucher_summa)) {
//             navigate("/myEnrolledCourses");
//             setErrorMoney(false);
//           } else if(overallCost >= (balance + vaucherBlance.voucher_summa)) {
//             setErrorMoney(true);
//             setTimeout(() => {
//               setErrorMoney(false);
//             }, 5000);
//           }else{
//             console.log('tizimda muammo yuzaga keldi')
//           }

//   // if (courseBuying.epos_response.every((res) => res.status) || vebinarBuying.epos_response.every((res) => res.status) ) {
//   //   navigate("/myEnrolledCourses");
//   //   setErrorMoney(false);
//   // } else {
//   //   setErrorMoney(true);
//   //   setTimeout(() => {
//   //     setErrorMoney(false);
//   //   }, 5000);
//   // }

//   };
//   useEffect(() => {
//     document.body.scrollTop = 0;
//     document.documentElement.scrollTop = 0;
//   }, []);
//   useEffect(() => {
//     try {
//       axios
//         .get(
//           `${process.env.REACT_APP_API_KEY}/api/v2/orders/voucher-sum-view`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         )
//         .then((res) => setVaucherBlance(res.data))
//         .catch((err) => console.log('xatolik yuz berdi'));
//     } catch (error) {}
//   }, []);

//   return (
//     <>
//       <NavbarDemo />
//       <NavbarSm />
//       <Sidebar />
//       <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
//         <div className="shoppingCourses">
//           <div className="container">
//             <h1>Kurs xarid qilish</h1>
//             <div className="rowGrid nowrap justify-lg-end">
//               <div className="col-7 col-sm-24 hisob">
//                 <p>Hisobdagi joriy balans</p>
//                 <div className="carta">
//                   <h1>
//                     {balance
//                       ? balance.toLocaleString("uz-UZ", {
//                           style: "currency",
//                           currency: "UZS",
//                         })
//                       : 0}
//                   </h1>
//                 </div>
//                 <p>Hisobdagi vaucher balans</p>
//                 <div className="carta">
//                   <h1>
//                     {vaucherBlance
//                       ? vaucherBlance.voucher_summa
//                           .toLocaleString("uz-UZ", {
//                             style: "currency",
//                             currency: "UZS",
//                             minimumFractionDigits: 0,
//                             maximumFractionDigits: 0,
//                           })
//                           .replace(",", " ")
//                       : 0}
//                   </h1>
//                 </div>
//                 <button
//                   onClick={() => navigate("/moneyOperations")}
//                   className="pointer cartaBtn"
//                 >
//                   Balansni to’ldirish
//                 </button>
//               </div>

//               <div className="col-12 hisob col-lg-17 col-sm-24 mb-lg-30">
//                 <p>Xarid xulosasi</p>
//                 {cartItems.length + streamCart.length > 0 ? (
//                   <div className="purchaseSummary">
//                       {streamCart.map((item, index) => (
//                         <div key={index} className="summary">
//                         <div className="summaryImg">
//                           <img
//                             src={
//                               item.webinar.cover_img
//                                 ? `${process.env.REACT_APP_API_KEY}${item.webinar.cover_img}`
//                                 : image
//                             }
//                             alt="jpg"
//                           />
//                           <h1>{item.webinar.name}</h1>
//                         </div>
//                         <h1>
//                           {item.webinar.discount_price
//                             ? (
//                                 item.price - item.webinar.discount_price
//                               ).toLocaleString("uz-UZ", {
//                                 style: "currency",
//                                 currency: "UZS",
//                               })
//                             : item.price.toLocaleString("uz-UZ", {
//                                 style: "currency",
//                                 currency: "UZS",
//                               })}
//                         </h1>
//                       </div>
//                     ))}

//                     {cartItems.map((item, index) => (
//                       <div key={index} className="summary">
//                         <div className="summaryImg">
//                           <img
//                             src={
//                               item.course.cover_img
//                                 ? `${process.env.REACT_APP_API_KEY}${item.course.cover_img}`
//                                 : image
//                             }
//                             alt="jpg"
//                           />
//                           <h1>{item.course.name}</h1>
//                         </div>
//                         <h1>
//                           {item.course.discount_price
//                             ? (
//                                 item.course.price - item.course.discount_price
//                               ).toLocaleString("uz-UZ", {
//                                 style: "currency",
//                                 currency: "UZS",
//                               })
//                             : item.course.price.toLocaleString("uz-UZ", {
//                                 style: "currency",
//                                 currency: "UZS",
//                               })}
//                         </h1>
//                       </div>
//                     ))}
//                   </div>
//                 ) : null}
//               </div>
//               <div className="col-6 col-lg-9 col-sm-24">
//                 <div className="shoppingTotoal">
//                   <h2>Jami:</h2>
//                   <h1>
//                     {(streamCost + overallCost).toLocaleString("uz-UZ", {
//                       style: "currency",
//                       currency: "UZS",
//                     })}{" "}
//                   </h1>
//                   <button onClick={buyCourse}>Xarid qilish</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {errorMoney && (
//             <div className="errorMessage">
//               <h2 className="error-messageee">
//                 Hisobingizda yetarli mablag' yo'q
//               </h2>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default ShoppingCourses;
