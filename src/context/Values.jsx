import axios from "../Apis/api";
import { useEffect, useReducer, useState } from "react";
import { refresh } from "../Apis/RefreshToken/RefreshToken";
import { initialState, reducer } from "../reducer/reducer";

export default function Values() {
  const [navStretch, setNavStretch] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState("");
  const [jwtToken, setjwtToken] = useState("");
  const [responseData, setresponseData] = useState("");
  const [avatar, setAvatar] = useState("");
  const [user, setUser] = useState([]);
  const [videUploadBtn, setvideUploadBtn] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToFav, setAddedToFav] = useState(false);
  const [statusChange, setStatusChange] = useState(false);
  const [balance, setBalance] = useState(0);
  const [balanceToggle, setbalanceToggle] = useState(false);
  const [isremoved, setIsRemoved] = useState(false);
  const [subCategoryId, setSubCategoryId] = useState();
  const [courseUpBool, setCourseUpBool] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [myEnrolledCourses, setmyEnrolledCourses] = useState(0);
  const [filterPriceValue, setFilterPriceValue] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const [boughtCourses, setBoughtCourses] = useState([]);
  const loggedIn = localStorage.getItem("access")
  const [streamStart, setStreamStart] = useState(false);
  const [name, setName] = useState();
  const [profilePhoto, setProfilePhoto] = useState("");
  const [vaucherBlanceData, setVaucherBlanceData] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showVsChat, setShowVsChat] = useState(false)
  const [addMoneyModal, setAddMoneyModal] = useState(false);
  const [registerEmail, setRegisterEmail] = useState(false)

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v1/wallet/info`, {
            headers,
          })
          .then((res) => {
            setBalance(res.data.result.balance);
          })
          .catch((err) => {
            console.log(err);
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
  }, [balanceToggle]);
  
  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(
            `${process.env.REACT_APP_API_KEY}/api/v1/courses/enrolled-courses/`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then((res) => {
            setBoughtCourses(res.data);
          })
          .catch((err) => {
            refresh(err.response.status, err.response.status.text);
          });
    } catch (error) {}
  }, []);

  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v1/accounts/profile`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => {
            setName(`${res.data.f_name} ${res.data.l_name}`);
            setProfilePhoto(res.data.profile_picture_url);
          })
          .catch((err) => {});
    } catch (error) {}
  }, []);

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
          .then((res) => setVaucherBlanceData(res.data))
          .catch((err) => console.log(err.data));
    } catch (error) {}
  }, []);

  const values = {
    navStretch,
    setNavStretch,
    phoneNumber,
    setPhoneNumber,
    token,
    setToken,
    jwtToken,
    setjwtToken,
    responseData,
    setresponseData,
    avatar,
    setAvatar,
    isremoved,
    setIsRemoved,
    balance,
    setBalance,
    loggedIn,
    state,
    dispatch,
    subCategoryId,
    setSubCategoryId,
    courseUpBool,
    setCourseUpBool,
    videUploadBtn,
    setvideUploadBtn,
    addedToCart,
    setAddedToCart,
    addedToFav,
    setAddedToFav,
    statusChange,
    setStatusChange,
    mobileMenuOpen,
    setMobileMenuOpen,
    myEnrolledCourses,
    setmyEnrolledCourses,
    user,
    setUser,
    filterPriceValue,
    setFilterPriceValue,
    boughtCourses,
    setBoughtCourses,
    balanceToggle,
    setbalanceToggle,
    setStreamStart,
    streamStart,
    name,
    profilePhoto,
    vaucherBlanceData,
    sidebarOpen,
    setSidebarOpen,
    showVsChat,
    setShowVsChat,
    addMoneyModal,
    setAddMoneyModal,
    registerEmail,
    setRegisterEmail
  };
  return values;
}
