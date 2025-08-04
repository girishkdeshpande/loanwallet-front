import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Search from "../../Components/Search";
import Table from "../../Components/Table";

const ViewVisits = () => {
  const visitColumns = [
    { key: "date_of_visit", label: "Visit Date", width: "10%" },
    { key: "time_of_visit", label: "Visit Time", width: "10%" },
    { key: "user_name", label: "Visit By", width: "18%" },
    { key: "company_name", label: "Visit to Company", width: "25%" },
    { key: "summary", label: "Summary", width: "31%" },
  ];

  return (
    <>
      <div className="row align-items-center">
        <div className="col text-start">
          <h5> Visit Records </h5>
        </div>

        <Search
        //   value={searchString}
        //   onChange={handleSearchChange}
        //   onSearch={handleSearchClick}
        />

        <div className="col text-end"></div>

        {/* {filteredCompanies.length > 0 && (
            <> */}
        <Table
          columns={visitColumns}
          //   data={paginatedCompanies}
          //   extraProps={{
          //     selectedRow,
          //     handleRadioSelection,
          // handleEditClick,
          // handleDeleteClick,
          //   }}
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
        {/* </>
          )} */}
      </div>
    </>
  );
};

export default ViewVisits;
