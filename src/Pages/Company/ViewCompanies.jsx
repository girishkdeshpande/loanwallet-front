import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { AllCompanies } from "../../Redux/slices/companySlice";

import Search from "../../Components/Search";
import Table from "../../Components/Table";
import Pagination from "../../Components/Pagination";
import { companyColumns } from "../../Utilities/TableColumns";

const ViewCompanies = () => {
  const dispatch = useDispatch();

  const { allCompanyData, allCompanyError } = useSelector(
    (state) => state.company.allCompanyState
  );

  const [allCompanies, setAllCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isBackendPaginated = true;

  // Pagination Logic
  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const paginatedCompanies = filteredCompanies.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  //   useEffect(() => {
  //     let request_parameter =
  //       "?no_records=" + recordsPerPage + "&page_no=" + currentPage;
  //     dispatch(AllCompanies(request_parameter));
  //   }, [dispatch, recordsPerPage, currentPage]);

  useEffect(() => {
    if (allCompanyData) {
      console.log("All Company Data", allCompanyData.data);
      setAllCompanies(allCompanyData.data);
    }

    if (allCompanyError) {
      toast.error(allCompanyError);
    }
  }, [allCompanyData, allCompanyError]);

  const handleSearchChange = (value) => {
    setSearchString(value);
    if (value.trim() === "") {
      setFilteredCompanies([]);
    }
  };

  /* Handle Search click event */
  const handleSearchClick = (searchString) => {
    if (!searchString.trim()) {
      setFilteredCompanies([]);
      setCurrentPage(1);
      return;
    } else {
      const filtered = allCompanies.filter((company) =>
        `${company.name}`.toLowerCase().includes(searchString.toLowerCase())
      );
      if (filtered.length > 0) {
        setFilteredCompanies(filtered);
        setCurrentPage(1);
      } else {
        toast.error("Record not found");
        return;
      }
    }
  };

  /* Handle Radio button selection */
  const handleRadioSelection = (companyId) => {
    setSelectedRow((prevSelected) =>
      prevSelected === companyId ? null : companyId
    );
  };

  /* Handle Edit button click */
  //   const handleEditClick = (companyId) => {
  // let userData = allUserData.find((user) => user.id === userId);
  // navigate("/homepage/update_user", { state: { initialData: userData } });
  //   };

  /* Handle Delete button click */
  //   const handleDeleteClick = (companyId) => {
  // confirmAction.current = () => {
  //   dispatch(DeleteUser(userId)).then((response) => {
  //     if (response.type === "user/delete/fulfilled") {
  //       toast.success(response.payload.data);
  //       navigate("/homepage");
  //     } else {
  //       toast.error(response.payload.error);
  //     }
  //   });
  //   dispatch(resetDeleteUserState());
  // };
  // dispatch(
  //   showWarningMessage({
  //     message: "Are you sure, you want to delete this user ?",
  //     loadingKey: "user.deleteUserState.deleteUserLoading",
  //   })
  // );
  //   };

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
        />

        <div className="col text-end"></div>

        {filteredCompanies.length > 0 && (
          <>
            <Table
              columns={companyColumns}
              data={paginatedCompanies}
              extraProps={{
                selectedRow,
                handleRadioSelection,
                // handleEditClick,
                // handleDeleteClick,
              }}
            />

            {/* Pagination Component */}
            {/* <div className="pagination-wrapper">
          <Pagination
            data={allCompanies}
            recordsPerPage={recordsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            isBackendPaginated={isBackendPaginated}
          />
        </div> */}
          </>
        )}
      </div>
    </>
  );
};

export default ViewCompanies;
