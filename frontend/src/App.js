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
import SideBarContainer from "./sidebar/SideBarContainer";
import AdminTable from "./AdminTable";
import Follow from "./Follow";
import ViewAllTweets from "./ViewAllTweets";
import ForgotPassword from "./login/ForgotPassword";
import Message from "./Message";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegistrationTab />} />
        <Route path="/forget_password" element={<ForgotPassword />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/:userid" element={<Profile />} />
        <Route path="/follow" element={<Follow />} />
        <Route path="/viewtweets" element={<ViewAllTweets />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/admin" element={<AdminTable />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
    // <Message />
  );
}

export default App;
