import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import UserProfile from "./UserProfile";
import Alerts from "./Alerts";

const HomePage = () => {
  const navigate = useNavigate();

  const [showUserOffcanvas, setShowUserOffcanvas] = useState(false);
  const [showAlertOffcanvas, setShowAlertOffcanvas] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);

  const checkIsAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    if (checkIsAdmin === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [checkIsAdmin]);

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
              <span onClick={() => navigate("/homepage")}> Home </span>
            </li>
            <li className="nav-item dropdown mx-4 mt-1 text-white menu-pointer">
              <span>Dashboard</span>
              <ul className="dropdown-menu bg-secondary">
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => navigate("powerbi_dashboard")}
                  >
                    Power BI Dashboard
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown mx-4 mt-1 text-white menu-pointer">
              <span>Company</span>
              <ul className="dropdown-menu bg-secondary">
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => navigate("register_company")}
                  >
                    Register Company
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => navigate("company_records")}
                  >
                    Company Records
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
                    onClick={() => navigate("register_product")}
                  >
                    Register Product
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => navigate("product_records")}
                  >
                    Product Records
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
                    onClick={() => navigate("fresh_quotation")}
                  >
                    Fresh Quotation
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => navigate("quotation_records")}
                  >
                    Quotation Records
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
                    onClick={() => navigate("visit_records")}
                  >
                    Visit Records
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
                    onClick={() => navigate("register_user")}
                  >
                    Register User
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => navigate("user_records")}
                  >
                    User Records
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
              <span>Expense</span>
              <ul className="dropdown-menu bg-secondary">
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => navigate("expense_records")}
                  >
                    Expense Records
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
              <span> Email </span>
              <ul className="dropdown-menu bg-secondary">
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => navigate("email_template")}
                  >
                    Business Emails
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
              <span>To-Dos</span>
              <ul className="dropdown-menu bg-secondary">
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => navigate("to_dos")}
                  >
                    Schedule & View
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
              <span>Sales</span>
              <ul className="dropdown-menu bg-secondary">
                <li>
                  <a
                    className="dropdown-item text-white"
                    onClick={() => navigate("sales_records")}
                  >
                    Sale-Purchase Records
                  </a>
                </li>
              </ul>
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
      <div className="container-fluid">
        <Outlet />
      </div>
    </>
  );
};

export default HomePage;
