import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AllUsers } from "../../Redux/slices/userSlice";

import { CamelCase } from "../../Utilities/GlobalFunctions";
import {
  sortedDesignation,
  degassingMachine,
  furnaceType,
  furnaceFunction,
  sortedFurnaceChargeMedia,
  sortedOtherFurnaceType,
  foundryType,
  meltingMetalsAndAlloys,
  manufacturingMethod,
  copperAlloys,
  consumableProductsType,
} from "../../Utilities/ListConstants";

const CompanyForm = ({ companyData = {}, onCompanyFormChange, isEdit }) => {
  const dispatch = useDispatch();

  const { allUsersData } = useSelector((state) => state.user.allUsersState);

  const [userFullName, setUserFullName] = useState([]);
  const [showContactPersonRow, setShowContactPersonRow] = useState(false);
  const [newContactPerson, setNewContactPerson] = useState({
    first_name: "",
    last_name: "",
    designation: "",
    email: "",
    contact_number: "",
  });
  const [contactPersonErrors, setContactPersonErrors] = useState({});
  const [selectedFurnaceType, setSelectedFurnaceType] = useState({});
  const [selectedMeltingMetals, setSelectedMeltingMetals] = useState({
    aluminium_alloys: false,
    copper_alloys: false,
    steel_alloys: false,
    zinc_alloys: false,
    iron_alloys: false,
  });

  const [companyBasicData, setCompanyBasicData] = useState({
    name: "",
    address: "",
    gst_in: "",
    latitude: "",
    longitude: "",
    no_of_furnace: "",
    tonnage: "",
    customer_representative: "",
    density: "",
    rpt: "",
    other_info: "",
    type_of_foundry: [],
    alloy_type: [],
    copper_type: [],
    manufacturing_method: [],
    contact_person: [],
    furnace_type: {
      Crucible: false,
      "Other Furnace": false,
      crucibleDetails: [
        {
          crucible_size: "",
          crucible_size_quantity: "",
          crucible_stand: "",
          crucible_stand_quantity: "",
          furnace_function: "",
          furnace_charge_media: "",
        },
      ],
      otherFurnaceDetails: [
        {
          furnace_type: "",
          melting_capacity: "",
          furnace_function: "",
          charge_media: "",
        },
      ],
    },
    transfer_ladle: [
      {
        lining_material: "",
        capacity: "",
        quantity: "",
      },
    ],
    flux_injector_machine: [
      {
        make: "",
        quantity: "",
        remark: "",
      },
    ],
    capex_details: [
      {
        degassing_machine: "",
        make: "",
        quantity: "",
        consumable_product: "",
        product: "",
        remark: "",
      },
    ],
  });

  useEffect(() => {
    dispatch(AllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (allUsersData) {
      const activeUsers = allUsersData.data
        .filter((user) => user.status === true)
        .map((user) => `${user.first_name} ${user.last_name}`);

      const camelCaseNames = activeUsers.map((user) => CamelCase(user));

      setUserFullName(camelCaseNames);
    }
  }, [allUsersData]);

  const handleContactPersonAdd = () => {
    const newPerson = Object.fromEntries(
      Object.entries(newContactPerson).map(([k, v]) => [k, v.trim()])
    );

    const errors = {};
    if (!newPerson.first_name) errors.first_name = "First name is required.";
    if (!newPerson.last_name) errors.last_name = "Last name is required.";
    if (!newPerson.email) errors.email = "Email is required.";

    if (Object.keys(errors).length > 0) {
      setContactPersonErrors(errors);
      return;
    }

    // setContactPersonErrors({});

    // const hasData = Object.values(newPerson).some((val) => val !== "");
    // if (!hasData) return; // Don't add if all fields are blank

    setCompanyBasicData((prev) => ({
      ...prev,
      contact_person: [...prev.contact_person, newPerson],
    }));

    setShowContactPersonRow(true);
    setNewContactPerson({
      first_name: "",
      last_name: "",
      designation: "",
      email: "",
      contact_number: "",
    });
  };

  const updateNewContactField = (field, value) => {
    setNewContactPerson((prev) => ({ ...prev, [field]: value }));
    setContactPersonErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const updateField = (path, value) => {
    setCompanyBasicData((prev) => {
      const newData = { ...prev };
      const keys = path.split(".");
      let target = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in target)) target[keys[i]] = {};
        target = target[keys[i]];
      }
      target[keys[keys.length - 1]] = value;
      console.log("Updated Company Data:", newData);
      return newData;
    });
  };

  const handleFurnaceTypeSelection = (e, name) => {
    setSelectedFurnaceType((prev) => ({
      ...prev,
      [name]: e.target.checked,
    }));
  };

  const handleMeltingMetalsSelection = (name) => {
    setSelectedMeltingMetals((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <>
      <div className="col">
        <h5 className="my-2">Register Company</h5>

        {/* Company Basic Information */}
        <div className="row align-items-start mt-4">
          <div className="col-md-2">
            <h6>Basic Information</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {[
                { label: "Company Name *", name: "name" },
                { label: "Company Address *", name: "address" },
              ].map(({ label, name }) => (
                <div className="col-md-6" key={name}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-4 border border-1 border-dark"
                      placeholder={label}
                      name={name}
                      value={companyBasicData[name]}
                      onChange={(e) => updateField(name, e.target.value)}
                    />
                    <label>{label}</label>
                  </div>
                </div>
              ))}
              {[
                { label: "GST Number", name: "gst_in" },
                { label: "Latitude *", name: "latitude" },
                { label: "Longitude *", name: "longitude" },
                { label: "Number of Furnace", name: "number_of_furnace" },
                { label: "Monthly Tonnage", name: "tonnage" },
                {
                  label: "Client Executive",
                  name: "customer_representative",
                  type: "select",
                  options: userFullName.sort(),
                },
              ].map(({ label, name, type, options }) => (
                <div className="col-md-2" key={name}>
                  <div className="form-floating">
                    {type === "select" ? (
                      <select
                        className="form-select form-select-sm rounded-4 border border-1 border-dark"
                        name={name}
                        value={companyBasicData[name]}
                        onChange={(e) => updateField(name, e.target.value)}
                      >
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
                        name={name}
                        value={companyBasicData[name]}
                        onChange={(e) => updateField(name, e.target.value)}
                      />
                    )}
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
                { label: "First Name *", name: "first_name" },
                { label: "Last Name *", name: "last_name" },
                {
                  label: "Designation",
                  name: "designation",
                  type: "select",
                  options: sortedDesignation,
                },
                { label: "Email *", name: "email", col: 3 },
                { label: "Contact Number", name: "contact_number" },
              ].map(({ label, name, type, options, col = 2 }) => (
                <div className={`col-${col}`} key={name}>
                  <div className="form-floating">
                    {type === "select" ? (
                      <select
                        className="form-select form-select-sm rounded-4 border border-1 border-dark"
                        value={newContactPerson[name]}
                        onChange={(e) =>
                          updateNewContactField(name, e.target.value)
                        }
                      >
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
                        className={`form-control form-control-sm rounded-4 border border-1 border-dark ${
                          contactPersonErrors[name] ? "is-invalid" : ""
                        }`}
                        value={newContactPerson[name]}
                        onChange={(e) =>
                          updateNewContactField(name, e.target.value)
                        }
                        placeholder={label}
                      />
                    )}
                    <label>{label}</label>
                    {contactPersonErrors[name] && (
                      <small className="invalid-feedback">
                        {contactPersonErrors[name] || ""}
                      </small>
                    )}
                  </div>
                </div>
              ))}
              <div className="col-md-auto ms-auto">
                <a
                  href="#"
                  className="d-flex align-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    handleContactPersonAdd();
                  }}
                >
                  Add
                </a>
              </div>
              {showContactPersonRow &&
                companyBasicData.contact_person.length > 0 && (
                  <div className="row g-1 align-items-center border border-1 border-dark rounded-4 my-2 p-2">
                    <h6>Contact Person Details</h6>
                    <table className="table table-striped">
                      <thead className="table-dark">
                        <tr>
                          <th className="text-start">
                            <i className="bi bi-record-circle"></i>
                          </th>
                          <th className="text-start">First Name</th>
                          <th className="text-start">Last Name</th>
                          <th className="text-start">Designation</th>
                          <th className="text-start">Email</th>
                          <th className="text-start">Contact Number</th>
                          <th className="text-start">
                            <i className="bi bi-trash"></i>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {companyBasicData.contact_person.map(
                          (person, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  type="radio"
                                  name="selectContact"
                                ></input>
                              </td>
                              <td>{person.first_name}</td>
                              <td>{person.last_name}</td>
                              <td>{person.designation}</td>
                              <td>{person.email}</td>
                              <td>{person.contact_number}</td>
                              <td>
                                <i className="bi bi-trash"></i>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
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
              {furnaceType.map((item) => (
                <div
                  className="col-md-2 d-flex align-items-center gap-3"
                  key={item}
                >
                  <input
                    type="checkbox"
                    className="form-check-input border border-1 border-dark"
                    id={item}
                    checked={selectedFurnaceType[item] || false}
                    onChange={(e) => handleFurnaceTypeSelection(e, item)}
                  />
                  <label className="form-check-label" htmlFor={item}>
                    {item}
                  </label>
                </div>
              ))}
              {selectedFurnaceType["Crucible"] && (
                <div className="row g-1 align-items-center border border-1 border-dark rounded-4 my-2 p-2">
                  <h6>
                    Crucible Furnace Information
                    <a className="float-end">Add</a>
                  </h6>
                  {[
                    {
                      label: "Crucible Size",
                      name: "crucible_size",
                      type: "select",
                      options: ["1701031 DYCOTE 11 M (LIQ)"],
                      col: 3,
                    },
                    { label: "Quantity", name: "crucible_size_qty", col: 1 },
                    {
                      label: "Crucible Stand",
                      name: "crucible_stand",
                      type: "select",
                      options: ["IC07976 STAND 360D x 229H CO"],
                      col: 3,
                    },
                    { label: "Quantity", name: "crucible_stand_qty", col: 1 },
                    {
                      label: "Function of Furnace",
                      name: "furnace_function",
                      type: "select",
                      options: furnaceFunction,
                    },
                    {
                      label: "Furnace Charge Media",
                      name: "furnace_charge_media",
                      type: "select",
                      options: sortedFurnaceChargeMedia,
                    },
                  ].map(({ label, name, type, options, col = 2 }) => (
                    <div className={`col-${col}`} key={name}>
                      <div className="form-floating">
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
                    </div>
                  ))}
                </div>
              )}
              {selectedFurnaceType["Other Furnace"] && (
                <div className="row g-1 align-items-center border border-1 border-dark rounded-4 my-2 p-2">
                  <h6>
                    Other Furnace Information<a className="float-end">Add</a>
                  </h6>
                  {[
                    {
                      label: "Furnace Type",
                      name: "furnace_type",
                      type: "select",
                      options: sortedOtherFurnaceType,
                    },
                    { label: "Melting Capacity", name: "melting_capacity" },
                    {
                      label: "Function of Furnace",
                      name: "furnace_function",
                      type: "select",
                      options: furnaceFunction,
                    },
                    {
                      label: "Charge Media",
                      name: "charge_media",
                      type: "select",
                      options: sortedFurnaceChargeMedia,
                    },
                  ].map(({ label, name, type, options, col = 2 }) => (
                    <div className={`col-${col}`} key={name}>
                      <div className="form-floating">
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
                    </div>
                  ))}
                </div>
              )}
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
              {foundryType.map((item, index) => {
                let colWidth = index === 2 ? 3 : 2;
                return (
                  <div
                    className={`col-${colWidth} d-flex align-items-center gap-3`}
                    key={item}
                  >
                    <input
                      type="checkbox"
                      className="form-check-input border border-1 border-dark"
                      id={item}
                    />
                    <label className="form-check-label" htmlFor={item}>
                      {item}
                    </label>
                  </div>
                );
              })}
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
              {meltingMetalsAndAlloys.map((item) => (
                <div
                  className="col-md-2 d-flex align-items-center gap-3"
                  key={item}
                >
                  <input
                    type="checkbox"
                    className="form-check-input border border-1 border-dark"
                    id={item}
                    checked={selectedMeltingMetals[item]}
                    onChange={() => handleMeltingMetalsSelection(item)}
                  />
                  <label className="form-check-label" htmlFor={item}>
                    {item}
                  </label>
                </div>
              ))}
              {selectedMeltingMetals.copper_alloys && (
                <div className="row g-1 align-items-center border border-1 border-dark rounded-4 my-2 p-2">
                  <h6>Select Copper Alloys</h6>
                  {copperAlloys.map((item) => (
                    <div
                      className="col-md-4 d-flex align-items-center gap-3"
                      key={item}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input border border-1 border-dark"
                        id={item}
                      />
                      <label className="form-check-label" htmlFor={item}>
                        {item}
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
              {manufacturingMethod.map((item) => (
                <div
                  className="col-md-2 d-flex align-items-center gap-3"
                  key={item}
                >
                  <input
                    type="checkbox"
                    className="form-check-input border border-1 border-dark"
                    id={item}
                  />
                  <label className="form-check-label" htmlFor={item}>
                    {item}
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
                { label: "Lining Material *", name: "lining_material", col: 3 },
                { label: "Capacity in KG *", name: "capacity" },
                { label: "Quantity *", name: "quantity", col: 1 },
              ].map(({ label, name, col = 2 }) => (
                <div className={`col-${col}`} key={name}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-4 border border-1 border-dark"
                      placeholder={label}
                    />
                    <label>{label}</label>
                  </div>
                </div>
              ))}
              <div className="col-md-auto ms-auto">
                <a className="col-md-1 d-flex align-items-center">Add</a>
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
                { label: "Quantity", name: "quantity", col: 1 },
                { label: "Remark", name: "remark" },
              ].map(({ label, name, col = 3 }) => (
                <div className={`col-${col}`} key={name}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-4 border border-1 border-dark"
                      placeholder={label}
                    />
                    <label>{label}</label>
                  </div>
                </div>
              ))}
              <div className="col-md-auto ms-auto">
                <a className="col-md-1 d-flex align-items-center">Add</a>
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
                      className="form-control form-control-sm rounded-4 border border-1 border-dark"
                      placeholder={label}
                    />
                    <label>{label}</label>
                  </div>
                </div>
              ))}
              <div className="col-md-8"></div>
              {[
                {
                  label: "Degassing Machine",
                  name: "degassing_machine",
                  type: "select",
                  options: degassingMachine,
                },
                { label: "Make *", name: "make" },
                { label: "Quantity *", name: "qty", col: 1 },
                {
                  label: "Consumable Products",
                  name: "consumable_products",
                  type: "select",
                  options: consumableProductsType,
                },
                {
                  label: "Product List",
                  name: "product_list",
                  type: "select",
                  options: [],
                },
                { label: "Remark", name: "capex_remark" },
              ].map(({ label, name, type, options, col = 2 }) => (
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
              <div className="col-md-auto ms-auto">
                <a className="col-md-1 d-flex align-items-center">Add</a>
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

        {/* Buttons */}
        <div className="row mt-4">
          <div className="col text-center">
            <button
              className="btn btn-primary mx-2"
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
    </>
  );
};

export default CompanyForm;
