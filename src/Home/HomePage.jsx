// import Logo from "D:/loanwallet-front/src/Image/favicon.png";
// import Logo1 from "D:/loanwallet-front/src/Image/v-square_02.png";
import avatar from "D:/loanwallet-front/src/Image/user_avatar.jpg";
import "./HomePage.css";
import NewUser1 from "../User/NewUser1";
import HomeCarousel from "./HomeCarousel.jsx";
import { useState } from "react";
import NewCompany1 from "../Company/NewCompany1.jsx";

const HomePage = () => {
  const [showNewUser, setShowNewUser] = useState(false);
  const [showNewCompany, setShowNewCompany] = useState(false);

  const handleMenuClick = (component) => {
    if (component === "NewUser") {
      setShowNewUser(true);
    } else if (component === "NewCompany") {
      setShowNewUser(false);
      setShowNewCompany(true);
    }
  };

  return (
    <div className="container-fluid w-100 h-100 m-0">
      <div className="row">
        <div className="col-1">
          <a
            className="nav-link"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasLeft"
            role="button"
            aria-controls="offcanvasLeft"
          >
            <button type="button" className="btn btn-primary mt-2">
              <i className="bi bi-person-circle"></i>
            </button>
          </a>
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasLeft"
            aria-labelledby="offcanvasLeftLabel"
          >
            <div className="offcanvas-header label-color">
              <h6
                className="offcanvas-title text-secondary"
                id="offcanvasLeftLabel"
              >
                Hello ! "User Name" & "Email"
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body">
              <div>
                <img
                  src={avatar}
                  alt="..."
                  className="border border-dark d-flex rounded mx-auto offcanvas_img p-2"
                />
              </div>

              <div>
                <button
                  className="btn btn-info mx-2 my-3"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#userCollapse"
                  aria-expanded="false"
                  aria-controls="userCollapse"
                >
                  User Setting
                </button>
                <button
                  className="btn btn-primary float-end my-3 ms-2"
                  type="button"
                  disabled
                >
                  <i className="bi bi-floppy"></i>
                </button>
                <button
                  className="btn btn-primary float-end my-3"
                  type="button"
                  disabled
                >
                  <i className="bi bi-pencil"></i>
                </button>

                <div className="collapse" id="userCollapse">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item" role="tabitem">
                      <a
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#user-general-info"
                        id="user-general"
                        role="tab"
                        aria-selected="true"
                        aria-controls="user-general-info"
                        href="user-general-info"
                      >
                        General Info
                      </a>
                    </li>
                    <li className="nav-item" role="tabitem">
                      <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#user-profile-picture"
                        id="user-picture"
                        role="tab"
                        aria-selected="false"
                        aria-controls="user-profile-picture"
                        href="user-profile-picture"
                      >
                        Photo
                      </a>
                    </li>
                    <li className="nav-item" role="tabitem">
                      <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#user-reset-password"
                        id="user-password"
                        role="tab"
                        aria-selected="false"
                        aria-controls="user-reset-password"
                        href="user-reset-password"
                      >
                        Reset Password
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content" id="user-content">
                    <div
                      className="tab-pane fade show active"
                      id="user-general-info"
                      role="tabpanel"
                      aria-labelledby="user-general"
                    >
                      <input
                        className="form-control mt-1"
                        type="text"
                        placeholder="Full Name"
                        disabled
                      />
                      <input
                        className="form-control mt-1"
                        type="text"
                        placeholder="Contact No"
                        disabled
                      />
                      <input
                        className="form-control mt-1"
                        type="text"
                        placeholder="Address"
                        disabled
                      />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="user-profile-picture"
                      role="tabpanel"
                      aria-labelledby="user-picture"
                    >
                      Upload Photo
                      <div className="input-group mt-2 mx-auto" disabled>
                        <input type="file" className="form-control" disabled />
                        <label className="input-group-text">Upload</label>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="user-reset-password"
                      role="tabpanel"
                      aria-labelledby="user-password"
                    >
                      <input
                        className="form-control mt-1"
                        type="text"
                        placeholder="Old Password"
                        disabled
                      />
                      <input
                        className="form-control mt-1"
                        type="text"
                        placeholder="New Password"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto">
                <button
                  className="btn btn-info mx-2 my-2"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#customCollapse"
                  aria-expanded="false"
                  aria-controls="customCollapse"
                >
                  Custom Setting
                </button>
                <button
                  className="btn btn-primary float-end my-2 ms-2"
                  type="button"
                  disabled
                >
                  <i className="bi bi-floppy"></i>
                </button>
                <button
                  className="btn btn-primary float-end my-2"
                  type="button"
                  disabled
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <div className="collapse" id="customCollapse">
                  <label htmlFor="notificationDays" className="col-form-label">
                    Open Quotation Notification Days :
                  </label>
                  <input
                    type="text"
                    style={{ width: 40 }}
                    className="float-end"
                    disabled
                  ></input>
                  <label htmlFor="carExpense" className="col-form-label">
                    Car Expense Rs/Km :
                  </label>
                  <input
                    type="text"
                    style={{ width: 40 }}
                    className="float-end"
                    disabled
                  ></input>
                  <label htmlFor="carExpense" className="col-form-label">
                    Two Wheeler Expense Rs/Km :
                  </label>
                  <input
                    type="text"
                    style={{ width: 40 }}
                    className="float-end"
                    disabled
                  ></input>
                  <label htmlFor="visitSummaryCount" className="col-form-label">
                    Visit Summary Word Count :
                  </label>
                  <input
                    type="text"
                    style={{ width: 40 }}
                    className="float-end"
                    disabled
                  ></input>
                  <label htmlFor="emailAddress" className="col-form-label">
                    Email Address for Expense Report :
                  </label>
                  <textarea
                    className="form-control"
                    rows={2}
                    disabled
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-10">
          <nav className="navbar navbar-expand-lg">
            <div className="navbar-nav">
              <ul className="navbar-nav">
                <li className="nav-item me-3">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => handleMenuClick("Home")}
                  >
                    Home
                  </a>
                </li>
                <div
                  className="vr mt-2 text-danger vr-style"
                ></div>
                <li className="nav-item mx-3">
                  <a className="nav-link" href="#">
                    Dashboard
                  </a>
                </li>
                <div
                  className="vr mt-2 text-danger"
                  style={{ height: 30, width: 3 }}
                ></div>
                <li className="nav-item dropdown mx-3">
                  <a className="nav-link" href="#">
                    Company
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#" onClick={() => handleMenuClick("NewCompany")}>
                        Add New
                      </a>
                    </li>
                    <li className="dropdown-submenu">
                      <a className="dropdown-item" href="#">
                        View
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            All
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            By Name
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            By Alphabet
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <div
                  className="vr mt-2 text-danger vr-style"
                ></div>
                <li className="nav-item dropdown mx-3">
                  <a className="nav-link" href="#">
                    Product
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Add New
                      </a>
                    </li>
                    <li className="dropdown-submenu">
                      <a className="dropdown-item" href="#">
                        View
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            All
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            By Name
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            By HSN
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <div
                  className="vr mt-2 text-danger vr-style"
                ></div>
                <li className="nav-item dropdown mx-3">
                  <a className="nav-link" href="#">
                    Quotation
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Add New
                      </a>
                    </li>
                    <li className="dropdown-submenu">
                      <a className="dropdown-item" href="#">
                        View
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            All
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            By Company
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            By User
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            By Date
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <div
                  className="vr mt-2 text-danger vr-style"
                ></div>
                <li className="nav-item dropdown mx-3">
                  <a className="nav-link" href="#">
                    User
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleMenuClick("NewUser")}
                      >
                        Add New
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        View
                      </a>
                    </li>
                  </ul>
                </li>
                <div
                  className="vr mt-2 text-danger vr-style"
                ></div>
                <li className="nav-item dropdown mx-3">
                  <a className="nav-link" href="#">
                    Visit
                  </a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-submenu">
                      <a className="dropdown-item" href="#">
                        View
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            All
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            By User
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            By Date
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <div
                  className="vr mt-2 text-danger vr-style"
                ></div>
                <li className="nav-item dropdown mx-3">
                  <a className="nav-link" href="#">
                    Expense
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Report
                      </a>
                    </li>
                    <li className="dropdown-submenu">
                      <a className="dropdown-item" href="#">
                        View
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            All
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            By User
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <div
                  className="vr mt-2 text-danger vr-style"
                ></div>
                <li className="nav-item dropdown mx-3">
                  <a className="nav-link" href="#">
                    Email
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Company Introduction
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Festive Holiday
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Weekly Foundry Schedule
                      </a>
                    </li>
                    <li className="dropdown-submenu">
                      <a className="dropdown-item" href="#">
                        Payment Reminder
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            First Reminder
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Second Reminder
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Third Reminder
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <div
                  className="vr mt-2 text-danger vr-style"
                ></div>
                <li className="nav-item dropdown mx-3">
                  <a className="nav-link" href="#">
                    To-Dos
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Add New
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        View
                      </a>
                    </li>
                  </ul>
                </li>
                <div
                  className="vr mt-2 text-danger vr-style"
                ></div>
                <li className="nav-item dropdown ms-3">
                  <a className="nav-link" href="#">
                    Sales
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Add New
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        View All
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Report
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="col-1">
          <a
            className="nav-link float-end"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            role="button"
            aria-controls="offcanvasRight"
          >
            <button type="button" className="btn btn-primary mt-2 ">
              <i className="bi bi-bell-fill"></i>{" "}
              <span className="badge text-bg-danger">4</span>
            </button>
          </a>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header label-color">
              <h5 className="offcanvas-title" id="offcanvasRightLabel">
                Notifications
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div>
                Some text as placeholder. In real life you can have the elements
                you have chosen. Like, text, images, lists, etc.
              </div>
            </div>
          </div>
        </div>
        {/* <hr></hr> */}
      </div>
      {showNewUser ? (
        <NewUser1 handleMenuClick={handleMenuClick} />
      ) : showNewCompany ? (<NewCompany1 handleMenuClick={handleMenuClick} />) : (
        <HomeCarousel />
      )}
    </div>
  );
};
export default HomePage;
