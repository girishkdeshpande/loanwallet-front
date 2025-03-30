import React, { useState } from "react";
import NewCompany from "../Pages/Company/NewCompany";
import NewUser from "../Pages/User/NewUser";

const SubHeader = ({ header }) => {
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [isViewClicked, setISViewClicked] = useState(false);
  const [isNewClicked, setIsNewClicked] = useState(false);

  const handleViewClick = () => {
    setIsNewClicked(false);
    setISViewClicked(true);
    setIsSearchEnabled(true);
  };

  const handleNewClick = () => {
    setISViewClicked(false);
    setIsNewClicked(true);
    setIsSearchEnabled(false);
  };

  if (
    header === "Company" ||
    header === "Product" ||
    header === "Quotation" ||
    header === "User"
  ) {
    return (
      <div>
        <div className="row">
          <div className="col-6">
            {/* <ul
              className="nav nav-tabs ms-2 mt-5 custom-tabs"
              id="subheadertabs"
              role="tablist"
            >
              <li className="nav-item" role="tabitem">
                <span
                  className={`nav-link active menu-pointer ${
                    isNewClicked ? "text-color" : ""
                  }`}
                  onClick={handleNewClick}
                  data-bs-toggle="tab"
                  data-bs-target="#new-tab"
                  id="new-tab"
                  role="tab"
                  aria-selected="true"
                  aria-controls="new-tab"
                  href="new-tab"
                >
                  New
                </span>
              </li>
              <li className="nav-item" role="tabitem">
                <span
                  className={`nav-link active menu-pointer ${
                    isViewClicked ? "text-color" : ""
                  }`}
                  onClick={handleViewClick}
                  data-bs-toggle="tab"
                  data-bs-target="#view-tab"
                  id="view-tab"
                  role="tab"
                  aria-selected="true"
                  aria-controls="view-tab"
                  href="view-tab"
                >
                  View
                </span>
              </li>
            </ul> */}

            <nav className="navbar navbar-expand-lg mt-5">
              <div className="navbar-nav ms-2">
                <ul className="nav">
                  <li className="nav-item mx-3 menu-pointer">
                    <span
                      className={isNewClicked ? "text-color" : ""}
                      onClick={handleNewClick}
                    >
                      New
                    </span>
                  </li>
                  <li className="nav-item mx-3 menu-pointer">
                    <span
                      className={isViewClicked ? "text-color" : ""}
                      onClick={handleViewClick}
                    >
                      View
                    </span>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          {isNewClicked && header === "User" ? <NewUser /> : ""}
          {isSearchEnabled ? (
            <div className="col-6 float-end mt-5 mb-2">
              <form className="d-flex me-2" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-primary" type="submit">
                  Search
                </button>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
};
export default SubHeader;
