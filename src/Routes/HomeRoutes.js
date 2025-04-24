import React from "react";
import { Navigate, Route } from "react-router-dom";

import HomePage from "../Pages/Home/HomePage";
import HomeCarousel from "../Pages/Home/HomeCarousel";
import NewUser from "../Pages/User/NewUser";
import ViewUsers from "../Pages/User/ViewUsers";
import EditUser from "../Pages/User/EditUser";
import NewCompany from "../Pages/Company/NewCompany";
import NewProduct from "../Pages/Product/NewProduct";
import ViewCompanies from "../Pages/Company/ViewCompanies";

const HomeRoutes = () => [
  <Route path="/homepage" element={<HomePage />} key="homepage">
    <Route index element={<Navigate to="homecarousel" replace />} />
    <Route path="homecarousel" element={<HomeCarousel />} key="homecarousel" />
    <Route path="register_user" element={<NewUser />} key="register_user" />
    <Route path="update_user" element={<EditUser />} key="update_user" />
    <Route path="user_records" element={<ViewUsers />} key="user_records" />
    <Route
      path="register_company"
      element={<NewCompany />}
      key="register_company"
    />
    <Route
      path="company_records"
      element={<ViewCompanies />}
      key="company_records"
    />
    <Route
      path="register_product"
      element={<NewProduct />}
      key="register_product"
    />
  </Route>,
];

export default HomeRoutes;
