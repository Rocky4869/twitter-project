//First terminal
//npm start

//Second terminal
//npm run build
//serve -s build
//- Network:  http://192.168.8.2:3000
import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import LoginHeader from "./login/LoginHeader";
import LoginCard from "./login/LoginCard";
import RegistrationTab from "./login/RegistrationTab";
import LoginFooter from "./login/LoginFooter";
// import "./App.css";
import "./css/tailwind.css";
import "./css/tailwind-small.css";
import ForgotPassword from "./login/ForgotPassword";
import ResetPassword from "./login/ResetPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <LoginHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginCard />} />
          <Route path="/register" element={<RegistrationTab />} />
          <Route path="/forget_password" element={<ForgotPassword />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          {/* Sidebar */}
          {/* <Sidebar /> */}

          {/* Feed */}
          {/* <Feed /> */}

          {/* Widgets */}
          {/* <Widgets /> */}
        </Routes>
      </BrowserRouter>
      <LoginFooter />
    </div>
  );
}

export default App;
