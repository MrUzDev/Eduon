import React, { useState, useEffect, useContext } from "react";
import VendorSchoolSidebar from "../VendorSchoolSidebar/VendorSchoolSidebar";
import VendorSchoolNavbar from "../VendorSchoolNavbar/VendorSchoolNavbar";
import { StateContext } from "../../context/Context";
import './VendorSchoolSertificate.css'
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "react-modal";

export default function VendorSchoolSertificate() {
  const { sidebarOpen } = useContext(StateContext);
  const [manualVideo, setManualVideo] = React.useState()

  const navigate = useNavigate()


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
  return (
    <div>
      <VendorSchoolNavbar />
      <VendorSchoolSidebar active={"sertificate"} />

      <div className={`${sidebarOpen ? "vs-content" : "vs-content-noactive"} vs-big-container`}>
        <div className="container">
          <div className="flex justify-between align-center mb-50 vs-title-video-box">
            <div className="vendor-title">
              <h2 className="text-black">Menig sertifikatlarim</h2>
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

          <div className="text-center">
            <h3 className="mb-24">☹️Sizda hali sertifikat mavjud emas.</h3>
              <p><span className="get-setficate-btn" onClick={() => navigate('/sotuvchilarMaktabi/MyCourses')}>Kurslarni</span> muvaffaqiyatli tugatib sertifikatlarga ega bo’ling!</p>
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
          <iframe style={{width: '100%', height: '300px', borderRadius: '10px', margin: '20px 0'}}  src="https://www.youtube.com/embed/z6S3J45rTrg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

          <p  style={{color: "#000", fontSize: '22px'
          }}>Menig sertifikatlarim
          haqida video qo’llanma</p>

        </div>
      </Modal>
    </div>
  );
}