import { useEffect, useState } from "react";

import UserProfile from "./UserProfile";
import Alerts from "./Alerts";
import HomeCarousel from "./HomeCarousel";
import NewUser from "../User/NewUser";
import ViewUsers from "../User/ViewUsers";
import NewCompany from "../Company/NewCompany";
import ViewCompany from "../Company/ViewCompany";
import NewProduct from "../Product/NewProduct";
import ViewProduct from "../Product/ViewProduct";
import NewQuotation from "../Quotation/NewQuotation";
import ViewQuotation from "../Quotation/ViewQuotation";
import ViewVisits from "../Visit/ViewVisits";
import ViewToDo from "../Todo/ViewTodo";

const HomePage = () => {
  const subMenuComponents = {
    Home: HomeCarousel,
    NewUser: NewUser,
    ViewUsers: ViewUsers,
    NewCompany: NewCompany,
    ViewCompany: ViewCompany,
    NewProduct: NewProduct,
    ViewProduct: ViewProduct,
    NewQuotation: NewQuotation,
    ViewQuotation: ViewQuotation,
    ViewVisits: ViewVisits,
    ViewToDo: ViewToDo,
  };

  const [showUserOffcanvas, setShowUserOffcanvas] = useState(false);
  const [showAlertOffcanvas, setShowAlertOffcanvas] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  const [isUserClicked, setIsUserClicked] = useState(false);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);

  const checkIsAdmin = localStorage.getItem("isAdmin");

  const handleUserShow = () => setShowUserOffcanvas(true);
  const handleUserClose = () => setShowUserOffcanvas(false);

  const handleAlertShow = () => setShowAlertOffcanvas(true);
  const handleAlertClose = () => setShowAlertOffcanvas(false);

  const handleNotificationCount = (count) => {
    setAlertCount(count);
  };

  const handleSelectedHeader = (headerName) => {
    setSelectedHeader(headerName || null);
  };

  const handleSubMenuClick = (component) => {
    setSelectedSubMenu(component);
  };

  const RenderComponent = subMenuComponents[selectedSubMenu];

  useEffect(() => {
    if (checkIsAdmin === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [checkIsAdmin]);

  return (
    <>
      <nav className="navbar navbar-expand-lg border-bottom border-1 border-white fixed-top bg-secondary">
        <div className="navbar-nav">
          <ul className="navbar-nav">
            <li className="nav-item ms-4 me-4">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasLeft"
                role="button"
                aria-controls="offcanvasLeft"
                onClick={handleUserShow}
              >
                Profile
                <i className="bi bi-person-circle ms-2"></i>
              </button>
            </li>
            <li className="nav-item mx-4 mt-1 text-white menu-pointer">
              <span onClick={() => handleSubMenuClick("Home")}> Home </span>
            </li>
            <li className="nav-item mx-4 mt-1 text-white menu-pointer">
              <span
                className={selectedHeader === "Dashboard" ? "text-color" : ""}
                onClick={() => handleSelectedHeader("Dashboard")}
              >
                {" "}
                Dashboard{" "}
              </span>
            </li>
            <li className="nav-item dropdown mx-4 mt-1 text-white menu-pointer">
              <span>Company</span>
              <ul className="dropdown-menu bg-secondary">
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => handleSubMenuClick("NewCompany")}
                  >
                    New Company
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => handleSubMenuClick("ViewCompany")}
                  >
                    View Companies
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown mx-4 mt-1 text-white menu-pointer">
              <span>Product</span>
              <ul className="dropdown-menu bg-secondary">
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => handleSubMenuClick("NewProduct")}
                  >
                    New Product
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => handleSubMenuClick("ViewProduct")}
                  >
                    View Products
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown mx-4 mt-1 text-white menu-pointer">
              <span>Quotation</span>
              <ul className="dropdown-menu bg-secondary">
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => handleSubMenuClick("NewQuotation")}
                  >
                    New Quotation
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => handleSubMenuClick("ViewQuotation")}
                  >
                    View Quotations
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown mx-4 mt-1 text-white menu-pointer">
              <span>Visit</span>
              <ul className="dropdown-menu bg-secondary">
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => handleSubMenuClick("ViewVisits")}
                  >
                    View Visits
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => handleSubMenuClick("VisitReport")}
                  >
                    Visit Report
                  </a>
                </li>
              </ul>
            </li>
            <li
              className={
                !isAdmin
                  ? "nav-item mx-4 mt-1 text-secondary"
                  : "nav-item dropdown mx-4 mt-1 text-white menu-pointer"
              }
            >
              <span> User </span>
              <ul className="dropdown-menu bg-secondary">
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => handleSubMenuClick("NewUser")}
                  >
                    New User
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => handleSubMenuClick("ViewUsers")}
                  >
                    View Users
                  </a>
                </li>
              </ul>
            </li>
            <li
              className={
                !isAdmin
                  ? "nav-item mx-4 mt-1 text-secondary"
                  : "nav-item mx-4 mt-1 text-white menu-pointer"
              }
            >
              <span
                className={selectedHeader === "Expense" ? "text-color" : ""}
                onClick={() => handleSelectedHeader("Expense")}
              >
                {" "}
                Expense{" "}
              </span>
            </li>
            <li
              className={
                !isAdmin
                  ? "nav-item mx-4 mt-1 text-secondary"
                  : "nav-item mx-4 mt-1 text-white menu-pointer"
              }
            >
              <span
                className={selectedHeader === "Email" ? "text-color" : ""}
                onClick={() => handleSelectedHeader("Email")}
              >
                {" "}
                Email{" "}
              </span>
            </li>
            <li
              className={
                !isAdmin
                  ? "nav-item mx-4 mt-1 text-secondary"
                  : "nav-item dropdown mx-4 mt-1 text-white menu-pointer"
              }
            >
              <span>To-Dos</span>
              <ul className="dropdown-menu bg-secondary">
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => handleSubMenuClick("NewToDo")}
                  >
                    New ToDo
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => handleSubMenuClick("ViewToDo")}
                  >
                    View ToDos
                  </a>
                </li>
              </ul>
            </li>
            <li
              className={
                !isAdmin
                  ? "nav-item mx-4 mt-1 text-secondary"
                  : "nav-item mx-4 mt-1 text-white menu-pointer"
              }
            >
              <span
                className={selectedHeader === "Sales" ? "text-color" : ""}
                onClick={() => handleSelectedHeader("Sales")}
              >
                {" "}
                Sales{" "}
              </span>
            </li>
            <li className="nav-item mx-4">
              <button
                type="button"
                className="btn btn-primary position-relative"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                role="button"
                aria-controls="offcanvasRight"
                onClick={handleAlertShow}
              >
                Alerts
                <i className="bi bi-bell-fill ms-2"></i>{" "}
                <span className="position-absolute top-0 start-100 translate-middle rounded-pill badge text-bg-danger">
                  {alertCount}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <UserProfile handleClose={handleUserClose} />
      <Alerts
        handleClose={handleAlertClose}
        notificationCount={handleNotificationCount}
      />
      {RenderComponent ? <RenderComponent /> : <HomeCarousel />}
    </>
  );
};

export default HomePage;
