// import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./Routes/ConsolidatedRoutes.js";
import NewUser from "./Pages/User/NewUser.jsx";
import ViewUsers from "./Pages/User/ViewUsers.jsx";
import NewCompany from "./Pages/Company/NewCompany.jsx";
import ViewCompany from "./Pages/Company/ViewCompany.jsx";
import NewProduct from "./Pages/Product/NewProduct.jsx";
import ViewProduct from "./Pages/Product/ViewProduct.jsx";
import ViewVisits from "./Pages/Visit/ViewVisits.jsx";
import NewQuotation from "./Pages/Quotation/NewQuotation.jsx";
import ViewQuotation from "./Pages/Quotation/ViewQuotation.jsx";
import ViewExpense from "./Pages/Expense/ViewExpense.jsx";
import EmailTemplate from "./Pages/Email/EmailTemplate.jsx";
import ViewTodo from "./Pages/Todo/ViewTodo.jsx";
import ViewTransactions from "./Pages/Sales/ViewTransactions.jsx";
import { BrowserRouter, Router, Routes } from "react-router-dom";

import { useState } from "react";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
          {AppRoutes()}
          {/* <ViewCompany /> */}
          {/* <ResetPassword/> */}
          {/* <HomePage/> */}
          {/* <SubHeader/> */}
          {/* <NewUser/> */}
          {/* <ViewUsers/> */}
          {/* <NewProduct/> */}
          {/* <NewCompany/> */}
          {/* <ForgotPassword /> */}
          {/* <ViewProduct/> */}
          {/* <ViewVisits/> */}
          {/* <NewQuotation/> */}
          {/* <ViewQuotation/> */}
          {/* <ViewExpense/> */}
          {/* <EmailTemplate/> */}
          {/* <ViewTodo/> */}
          {/* <ViewTransactions/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
