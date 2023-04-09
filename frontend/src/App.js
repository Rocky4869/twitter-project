//First terminal
//npm start

//Second terminal
//npm run build
//serve -s build
//- Network:  http://192.168.8.2:3000
import React from "react";
import "./App.css";
// import { BrowserRouter } from "react-router-dom";
// import { createRoot } from "react-dom/client";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import LoginHeader from "./login/LoginHeader";
import LoginCard from "./login/LoginCard";
import LoginFooter from "./login/LoginFooter";
import RegistrationTab from "./login/RegistrationTab";
import ForgotPassword from "./login/ForgotPassword";
import ResetPassword from "./login/ResetPassword";

function App() {
  return (
    // <div>
    //   <LoginHeader />
    //   <LoginCard />
    //   <RegistrationTab />
    //   <ForgotPassword />
    //   <ResetPassword />
    //   <LoginFooter />
    // </div>

    <div className="app">
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  );
}

export default App;
