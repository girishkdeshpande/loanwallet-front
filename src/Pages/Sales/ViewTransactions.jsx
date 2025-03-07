import react, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ViewTransactions = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mb-2 mx-2">
          <label className="col-12 bg-info border border-1 border-secondary rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100">
            View Transactions
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
            <DatePicker
              className="form-control mt-1 rounded"
              dateFormat="dd-MM-yyyy"
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              placeholderText="From Date"
            />
            <DatePicker
              className="form-control mt-1 rounded"
              dateFormat="dd-MM-yyyy"
              selected={toDate}
              onChange={(date) => setToDate(date)}
              placeholderText="To Date"
            />
            {/* <label
              className="my-1 rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100"
              href="#"
            >
              OR
            </label> */}
            <input
              className="form-control mt-1"
              list="searchList"
              id="searchOpt"
              placeholder="Search By"
            />
            <datalist id="searchList">
              <option value="Company" />
              <option value="Transaction Type" />
            </datalist>
            {/* <div className="form-floating"> */}
            <input
              type="text"
              // id="enterName"
              className="form-control mt-1"
              aria-describedby="searchName"
              placeholder="Enter here"
            />
            {/* <label htmlFor="enterName">Enter here</label> */}
            {/* </div> */}
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
                    style={{ width: "120px" }}
                  >
                    Invoice Date
                  </th>
                  <th
                    scope="col"
                    className="fw-normal fs-6 px-2 bg-info"
                    style={{ width: "150px" }}
                  >
                    Invoice Number
                  </th>
                  <th
                    scope="col"
                    className="fw-normal fs-6 px-2 bg-info"
                    style={{ width: "150px" }}
                  >
                    Transaction Type
                  </th>
                  <th scope="col" className="fw-normal fs-6 px-2 bg-info">
                    Company
                  </th>
                  <th
                    scope="col"
                    className="fw-normal fs-6 px-2 bg-info"
                    style={{ width: "100px" }}
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>24-09-2023</td>
                  <td>SPCR/24-25/224</td>
                  <td>Purchase</td>
                  <td></td>
                  <td>155601</td>
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

export default ViewTransactions;
