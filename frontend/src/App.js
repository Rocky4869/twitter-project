//First terminal
//npm start

//Second terminal
//npm run build
//serve -s build
//- Network:  http://192.168.8.2:3000
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import Home from "./Home";
import Profile from "./Profile";
import NoMatch from "./NoMatch";
import LoginCard from "./login/LoginCard";
import LoginContainer from "./login/LoginContainer";
import SideBarContainer from "./sidebar/SideBarContainer";

function App() {
  return (
    // <Home />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/register" element={<RegistrationTab />} /> */}
        {/* <Route path="/forget_password" element={<ForgotPassword />} /> */}
        {/* <Route path="/reset_password" element={<ResetPassword />} /> */}
        <Route path="/:userid" element={<Profile />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
