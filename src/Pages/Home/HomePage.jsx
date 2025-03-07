import { useEffect, useState } from "react";

import SubHeader from "../../Components/SubHeader";
import UserOffCanvas from "./UserOffCanvas";
import AlertOffCanvas from "./AlertOffCanvas";
import HomeCarousel from "./HomeCarousel";

const HomePage = () => {
  const [showUserOffcanvas, setShowUserOffcanvas] = useState(false);
  const [showAlertOffcanvas, setShowAlertOffcanvas] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [alertCount, setAlertCount] = useState(0);

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

  useEffect(() => {
    if (checkIsAdmin === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [checkIsAdmin]);

  return (
    // <div className="container-fluid">
    <>
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg border-bottom border-1 border-white fixed-top bg-secondary">
            <div className="navbar-nav">
              <ul className="navbar-nav">
                <li className="nav-item ms-4 me-4 mt-2">
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
                <li className="nav-item mx-4 mt-3 text-white menu-pointer">
                  <span
                    className={selectedHeader === "Home" ? "text-color" : ""}
                    onClick={() => handleSelectedHeader("Home")}
                  >
                    {" "}
                    Home{" "}
                  </span>
                </li>
                <li className="nav-item mx-4 mt-3 text-white menu-pointer">
                  <span
                    className={
                      selectedHeader === "Dashboard" ? "text-color" : ""
                    }
                    onClick={() => handleSelectedHeader("Dashboard")}
                  >
                    {" "}
                    Dashboard{" "}
                  </span>
                </li>
                <li className="nav-item mx-4 mt-3 text-white menu-pointer">
                  <span
                    className={selectedHeader === "Company" ? "text-color" : ""}
                    onClick={() => handleSelectedHeader("Company")}
                  >
                    {" "}
                    Company{" "}
                  </span>
                </li>
                <li className="nav-item mx-4 mt-3 text-white menu-pointer">
                  <span
                    className={selectedHeader === "Product" ? "text-color" : ""}
                    onClick={() => handleSelectedHeader("Product")}
                  >
                    {" "}
                    Product{" "}
                  </span>
                </li>
                <li className="nav-item mx-4 mt-3 text-white menu-pointer">
                  <span
                    className={
                      selectedHeader === "Quotation" ? "text-color" : ""
                    }
                    onClick={() => handleSelectedHeader("Quotation")}
                  >
                    {" "}
                    Quotation{" "}
                  </span>
                </li>
                <li className="nav-item mx-4 mt-3 text-white menu-pointer">
                  <span
                    className={selectedHeader === "Visit" ? "text-color" : ""}
                    onClick={() => handleSelectedHeader("Visit")}
                  >
                    {" "}
                    Visit{" "}
                  </span>
                </li>
                <li
                  className={
                    !isAdmin
                      ? "nav-item mx-4 mt-3 text-secondary"
                      : "nav-item mx-4 mt-3 text-white menu-pointer"
                  }
                >
                  <span
                    className={selectedHeader === "User" ? "text-color" : ""}
                    onClick={() => handleSelectedHeader("User")}
                  >
                    {" "}
                    User{" "}
                  </span>
                </li>
                <li
                  className={
                    !isAdmin
                      ? "nav-item mx-4 mt-3 text-secondary"
                      : "nav-item mx-4 mt-3 text-white menu-pointer"
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
                      ? "nav-item mx-4 mt-3 text-secondary"
                      : "nav-item mx-4 mt-3 text-white menu-pointer"
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
                      ? "nav-item mx-4 mt-3 text-secondary"
                      : "nav-item mx-4 mt-3 text-white menu-pointer"
                  }
                >
                  <span
                    className={selectedHeader === "ToDos" ? "text-color" : ""}
                    onClick={() => handleSelectedHeader("ToDos")}
                  >
                    {" "}
                    To-Dos{" "}
                  </span>
                </li>
                <li
                  className={
                    !isAdmin
                      ? "nav-item mx-4 mt-3 text-secondary"
                      : "nav-item mx-4 mt-3 text-white menu-pointer"
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
                <li className="nav-item mx-4 mt-2">
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
        </div>
      </div>
      <UserOffCanvas handleClose={handleUserClose} />
      <AlertOffCanvas
        handleClose={handleAlertClose}
        notificationCount={handleNotificationCount}
      />
      <div className="container-fluid mt-4">
        <div className="row mt-4">
          {selectedHeader ? (
            <SubHeader header={selectedHeader} />
          ) : (
            <HomeCarousel />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
