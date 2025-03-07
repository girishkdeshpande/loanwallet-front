const EmailTemplate = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mb-2 mx-2">
          <label className="col-12 bg-info border border-1 border-secondary rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100">
            Email Templates
          </label>
        </div>

        <div className="col-3">
          <div className="container rounded border border-1 border-secondary ms-2">
            <label className="my-1 bg-info rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100">
              General
            </label>
            <label
              className="my-1 rounded col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100"
              href="#"
            >
              Company Introduction
            </label>
            <label
              className="my-1 rounded col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100"
              href="#"
            >
              Festive Holidays
            </label>
            <label
              className="my-1 rounded col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100"
              href="#"
            >
              Weekly Consumable Schedule
            </label>

            <label className="my-1 bg-info rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100">
              Payment
            </label>
            <label
              className="my-1 rounded col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100"
              href="#"
            >
              First Reminder
            </label>
            <label
              className="my-1 rounded col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100"
              href="#"
            >
              Second Reminder
            </label>
            <label
              className="my-1 rounded col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100"
              href="#"
            >
              Third Reminder
            </label>

            <div className="d-flex justify-content-center">
              <button className="btn btn-primary my-3">Close</button>
            </div>
            
          </div>
        </div>

        <div className="col-4">
          <div className="container border border-1 border-secondary h-100 rounded ms-2">
            <div className="d-flex align-items-center">
              <input
                className="form-control my-3"
                list="searchList"
                id="searchOpt"
                placeholder="Select Company"
              />
              <datalist id="searchList">
                <option value="Address" />
                <option value="Company Name" />
              </datalist>
              <div className="form-check my-3 mx-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  All
                </label>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <input
                className="form-control my-3"
                list="searchList"
                id="searchOpt"
                placeholder="Select Company"
              />
              <datalist id="searchList">
                <option value="Address" />
                <option value="Company Name" />
              </datalist>
              <div className="form-check my-3 mx-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  All
                </label>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button className="btn btn-primary my-3 mx-2">Reset</button>
              <button className="btn btn-primary my-3 mx-2">Preview</button>
              <button className="btn btn-primary my-3 mx-2">Send</button>
            </div>
          </div>
        </div>

        <div className="col-5">
          <div className="container border border-1 border-secondary h-100 rounded ms-2"></div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;
