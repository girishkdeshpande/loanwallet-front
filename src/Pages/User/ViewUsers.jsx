import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  AllUsers,
  DeleteUser,
  resetDeleteUserState,
} from "../../Redux/slices/userSlice";
import { showWarningMessage } from "../../Redux/slices/globalMessageSlice";

import "../../Styles/User.css";
import "../../Styles/GlobalMessage.css";

import ViewSingleUser from "./ViewSingleUser";
import { userColumns } from "../../Utilities/TableColumns";
import { confirmAction } from "../../Components/WarningMessage";
import Search from "../../Components/Search";
import Pagination from "../../Components/Pagination";
import Table from "../../Components/Table";
import NoRecordsFound from "../../Components/NoRecordsFound";
import NoRecords from "../../Components/NoRecords";

const ViewUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const selectRef = useRef(null);

  const { allUsersData, allUsersError } = useSelector(
    (state) => state.user.allUsersState
  );

  const [allUserData, setAllUserData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isRequestRaised, setIsRequestRaised] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalUserData, setModalUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shouldRenderModal, setShouldRenderModal] = useState(false);
  const isBackendPaginated = false;

  // Pagination Logic
  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const paginatedUsers = filteredUsers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const optionList = [
    { label: "All", value: "All" },
    { label: "Admin", value: "Admin" },
    { label: "Non-Admin", value: "NonAdmin" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];

  /* Calling backend API */
  useEffect(() => {
    dispatch(AllUsers());
  }, [dispatch]);

  /* Catch response of backend API */
  useEffect(() => {
    if (allUsersData) {
      setAllUserData(allUsersData.data);
    }

    if (allUsersError) {
      toast.error(allUsersError);
    }
  }, [allUsersData, allUsersError]);

  /* Enable/Disable Select or Search component */
  //   useEffect(() => {
  //     const handleClickOutside = (event) => {
  //       const clickedOutsideSearch =
  //         searchRef.current && !searchRef.current.contains(event.target);
  //       const clickedOutsideSelect =
  //         selectRef.current && !selectRef.current.contains(event.target);

  //       if (clickedOutsideSearch && clickedOutsideSelect) {
  //         setIsSearchDisabled(false);
  //         setIsSelectDisabled(false);
  //       }
  //     };

  //     document.addEventListener("click", handleClickOutside);
  //     return () => document.removeEventListener("click", handleClickOutside);
  //   }, []);

  /* Handle focus of Search component */
  const handleSearchFocus = () => {
    const hasValue = searchString.trim() !== "";
    if (!hasValue) {
      setSelectedOption("");
      setFilteredUsers([]);
      setIsRequestRaised(false);
    }
  };

  /* Handle focus of Select component */
  const handleSelectFocus = () => {
    const hasValue = selectedOption.trim() !== "";
    if (!hasValue) {
      setSearchString("");
      setFilteredUsers([]);
      setIsRequestRaised(false);
    }
  };

  /* Handle change in Search component */
  const handleSearchChange = (value) => {
    setSearchString(value);
    if (value.trim() === "") {
      setFilteredUsers([]);
      setIsRequestRaised(false);
    }
  };

  /* Handle Search click event */
  const handleSearchClick = (searchString) => {
    if (!searchString.trim()) {
      setFilteredUsers([]);
      setCurrentPage(1);
      return;
    } else {
      setIsRequestRaised(true);
      const filtered = allUserData.filter((user) =>
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(searchString.toLowerCase())
      );
      if (filtered.length > 0) {
        setFilteredUsers(filtered);
        setCurrentPage(1);
      } else {
        setFilteredUsers([]);
      }
    }
  };

  /* Handle Enter Key Press in Search event */
  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick(searchString); // This is your existing function to trigger the API
    }
  };

  /* Handle options of Select component */
  const handleSelectedOption = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
    setIsRequestRaised(true);
    let filtered;

    switch (selected) {
      case "All":
        filtered = allUserData;
        break;

      case "Admin":
        filtered = allUserData.filter((user) => user.isAdmin === true);
        break;

      case "NonAdmin":
        filtered = allUserData.filter((user) => user.isAdmin === false);
        break;

      case "Active":
        filtered = allUserData.filter((user) => user.status === true);
        break;

      case "Inactive":
        filtered = allUserData.filter((user) => user.status === false);
        break;

      case "":
        filtered = "";
        setIsRequestRaised(false);
        break;

      default:
        return;
    }
    setSelectedRow(null);
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  /* Handle Radio button selection */
  const handleRadioSelection = (userId) => {
    setSelectedRow((prevSelected) => (prevSelected === userId ? null : userId));
  };

  /* Handle View button click */
  const handleViewClick = (userId) => {
    let userData = allUserData.find((user) => user.id === userId);
    setModalUserData(userData);
    setShouldRenderModal(true);
    setShowModal(true);
  };

  /* Handle Close button click of View Single User Information click */
  const handleViewClose = () => {
    const modalEl = document.getElementById("userDetailsModal");

    if (window.bootstrap && modalEl) {
      // Prevent focus-related accessibility warning
      if (document.activeElement && modalEl.contains(document.activeElement)) {
        document.activeElement.blur();
      }

      const instance = window.bootstrap.Modal.getInstance(modalEl);
      instance?.hide(); // Trigger Bootstrap fade-out
    }

    // Delay unmounting to match fade-out duration (300ms)
    setTimeout(() => {
      setShowModal(false); // Hide modal JSX
      setShouldRenderModal(false); // Actually remove from DOM
    }, 300);
  };

  /* Handle Edit button click */
  const handleEditClick = (userId) => {
    let userData = allUserData.find((user) => user.id === userId);
    navigate("/homepage/update_user", { state: { initialData: userData } });
  };

  /* Handle Delete button click */
  const handleDeleteClick = (userId) => {
    confirmAction.current = () => {
      dispatch(DeleteUser(userId)).then((response) => {
        if (response.type === "user/delete/fulfilled") {
          toast.success(response.payload.data);
          navigate("/homepage");
        } else {
          toast.error(response.payload.error);
        }
      });
      dispatch(resetDeleteUserState());
    };

    dispatch(
      showWarningMessage({
        message: "Are you sure, you want to delete this user ?",
        loadingKey: "user.deleteUserState.deleteUserLoading",
      })
    );
  };

  return (
    <>
      <div className="row align-items-center">
        <div className="col text-start">
          <h5 className="mt-2"> User Records </h5>
        </div>

        {/* Search Component */}
        <Search
          ref={searchRef}
          value={searchString}
          onChange={handleSearchChange}
          onSearch={handleSearchClick}
          onFocus={handleSearchFocus}
          onKeyDown={handleSearchKeyDown}
          label="Search User By Name"
        />

        {/* Dropdown List */}
        <div className="col text-end">
          <div className="form-floating d-inline-block mt-1">
            <select
              className="form-select rounded-4 border border-1 border-dark"
              id="floatingSelect"
              ref={selectRef}
              onFocus={handleSelectFocus}
              value={selectedOption}
              onChange={handleSelectedOption}
            >
              <option key="0" value="">
                -- Select --
              </option>
              {optionList.map(({ label, value, className }, index) => (
                <option key={index + 1} value={value} className={className}>
                  {label}
                </option>
              ))}
            </select>
            <label htmlFor="floatingSelect">Search By Categoty</label>
          </div>
        </div>
      </div>

      {/* Show records in table*/}
      {!isRequestRaised ? (
        <NoRecords />
      ) : filteredUsers.length === 0 ? (
        <NoRecordsFound />
      ) : (
        <>
          <Table
            columns={userColumns}
            data={paginatedUsers}
            extraProps={{
              selectedRow,
              handleRadioSelection,
              handleViewClick,
              handleEditClick,
              handleDeleteClick,
            }}
          />

          {/* Pagination Component */}
          <div className="pagination-wrapper">
            <Pagination
              data={filteredUsers}
              recordsPerPage={recordsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              isBackendPaginated={isBackendPaginated}
            />
          </div>
        </>
      )}

      {/* View Single User Information Component */}
      {showModal && shouldRenderModal && (
        <ViewSingleUser
          userData={modalUserData}
          show={showModal}
          onClose={handleViewClose}
        />
      )}
    </>
  );
};

export default ViewUsers;
