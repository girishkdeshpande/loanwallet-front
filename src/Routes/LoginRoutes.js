import React from "react";
import { Navigate, Route } from "react-router-dom";

import LoginPage from "../Pages/Login/LoginPage";
import LoginForm from "../Pages/Login/LoginForm";
import ForgotPassword from "../Pages/Login/ForgotPassword";
import ResetPassword from "../Pages/Login/ResetPassword";

const LoginRoutes = () => (
  <>
    <Route path="/" element={<LoginPage />}>
      <Route index element={<Navigate to="loginform" replace />} />
      <Route path="loginform" element={<LoginForm />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="resetpassword" element={<ResetPassword />} />
    </Route>
  </>
);

export default LoginRoutes;
