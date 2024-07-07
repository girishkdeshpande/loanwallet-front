const ViewVisits = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6 mt-2">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item">Visit</li>
              <li class="breadcrumb-item" aria-current="page">
                All
              </li>
            </ol>
          </nav>
        </div>

        <div className="col-6 mt-1">
          <input
            className="form-control w-50 float-end"
            list="companyList"
            id="companyOpt"
            placeholder="Search..."
          />
          <datalist id="companyList">
            <option value="Owner" />
            <option value="Head" />
            <option value="Accountant" />
            <option value="Supervisor" />
          </datalist>
          <select
            className="form-select w-25 me-5 float-end"
            aria-label="Default select example"
          >
            <option defaultValue="0">All</option>
            <option value="1">Company</option>
            <option value="2">User</option>
          </select>
        </div>

        <hr></hr>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Company Name
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div>
                        <label>Visit By:</label>
                      </div>
                      <div>
                        <strong>Visit Date:</strong>
                      </div>
                      <div>
                        <strong>Visit Time:</strong>
                      </div>
                      <div>
                        <strong>Summary:</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mt-2">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Company Name
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                    aria-labelledby="headingTwo"
                  >
                    <div className="accordion-body">
                      <strong>This is the second item's accordion body.</strong>{" "}
                      It is hidden by default, until the collapse plugin adds
                      the
                    </div>
                  </div>
                </div>
                <div className="accordion-item mt-2">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Company Name
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                    aria-labelledby="headingThree"
                  >
                    <div className="accordion-body">
                      <strong>This is the second item's accordion body.</strong>{" "}
                      It is hidden by default, until the collapse plugin adds
                      the
                    </div>
                  </div>
                </div>
                <div className="accordion-item mt-2">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Company Name
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                    aria-labelledby="headingFour"
                  >
                    <div className="accordion-body">
                      <strong>This is the second item's accordion body.</strong>{" "}
                      It is hidden by default, until the collapse plugin adds
                      the
                    </div>
                  </div>
                </div>
                <div className="accordion-item mt-2">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Company Name
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                    aria-labelledby="headingFive"
                  >
                    <div className="accordion-body">
                      <table className="table table-secondary">
                        <thead>
                          <tr>
                            <th scope="col" style={{ width: "200px" }}>
                              Visit By
                            </th>
                            <th scope="col" style={{ width: "100px" }}>
                              Visit Date
                            </th>
                            <th scope="col" style={{ width: "100px" }}>
                              Visit Time
                            </th>
                            <th scope="col" style={{ width: "100px" }}>
                              Is Valid
                            </th>
                            <th scope="col">Summary</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ width: "200px" }}>User Name</td>
                            <td style={{ width: "100px" }}>Date</td>
                            <td style={{ width: "100px" }}>Time</td>
                            <td style={{ width: "100px" }}>Yes / No</td>
                            <td>Few Lines</td>
                          </tr>
                          {/* <tr>
                          <th scope="row">Visit Date</th>
                          <td>Date</td>
                        </tr>
                        <tr>
                          <th scope="row">Visit Time</th>
                          <td>Time</td>
                        </tr>
                        <tr>
                          <td scope="row">Summary</td>
                          <td>Few Lines</td>
                        </tr> */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center mt-3">
          <li className="page-item">
            <a className="page-link bg-dark" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link bg-dark" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ViewVisits;
