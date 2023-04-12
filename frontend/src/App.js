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
import MyProfile from "./MyProfile";
import NoMatch from "./NoMatch";
import LoginCard from "./login/LoginCard";
import LoginContainer from "./login/LoginContainer";
import RegistrationTab from "./login/RegistrationTab";
import Setting from "./Setting";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegistrationTab />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
