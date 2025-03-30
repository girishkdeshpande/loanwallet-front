import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AllUsers } from "../../Redux/slices/userSlice";

import Pagination from "../../Components/Pagination";
import "../User/User.css";

const ViewUsers = () => {
  const dispatch = useDispatch();

  const { allUsersData, allUsersLoading, allUsersError } = useSelector(
    (state) => state.user.allUsersState
  );

  const [allUserData, setAllUserData] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [isSearchDisabled, setIsSearchDisabled] = useState(false);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [selectedRow, setSelectedRow] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    dispatch(AllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (allUsersData) {
      setAllUserData(allUsersData.data);
    }

    if (allUsersError) {
      toast.error(allUsersError, { className: "toast-font" });
    }
  }, [allUsersData, allUsersError]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".input-group") &&
        !event.target.closest(".select-dropdown")
      ) {
        setIsSearchDisabled(false);
        setIsSelectDisabled(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setIsSelectDisabled(true);
    setSelectedOption("");
  };

  const handleSelectFocus = () => {
    setIsSearchDisabled(true);
    setSearchString("");
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchString(value);
    if (value.trim() === "") {
      setShowTable(false);
    }
  };

  const handleSearchClick = () => {
    if (!searchString.trim()) {
      setFilteredUsers([]);
      setCurrentPage(1);
      return;
    } else {
      const filtered = allUserData.filter((user) =>
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(searchString.toLowerCase())
      );
      if (filtered.length > 0) {
        setFilteredUsers(filtered);
        setShowTable(true);
        setCurrentPage(1);
      } else {
        toast.error("Record not found", { className: "toast-font" });
        return;
      }
    }
  };

  const handleSelectedOption = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
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
        break;

      default:
        return;
    }
    setShowTable(true);
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleRadioSelection = (userId) => {
    setSelectedRow(userId);
  };

  const totalRecords = filteredUsers.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredUsers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  //   const handleSelectedRowClick = (userId) => {
  //     const selectedUser = allUserData.find((user) => user.id === userId);
  //     if (selectedUser) {
  //       navigate("/homepage/user/newuser", { state: { user: selectedUser } });
  //     }
  //   };

  return (
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col text-start">
          <h5 className="mt-2"> View Users </h5>
        </div>

        <div className="col input-group text-center">
          {/* Search Input */}
          <input
            type="text"
            name="Search"
            className="form-control mt-1 mb-0"
            placeholder="Search..."
            value={searchString}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            disabled={isSearchDisabled}
          />
          <button
            className="btn btn-light mt-1"
            type="button"
            onClick={handleSearchClick}
            onFocus={handleSearchFocus}
            disabled={isSearchDisabled}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>

        <div className="col text-end">
          {/* Dropdown (Bootstrap 5 Select) */}
          <label className="me-2">Select from List :</label>
          <select
            className="form-select select-dropdown d-inline mt-1 w-50"
            onFocus={handleSelectFocus}
            disabled={isSelectDisabled}
            value={selectedOption}
            onChange={handleSelectedOption}
          >
            <option key="0" value="">
              --Select--
            </option>
            <option key="1" value="All" className="text-success">
              All
            </option>
            <option key="2" value="Admin" className="text-success">
              Admin
            </option>
            <option key="3" value="Active" className="text-primary">
              Active
            </option>
            <option key="4" value="Inactive" className="text-danger">
              Inactive
            </option>
            <option key="5" value="NonAdmin" className="text-info">
              Non-Admin
            </option>
          </select>
        </div>
      </div>

      <hr className="border border-1 border-dark"></hr>

      <div className="table-wrapper">
        {filteredUsers.length > 0 && showTable ? (
          <table className="table table-striped">
            <colgroup>
              <col style={{ width: "3%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "30%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "3%" }} />
            </colgroup>
            <thead className="table-dark">
              <tr>
                <th className="text-center">
                  <input type="radio" name="selectedUser" disabled />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Total Visits</th>
                <th>User Category</th>
                <th>Status</th>
                <th className="text-center">
                  <i className="bi bi-pencil"></i>
                </th>
                <th>
                  <i class="bi bi-x-circle"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords?.map((user) => (
                <tr key={user.id}>
                  <td className="text-center">
                    <input
                      type="radio"
                      name="selectedUser"
                      onChange={() => handleRadioSelection(user.id)}
                      checked={selectedRow === user.id}
                    />
                  </td>
                  <td>{user.first_name + " " + user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.contactNo}</td>
                  <td className="text-center">{user.total_visits}</td>
                  <td>{user.isAdmin === true ? "Admin" : "Non-Admin"}</td>
                  <td>{user.status === true ? "Active" : "Inactive"}</td>
                  <td className="text-center">
                    <i
                      className="bi bi-chevron-right"
                      //   className={`bi bi-chevron-right ${
                      //     selectedRow === user.id
                      //       ? "text-dark menu-pointer"
                      //       : "text-secondary opacity-50 disabled"
                      //   }`}
                      //   onClick={() => handleSelectedRowClick(user.id)}
                    ></i>
                  </td>
                  <td>
                    <i class="bi bi-trash"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>

      {/* Use the Pagination component */}
      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <Pagination
            totalRecords={totalRecords}
            recordsPerPage={recordsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};
export default ViewUsers;
