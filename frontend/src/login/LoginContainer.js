import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import LoginCard from "./LoginCard";
import LoginFooter from "./LoginFooter";
import RegistrationTab from "./RegistrationTab";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

function LoginContainer() {
  return (
    <div>
      <LoginHeader />
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginCard />} />
          <Route path="register" element={<RegistrationTab />} />
          <Route path="forget_password" element={<ForgotPassword />} />
          <Route path="reset_password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      <LoginFooter />
    </div>
  );
}

export default LoginContainer;
