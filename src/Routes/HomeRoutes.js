import React from "react";
import { Route } from "react-router-dom";

import HomePage from "../Pages/Home/HomePage";

const HomeRoutes = () => [
    <Route path="/homepage" element={<HomePage />} key="homepage" />
  ];

export default HomeRoutes;