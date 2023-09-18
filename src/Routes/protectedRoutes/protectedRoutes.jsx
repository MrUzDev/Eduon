import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StateContext } from "../../context/Context";

const ProtectedRoutes = () => {
  const loggedIn = localStorage.getItem("access")
  const { setLoginModal, registerModal } = useContext(StateContext);

  return loggedIn ? <Outlet /> : !registerModal && setLoginModal(true);
};
export default ProtectedRoutes;