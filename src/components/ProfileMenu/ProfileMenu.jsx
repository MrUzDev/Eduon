import React, { useContext, useEffect, useState } from "react";
import "./ProfileMenu.css";
// import Akbarali from "../../assets/images/Ellipse 2.png";
import MyAccount from "../../assets/icons/wallet-add.png";
import { useNavigate } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { StateContext } from "../../context/Context";

function ProfileMenu(props) {
  const navigate = useNavigate();
  const { statusChange, balance, vaucherBlanceData } = useContext(StateContext);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    setStatus(JSON.parse(localStorage.getItem("status")));
  }, [statusChange]);

  const logoutClick = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.reload();
  };

  const currency = (number, currency, lang = undefined) => 
  Intl.NumberFormat(lang, {style: 'currency', currency}).format(number)


  return (
    <div className="profileMenu">
      <div className="openProfileMenu">
        <div onClick={() => navigate("/userAbout")} className="user pointer">
          {props.img ? (
            <img
              className="avatar pointer"
              src={`${process.env.REACT_APP_API_KEY}${props.img}`}
              alt="..."
            />
          ) : (
            <AccountCircleIcon className="avatar pointer" />
          )}
          <h1>
            {`${props.name}  ${props.surname}`}
            <br /> <span>+{props.mobile}</span>
          </h1>
        </div>
        <div className="myAccount">
          <div className="myAccountTitle">
            <span>Mening hisobim</span>
            <h1>
            {balance && vaucherBlanceData
                ? currency((balance) + parseInt(vaucherBlanceData.balance / 100), "UZS").replace("UZS", '').replace('soʻm', '').replace(/,/g, ".").slice(0, -3)
                : 0}
              &nbsp;so'm
            </h1>
          </div>
          <div className="iconsSvgMoney myAccountImg">
            <svg
              onClick={() => navigate("/moneyOperations")}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2617 15.4385H9.26172"
                stroke="#FCFCFC"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.7617 12.998V17.998"
                stroke="#FCFCFC"
                strokeWidth="1.5"
                strokeLterlimit="10"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.66 2.51814L12.63 2.58814L9.72996 9.31814H6.87996C6.19996 9.31814 5.54996 9.45814 4.95996 9.70814L6.70996 5.52814L6.74996 5.42814L6.81996 5.26814C6.83996 5.20814 6.85996 5.14814 6.88996 5.09814C8.19996 2.06814 9.67996 1.37814 12.66 2.51814Z"
                stroke="#FCFCFC"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.05 9.51813C17.6 9.37813 17.12 9.31813 16.64 9.31813H9.72998L12.63 2.58813L12.66 2.51813C12.81 2.56813 12.95 2.63813 13.1 2.69813L15.31 3.62813C16.54 4.13813 17.4 4.66813 17.92 5.30813C18.02 5.42813 18.1 5.53813 18.17 5.66813C18.26 5.80813 18.33 5.94813 18.37 6.09813C18.41 6.18813 18.44 6.27813 18.46 6.35813C18.73 7.19813 18.57 8.22813 18.05 9.51813Z"
                stroke="#FCFCFC"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.5217 14.1984V16.1484C21.5217 16.3484 21.5117 16.5484 21.5017 16.7484C21.3117 20.2384 19.3617 21.9984 15.6617 21.9984H7.86172C7.62172 21.9984 7.38172 21.9784 7.15172 21.9484C3.97172 21.7384 2.27172 20.0384 2.06172 16.8584C2.03172 16.6284 2.01172 16.3884 2.01172 16.1484V14.1984C2.01172 12.1884 3.23172 10.4584 4.97172 9.70836C5.57172 9.45836 6.21172 9.31836 6.89172 9.31836H16.6517C17.1417 9.31836 17.6217 9.38836 18.0617 9.51836C20.0517 10.1284 21.5217 11.9884 21.5217 14.1984Z"
                stroke="#FCFCFC"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.71 5.52814L4.96 9.70814C3.22 10.4581 2 12.1881 2 14.1981V11.2681C2 8.42814 4.02 6.05814 6.71 5.52814Z"
                stroke="#FCFCFC"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.5186 11.2677V14.1977C21.5186 11.9977 20.0586 10.1277 18.0586 9.52766C18.5786 8.22766 18.7286 7.20766 18.4786 6.35766C18.4586 6.26766 18.4286 6.17766 18.3886 6.09766C20.2486 7.05766 21.5186 9.02766 21.5186 11.2677Z"
                stroke="#FCFCFC"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="title">
          <p onClick={() => navigate("/profile")} className="pointer">
            Profilni tahrirlash
          </p>
          {!status && (
            <p onClick={() => navigate("/userAbout")} className="pointer">
              Umumiy profil
            </p>
          )}
          {!status && (
            <p
              onClick={() => navigate("/myEnrolledCourses")}
              className="pointer"
            >
              Mening darslarim
            </p>
          )}
        </div>
        {status && (
          <div className="title">
            <p className="pointer" onClick={() => navigate("/userAbout")}>
              Shaxsiy kabinet
            </p>
            <p
              className="pointer"
              onClick={() => navigate("/speakerMyCourses")}
            >
              Yuklagan kurslarim
            </p>
            <p className="pointer" onClick={() => navigate("/speaker")}>
              Spiker panel
            </p>
          </div>
        )}
        <h1 onClick={logoutClick} className="exitProfile pointer">
          Profildan chiqish
        </h1>
      </div>
    </div>
  );
}

export default ProfileMenu;
