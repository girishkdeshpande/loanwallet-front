const ViewProduct = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mb-2 mx-2">
          <label className="col-12 bg-info border border-1 border-secondary rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100">
            View / Search Product
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
              <option value="Product Name" />
              <option value="Product Type" />
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
                  <th
                    scope="col"
                    className="fw-normal fs-6 px-2 bg-info"
                    style={{ minWidth: "300px" }}
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="fw-normal fs-6 px-2 bg-info"
                    style={{ minWidth: "100px" }}
                  >
                    HSN Code
                  </th>
                  <th
                    scope="col"
                    className="fw-normal fs-6 px-2 bg-info"
                    style={{ minWidth: "200px" }}
                  >
                    Product Type
                  </th>
                  <th
                    scope="col"
                    className="fw-normal fs-6 px-2 bg-info"
                    style={{ minWidth: "10px" }}
                  >
                    Weight
                  </th>
                  <th
                    scope="col"
                    className="fw-normal fs-6 px-2 bg-info"
                    style={{ minWidth: "20px" }}
                  >
                    Aluminium Capacity
                  </th>
                  <th
                    scope="col"
                    className="fw-normal fs-6 px-2 bg-info"
                    style={{ minWidth: "100px" }}
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
