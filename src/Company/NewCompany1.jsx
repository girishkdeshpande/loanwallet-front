const NewCompany1 = () => {
  const getPrimaryInfo = () => {
    return (
      <div className="col-12">
        <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
          Primary Information
        </label>
      </div>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mt-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              {/* <li class="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item">
                <a>Company</a>
              </li> */}
              <li className="breadcrumb-item ms-3" aria-current="page">
                New Company
              </li>
            </ol>
          </nav>
        </div>

        <div className="col-2">
          <div className="container label-color rounded ms-1 h-100">
            <label className="my-4">Company Information & Contact Person</label>
            <label className="my-4">Foundry & Furnace Type</label>
            <label className="my-4">
              Manufacturing Methods and Melting Metals & Alloys
            </label>
            <label className="my-4">
              Transfer Ladle & Flux Injector Machine
            </label>
            <label className="my-4 me-3">Capex Information</label>
          </div>
        </div>

        <div className="col-10">
          <div className="container label-color rounded h-100">
            <div className="row">
              <div className="col-12">
                <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-2">
                  Primary Information
                </label>
              </div>
              <div className="col-3">
                <input
                  type="text"
                  className="form-control mt-1"
                  aria-describedby="companyName"
                  placeholder="Company Name"
                  required
                />
              </div>
              <div className="col-3">
                <input
                  type="text"
                  className="form-control mt-1"
                  aria-describedby="addressLine1"
                  placeholder="Address Line 1"
                  required
                />
              </div>
              <div className="col-3">
                <input
                  type="text"
                  className="form-control mt-1"
                  aria-describedby="addressLine2"
                  placeholder="Address Line 2"
                  required
                />
              </div>
              <div className="col-3">
                <input
                  type="text"
                  className="form-control mt-1"
                  aria-describedby="gstNumber"
                  placeholder="GSTN"
                  required
                />
              </div>
              <div className="col-3">
                <input
                  type="text"
                  className="form-control mt-1"
                  aria-describedby="lattitude"
                  placeholder="Lattitude"
                  required
                />
              </div>
              <div className="col-3">
                <input
                  type="text"
                  className="form-control mt-1"
                  aria-describedby="longitude"
                  placeholder="Longitude"
                  required
                />
              </div>
              <div className="col-3">
                <input
                  type="text"
                  className="form-control mt-1"
                  aria-describedby="tonnagePerMonth"
                  placeholder="Tonnage Per Month"
                  required
                />
              </div>
              <div className="col-3">
                <input
                  className="form-control mt-1"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="Customer Repesentative..."
                />
                <datalist id="datalistOptions">
                  <option value="Swapnil Vyavahare" />
                  <option value="Vaibhav Jadhav" />
                  <option value="Jai Shilwant" />
                  <option value="Vicky" />
                </datalist>
              </div>
              <div className="col-12">
                <label className="bg-info rounded d-flex justify-content-between text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-2">
                  <span>Contact Person</span>
                  <a href="#" className="text-dark">
                    <a href="#" className="text-dark me-2">
                      Remove
                    </a>
                    Add
                  </a>
                </label>
              </div>
              <div className="col-2 mt-1">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="firstName"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="col-2 mt-1">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="lastName"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="col-2 mt-1">
                <input
                  className="form-control"
                  list="designationList"
                  id="designationOpt"
                  placeholder="Designation"
                />
                <datalist id="designationList">
                  <option value="Owner" />
                  <option value="Head" />
                  <option value="Accountant" />
                  <option value="Supervisor" />
                  <option value="Maintenance Head" />
                  <option value="Other Designation" />
                </datalist>
              </div>
              <div className="col-4 mt-1">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="col-2 mt-1">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="contactNumber"
                  placeholder="Contact Number"
                  required
                />
              </div>
              <div className="col-12 mt-2">
                <table className="table table-secondary table-bordered border-info">
                  <tbody>
                    <tr>
                      <td style={{ width: "190px" }}>First Name</td>
                      <td style={{ width: "185px" }}>Last Name</td>
                      <td style={{ width: "185px" }}>Designation</td>
                      <td style={{ width: "368px" }}>Email</td>
                      <td>Contact Number</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary my-3 mx-2">Cancel</button>
          <button className="btn btn-primary my-3 mx-2">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default NewCompany1;
