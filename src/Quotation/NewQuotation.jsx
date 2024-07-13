const NewQuotation = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mb-2 mx-2">
          <label className="col-12 bg-info border border-2 border-secondary rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100">
            New Quotation
          </label>
        </div>

        <div className="col-12">
          <div className="container-fluid border border-2 border-secondary rounded mx-2 mb-2">
            <div className="row">
              <div className="col-12">
                <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
                  Send To
                </label>
              </div>
              <div className="col-3">
                <input
                  className="form-control mt-2"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="Select Company1"
                />
                <datalist id="datalistOptions">
                  <option value="Swapnil Vyavahare" />
                  <option value="Vaibhav Jadhav" />
                  <option value="Jai Shilwant" />
                  <option value="Vicky" />
                </datalist>
              </div>
              <div className="col-3">
                <input
                  className="form-control mt-2"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="Contact Person Email"
                />
                <datalist id="datalistOptions">
                  <option value="Swapnil Vyavahare" />
                  <option value="Vaibhav Jadhav" />
                  <option value="Jai Shilwant" />
                  <option value="Vicky" />
                </datalist>
              </div>
              <div className="col-3">
                <input
                  className="form-control mt-2"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="CC Email"
                />
                <datalist id="datalistOptions">
                  <option value="Swapnil Vyavahare" />
                  <option value="Vaibhav Jadhav" />
                  <option value="Jai Shilwant" />
                  <option value="Vicky" />
                </datalist>
              </div>
              <div className="col-3">
                <input
                  className="form-control my-2"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="Subject"
                />
                <datalist id="datalistOptions">
                  <option value="Quotation for below Products/Unit" />
                </datalist>
              </div>

              <div className="col-12">
                <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
                  Terms & Conditions
                </label>
              </div>
              <div className="col-2">
                <input
                  className="form-control mt-2"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="Price"
                />
                <datalist id="datalistOptions">
                  <option value="Swapnil Vyavahare" />
                  <option value="Vaibhav Jadhav" />
                  <option value="Jai Shilwant" />
                  <option value="Vicky" />
                </datalist>
              </div>
              <div className="col-3">
                <input
                  className="form-control mt-2"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="Delivery Period"
                />
                <datalist id="datalistOptions">
                  <option value="Swapnil Vyavahare" />
                  <option value="Vaibhav Jadhav" />
                  <option value="Jai Shilwant" />
                  <option value="Vicky" />
                </datalist>
              </div>
              <div className="col-2">
                <input
                  className="form-control mt-2"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="Freight"
                />
                <datalist id="datalistOptions">
                  <option value="Swapnil Vyavahare" />
                  <option value="Vaibhav Jadhav" />
                  <option value="Jai Shilwant" />
                  <option value="Vicky" />
                </datalist>
              </div>
              <div className="col-2">
                <input
                  className="form-control mt-2"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="Payment"
                />
                <datalist id="datalistOptions">
                  <option value="Swapnil Vyavahare" />
                  <option value="Vaibhav Jadhav" />
                  <option value="Jai Shilwant" />
                  <option value="Vicky" />
                </datalist>
              </div>
              <div className="col-3">
                <input
                  className="form-control mt-2"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="Validity"
                />
                <datalist id="datalistOptions">
                  <option value="Swapnil Vyavahare" />
                </datalist>
              </div>

              <div className="col-12 mt-2">
                <label className="bg-info rounded d-flex justify-content-between text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-2">
                  <span>Product</span>
                  <a href="#" className="text-dark">
                    <a href="#" className="text-dark me-2">
                      Remove
                    </a>
                    Add
                  </a>
                </label>
              </div>
              <div className="col-3 mt-2">
                <input
                  className="form-control"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="Product Name"
                />
                <datalist id="datalistOptions">
                  <option value="Swapnil Vyavahare" />
                </datalist>
              </div>
              <div className="col-2 mt-2">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="firstName"
                  placeholder="HSN Code"
                  required
                />
              </div>
              <div className="col-2 mt-2">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="firstName"
                  placeholder="Pack Size"
                  required
                />
              </div>
              <div className="col-1 mt-2">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="firstName"
                  placeholder="Qty"
                  required
                />
              </div>
              <div className="col-1 mt-2">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="firstName"
                  placeholder="Price"
                  required
                />
              </div>
              <div className="col-1 mt-2">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="firstName"
                  placeholder="GST"
                  required
                />
              </div>
              <div className="col-10 mt-2">
                <table className="table table-secondary table-bordered border-info">
                  <tbody>
                    <tr>
                      <td style={{ width: "330px" }}>Product Name</td>
                      <td style={{ width: "220px" }}>HSN Code</td>
                      <td style={{ width: "225px" }}>Pack Size</td>
                      <td style={{ width: "110px" }}>Qty</td>
                      <td style={{ width: "110px" }}>Price</td>
                      <td>GST</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary my-3 mx-2">Cancel</button>
        <button className="btn btn-primary my-3 mx-2">Submit</button>
      </div>
    </div>
  );
};
export default NewQuotation;
