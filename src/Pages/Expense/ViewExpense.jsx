import react, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AllUsers } from "../../Redux/slices/userSlice";
import { AllExpenses } from "../../Redux/slices/expenseSlices";

import CustomDatePicker from "../../Components/DatePicker";
import Pagination from "../../Components/Pagination";
import Table from "../../Components/Table";

import { expenseColumns } from "../../Utilities/TableColumns";
import { CamelCase, formatDate } from "../../Utilities/GlobalFunctions";

import ViewSingleExpense from "./ViewSingleExpense";

const ViewExpense = () => {
  const dispatch = useDispatch();

  const { allUsersData } = useSelector((state) => state.user.allUsersState);

  const [userOptions, setUserOptions] = useState([]);
  const [searchExpenseData, setSearchExpenseData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRequestRaised, setIsRequestRaised] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shouldRenderModal, setShouldRenderModal] = useState(false);
  const [modalExpenseData, setModalExpenseData] = useState([]);
  const [expenseData, setExpenseData] = useState({
    from_date: null,
    to_date: null,
    user_name: "",
  });

  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const paginatedExpenses = searchExpenseData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const isBackendPaginated = false;
  const isDateRangeSelected =
    expenseData.from_date !== null && expenseData.to_date !== null;

  useEffect(() => {
    setSelectedRow(null);
    dispatch(AllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (allUsersData) {
      const activeUsers = allUsersData.data
        .filter((user) => user.status === true)
        .map((user) => ({
          user_id: user.id,
          full_name: CamelCase(`${user.first_name} ${user.last_name}`),
        }));

      setUserOptions(activeUsers);
    }
  }, [allUsersData]);

  const handleFromDateChange = (date) => {
    setExpenseData((prev) => ({
      ...prev,
      from_date: date,
      to_date: date, // 🔥 sync to-date
    }));
    // setDateError("");
  };

  const handleToDateChange = (date) => {
    setExpenseData((prev) => {
      if (date < prev.from_date) {
        // setDateError("To date cannot be earlier than From date");
        toast.error("To date cannot be earlier than From date");
        return {
          ...prev,
          to_date: prev.from_date, // 🔥 reset
        };
      }

      if (prev.from_date === null) {
        return {
          ...prev,
          to_date: null,
        };
      }

      // 2️⃣ to_date > from_date + 30 days
      const maxToDate = new Date(prev.from_date);
      maxToDate.setDate(maxToDate.getDate() + 30);

      if (prev.from_date !== null && date > maxToDate) {
        toast.error("Date range cannot exceed 30 days");
        return {
          ...prev,
          to_date: maxToDate, // 🔥 snap to 30th day
        };
      }

      //   setDateError("");
      return {
        ...prev,
        to_date: date,
      };
    });
  };

  const buildPayload = () => {
    let userObj = {};
    if (expenseData.user_name) {
      userObj =
        userOptions.find((user) => user.full_name === expenseData.user_name) ||
        {};
    }

    return {
      user_id: userObj ? userObj.user_id : "",
      fromDate: formatDate(expenseData.from_date),
      toDate: formatDate(expenseData.to_date),
    };
  };

  const handleSubmitClick = () => {
    setIsRequestRaised(true);
    const payload = buildPayload();
    console.log("Payload:", payload);
    dispatch(AllExpenses(payload))
      .unwrap()
      .then((response) => {
        setSearchExpenseData(response.data.expenses);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleResetClick = () => {
    setExpenseData({
      from_date: null,
      to_date: null,
      user_name: "",
    });
    setIsRequestRaised(false);
    setSelectedRow(null);
  };

  const handleRadioSelection = (expenseId) => {
    setSelectedRow((prevSelected) =>
      prevSelected === expenseId ? null : expenseId
    );
  };

  const handleViewClick = (expenseId) => {
    let expenseViewData = searchExpenseData.find(
      (expense) => expense.id === expenseId
    );
    console.log("View Click Expense Data", expenseViewData);
    setModalExpenseData(expenseViewData);
    setShouldRenderModal(true);
    setShowModal(true);
  };

  const handleViewClose = () => {
    const modalEl = document.getElementById("expenseDetailsModal");

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

  console.log("Show Modal & Should Render Modal", showModal, shouldRenderModal);

  return (
    <>
      <div className="row align-items-center">
        <div className="col text-start mt-2">
          <h5> Expense Records </h5>
        </div>

        <div className="col-md-2 text-start mt-1">
          <CustomDatePicker
            label="From Date"
            value={expenseData.from_date}
            selected={expenseData.from_date}
            onChange={handleFromDateChange}
          />
        </div>

        <div className="col-md-2 text-start mt-1">
          <CustomDatePicker
            label="To Date"
            value={expenseData.to_date}
            selected={expenseData.to_date}
            onChange={handleToDateChange}
          />
        </div>

        <div className="col-md-2 text-start mt-1">
          <div className="form-floating">
            <select
              className="form-select form-select-md rounded-4 border border-1 border-dark"
              id="user_name"
              value={expenseData.user_name || ""}
              onChange={(e) =>
                setExpenseData((prev) => ({
                  ...prev,
                  user_name: e.target.value,
                }))
              }
            >
              <option value="">--Select--</option>
              {userOptions.map((option) => (
                <option key={option.user_id} value={option.full_name}>
                  {option.full_name}
                </option>
              ))}
            </select>
            <label>Select User (Optional)</label>
          </div>
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-primary"
            onClick={handleSubmitClick}
            disabled={!isDateRangeSelected}
          >
            Submit
          </button>
          <button className="btn btn-primary mx-2" onClick={handleResetClick}>
            Reset
          </button>
        </div>

        {searchExpenseData.length > 0 && isRequestRaised && (
          <>
            <Table
              columns={expenseColumns}
              data={paginatedExpenses}
              page="view_expenses"
              extraProps={{
                selectedRow,
                handleRadioSelection,
                handleViewClick,
              }}
            />

            {/* Pagination Component */}
            <div className="pagination-wrapper">
              <Pagination
                data={searchExpenseData}
                recordsPerPage={recordsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                isBackendPaginated={isBackendPaginated}
              />
            </div>
          </>
        )}

        {showModal && shouldRenderModal && (
          <ViewSingleExpense
            expenseData={modalExpenseData}
            show={showModal}
            onClose={handleViewClose}
          />
        )}
      </div>
    </>
  );
};

export default ViewExpense;
