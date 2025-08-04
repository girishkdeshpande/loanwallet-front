import { type } from "@testing-library/user-event/dist/type";

const NewQuotation = () => {
  return (
    <>
      <div className="col">
        <h5 className="my-2">Fresh Quotation</h5>
      </div>

      <div className="row">
        <div className="col-md-6">
          {/* Send To Information */}
          <div className="row align-items-start my-4">
            <div className="col-md-3">
              <h6>Send To Information</h6>
            </div>
            <div className="col">
              <div className="d-flex flex-column gap-2">
                {[
                  {
                    label: "To Company",
                    name: "to_company",
                    type: "select",
                  },
                  {
                    label: "Contact Person",
                    name: "contact_person",
                    type: "select",
                  },
                  {
                    label: "CC To Email",
                    name: "cc_to",
                    // type: "select",
                  },
                  {
                    label: "Subject",
                    name: "subject",
                  },
                ].map(({ label, name, type }) => (
                  <div className="row g-2 align-items-center" key={name}>
                    <div className="col-10 form-floating">
                      {type === "select" ? (
                        <select className="form-select form-select-sm rounded-4 border border-1 border-dark">
                          <option value="">-- Select --</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          className="form-control form-control-sm rounded-4 border border-1 border-dark"
                          placeholder={label}
                          defaultValue={
                            label === "Subject"
                              ? "Quotation for below Products/Unit"
                              : ""
                          }
                        />
                      )}
                      <label>{label}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Select Products */}
          <div className="row align-items-start my-4">
            <div className="col-md-3">
              <h6>Select Products</h6>
            </div>
            <div className="col">
              <div className="d-flex flex-column">
                {[
                  {
                    label: "Product Name *",
                    name: "product_name",
                    type: "select",
                  },
                ].map(({ label, name, type }) => (
                  <div className="d-flex align-items-center gap-5" key={name}>
                    <div className="col-10 form-floating flex-grow-1">
                      {type === "select" ? (
                        <select className="form-select form-select-sm rounded-4 border border-1 border-dark">
                          <option value="">-- Select --</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          className="form-control form-control-sm rounded-4 border border-1 border-dark"
                          placeholder={label}
                        />
                      )}
                      <label>{label}</label>
                    </div>
                    <div className="col-2">
                      <a href="#" className="d-flex align-items-start">
                        Add
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="row align-items-start my-4">
            <div className="col-md-3">
              <h6>Terms & Conditions</h6>
            </div>
            <div className="col-md">
              <div className="d-flex flex-column gap-2">
                {[
                  {
                    label: "Price",
                    name: "t&c_price",
                    type: "select",
                    options: ["Ex. Works Pune Godown", "Other"],
                  },
                  {
                    label: "Delivery Period",
                    name: "delivery_period",
                    type: "select",
                    options: ["7-8 days after PO confirmation", "Lead Time"],
                  },
                  {
                    label: "Freight",
                    name: "freight",
                    type: "select",
                    options: ["Amount", "Buyer Side/To Pay Basis", "Nil"],
                  },
                  {
                    label: "Payment",
                    name: "payment",
                    type: "select",
                    options: [
                      "Advance Payment",
                      "Against Delivery",
                      "Against Proforma Invoice",
                      "Credit",
                    ],
                  },
                ].map(({ label, name, type, options }) => (
                  <div className="d-flex align-items-center gap-1" key={name}>
                    <div className="col-10 form-floating flex-grow-1">
                      {type === "select" ? (
                        <select className="form-select form-select-sm rounded-4 border border-1 border-dark">
                          <option value="">-- Select --</option>
                          {options.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}{" "}
                        </select>
                      ) : (
                        <input
                          type="text"
                          className="form-control form-control-sm rounded-4 border border-1 border-dark"
                          placeholder={label}
                        />
                      )}
                      <label>{label}</label>
                    </div>
                    {["freight", "payment"].includes(name) ? (
                      <div className="col-2 form-floating">
                        <input
                          type="text"
                          className="form-control form-control-sm rounded-4 border border-1 border-dark"
                          placeholder="Condition"
                          disabled
                        />
                        <label>{name === "freight" ? "Rupees" : "Days"}</label>
                      </div>
                    ) : (
                      <div className="col-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section (Blank for Now) */}
        <div className="col-md-6">
          <div className="row align-items-start my-4">
            <div className="col-md-3">
              <h6>Right Section</h6>
            </div>
            <div className="col">Right Section Content</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewQuotation;
