import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AllUsers } from "../../Redux/slices/userSlice";
import { CompanyNames } from "../../Redux/slices/companySlice";
import { SearchVisits, VisitReport } from "../../Redux/slices/visitSlices";

import Search from "../../Components/Search";
import Table from "../../Components/Table";
import CustomDatePicker from "../../Components/DatePicker";
import SingleSelectTypeahead from "../../Components/SingleSelectTypeahead";
import Pagination from "../../Components/Pagination";

import { CamelCase, formatDate } from "../../Utilities/GlobalFunctions";
import { visitColumns } from "../../Utilities/TableColumns";

const ViewVisits = () => {
  const dispatch = useDispatch();
  const visitRef = useRef(null);

  const { allUsersData } = useSelector((state) => state.user.allUsersState);
  const { companyNamesData, companyNamesLoading, companyNamesError } =
    useSelector((state) => state.company.companyNamesState);
  const { searchVisitsData, searchVisitsLoading, searchVisitsError } =
    useSelector((state) => state.visits.searchVisitsState);

  const [companyOptions, setCompanyOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [searchVisitData, setSearchVisitData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRequestRaised, setIsRequestRaised] = useState(false);
  const [visitData, setVisitData] = useState({
    from_date: null,
    to_date: null,
    user_name: "",
    company_name: [],
  });

  const COMPANY_SELECT_OPTION = useMemo(
    () => ({
      company_id: "",
      company_name: "-- Select --",
      isPlaceholder: true,
    }),
    []
  );

  const isSubmitDisabled =
    (visitData.from_date !== null && visitData.to_date !== null) ||
    visitData.user_name !== "" ||
    (Array.isArray(visitData.company_name) &&
      visitData.company_name.length > 0);

  //   const isDateRangeSelected =
  //     visitData.from_date !== null && visitData.to_date !== null;

  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const paginatedVisits = searchVisitData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const isBackendPaginated = false;

  useEffect(() => {
    dispatch(AllUsers());
    dispatch(CompanyNames());
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

    if (companyNamesData) {
      const companies = companyNamesData.data.map((item) => ({
        company_id: item.id,
        company_name: item.name,
      }));

      setCompanyOptions([COMPANY_SELECT_OPTION, ...companies]);
    }
  }, [allUsersData, companyNamesData, COMPANY_SELECT_OPTION]);

  const handleCompanySelection = (selected) => {
    setVisitData((prev) => ({
      ...prev,
      company_name: selected,
    }));
  };

//   const handleSelectDateChange = (date) => {
//     setVisitData((prev) => ({
//       ...prev,
//       visit_date: date,
//     }));
//   };

  const handleFromDateChange = (date) => {
    setVisitData((prev) => ({
      ...prev,
      from_date: date,
      to_date: date, // 🔥 sync to-date
    }));
  };

  const handleToDateChange = (date) => {
    setVisitData((prev) => {
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

  const buildPayload = () => {
    const selectedCompany = visitData.company_name.company_name || null;
    let companyObj = {};
    let userObj = {};
    if (visitData.user_name) {
      userObj =
        userOptions.find((user) => user.full_name === visitData.user_name) ||
        {};
    }
    if (selectedCompany) {
      companyObj =
        companyOptions.find(
          (company) => company.company_name === selectedCompany
        ) || {};
    }

    return {
      company_id: companyObj ? companyObj.company_id : "",
      user_id: userObj ? userObj.user_id : "",
      fromDate: visitData.from_date ? formatDate(visitData.from_date) : null,
      toDate: visitData.to_date ? formatDate(visitData.to_date) : null,
    };
    // return {
    //   company_name: selectedCompany ?? "",
    //   visit_date: visitData.visit_date
    //     ? formatDate(visitData.visit_date)
    //     : null,
    //   user_name: visitData.user_name ? visitData.user_name : "",
    // };
  };

  const handleSubmitClick = () => {
    setIsRequestRaised(true);
    const payload = buildPayload();
    // console.log("Payload:", payload);
    dispatch(VisitReport(payload))
      .unwrap()
      .then((response) => {
        setSearchVisitData(response.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleResetClick = () => {
    setVisitData({
      //   visit_date: null,
      from_date: null,
      to_date: null,
      user_name: "",
      company_name: [],
    });
    setIsRequestRaised(false);
  };

  const handleExportClick = () => {
    const payload = buildPayload();
    payload["exportdata"] = true;
    console.log("PDF Payload", payload);
    dispatch(VisitReport(payload))
      .unwrap()
      .then((response) => {
        console.log("PDF Response", response);
        let base64str = response.data.pdfdata;

        // decode base64 string, remove space for IE compatibility
        let binary = atob(base64str.replace(/\s/g, ""));
        let len = binary.length;
        let buffer = new ArrayBuffer(len);
        let view = new Uint8Array(buffer);
        for (let i = 0; i < len; i++) {
          view[i] = binary.charCodeAt(i);
        }

        // create the blob object with content-type "application/pdf"
        let blob = new Blob([view], { type: "application/pdf" });
        let url = URL.createObjectURL(blob);
        window.open(url);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <>
      <div className="row align-items-center">
        <div className="col text-start mt-3 mb-1">
          <h5> Visit Records </h5>
        </div>
      </div>

      <div className="row align-items-center">
        <div className="col-md-2">
          <CustomDatePicker
            label="From Date"
            value={visitData.from_date}
            selected={visitData.from_date}
            onChange={handleFromDateChange}
          />
        </div>

        <div className="col-md-2">
          <CustomDatePicker
            label="To Date"
            value={visitData.to_date}
            selected={visitData.to_date}
            onChange={handleToDateChange}
          />
        </div>

        <div className="col-md-2">
          <div className="form-floating">
            <select
              className="form-select form-select-md rounded-4 border border-1 border-dark"
              id="user_name"
              value={visitData.user_name}
              onChange={(e) =>
                setVisitData((prev) => ({
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

        <div className="col-md-3 text-start">
          <SingleSelectTypeahead
            id="visit"
            label="Select Company (Optional)"
            options={companyOptions}
            typeaheadRef={visitRef}
            selected={visitData.company_name}
            onChange={handleCompanySelection}
            placeholder="--Select--"
            className="custom-typeahead"
            labelKey="company_name"
          />
        </div>

        <div className="col-md-3">
          <button
            className="btn btn-primary"
            onClick={handleSubmitClick}
            disabled={!isSubmitDisabled}
          >
            Submit
          </button>
          <button className="btn btn-primary mx-2" onClick={handleResetClick}>
            Reset
          </button>
          <button
            className="btn btn-primary"
            onClick={handleExportClick}
            disabled={!isRequestRaised}
          >
            Export
            <i className="bi bi-filetype-pdf ms-1"></i>
          </button>
        </div>

        {searchVisitData.length > 0 && isRequestRaised && (
          <>
            <Table
              columns={visitColumns}
              data={paginatedVisits}
              page="view_visits"
              //   extraProps={{
              //     selectedRow,
              //     handleRadioSelection,
              // handleEditClick,
              // handleDeleteClick,
              //   }}
            />

            {/* Pagination Component */}
            <div className="pagination-wrapper">
              <Pagination
                data={searchVisitData}
                recordsPerPage={recordsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                isBackendPaginated={isBackendPaginated}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ViewVisits;
