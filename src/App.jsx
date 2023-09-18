import React from "react";
import "./App.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import { StateContext } from "./context/Context";
import SidebarSm from "./components/Sidebar/SidebarSm";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import Values from "./context/Values";
import RoutesComp from "./Routes/Routes/Routes";
import RegisterAndLoginModal from "./components/RegisterAndLoginModal/RegisterAndLoginModal";

function App() {
  const values = Values();

  return (
    <div className="app">
      <StateContext.Provider value={{ ...values }}>
        <BrowserRouter>
          <SidebarSm />
          <MobileMenu />
          {/* Routes ------ */}
          <RoutesComp /> 
          {/* Routes/ ------ */}

          <RegisterAndLoginModal/>
        </BrowserRouter>
      </StateContext.Provider>

    </div>
  );
}

export default App;
