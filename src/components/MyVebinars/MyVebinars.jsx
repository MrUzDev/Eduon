import React, { useEffect, useState, useContext } from "react";
import "./MyVebinars.css";
// import RectangelOne from "../assets/images/Rectangle 1.png";
import { useNavigate } from "react-router-dom";
import axios from "../../Apis/api";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import { BounceLoader } from "react-spinners";
import liveImg from "../../assets/images/livephoto.jpg";
import moment from "moment";
import { Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { StateContext } from "../../context/Context";


function MyVebinars(props) {
  const navigate = useNavigate();

  const { profilePhoto, loggedIn } = useContext(StateContext);

  const [uploadedWebinars, setUploadedWebinars] = useState([]);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [startStreamDay, setStartStreamDay] = useState()
  const [startStreamHour, setStartStreamHour] = useState()
  const [startStreamMinute, setStartStreamMinute] = useState()
  const [isCheckDeleteStream, setIsCheckDeleteStream] = useState(false)
  const [startStreamSecond, setStartStreamSecond] = useState('')


  useEffect(() => {
    setLoader(true);
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v2/stream/speaker-webinars/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then((res) => {
          setUploadedWebinars(res.data);
          setLoader(false);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {
      setLoader(false);
    }
  }, [isCheckDeleteStream]);

  
  const chosenVebinars = (e, id, start_time, is_valid) => {
    
    const restTime = (new Date(start_time).getTime()) - (new Date(moment().format().replace("+03:00", "+05:00")));
    setStartStreamDay(Math.floor(restTime / (1000 * 60 * 60 * 24)));
    setStartStreamHour( Math.floor(
      (restTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ));
    setStartStreamMinute(Math.floor((restTime % (1000 * 60 * 60)) / (1000 * 60)));
    setStartStreamSecond(Math.floor((restTime % (1000 * 60)) / 1000))

    if ( (new Date(start_time).getTime()) <= (new Date(moment().format().replace("+03:00", "+05:00")))) {
      e.preventDefault();
      navigate(`/stream/${id}`);
    }else {
      setOpen(true);
    }
  };


  const deleteStream = (streamId) => {
    try {
      loggedIn && axios
        .delete(
          `${process.env.REACT_APP_API_KEY}/api/v2/stream/delete-webinar/${streamId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        ).then((res) => setIsCheckDeleteStream(streamId))
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });

    } catch (error) {}
  }
  const { user } = props;


  const statisOpenStream = (e, id) => {
    e.preventDefault()
    navigate(`/statisticVebinarInside/${id}`)
  }

  return (
    <section className="loadedCourses">
      <div className="container">
        <div className="rowGrid">
          {user ? (
            user.is_speaker ? (
              <div className="tableList">
                {!loader && uploadedWebinars.length !== 0 ? (
                  <table>
                    <tr className="topTitle">
                      <th className="col-1">№</th>
                      <th style={{ textAlign: "left" }} className="col-7">
                        Nomi
                      </th>
                      <th className="col-2">
                        Vebinar narxi
                        <svg width="9" height="13" fill="none">
                          <path
                            d="M1 8.63989L4.53 12.1599L8.06 8.63989"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.05957 4.52002L4.52957 1.00002L0.999571 4.52002"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </th>

                      <th>
                        Status
                        <svg width="9" height="13" fill="none">
                          <path
                            d="M1 8.63989L4.53 12.1599L8.06 8.63989"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.05957 4.52002L4.52957 1.00002L0.999571 4.52002"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </th>

                      <th>
                        Vebinar vaqti
                        <svg width="9" height="13" fill="none">
                          <path
                            d="M1 8.63989L4.53 12.1599L8.06 8.63989"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.05957 4.52002L4.52957 1.00002L0.999571 4.52002"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </th>

                      <th>
                        Boshlash
                        <svg width="9" height="13" fill="none">
                          <path
                            d="M1 8.63989L4.53 12.1599L8.06 8.63989"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.05957 4.52002L4.52957 1.00002L0.999571 4.52002"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </th>
                    </tr>
                    {uploadedWebinars.map((item, index) => (
                      <tr key={index} className="bodyTitle">
                        <td className="col-1 number">{index + 1}</td>
                        <td
                         onClick={(e) => statisOpenStream(e, item.id)}
                          className="col-2 imgs"
                          style={{ textAlign: "left" }}
                        >
                          {item.cover_img ? (
                            <img
                              src={`${process.env.REACT_APP_API_KEY}${item.cover_img}`}
                              alt="..."
                            />
                          ) : (
                            <img src={liveImg} alt="" />
                          )}
                          <p style={{ whiteSpace: "noWrap" }}>
                            {item.name && item.name.length > 25
                              ? item.name.slice(0, 20) + "..."
                              : item.name}
                          </p>
                        </td>
                        {/* <td style={{textAlign:"left"}} className="col-7">{item.name}</td> */}
                        <td className="col-2">
                          {item.price
                            ? item.discount_price
                              ? item.price
                                  .toLocaleString("uz-UZ", {
                                    style: "currency",
                                    currency: "UZS",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })
                                  .replace("UZS", " ")
                                  .replace(",", " ")
                              : item.price
                                  .toLocaleString("uz-UZ", {
                                    style: "currency",
                                    currency: "UZS",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })
                                  .replace("UZS", " ")
                                  .replace(",", " ")
                            : 0}{" "}
                          UZS
                        </td>
                        {/* <td className="col-2">{item.enrolled_students}</td> */}
                        <td
                          className={
                            item.is_end == true && item.is_valid == 'VALID' ? (
                                'col-2 rejected'
                            ): (
                              item.is_valid === "VALID" ? "col-2 active" : "col-2 onHold"

                            )
                          }
                        >
                          {!item.is_end && item.is_valid === "VALID" ? "Aktiv" : item.is_valid === "ON HOLD"
                            ? "Jarayonda"
                            : "Yakunlangan"}
                        </td>

                        <td className="col-2">
                          {item.start_time
                            .replace("T", " ")
                            .replace("+05:00", "")}
                        </td>

                          {item.is_valid === 'VALID' && item.is_end ? (
                             <td
                             style={{ textDecoration: "underline" }}
                             className="col-2" onClick={() => deleteStream(item.id)}>O'chirish</td>
                          ): (
                        item.is_valid === "VALID" ? (
                        <td onClick={(e) => chosenVebinars(e, item.id, item.start_time, item.is_valid)}
                          style={{ textDecoration: "underline" }}
                          className="col-2"> Vebinarni Boshlash </td>
                        ): (
                          <td
                          style={{ textDecoration: "underline" }}
                          className="col-2">Tasdiqlanmagan</td>
                        ))}  
                      </tr>
                    ))}
                  </table>
                ) : (
                  !loader && <h1>Sizda hali yuklangan vebinarlar mavjud emas</h1>
                )}
              </div>
            ) : (
              !loader && <h1>Siz Spiker emassiz</h1>
            )
          ) : null}
        </div>
      </div>
      {loader && (
        <div className="loader">
          <BounceLoader color="#006AFF" speedMultiplier={1.2} />
        </div>
      )}
     
     {open ? (
       <Alert
       action={
         <IconButton
           aria-label="close"
           color="inherit"
           size="small"
           onClick={() => {
             setOpen(false);
           }}
         ></IconButton>
       }
       sx={{ mb: 2 }}
       className="alert animation"
       severity="error"
     >
       <strong>
         <p style={{ fontSize: "18px" }}>
          vebinar boshlanishiga {startStreamDay > 0 ? startStreamDay + ' kun' : null} {startStreamHour > 0 ? startStreamHour + ' soat' : null} {startStreamMinute > 0 ? startStreamMinute + ' daqiqa' : null} {startStreamSecond && startStreamSecond + ' sekund'} qoldi
         </p>
       </strong>
     </Alert>
     ): null}

    </section>
  );
}

export default MyVebinars;
