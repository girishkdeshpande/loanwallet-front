import React from "react";
import { Navigate, Route } from "react-router-dom";

import LoginPage from "../Pages/Login/LoginPage";
import LoginForm from "../Pages/Login/LoginForm";
import ForgotPassword from "../Pages/Login/ForgotPassword";
import ResetPassword from "../Pages/Login/ResetPassword";

const LoginRoutes = () => [
  <Route path="/" element={<LoginPage />} key="loginpage">
    <Route index element={<Navigate to="loginform" replace />} />
    <Route path="loginform" element={<LoginForm />} key="loginform" />
    <Route
      path="forgotpassword"
      element={<ForgotPassword />}
      key="forgotpassword"
    />
    <Route
      path="resetpassword"
      element={<ResetPassword />}
      key="resetpassword"
    />
  </Route>,
];

export default LoginRoutes;
