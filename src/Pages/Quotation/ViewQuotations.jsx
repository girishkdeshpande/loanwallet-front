import Table from "../../Components/Table";

const ViewQuotations = () => {
  const quotationColumns = [
    { key: "date", label: "Date", width: "10%" },
    { key: "user_name", label: "Quotation Prepared By", width: "25%" },
    { key: "company_name", label: "Prepared for Company", width: "45%" },
    { key: "total_price", label: "Quotation Price", width: "10%" },
    { key: "open_close_status", label: "Status", width: "10%" },
  ];

  return (
    <>
      <div className="row align-items-center">
        <div className="col text-start mt-2">
          <h5> Quotation Records </h5>
        </div>

        {/* <Search
          value={searchString}
          onChange={handleSearchChange}
           onSearch={handleSearchClick}
         /> */}

        {/* <div className="col text-end"></div> */}

        {/* {filteredCompanies.length > 0 && ( */}
        <>
          <Table
            columns={quotationColumns}
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
        </>
        {/* )} */}
      </div>
    </>
  );
};

export default ViewQuotations;
