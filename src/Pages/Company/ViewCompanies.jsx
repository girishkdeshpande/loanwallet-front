import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  SearchCompany,
  DeleteCompany,
  resetDeleteCompanyState,
  resetSearchCompanyState,
} from "../../Redux/slices/companySlice";
import { showWarningMessage } from "../../Redux/slices/globalMessageSlice";

import ViewSingleCompany from "./ViewSingleCompany";
import { confirmAction } from "../../Components/WarningMessage";
import Search from "../../Components/Search";
import Table from "../../Components/Table";
import Pagination from "../../Components/Pagination";
import PageSpinner from "../../Components/PageSpinner";
import NoRecordsFound from "../../Components/NoRecordsFound";
import NoRecords from "../../Components/NoRecords";

import { companyColumns } from "../../Utilities/TableColumns";

const ViewCompanies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchCompanyData, searchCompanyLoading, searchCompanyError } =
    useSelector((state) => state.company.searchCompanyState);

  const [companyRecords, setCompanyRecords] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRequestRaised, setIsRequestRaised] = useState(false);
  const [modalCompanyData, setModalCompanyData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shouldRenderModal, setShouldRenderModal] = useState(false);

  const isBackendPaginated = false;

  // Pagination Logic
  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const paginatedCompanies = companyRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  useEffect(() => {
    if (searchCompanyData) {
      setCompanyRecords(searchCompanyData.data);
      setIsRequestRaised(true);
    }

    if (searchCompanyError) {
      toast.error(searchCompanyError);
      setIsRequestRaised(false);
    }
    dispatch(resetSearchCompanyState());
  }, [dispatch, searchCompanyData, searchCompanyError]);

  const handleSearchChange = (value) => {
    setSearchString(value);
    if (value.trim() === "") {
      setCompanyRecords([]);
      setIsRequestRaised(false);
    }
  };

  /* Handle Search click event */
  const handleSearchClick = (searchString) => {
    if (!searchString.trim()) {
      setCompanyRecords([]);
      setCurrentPage(1);
      return;
    }
    dispatch(SearchCompany({ search_data: searchString }));
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick(searchString); // This is your existing function to trigger the API
    }
  };
  /* Handle Radio button selection */
  const handleRadioSelection = (companyId) => {
    setSelectedRow((prevSelected) =>
      prevSelected === companyId ? null : companyId
    );
  };

  /* Handle View button click */
  const handleViewClick = (companyId) => {
    let companyData = companyRecords.find(
      (company) => company.id === companyId
    );
    setModalCompanyData(companyData);
    setShouldRenderModal(true);
    setShowModal(true);
  };

  /* Handle Close button click of View Single User Information click */
  const handleViewClose = () => {
    const modalEl = document.getElementById("companyDetailsModal");

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
  const handleEditClick = (companyId) => {
    let companyData = companyRecords.find(
      (company) => company.id === companyId
    );
    navigate("/homepage/update_company", {
      state: { initialData: companyData },
    });
  };

  /* Handle Delete button click */
  const handleDeleteClick = (companyId) => {
    confirmAction.current = () => {
      dispatch(DeleteCompany(companyId)).then((response) => {
        if (response.type === "company/delete_company/fulfilled") {
          toast.success(response.payload.data);
          window.location.reload();
        } else {
          toast.error(response.payload.error);
        }
      });
      dispatch(resetDeleteCompanyState());
    };
    dispatch(
      showWarningMessage({
        message: "Are you sure, you want to delete this company ?",
        loadingKey: "company.deleteCompanyState.deleteCompanyLoading",
      })
    );
  };

  console.log("Search Company Data", paginatedCompanies);

  return (
    <>
      <div className="row align-items-center">
        <div className="col text-start">
          <h5> Company Records </h5>
        </div>

        <Search
          value={searchString}
          onChange={handleSearchChange}
          onSearch={handleSearchClick}
          onKeyDown={handleSearchKeyDown}
          label="Search by Company Name or Address"
        />

        <div className="col text-end"></div>

        {searchCompanyLoading ? (
          <PageSpinner />
        ) : !isRequestRaised ? (
          <NoRecords />
        ) : companyRecords.length === 0 ? (
          <NoRecordsFound />
        ) : (
          <>
            <Table
              columns={companyColumns}
              data={paginatedCompanies}
              extraProps={{
                selectedRow,
                handleViewClick,
                handleRadioSelection,
                handleEditClick,
                handleDeleteClick,
              }}
            />

            {/* Pagination Component */}
            <div className="pagination-wrapper">
              <Pagination
                data={companyRecords}
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
          <ViewSingleCompany
            companyData={modalCompanyData}
            show={showModal}
            onClose={handleViewClose}
          />
        )}
      </div>
    </>
  );
};

export default ViewCompanies;
