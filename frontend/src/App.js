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
import Home from "./Home";
import Profile from "./Profile";
import NoMatch from "./NoMatch";
import LoginCard from "./login/LoginCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>

    <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/register" element={<RegistrationTab />} /> */}
        {/* <Route path="/forget_password" element={<ForgotPassword />} /> */}
        {/* <Route path="/reset_password" element={<ResetPassword />} /> */}
        <Route path="/:userid" element={<Profile/>}/>
        <Route path="*" element={<NoMatch/>}/>
      </Routes>

    </BrowserRouter>
    </>
  );
}

export default App;
