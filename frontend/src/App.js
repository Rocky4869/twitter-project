//First terminal
//npm start

//Second terminal
//npm run build
//serve -s build
//- Network:  http://192.168.8.2:3000
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <div>
      <LoginHeader />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="login" element={<LoginCard />} />
          <Route path="register" element={<RegistrationTab />} />
          <Route path="forget_password" element={<ForgotPassword />} />
          <Route path="reset_password" element={<ResetPassword />} />
          {/* <Route path="*" element={<NoPage />} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
      <LoginFooter />
    </div>

    // <div className="app">
    //   <Sidebar />
    //   <Feed />
    //   <Widgets />
    // </div>
  );
}

export default App;
