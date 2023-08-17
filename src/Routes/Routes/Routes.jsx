import axios from "../../Apis/api";
import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AboutEduon from "../../components/AboutEduon/AboutEduon";
import UserAbout from "../../components/AboutUser/UserAbout";
import ChosenCourse from "../../components/ChosenCourse/ChosenCourse";
import ChosenCourseCategory from "../../components/ChosenCourseCategory/ChosenCourseCategory";
import CourseOpened from "../../components/CourseInsideOpened/CourseOpened";
import CoursesFilter from "../../components/CoursesFilter/CoursesFilter";
import EditCourse from "../../components/EditCourse/EditCourse";
// import Example from "../../components/Example/example";
import Faq from "../../components/Faq/Faq";
import Favourites from "../../components/FavouritesPage/favourites";
import MoneyOperations from "../../components/MoneyOperations/moneyOperations";
import Myactive from "../../components/Myactive/Myactive";
import Profile from "../../components/Profile/Profile";
import Search from "../../components/Search/search";
import SearchPage from "../../components/SearchPage/searchPage";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import ShoppingCourses from "../../components/ShoppingCourses/ShoppingCourses";
import SpChosenCourse from "../../components/SpChosenCourse/SpChosenCourse";
import SpeakerAbout from "../../components/SpeakersAbout/SpeakerAbout";
import UploadCourse from "../../components/UploadCourse/uploadCourse";
import Watching from "../../components/Watching/Watching";
import Login from "../../pages/Authentification/Login/Login";
import Fio from "../../pages/Authentification/Register/Fio";
import Register from "../../pages/Authentification/Register/Register";
import SmsVerify from "../../pages/Authentification/Register/SmsVerify";
import ResetNewPass from "../../pages/Authentification/ResetPassword/ResetNewPass";
import ResetPassword from "../../pages/Authentification/ResetPassword/ResetPassword";
import ResetVerify from "../../pages/Authentification/ResetPassword/ResetVerify";
import Homepage from "../../pages/Homepage/homepage";
import MyEnrolledCourses from "../../pages/MyEnrolledCourses/MyEnrolledCourses";
import Speaker from "../../pages/Speaker/speaker";
import SpMycourses from "../../pages/SpeakerMyCourses/SpMycourses";
import ProtectedRoutes from "../protectedRoutes/protectedRoutes";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import Values from "../../context/Values";
import FilteredCourses from "../../components/FilteredCourses/FilteredCourses";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions";
import { StateContext } from "../../context/Context";
import StatisticCourseInside from "../../components/StatisticCourseInside/StatisticCourseInside";
import Stream from "../../components/Stream/Stream";
import ChosenStream from "../../components/ChosenStream/ChosenStream";
import AboutPremium from "../../components/WhatIsPremium/AboutPremium";
import ChansePremium from "../../components/chansePremium/ChansePremium";
import StatistikVebinarInside from "../../components/vebinarStatistikInside/StatistikVebinarInside";
import RamadanTaqvims from "../../components/RamadanTaqvims/RamadanTaqvims";
import RegiterVendorSchool from "../../components/vendorSchool/RegisterVendorSchool";
import VendorSchool from "../../components/vendorSchool/VendorSchool";
import Quiz from "../../components/Quiz/Quiz";
import VendorSchoolMyCourses from "../../components/VendorSchoolMyCourses/VendorSchoolMyCourses";
import VendorSchoolAllCourses from "../../components/VendorSchoolAllCourses/VendorSchoolAllCourses";
import VendorSchoolGetGrand from "../../components/VendorSchoolGetGrand/VendorSchoolGetGrand";
import VendorSchoolSertificate from "../../components/VendorSchoolSertificate/VendorSchoolSertificate";
import VendorSchoolPaymets from "../../components/VendorSchoolTransaction/VendorSchoolPayments";
import TestAdminPanel from "../../components/Admin/TestAdminPanel";

export default function RoutesComp() {
  const { loggedIn } = useContext(StateContext);
  const values = Values();
  const { user, setUser } = values;

  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v1/accounts/profile`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => setUser(res.data))
          .catch((err) =>
            refresh(err.response.status, err.response.status.text)
          );
    } catch (error) { }
  }, []);

  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/resetVerify" element={<ResetVerify />} />
      <Route path="/register/:id" element={<Register/>} />
      <Route path="/setNewPassword" element={<ResetNewPass />} />
      <Route path="/verify" element={<SmsVerify />} />
      <Route path="/fio" element={<Fio />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/aboutEduon" element={<AboutEduon />} />
      <Route path="/search/:value" element={<SearchPage />} />
      <Route path="/chosenCourse/:id" element={<ChosenCourse />} />
      <Route path="/chosenCourse/:id/:token" element={<ChosenCourse />} />
      <Route path="/speakerAbout/:id" element={<SpeakerAbout />} />
      <Route path="/courses/:id" element={<CoursesFilter />} />
      <Route path="/subCourses/:id" element={<ChosenCourseCategory />} />
      <Route path="/search" element={<Search />} />
      <Route path="/termsAndConditions" element={<TermsAndConditions />} />
      <Route path="/courses/filter/:value" element={<FilteredCourses />} />
      <Route path="/chosenStream/:id" element={<ChosenStream />} />
      <Route path="/aboutPremium" element={<AboutPremium/>}/>
      <Route path="/chansePremium" element={<ChansePremium/>}/>
      <Route path="/ramadanTaqvims" element={<RamadanTaqvims/>}/>
      <Route path="/sotuvchilarMaktabi" element={<VendorSchool/>}/>
      <Route element={<ProtectedRoutes />}>
      <Route path="/Quiz" element={<Quiz/>}/>
        <Route path="/stream/:id" element={<Stream />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/registerVendorSchool" element={<RegiterVendorSchool/>}/>
        <Route path="/speaker" element={<Speaker user={user} />} />
        <Route path="/userAbout" element={<UserAbout user={user} />} />
        <Route path="/courseOpen" element={<CourseOpened user={user} />} />
        <Route path="/moneyOperations" element={<MoneyOperations />} />
        <Route path="/activeDevices" element={<Myactive user={user} />} />
        <Route path="/uploadCourse" element={<UploadCourse />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/favCourses" element={<Favourites />} />
        <Route path="/buy" element={<ShoppingCourses />} />
        <Route path="/watch/:id" element={<Watching />} />
        <Route path="/courseEdit/:id" element={<EditCourse />} />
        <Route path="/myEnrolledCourses" element={<MyEnrolledCourses user={user} />}/>
        <Route path="/speakerMyCourses" element={<SpMycourses user={user} />} />
        <Route path="/speakerChosenCourse/:id" element={<SpChosenCourse user={user} />}/>
        <Route path="/statisticCourseInside/:id" element={<StatisticCourseInside user={user} />} />
        <Route path="/statisticVebinarInside/:id" element={<StatistikVebinarInside user={user}/>}/>
        <Route path='/sotuvchilarMaktabi/MyCourses' element={<VendorSchoolMyCourses/>}/>
        <Route path='/sotuvchilarMaktabi/allCourses' element={<VendorSchoolAllCourses/>}/>
        <Route path='/sotuvchilarMaktabi/getGrand' element={<VendorSchoolGetGrand/>}/>
        <Route path='/sotuvchilarMaktabi/sertificate' element={<VendorSchoolSertificate/>}/>
        <Route path='/sotuvchilarMaktabi/paymets' element={<VendorSchoolPaymets/>}/>
        <Route path='/admin' element={<TestAdminPanel />}/>
      </Route>
      {/* <Route path="/" element={<Example user={user} />} /> */}
    </Routes>
    </>
  );
}
