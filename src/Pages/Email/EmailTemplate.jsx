import { EmailTemplateType } from "../../Utilities/ListConstants";

const EmailTemplate = () => {
  const options = EmailTemplateType;

  return (
    <>
      <div className="col">
        <h5 className="my-2">Send Business Email</h5>

        <div className="row align-items-start mt-4">
          <div className="col-md-2">
            <h6>Select Email Category</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              <div className="col-md-5">
                <div className="form-floating">
                  <select
                    className="form-select form-select-sm rounded-4 border border-1 border-dark"
                    placeholder="Choose"
                    id="emailTemplate"
                  >
                    <option value="">-- Select --</option>
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="emailTemplate">Choose</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-start mt-2">
          <div className="col-md-2">
            <h6>Send To Information</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {[
                { label: "Select Company", name: "company", options: [] },
                {
                  label: "Select Contact Person",
                  name: "contact_person",
                  options: [],
                },
              ].map(({ label, name, options }) => (
                <div className="col-md-6" key={name}>
                  <div className="form-floating">
                    <select
                      type="select"
                      className="form-select form-select-sm rounded-4 border border-1 border-dark"
                      placeholder={label}
                    >
                      <option value="">-- Select --</option>
                      {options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <label>{label}</label>
                  </div>
                </div>
              ))}
              {[
                { label: "Select All Companies", name: "all_companies" },
                {
                  label: "Select All Contact Persons",
                  name: "all_contact_persons",
                },
              ].map(({ label, name }) => (
                <div className="col-md-6" key={name}>
                  <div className="d-flex align-items-center gap-3 ms-2">
                    <input
                      type="checkbox"
                      className="form-check-input border border-1 border-dark"
                    />
                    <label className="form-check-label" htmlFor={label}>
                      {label}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row align-items-start mt-2">
          <div className="col-md-2">
            <h6>Holiday Information</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {[
                { label: "Holiday Reason", name: "holiday", col: 3 },
                { label: "From Date", name: "from_date" },
                { label: "To Date", name: "to_date" },
              ].map(({ label, name, col = 2 }) => (
                <div className={`col-${col}`} key={name}>
                  <div className="form-floating">
                    <input
                      type="select"
                      className="form-control form-control-sm rounded-4 border border-1 border-dark"
                      placeholder={label}
                    />
                    <label>{label}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="row mt-4">
          <div className="col text-center">
            <button className="btn btn-primary mx-2">Preview</button>
            {/* <button className="btn btn-primary mx-2">Send</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTemplate;
