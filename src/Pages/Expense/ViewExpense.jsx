import react, { useState } from "react";
import Table from "../../Components/Table";

const ViewExpense = () => {
  const expenseColumns = [
    { key: "date_of_expense", label: "Expense Date", width: "10%" },
    { key: "user_name", label: "Expense Raised By", width: "45%" },
    { key: "category", label: "Expense Category", width: "15%" },
    { key: "amount", label: "Expense Amount", width: "15%" },
    { key: "status", label: "Status", width: "15%" },
  ];

  return (
    <>
      <div className="row align-items-center">
        <div className="col text-start mt-2">
          <h5> Expense Records </h5>
        </div>

        {/* <Search
          value={searchString}
          onChange={handleSearchChange}
          onSearch={handleSearchClick}
        /> */}

        {/* <div className="col text-end"></div> */}

        {/* {filteredCompanies.length > 0 && (
            <> */}
        <Table
          columns={expenseColumns}
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

export default ViewExpense;
