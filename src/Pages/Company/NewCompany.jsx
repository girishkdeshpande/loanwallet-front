const NewCompany = () => {
  return (
    <div className="container-fluid">
      <div className="col">
        <h5 className="my-2">Company Registration</h5>
        <hr className="border border-1 border-dark" />

        {/* Company Basic Information */}
        <div className="row align-items-start">
          <div className="col-md-2">
            <h6>Basic Information</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {[
                { label: "Company Name*", name: "company_name" },
                { label: "Company Address*", name: "company_address" },
              ].map(({ label, name }) => (
                <div className="col-md-6" key={name}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-4"
                      placeholder={label}
                    />
                    <label>{label}</label>
                  </div>
                </div>
              ))}
              {[
                { label: "GST Number", name: "gst_number" },
                { label: "Latitude", name: "latitude" },
                { label: "Longitude", name: "longitude" },
                { label: "Number of Furnace", name: "number_of_furnace" },
                { label: "Monthly Tonnage", name: "monthly_tonnage" },
                { label: "Client Executive", name: "client_executive" },
              ].map(({ label, name }) => (
                <div className="col-md-2" key={name}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-4"
                      placeholder={label}
                    />
                    <label>{label}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Person Information */}
        <div className="row align-items-start my-4">
          <div className="col-md-2">
            <h6>Contact Person</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {[
                { label: "First Name", name: "first_name" },
                { label: "Last Name", name: "Last_name" },
                { label: "Designation", name: "designation" },
                { label: "Email", name: "email", col: 3 },
                { label: "Contact Number", name: "contact_number" },
              ].map(({ label, name, col = 2 }) => (
                <div className={`col-${col}`} key={name}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-4"
                      placeholder={label}
                    />
                    <label>{label}</label>
                  </div>
                </div>
              ))}
              <div className="col-md-1 d-flex align-items-center">
                <button className="btn btn-info">Add</button>
              </div>
            </div>
          </div>
        </div>

        {/* Furnace Type */}
        <div className="row align-items-start my-4">
          <div className="col-md-2">
            <h6>Furnace Type</h6>
          </div>
          <div className="col">
            <div className="row g-1 align-items-center">
              {[
                { label: "Crucible", name: "crucible" },
                { label: "Other Furnace", name: "other_furnace" },
              ].map(({ label, name }) => (
                <div
                  className="col-md-2 d-flex align-items-center gap-3"
                  key={name}
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={name}
                  />
                  <label className="form-check-label" htmlFor={name}>
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Foundry Type */}
        <div className="row align-items-start my-4">
          <div className="col-md-2">
            <h6>Foundry Type</h6>
          </div>
          <div className="col">
            <div className="row g-1 align-items-center">
              {[
                { label: "Iron Foundry", name: "iron" },
                { label: "Steel Foundry", name: "steel" },
                { label: "Non-Ferrous Foundry", name: "non_ferrous", col: 3 },
              ].map(({ label, name, col = 2 }) => (
                <div
                  className={`col-${col} d-flex align-items-center gap-3`}
                  key={name}
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={name}
                  />
                  <label className="form-check-label" htmlFor={name}>
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Melting Metals & Alloys */}
        <div className="row align-items-start my-4">
          <div className="col-md-2">
            <h6>Melting Metals & Alloys</h6>
          </div>
          <div className="col">
            <div className="row g-1 align-items-center">
              {[
                { label: "Aluminium Alloys", name: "aluminium_alloy" },
                { label: "Copper Alloys", name: "copper_alloy" },
                { label: "Steel Alloys", name: "steel_alloy" },
                { label: "Zinc Alloys", name: "zinc_alloy" },
                { label: "Iron Alloys", name: "iron_alloy" },
              ].map(({ label, name }) => (
                <div
                  className="col-md-2 d-flex align-items-center gap-3"
                  key={name}
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={name}
                  />
                  <label className="form-check-label" htmlFor={name}>
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Manufacturing Method */}
        <div className="row align-items-start my-4">
          <div className="col-md-2">
            <h6>Manufacturing Method</h6>
          </div>
          <div className="col">
            <div className="row g-1 align-items-center">
              {[
                { label: "GDC", name: "gdc" },
                { label: "LPDC", name: "lpdc" },
                { label: "HPDC", name: "hpdc" },
                { label: "Centrifugal", name: "centrifugal" },
                { label: "Sand Moulding", name: "sand_moulding" },
                { label: "Shell Moulding", name: "shell_moulding" },
                { label: "Investment Casting", name: "investment_casting" },
                { label: "Plaster Casting", name: "plaster_casting" },
                { label: "Vaccum Casting", name: "vaccum_casting" },
                { label: "Continuous Casting", name: "continuous_casting" },
                { label: "Lost Foam", name: "lost_foam" },
                { label: "Utensil", name: "utensil" },
                { label: "Alloy Manufacturing", name: "alloy_manufacturing" },
              ].map(({ label, name }) => (
                <div
                  className="col-md-2 d-flex align-items-center gap-3"
                  key={name}
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={name}
                  />
                  <label className="form-check-label" htmlFor={name}>
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transfer Laddle */}
        <div className="row align-items-start my-4">
          <div className="col-md-2">
            <h6>Transfer Laddle</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {[
                { label: "Lining Material", name: "lining_material", col: 3 },
                { label: "Capacity in KG", name: "capacity" },
                { label: "Quantity", name: "quantity" },
              ].map(({ label, name, col = 2 }) => (
                <div className={`col-${col}`} key={name}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-4"
                      placeholder={label}
                    />
                    <label>{label}</label>
                  </div>
                </div>
              ))}
              <div className="col-md-1 d-flex align-items-center">
                <button className="btn btn-info">Add</button>
              </div>
            </div>
          </div>
        </div>

        {/* Flux Injector Machine */}
        <div className="row align-items-start my-4">
          <div className="col-md-2">
            <h6>Flux Injector Machine</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {[
                { label: "Make", name: "lining_material" },
                { label: "Quantity", name: "quantity", col: 2 },
                { label: "Remark", name: "remark" },
              ].map(({ label, name, col = 3 }) => (
                <div className={`col-${col}`} key={name}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-4"
                      placeholder={label}
                    />
                    <label>{label}</label>
                  </div>
                </div>
              ))}
              <div className="col-md-1 d-flex align-items-center">
                <button className="btn btn-info">Add</button>
              </div>
            </div>
          </div>
        </div>

        {/* Capex Details */}
        <div className="row align-items-start my-4">
          <div className="col-md-2">
            <h6>Capex Details</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {[
                { label: "Density", name: "density" },
                { label: "RPT", name: "rpt" },
              ].map(({ label, name }) => (
                <div className="col-md-2" key={name}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-4"
                      placeholder={label}
                    />
                    <label>{label}</label>
                  </div>
                </div>
              ))}
              <div className="col-md-8"></div>
              {[
                { label: "Degassing Machine", name: "degassing_machine" },
                { label: "Make", name: "make" },
                { label: "Quantity", name: "qty", col: 1 },
                { label: "Consumable Products", name: "consumable_products" },
                { label: "Product List", name: "product_list" },
                { label: "Remark", name: "capex_remark" },
              ].map(({ label, name, col = 2 }) => (
                <div className={`col-${col}`} key={name}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-4"
                      placeholder={label}
                    />
                    <label>{label}</label>
                  </div>
                </div>
              ))}
              <div className="col-md-1 d-flex align-items-center">
                <button className="btn btn-info">Add</button>
              </div>
            </div>
          </div>
        </div>

        {/* Other Information */}
        <div className="row align-items-start my-2">
          <div className="col-md-2">
            <h6>Other Information</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {[{ label: "Other Information", name: "other_info" }].map(
                ({ label, name }) => (
                  <div className="col-md-12" key={name}>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control form-control-sm rounded-4"
                        placeholder={label}
                      />
                      <label>{label}</label>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="row mt-4">
          <div className="col text-center">
            <button
              className="btn btn-secondary mx-2"
              //   onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary mx-2"
              //   onClick={handleRegisterClick}
            >
              {/* {registerUserLoading ? (
                <>
                  &nbsp; Registering{" "}
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                </>
              ) : ( */}
              Register
              {/* )} */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCompany;
