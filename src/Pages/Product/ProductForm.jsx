import { useState, useEffect, useRef } from "react";

import avatar from "D:/loanwallet-front/src/Assets/Images/user_avatar.jpg";
import {
  copperAlloys,
  meltingMetalsAndAlloys,
  manufacturingMethod,
  customerType,
} from "../../Utilities/ListConstants";

import {
  productBasicInfoFields,
  crucibleProductTypeFields,
  capexRadioFields,
} from "./ProductFormFields";

const ProductForm = ({ productData = {}, onProductFormChange, isEdit }) => {
  const nameRef = useRef(null);

  const [productBasicData, setProductBasicData] = useState({
    name: "",
    HSNcode: "",
    price: "",
    standard_pack_size_unit: "",
    std_size: "",
    product_type: "",
    bottom_diameter: "",
    top_diameter: "",
    water_capacity: "",
    weight: "",
    height: "",
    aluminium_capacity: "",
    alloy_type: [],
    copper_type: [],
    type_of_foundry: [],
    customer_type: [],
    summary: "",
    terms_conditions: "",
    capex: false,
  });

  const [initialState, setInitialState] = useState({});
  const [productFormErrors, setProductFormErrors] = useState({});
  let [hasErrors, setHasErrors] = useState(false);
  let [isModified, setIsModified] = useState(false);
  const isInitialized = useRef(false);

  /* Set Initial state & form values depending upon isEdit */
  useEffect(() => {
    if (!isInitialized.current) {
      if (isEdit && productData) {
        setProductBasicData(productData);
        setInitialState(productData);
      } else if (!isEdit) {
        setInitialState(productBasicData);
      }
      nameRef.current?.focus();
    }
    isInitialized.current = true;
  }, [isEdit, productData, productBasicData]);

  /* Check Errors */
  useEffect(() => {
    setHasErrors(Object.values(productFormErrors).some((err) => err?.trim()));
  }, [productFormErrors]);

  /* Notify Parent about change */
  useEffect(() => {
    onProductFormChange(productBasicData, isModified, hasErrors);
  }, [onProductFormChange, productBasicData, isModified, hasErrors]);

  const handleOnBlur = (event) => {
    const { name, value, dataset } = event.target;
    const label = (dataset.label || name.replace(/_/g, " "))
      .replace(/\*/g, "")
      .trim();

    let error = "";

    // Simple required field validation (you can expand this per field)
    if (!value.trim()) {
      error = `${label.replace(/_/g, " ")} is required.`;
    }

    setProductFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleProductFormChange = (event) => {
    const { name, value, type, checked, dataset } = event.target;

    let updatedProductData = { ...productBasicData };
    let updatedErrors = { ...productFormErrors };

    // Clear the error for the current field if it had one
    if (updatedErrors[name]) {
      const { [name]: removed, ...rest } = updatedErrors;
      updatedErrors = rest;
    }

    // Handle checkbox and radio button changes
    if (type === "checkbox" && dataset.name) {
      const group = dataset.name;
      const prevGroup = productBasicData[group] || [];

      const updatedGroup = checked
        ? [...prevGroup, name]
        : prevGroup.filter((item) => item !== name);

      updatedProductData[group] = updatedGroup;
    } else if (type === "radio") {
      const updatedValue = name === "capex" ? value === "true" : value;
      updatedProductData[name] = updatedValue;
    } else {
      updatedProductData[name] = value;
    }
    setProductBasicData(updatedProductData);
    setProductFormErrors(updatedErrors);

    // Notify parent component about the change status
    if (onProductFormChange && initialState) {
      const modifiedFields = {};

      // Compare & fetch changed fields only
      Object.keys(initialState).forEach((key) => {
        const initialVal = initialState[key];
        const currentVal = updatedProductData[key];

        const isArray = Array.isArray(initialVal) && Array.isArray(currentVal);
        const isFieldModified = isArray
          ? initialVal.sort().join(",") !== currentVal.sort().join(",")
          : currentVal !== initialVal;

        if (isFieldModified) {
          modifiedFields[key] = currentVal;
          isModified = true;
        }
      });
      setIsModified(isModified);
    }
  };

  return (
    <>
      <div className="col">
        <h5 className="my-2">
          {isEdit ? "Update Product" : "Register Product"}
        </h5>

        {/* Product Image */}
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
              {productBasicInfoFields.map(
                ({ label, name, type, options, col = 3 }) => (
                  <div className={`col-${col}`} key={name}>
                    <div className="form-floating">
                      {type === "select" ? (
                        <select
                          className={`form-select form-select-sm rounded-4 border border-1 border-dark ${
                            name === "standard_pack_size_unit" &&
                            productFormErrors[name]
                              ? "is-invalid"
                              : ""
                          }`}
                          name={name}
                          value={productBasicData[name] || ""}
                          onChange={handleProductFormChange}
                          onBlur={handleOnBlur}
                          data-label={
                            name === "standard_pack_size_unit" ? label : ""
                          }
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
                          className={`form-control form-control-sm rounded-4 border border-1 border-dark ${
                            productFormErrors[name] ? "is-invalid" : ""
                          }`}
                          placeholder={label}
                          name={name}
                          ref={name === "name" ? nameRef : null}
                          value={productBasicData[name] || ""}
                          onChange={handleProductFormChange}
                          onBlur={handleOnBlur}
                          data-label={label}
                          autoComplete="off"
                        />
                      )}
                      <label>{label}</label>
                      {productFormErrors[name] && (
                        <small className="invalid-feedback">
                          {productFormErrors[name] || ""}
                        </small>
                      )}
                    </div>
                  </div>
                )
              )}
              {productBasicData.product_type === "Crucible" && (
                <div className="row g-1">
                  {crucibleProductTypeFields.map(({ label, name }) => (
                    <div className="col-md-2" key={name}>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control form-control-sm rounded-4 border border-1 border-dark"
                          placeholder={label}
                          name={name}
                          value={productBasicData[name] || ""}
                          onChange={handleProductFormChange}
                          autoComplete="off"
                        />
                        <label>{label}</label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                    data-name="alloy_type"
                    id={item}
                    name={item}
                    checked={(productBasicData.alloy_type || []).includes(item)}
                    onChange={handleProductFormChange}
                  />
                  <label className="form-check-label" htmlFor={item}>
                    {item}
                  </label>
                </div>
              ))}
              {(productBasicData.alloy_type || []).includes(
                "Copper Alloys"
              ) && (
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
                        name={item}
                        data-name="copper_type"
                        checked={(productBasicData.copper_type || []).includes(
                          item
                        )}
                        onChange={handleProductFormChange}
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
                    name={item}
                    data-name="type_of_foundry"
                    checked={(productBasicData.type_of_foundry || []).includes(
                      item
                    )}
                    onChange={handleProductFormChange}
                  />
                  <label className="form-check-label" htmlFor={item}>
                    {item}
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
              {customerType.map((item) => (
                <div
                  className="col-md-3 d-flex align-items-center gap-3"
                  key={item}
                >
                  <input
                    type="checkbox"
                    className="form-check-input border border-1 border-dark"
                    id={item}
                    name={item}
                    data-name="customer_type"
                    checked={(productBasicData.customer_type || []).includes(
                      item
                    )}
                    onChange={handleProductFormChange}
                  />
                  <label className="form-check-label" htmlFor={item}>
                    {item}
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
              {capexRadioFields.map(({ id, label, value }) => (
                <div
                  className="col-md-2 d-flex align-items-center gap-3"
                  key={id}
                >
                  <input
                    type="radio"
                    className="form-check-input border border-1 border-dark"
                    id={id}
                    name="capex"
                    value={value}
                    checked={productBasicData.capex === value}
                    onChange={handleProductFormChange}
                  />
                  <label className="form-check-label" htmlFor={label}>
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
                        value={productBasicData[name] || ""}
                        name={name}
                        onChange={handleProductFormChange}
                        autoComplete="off"
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
              {[{ label: "Terms & Conditions", name: "terms_conditions" }].map(
                ({ label, name }) => (
                  <div className="col-md-12" key={name}>
                    <div className="form-floating">
                      <textarea
                        type="text"
                        style={{ height: 100 }}
                        className="form-control form-control-sm rounded-4 border border-1 border-dark"
                        placeholder={label}
                        value={productBasicData[name] || ""}
                        name={name}
                        onChange={handleProductFormChange}
                        autoComplete="off"
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
