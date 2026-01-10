import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  TallyCompanyNames,
  TallyTransactions,
} from "../../Redux/slices/salesSlices";

import "../../Styles/SingleSelectTypeahead.css";

import CustomDatePicker from "../../Components/DatePicker";
import Table from "../../Components/Table";

import SingleSelectTypeahead from "../../Components/SingleSelectTypeahead";
import PageSpinner from "../../Components/PageSpinner";
import Pagination from "../../Components/Pagination";
import NoRecordsFound from "../../Components/NoRecordsFound";
import NoRecords from "../../Components/NoRecords";
import ViewSingleTransaction from "./ViewSingleTransaction";
import { salesColumns } from "../../Utilities/TableColumns";

const ViewTransactions = () => {
  const dispatch = useDispatch();
  const companyRef = useRef(null);

  const {
    tallyCompanyNamesData,
    tallyCompanyNamesLoading,
    tallyCompanyNamesError,
  } = useSelector((state) => state.sales.tallyCompanyNamesState);

  const {
    tallyTransactionsData,
    tallyTransactionsLoading,
    tallyTransactionsError,
  } = useSelector((state) => state.sales.tallyTransactionsState);

  const [companyOptions, setCompanyOptions] = useState([]);
  const [tallyTransactions, setTallyTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isRequestRaised, setIsRequestRaised] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shouldRenderModal, setShouldRenderModal] = useState(false);
  const [modalTransactionData, setModalTransactionData] = useState(null);
  const [tallyData, setTallyData] = useState({
    from_date: null,
    to_date: null,
    company_name: [],
  });
  const [dateError, setDateError] = useState("");
  const isBackendPaginated = false;
  // Pagination Logic
  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const paginatedTransactions = tallyTransactions.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const isDateRangeSelected =
    tallyData.from_date !== null && tallyData.to_date !== null;

  const isCompanySelected =
    Array.isArray(tallyData.company_name) && tallyData.company_name.length > 0;

  const isSubmitDisabled = !(isDateRangeSelected || isCompanySelected);

  useEffect(() => {
    dispatch(TallyCompanyNames());
  }, [dispatch]);

  useEffect(() => {
    if (tallyCompanyNamesData) {
      const companies = tallyCompanyNamesData.data;

      setCompanyOptions(["--Select--", ...companies]);
    }
  }, [tallyCompanyNamesData]);

  const handleCompanySelection = (selected) => {
    setTallyData((prev) => ({
      ...prev,
      company_name: selected,
    }));
  };

  const handleFromDateChange = (date) => {
    setTallyData((prev) => ({
      ...prev,
      from_date: date,
      to_date: date, // 🔥 sync to-date
    }));
    setDateError(""); // clear any error
  };

  const handleToDateChange = (date) => {
    setTallyData((prev) => {
      if (date < prev.from_date) {
        // setDateError("To date cannot be earlier than From date");
        toast.error("To date cannot be earlier than From date");
        return {
          ...prev,
          to_date: prev.from_date, // 🔥 reset
        };
      }

      setDateError("");
      return {
        ...prev,
        to_date: date,
      };
    });
  };

  const buildPayload = () => {
    const selectedCompany = tallyData.company_name[0] || null;
    return {
      company_name: selectedCompany ?? "",

      fromDate: tallyData.from_date
        ? tallyData.from_date.toISOString().split("T")[0]
        : null,

      toDate: tallyData.to_date
        ? tallyData.to_date.toISOString().split("T")[0]
        : null,
    };
  };

  const handleSubmitClick = () => {
    setShowTable(true);
    setIsRequestRaised(true);
    const payload = buildPayload();
    console.log("Payload:", payload);
    dispatch(TallyTransactions(payload))
      .unwrap()
      .then((response) => {
        // if (response && response.data) {
        setTallyTransactions(response.data);
        // }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleResetClick = () => {
    setTallyData({
      from_date: null,
      to_date: null,
      company_name: [],
    });
    setShowTable(false);
    setIsRequestRaised(false);
  };

  const handleRadioSelection = (transactionId) => {
    setSelectedRow((prevSelected) =>
      prevSelected === transactionId ? null : transactionId
    );
  };

  const handleViewClick = (transactionId) => {
    let transactionData = tallyTransactions.find(
      (transaction) => transaction.id === transactionId
    );
    console.log("View Click Transaction Data", transactionData);
    setModalTransactionData(transactionData);
    setShouldRenderModal(true);
    setShowModal(true);
  };

  const handleViewClose = () => {
    const modalEl = document.getElementById("transactionDetailsModal");

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

  return (
    <>
      <div className="row align-items-center">
        <div className="col text-start mt-2">
          <h5> Sale-Purchase Records </h5>
        </div>

        <div className="col-md-2 text-start mt-1">
          <CustomDatePicker
            label="From Date"
            value={tallyData.from_date}
            selected={tallyData.from_date}
            onChange={handleFromDateChange}
          />
        </div>

        <div className="col-md-2 text-start mt-1">
          <CustomDatePicker
            label="To Date"
            value={tallyData.to_date}
            selected={tallyData.to_date}
            onChange={handleToDateChange}
          />
        </div>

        {/* <h7> OR </h7> */}

        <div className="col-md-4 text-start">
          <SingleSelectTypeahead
            id="tally_transaction"
            label="Select Company"
            options={companyOptions}
            typeaheadRef={companyRef}
            selected={tallyData.company_name}
            onChange={handleCompanySelection}
            placeholder="--Select--"
            className="custom-typeahead"
            // labelKey={(option) => option}
          />
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-primary"
            onClick={handleSubmitClick}
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
          <button className="btn btn-primary mx-2" onClick={handleResetClick}>
            Reset
          </button>
        </div>
        {tallyTransactionsLoading ? (
          <PageSpinner />
        ) : !isRequestRaised ? (
          <NoRecords />
        ) : tallyTransactions.length === 0 ? (
          <NoRecordsFound />
        ) : (
          <>
            <Table
              columns={salesColumns}
              data={paginatedTransactions}
              extraProps={{
                selectedRow,
                handleRadioSelection,
                handleViewClick,
                // handleEditClick,
                // handleDeleteClick,
              }}
            />

            {/* Pagination Component */}
            <div className="pagination-wrapper">
              <Pagination
                data={tallyTransactions}
                recordsPerPage={recordsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                isBackendPaginated={isBackendPaginated}
              />
            </div>
          </>
        )}

        {showModal && shouldRenderModal && (
          <ViewSingleTransaction
            transactionData={modalTransactionData}
            show={showModal}
            onClose={handleViewClose}
          />
        )}
      </div>
    </>
  );
};

export default ViewTransactions;
