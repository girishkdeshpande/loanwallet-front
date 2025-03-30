import avatar from "D:/loanwallet-front/src/Assets/Images/user_avatar.jpg";

const NewProduct = () => {
  return (
    <div className="container-fluid">
      <div className="col">
        <h5 className="my-2">Product Registration</h5>
        <hr className="border border-1 border-dark" />

        <div className="row align-items-start">
          <div className="col-2">
            <h6>Product Image</h6>
          </div>
          <div className="col d-flex">
            <div className="d-flex flex-column">
              <img
                src={avatar}
                className="img-fluid rounded border border-dark user-img"
                alt="User"
              />
            </div>
            <div className="d-flex align-items-end ms-3">
              <div className="input-group" style={{ width: 350 }}>
                <input
                  type="file"
                  className="form-control rounded-4"
                  id="inputGroupFile02"
                />
                <label
                  className="input-group-text rounded-4 mx-2 bg-info"
                  htmlFor="inputGroupFile02"
                >
                  Upload
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Product Basic Information */}
        <div className="row align-items-start my-4">
          <div className="col-md-2">
            <h6>Product Basic Information</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {[
                { label: "Product Name*", name: "product_name" },
                { label: "HSN Code*", name: "hsn_code", col: 2 },
                { label: "Product Group", name: "product_group" },
                {
                  label: "Standard Pack Size*",
                  name: "std_pack_size",
                  col: 2,
                },
                { label: "Unit*", name: "unit", col: 1 },
                { label: "Price*", name: "product_price", col: 1 },
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

        {/* Select Customer Type */}
        <div className="row align-items-start my-4">
          <div className="col-md-2">
            <h6>Customer Type</h6>
          </div>
          <div className="col">
            <div className="row g-1 align-items-center">
              {[
                { label: "Casting Manufacturer", name: "casting_manufacturer" },
                { label: "Alloy Manufacturer", name: "alloy_manufacturer" },
                { label: "Core Manufacturer", name: "core_manufacturer" },
                { label: "Furnace Manufacturer", name: "furnace_manufacturer" },
                { label: "Utensil Manufacturer", name: "utensil_manufacturer" },
                {
                  label: "Rolling & Extrusion Factory",
                  name: "r&e_factory",
                },
              ].map(({ label, name }) => (
                <div
                  className="col-md-3 d-flex align-items-center gap-3"
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

        {/* Capex Details */}
        <div className="row align-items-start my-4">
          <div className="col-md-2">
            <h6>Capex</h6>
          </div>
          <div className="col">
            <div className="row g-1 align-items-center">
              {[
                { label: "Yes", name: "yes", value: "yes" },
                { label: "No", name: "no", value: "no" },
              ].map(({ label, name, value }) => (
                <div
                  className="col-md-2 d-flex align-items-center gap-3"
                  key={value}
                >
                  <input
                    type="radio"
                    className="form-check-input"
                    id={value}
                    name={name}
                    value={value}
                  />
                  <label className="form-check-label" htmlFor={value}>
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PDS File */}
        <div className="row align-items-start my-4">
          <div className="col-md-2">
            <h6>PDS File</h6>
          </div>
          <div className="col">
            <div className="row g-3 align-items-center">
              <div className="input-group" style={{ width: 350 }}>
                <input
                  type="file"
                  className="form-control rounded-4"
                  id="inputGroupFile02"
                />
                <label
                  className="input-group-text rounded-4 mx-2 bg-info"
                  htmlFor="inputGroupFile02"
                >
                  Upload
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* MSDS File */}
        <div className="row align-items-start my-4">
          <div className="col-md-2">
            <h6>MSDS File</h6>
          </div>
          <div className="col">
            <div className="row g-3 align-items-center">
              <div className="input-group" style={{ width: 350 }}>
                <input
                  type="file"
                  className="form-control rounded-4"
                  id="inputGroupFile02"
                />
                <label
                  className="input-group-text rounded-4 mx-2 bg-info"
                  htmlFor="inputGroupFile02"
                >
                  Upload
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="row align-items-start my-4">
          <div className="col-md-2">
            <h6>Summary</h6>
          </div>
          <div className="col">
            <div className="row g-3">
              {[{ label: "Summary", name: "summary" }].map(
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

        {/* Terms & Conditions */}
        <div className="row align-items-start my-4">
          <div className="col-md-2">
            <h6>Terms & Conditions</h6>
          </div>
          <div className="col">
            <div className="row g-3">
              {[{ label: "Terms & Conditions", name: "t&c" }].map(
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
        <div className="row my-4">
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
export default NewProduct;
