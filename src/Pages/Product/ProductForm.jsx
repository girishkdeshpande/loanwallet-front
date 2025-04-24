import avatar from "D:/loanwallet-front/src/Assets/Images/user_avatar.jpg";
import { sortedProductType } from "../../Utilities/ListConstants";

import { useState } from "react";

const ProductForm = () => {
  const [selectedMeltingMetals, setSelectedMeltingMetals] = useState({
    aluminium_alloy: false,
    copper_alloy: false,
    steel_alloy: false,
    zinc_alloy: false,
    iron_alloy: false,
  });

  const handleMeltingMetalsSelection = (name) => {
    setSelectedMeltingMetals((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <>
      <div className="col">
        <h5 className="my-2">Register Product</h5>

        {/* Product Basic Information */}
        <div className="row align-items-start mt-4">
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
                  className="form-control rounded-4 border border-1 border-dark"
                  id="inputGroupFile02"
                />
                <label
                  className="input-group-text rounded-4 mx-2 bg-info border border-1 border-dark"
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
                { label: "Product Name *", name: "product_name" },
                { label: "HSN Code *", name: "hsn_code", col: 2 },
                {
                  label: "Product Group *",
                  name: "product_group",
                  type: "select",
                  options: sortedProductType,
                },
                {
                  label: "Standard Pack Size *",
                  name: "std_pack_size",
                  col: 2,
                },
                {
                  label: "Unit *",
                  name: "unit",
                  col: 1,
                  type: "select",
                  options: ["Box", "Nos", "Kg", "Ltr"],
                },
                { label: "Price *", name: "product_price", col: 1 },
              ].map(({ label, name, type, options, col = 3 }) => (
                <div className={`col-${col}`} key={name}>
                  <div className="form-floating">
                    {type === "select" ? (
                      <select className="form-select form-select-sm rounded-4 border border-1 border-dark">
                        <option value="">-- Select --</option>
                        {options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
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
                    className="form-check-input border border-1 border-dark"
                    id={name}
                    checked={selectedMeltingMetals[name]}
                    onChange={() => handleMeltingMetalsSelection(name)}
                  />
                  <label className="form-check-label" htmlFor={name}>
                    {label}
                  </label>
                </div>
              ))}
              {selectedMeltingMetals.copper_alloy && (
                <div className="row g-1 align-items-center border border-1 border-dark rounded-4 my-2 p-2">
                  <h7>Select Copper Alloys</h7>
                  {[
                    { label: "Brass", name: "brass" },
                    { label: "Commercial Copper", name: "commercial_copper" },
                    {
                      label: "High Conductivity Copper",
                      name: "high_conductivity_copper",
                    },
                    { label: "Bronze & Gun Metal", name: "bronze_gun_metal" },
                    {
                      label: "Aluminium Bronze & Mangneze Bronze",
                      name: "aluminium_mangneze_bronze",
                    },
                    {
                      label: "Nickel Silver Alloys - Casting",
                      name: "nickel_silver_alloys_casting",
                    },
                    {
                      label: "Nickel Silver Alloys - Hot & Cold Work",
                      name: "nickel_silver_alloys_h&c_work",
                    },
                    {
                      label: "Nickel Bronze & Nickel Silver Alloys",
                      name: "nickel_bronze_&_nickel_copper_alloys",
                    },
                  ].map(({ label, name }) => (
                    <div
                      className="col-md-4 d-flex align-items-center gap-3"
                      key={name}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input border border-1 border-dark"
                        id={name}
                      />
                      <label className="form-check-label" htmlFor={name}>
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
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
                    className="form-check-input border border-1 border-dark"
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
                {
                  label: "Casting Manufacturer",
                  name: "casting_manufacturer",
                },
                { label: "Alloy Manufacturer", name: "alloy_manufacturer" },
                { label: "Core Manufacturer", name: "core_manufacturer" },
                {
                  label: "Furnace Manufacturer",
                  name: "furnace_manufacturer",
                },
                {
                  label: "Utensil Manufacturer",
                  name: "utensil_manufacturer",
                },
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
                    className="form-check-input border border-1 border-dark"
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
                    className="form-check-input border border-1 border-dark"
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
                  className="form-control rounded-4 border border-1 border-dark"
                  id="inputGroupFile02"
                />
                <label
                  className="input-group-text rounded-4 mx-2 bg-info border border-1 border-dark"
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
                  className="form-control rounded-4 border border-1 border-dark"
                  id="inputGroupFile02"
                />
                <label
                  className="input-group-text rounded-4 mx-2 bg-info border border-1 border-dark"
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
                      <textarea
                        type="textarea"
                        style={{ height: 100 }}
                        className="form-control form-control-sm rounded-4 border border-1 border-dark"
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
                      <textarea
                        type="text"
                        style={{ height: 100 }}
                        className="form-control form-control-sm rounded-4 border border-1 border-dark"
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
      </div>
    </>
  );
};

export default ProductForm;
