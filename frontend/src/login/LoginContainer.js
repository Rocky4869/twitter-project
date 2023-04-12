import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import LoginCard from "./LoginCard";
import LoginFooter from "./LoginFooter";
import RegistrationTab from "./RegistrationTab";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

// useless component

function LoginContainer() {
  return (
    <div>
      <LoginCard />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginCard />} />
          <Route path="/register" element={<RegistrationTab />} />
          <Route path="/forget_password" element={<ForgotPassword />} />
          <Route path="/reset_password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      <LoginFooter />
    </div>
  );
}

export default LoginContainer;
