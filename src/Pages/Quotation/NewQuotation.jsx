const NewQuotation1 = () => {
  const SendTo = () => {
    return (
      <>
        <label className="col-12 bg-info border border-1 border-secondary rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
          Send To
        </label>
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
        <input
          className="form-control my-2"
          type="text"
          id="exampleDataList"
          placeholder="Subject"
          defaultValue="Quotation for below Products/Unit"
        />
      </>
    );
  };

  const AddProducts = () => {
    return (
      <>
        <label className="col-12 bg-info border border-1 border-secondary rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
          Add Products
        </label>
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
        <table className="table table-secondary table-bordered mt-1">
          <tbody>
            <tr>
              <td style={{ width: "250px" }}>04-08-2024</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };

  const TermsAndConditions = () => {
    return (
      <>
        <label className="col-12 bg-info border border-1 border-secondary rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
          Terms & Conditions
        </label>
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
        <input
          className="form-control mt-2"
          type="text"
          id="exampleDataList"
          placeholder="Validity"
          defaultValue="These are current prices"
          disabled
        />
      </>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mb-2 mx-2">
          <label className="bg-info border border-1 border-secondary rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100">
            New Quotation
          </label>
        </div>

        <div className="col-2">
          <div className="container rounded border border-1 border-secondary ms-2">
            <label
              className="my-1 rounded col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100"
              href="#"
            >
              Send To
            </label>
            <label
              className="my-1 rounded col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100"
              href="#"
            >
              Add Products
            </label>
            <label
              className="my-1 rounded col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100"
              href="#"
            >
              Terms & Conditions
            </label>
          </div>
        </div>

        <div className="col-3">
          <div className="container border border-1 border-secondary h-100 rounded ms-2">
            <label className="col-12 bg-info border border-1 border-secondary rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
              Send To
            </label>
            <input
              className="form-control mt-2"
              list="datalistOptions"
              id="exampleDataList"
              placeholder="Select Company"
            />
            <datalist id="datalistOptions">
              <option value="Company 1" />
              <option value="Company 2" />
            </datalist>
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
            <input
              className="form-control my-2"
              type="text"
              id="exampleDataList"
              placeholder="Subject"
              defaultValue="Quotation for below Products/Unit"
            />
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary my-3 mx-2">Reset</button>
              <button className="btn btn-primary my-3 mx-2">Preview</button>
            </div>
          </div>
        </div>
        
        <div className="col-7">
          <div className="container border border-1 border-secondary h-100 rounded ms-2"></div>
        </div>
      </div>
    </div>
  );
};

export default NewQuotation1;
