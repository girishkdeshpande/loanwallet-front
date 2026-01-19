import react, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { SearchQuotations } from "../../Redux/slices/quotationSlices";

import Table from "../../Components/Table";
import Search from "../../Components/Search";
import CustomDatePicker from "../../Components/DatePicker";
import Pagination from "../../Components/Pagination";

import { quotationColumns } from "../../Utilities/TableColumns";
import { CamelCase, formatDate } from "../../Utilities/GlobalFunctions";
import { QuotationSearchField } from "../../Utilities/ListConstants";

import ViewSingleQuotation from "./ViewSingleQuotation";

const ViewQuotations = () => {
  const dispatch = useDispatch();

  const [searchQuotationData, setSearchQuotationData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRequestRaised, setIsRequestRaised] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shouldRenderModal, setShouldRenderModal] = useState(false);
  const [modalQuotationData, setModalQuotationData] = useState([]);
  const [quotationData, setQuotationData] = useState({
    from_date: null,
    to_date: null,
    search_field: "",
    search_data: "",
  });

  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const paginatedQuotations = searchQuotationData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const isBackendPaginated = false;
  const isDateRangeSelected =
    quotationData.from_date !== null && quotationData.to_date !== null;

  useEffect(() => {
    setSelectedRow(null);
  }, []);

  const handleFromDateChange = (date) => {
    setQuotationData((prev) => ({
      ...prev,
      from_date: date,
      to_date: date, // 🔥 sync to-date
    }));
  };

  const handleToDateChange = (date) => {
    setQuotationData((prev) => {
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

      return {
        ...prev,
        to_date: date,
      };
    });
  };

  const handleSearchChange = (value) => {
    setQuotationData((prev) => {
      return {
        ...prev,
        search_data: value,
      };
    });
    if (value.trim() === "") {
      setSearchQuotationData([]);
      setIsRequestRaised(false);
    }
  };

  const buildPayload = () => {
    return {
      search_data: quotationData.search_data,
      search_field: quotationData.search_field,
      fromDate: formatDate(quotationData.from_date),
      toDate: formatDate(quotationData.to_date),
    };
  };

  const handleSubmitClick = () => {
    setIsRequestRaised(true);
    setCurrentPage(1);
    const payload = buildPayload();
    console.log("Quotation View Payload:", payload);
    dispatch(SearchQuotations(payload))
      .unwrap()
      .then((response) => {
        setSearchQuotationData(response.data);
      })
      .catch((error) => {
        toast.error(error);
      });
    setSelectedRow(null);
  };

  const handleResetClick = () => {
    setQuotationData({
      from_date: null,
      to_date: null,
      search_data: "",
      search_field: "",
    });
    setIsRequestRaised(false);
    setSelectedRow(null);
  };

  const handleRadioSelection = (expenseId) => {
    setSelectedRow((prevSelected) =>
      prevSelected === expenseId ? null : expenseId
    );
  };

  const handleViewClick = (quotationId) => {
    let quotationViewData = searchQuotationData.find(
      (quotation) => quotation.id === quotationId
    );
    console.log("View Click Quotation Data", quotationViewData);
    setModalQuotationData(quotationViewData);
    setShouldRenderModal(true);
    setShowModal(true);
  };

  const handleViewClose = () => {
    const modalEl = document.getElementById("quotationDetailsModal");

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
          <h5> Quotation Records </h5>
        </div>

        <div className="col-md-2 text-start mt-1">
          <CustomDatePicker
            label="From Date"
            value={quotationData.from_date}
            selected={quotationData.from_date}
            onChange={handleFromDateChange}
          />
        </div>

        <div className="col-md-2 text-start mt-1">
          <CustomDatePicker
            label="To Date"
            value={quotationData.to_date}
            selected={quotationData.to_date}
            onChange={handleToDateChange}
          />
        </div>

        <div className="col-md-2 text-start mt-1">
          <div className="form-floating">
            <select
              className="form-select form-select-md rounded-4 border border-1 border-dark"
              id="quotation_field"
              value={quotationData.search_field || ""}
              onChange={(e) =>
                setQuotationData((prev) => ({
                  ...prev,
                  search_field: e.target.value,
                }))
              }
            >
              <option value="">--Select--</option>
              {QuotationSearchField.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label>Select Search Field (Optional)</label>
          </div>
        </div>

        <Search
          label="Search Text (Optional)"
          value={quotationData.search_data}
          onChange={handleSearchChange}
          //    onSearch={handleSearchClick}
        />

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

        {searchQuotationData.length > 0 && isRequestRaised && (
          <>
            <Table
              columns={quotationColumns}
              page="view_quotations"
              data={paginatedQuotations}
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
                data={searchQuotationData}
                recordsPerPage={recordsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                isBackendPaginated={isBackendPaginated}
              />
            </div>
          </>
        )}
        {showModal && shouldRenderModal && (
          <ViewSingleQuotation
            quotationData={modalQuotationData}
            show={showModal}
            onClose={handleViewClose}
          />
        )}
      </div>
    </>
  );
};

export default ViewQuotations;
