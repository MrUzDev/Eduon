import React, { useContext, useState, useEffect } from "react";
import "./VendorSchoolMyCourses.css";
import VendorSchoolSidebar from "../VendorSchoolSidebar/VendorSchoolSidebar";
import VendorSchoolNavbar from "../VendorSchoolNavbar/VendorSchoolNavbar";
import { StateContext } from "../../context/Context";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "react-modal";
import axios from "../../Apis/api";
import ReactHtmlParser from 'react-html-parser';
import { useNavigate } from "react-router-dom";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function VendorSchoolMyCourses() {
  const { sidebarOpen, setSidebarOpen } = useContext(StateContext);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [manualVideo, setManualVideo] = useState();
  const [technicalWorkModal, setTechnicalWorkModal] = useState(false);
  const [smData, setSmData] = useState([])

  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v2/courses/sm-courses`)
        .then((res) => setSmData(res.data));
    } catch (error) {}
  }, []);

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
      width: "600px",
    },
  };

  const customStylesSmallWidth = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "15px",
      zIndex: "2",
      width: "400px",
    },
  };

  useEffect(() => {
    console.log(smData);
  }, [smData])

  return (
    <div>
      <VendorSchoolNavbar />
      <VendorSchoolSidebar active={"myCourses"} />

      <div
        className={`${
          sidebarOpen ? "vs-content" : "vs-content-noactive"
        } vs-big-container myCoursess`}
      >
        <div className="container">
          <div className="flex justify-between align-center mb-24 vs-title-video-box">
            <div className="vendor-title">
              <h2 className="text-black">Mening kurslarim</h2>
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

          <div className="mb-24 vs-prog">
            <div className="rowGrid">
              {smData.map((item) => 
              <div className="col-24 mb-24">
                <div className="vs-my-courses-box flex">
                  <div>
                    <img className="pointer" onClick={() => navigate(`/watch/${item.id}`)} src={`${process.env.REACT_APP_API_KEY}${item.cover_img}`} alt="" />
                  </div>
                  <div className="width-100 flex">
                    <div className="vs-mt-courses-box-about">
                      <div>
                        <p className="litle-title">
                          {item.short_descr && ReactHtmlParser(item.short_descr)[0].length >= 250
                            ? (ReactHtmlParser(item.short_descr)[0]).slice(0, 250) + "..."
                            : (ReactHtmlParser(item.short_descr)[0])}
                        </p>
                        <h5>{item.name}</h5>
                        <p className="vs-tutorial-time">
                          Qolgan dars soatlari <span>4 : 53 : 21</span>
                        </p>
                      </div>
                      <div className="flex vs-course-prog">
                        <p className="mr-10">
                          Kurs progressi: <span> 39%</span>
                        </p>
                        <p className="mr0">
                          Modullar soni: <span>3/5</span>{" "}
                        </p>
                      </div>
                    </div>
                    <span className="vs-course-prog-span"></span>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
            Mening kurslarim haqida video qo’llanma
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={technicalWorkModal}
        style={customStylesSmallWidth}
        contentLabel="Example Modal"
        ariaHideApp={false}
        id="modal"
      >
        <div
          style={{
            background: "#fff",
            position: "relative",
            overflowY: "hidden",
          }}
        >
          <p style={{ color: "red", fontSize: "32px" }}>
            Texnik ishlar olib <br /> borilmoqda...
          </p>
        </div>
      </Modal>
    </div>
  );
}
