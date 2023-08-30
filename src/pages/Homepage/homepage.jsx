import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Courses from "../../components/Courses/Courses";
import NavbarDemo from "../../components/Navbar/Navbar";
import NavbarSm from "../../components/Navbar/NavbarSm";
import Sidebar from "../../components/Sidebar/Sidebar";
import SidebarSm from "../../components/Sidebar/SidebarSm";
import { StateContext } from "../../context/Context";
import "./homepage.css";

export default function Homepage(props) {
  const { statusChange, setStatusChange, loggedIn } = useContext(StateContext);
  const location = useLocation();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    localStorage.setItem("status", false);
    setStatus(JSON.parse(localStorage.getItem("status")));
  }, [location, statusChange]);

  return (
    <div className="homepage">
      <NavbarDemo />
      <NavbarSm />
      <SidebarSm active={0} />
      {loggedIn && <Sidebar active={1} />}
      <Courses />
    </div>
  );
}