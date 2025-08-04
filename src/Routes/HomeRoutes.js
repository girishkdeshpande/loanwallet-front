import React from "react";
import { Navigate, Route } from "react-router-dom";

import HomePage from "../Pages/Home/HomePage";
import HomeCarousel from "../Pages/Home/HomeCarousel";
import NewUser from "../Pages/User/NewUser";
import ViewUsers from "../Pages/User/ViewUsers";
import EditUser from "../Pages/User/EditUser";
import NewCompany from "../Pages/Company/NewCompany";
import ViewCompanies from "../Pages/Company/ViewCompanies";
import NewProduct from "../Pages/Product/NewProduct";
import ViewProducts from "../Pages/Product/ViewProducts";
import EditProduct from "../Pages/Product/EditProduct";
import NewQuotation from "../Pages/Quotation/NewQuotation";
import ViewQuotations from "../Pages/Quotation/ViewQuotations";
import ViewVisits from "../Pages/Visit/ViewVisits";
import ViewExpense from "../Pages/Expense/ViewExpense";
import ToDos from "../Pages/Todo/ToDos";
import EmailTemplate from "../Pages/Email/EmailTemplate";
import ViewTransactions from "../Pages/Sales/ViewTransactions";

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
    <Route
      path="product_records"
      element={<ViewProducts />}
      key="product_records"
    />
    <Route
      path="update_product"
      element={<EditProduct />}
      key="update_product"
    />

    <Route
      path="fresh_quotation"
      element={<NewQuotation />}
      key="fresh_quotation"
    />
    <Route
      path="quotation_records"
      element={<ViewQuotations />}
      key="quotation_records"
    />

    <Route path="visit_records" element={<ViewVisits />} key="visit_records" />

    <Route
      path="expense_records"
      element={<ViewExpense />}
      key="expense_records"
    />

    <Route path="to_dos" element={<ToDos />} key="to_dos" />

    <Route
      path="email_template"
      element={<EmailTemplate />}
      key="email_template"
    />

    <Route
      path="sales_records"
      element={<ViewTransactions />}
      key="sales_records"
    />
  </Route>,
];

export default HomeRoutes;
