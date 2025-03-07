const ViewCompany = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mb-2 mx-2">
            <label className="col-12 bg-info border border-1 border-secondary rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100">
              View / Search Company
            </label>
          </div>
  
          <div className="col-2">
            <div className="container rounded border border-1 border-secondary ms-2">
              <label
                className="my-1 bg-info rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100"
                href="#"
              >
                Search Criteria
              </label>
              <input
                className="form-control mt-1"
                list="searchList"
                id="searchOpt"
                placeholder="Search By"
              />
              <datalist id="searchList">
                <option value="Address" />
                <option value="Company Name" />
              </datalist>
              <input
                type="text"
                className="form-control mt-1"
                aria-describedby="searchName"
                placeholder="Enter Name"
              />
              <div className="d-flex justify-content-center">
              <button className="btn btn-primary my-3 mx-2">Reset</button>
                <button className="btn btn-primary my-3 mx-2">Search</button>
              </div>
            </div>
          </div>
  
          <div className="col-10">
            <div className="container border border-1 border-secondary rounded h-100 ms-2">
              <table className="table table-secondary table-bordered mt-1">
                <thead>
                  <tr>
                    <th scope="col" className="fw-normal fs-6 px-2 bg-info" style={{ minWidth: "200px" }}>
                      Name
                    </th>
                    <th scope="col" className="fw-normal fs-6 px-2 bg-info" style={{ minWidth: "150px" }}>
                      GST Number
                    </th>
                    <th scope="col" className="fw-normal fs-6 px-2 bg-info" style={{ minWidth: "550px" }}>
                      Address
                    </th>
                    <th scope="col" className="fw-normal fs-6 px-2 bg-info" style={{ minWidth: "10px" }}>
                      Tonnage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  
          <div className="col-12">
            <div className="row">
              <div className="col-5"></div>
              <div className="col-4">
              <div className="d-flex justify-content-center mt-1 ">
              <a
                  className="rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-1"
                  href="#"
                >
                  Previous
                </a>
                <label
                  className="rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100"
                >
                  Showing
                </label>
                <input
                  type="text"
                  className="form-control text-center w-50"
                  aria-describedby="companyName"
                  placeholder="No."
                  readOnly
                />
                <label
                  className="rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2"
                >
                  of
                </label>
                <input
                  type="text"
                  className="form-control text-center w-50"
                  aria-describedby="companyName"
                  placeholder="No."
                  readOnly
                />
                <label
                  className="rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100"
                >
                  Records
                </label>
                <a
                  className="rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-1"
                  href="#"
                >
                  Next
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ViewCompany;