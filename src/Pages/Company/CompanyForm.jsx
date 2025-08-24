import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AllUsers } from "../../Redux/slices/userSlice";
import {
  AllProducts,
  ConsumableProducts,
} from "../../Redux/slices/productSlice";

import { CamelCase } from "../../Utilities/GlobalFunctions";
import CompanyTable from "./CompanyTable";
import {
  furnaceType,
  foundryType,
  meltingMetalsAndAlloys,
  manufacturingMethod,
  copperAlloys,
} from "../../Utilities/ListConstants";
import {
  companyNameAddressFields,
  companyOtherFields,
  contactPersonFields,
  crucibleFurnaceFields,
  otherFurnaceFields,
  transferLaddleFields,
  fluxInjectorFields,
  densityRptFields,
  capexDetailsFields,
  companyRegisteringFields,
  mandatoryFieldsMap,
} from "./CompanyFormFields";
import {
  contactPersonColumns,
  crucibleFurnaceColumns,
  otherFurnaceColumns,
  transferLaddleColumns,
  capexDetailsColumns,
} from "../../Utilities/TableColumns";

const CompanyForm = ({ companyData = {}, onCompanyFormChange, isEdit }) => {
  const dispatch = useDispatch();
  const nameRef = useRef(null);

  const { allUsersData } = useSelector((state) => state.user.allUsersState);

  const [userFullName, setUserFullName] = useState([]);
  const [initialState, setInitialState] = useState({});
  const [companyFormErrors, setCompanyFormErrors] = useState([]);
  const [crucibleSizeList, setCrucibleSizeList] = useState([]);
  const [crucibleStandList, setCrucibleStandList] = useState([]);
  const [roterList, setRoterList] = useState([]);
  const [shaftList, setShaftList] = useState([]);
  const [bottlePlateList, setBottlePlateList] = useState([]);
  const [selectedFurnaceType, setSelectedFurnaceType] = useState({});
  const [areMandatoryFieldsFilled, setAreMandatoryFieldsFilled] =
    useState(false);
  const [isAnyFieldModified, setIsAnyFieldModified] = useState(false);
  const [selectedConsumableProduct, setSelectedConsumableProduct] =
    useState("");
  const [selectedRow, setSelectedRow] = useState({
    groupKey: null,
    index: null,
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
    furnace_details: [],
    transfer_ladle: [],
    flux_injector_machine: { make: "", quantity: "", remark: "" },
    capex_details: [],
  });

  const newObjectsTemplate = {
    new_contact_person: {
      first_name: "",
      last_name: "",
      designation: "",
      email: "",
      contactno: "",
    },
    new_crucible_furnace: {
      type: "Crucible",
      crucible_size: "",
      crucible_size_quantity: "",
      crucible_stand: "",
      crucible_stand_quantity: "",
      function_of_furnace: "",
      charge_media: "",
    },
    new_other_furnace: {
      type: "",
      melting_capacity: "",
      function_of_furnace: "",
      charge_media: "",
    },
    new_transfer_laddle: {
      lining_material: "",
      capacity: "",
      quantity: "",
    },
    new_capex_details: {
      degassing_machine: "",
      make: "",
      quantity: "",
      consumable_product: "",
      product: "",
      remark: "",
    },
  };

  const [initialNewObjects, setInitialNewObjects] =
    useState(newObjectsTemplate);

  function normalizeCompanyData(data, initialData) {
    const keyMapping = {
      contactpersons_set: "contact_person",
      furnacedetail_set: "furnace_details",
      trans_ladle: "transfer_ladle",
      flux_injector_machine: "flux_injector_machine",
      capexdetails_set: "capex_details",
    };

    const normalized = { ...initialData };

    Object.entries(data).forEach(([key, value]) => {
      const mappedKey = keyMapping[key] || key; // use mapped key if found, else keep same

      // special case: flux_injector_machine (backend sends list, we need single object)
      if (mappedKey === "flux_injector_machine" && Array.isArray(value)) {
        normalized[mappedKey] =
          value.length > 0 ? value[0] : initialData.flux_injector_machine;
      } else {
        normalized[mappedKey] = value;
      }
    });

    return normalized;
  }

  useEffect(() => {
    if (isEdit && companyData) {
      const normalizedData = normalizeCompanyData(
        companyData,
        companyBasicData
      );

      if (normalizedData?.furnace_details?.length > 0) {
        const hasCrucible = normalizedData.furnace_details.some(
          (r) => r.type === "Crucible" || "CRUCIBLE"
        );
        const hasOther = normalizedData.furnace_details.some(
          (r) => r.type !== "Crucible" || "CRUCIBLE"
        );

        setSelectedFurnaceType({
          ...selectedFurnaceType,
          Crucible: hasCrucible,
          "Other Furnace": hasOther,
        });
      }

      setCompanyBasicData(normalizedData);
      setInitialState(normalizedData);
    } else if (!isEdit) {
      setInitialState(companyBasicData);
    }
  }, [isEdit]);

  useEffect(() => {
    dispatch(AllUsers());
    dispatch(ConsumableProducts())
      .unwrap()
      .then((data) => {
        setRoterList(data.roter || []);
        setShaftList(data.shaft || []);
        setBottlePlateList(data.bottle_Plate || []);
      });
    dispatch(AllProducts(["Crucible", "Crucible Stand"]))
      .unwrap()
      .then((data) => {
        setCrucibleSizeList(data["Crucible"] || []);
        setCrucibleStandList(data["Crucible Stand"] || []);
      });
  }, [dispatch]);

  useEffect(() => {
    if (allUsersData) {
      const activeUsers = allUsersData.data
        .filter((user) => user.status === true)
        .map((user) => `${user.first_name} ${user.last_name}`);

      const camelCaseNames = activeUsers.map((user) => CamelCase(user));

      setUserFullName(camelCaseNames);
      nameRef.current?.focus();
    }
  }, [allUsersData]);

  useEffect(() => {
    const allFilled = companyRegisteringFields.every(
      (field) => companyBasicData[field]?.trim() !== ""
    );
    setAreMandatoryFieldsFilled(allFilled);

    onCompanyFormChange(
      companyBasicData,
      areMandatoryFieldsFilled,
      isAnyFieldModified
    );
  }, [
    onCompanyFormChange,
    companyBasicData,
    areMandatoryFieldsFilled,
    isAnyFieldModified,
  ]);

  const handleFurnaceTypeSelection = (e, name) => {
    setSelectedFurnaceType((prev) => ({
      ...prev,
      [name]: e.target.checked,
    }));
  };

  const handleCompanyDataChange = (e, group) => {
    const { name, value, checked, type } = e.target;

    // ✅ Clear error for the field being updated
    setCompanyFormErrors((prevErrors) => {
      if (prevErrors?.[group]?.[name]) {
        return {
          ...prevErrors,
          [group]: {
            ...prevErrors[group],
            [name]: "", // remove error text
          },
        };
      }
      return prevErrors; // no change if no error
    });

    if (type === "checkbox" && Array.isArray(companyBasicData[group])) {
      setCompanyBasicData((prev) => {
        const updated = checked
          ? [...prev[group], name]
          : prev[group].filter((item) => item !== name);

        if (group === "alloy_type" && name === "Copper Alloys" && !checked) {
          setIsAnyFieldModified(true);
          return {
            ...prev,
            [group]: updated,
            copper_type: [], // reset dependent group
          };
        }
        // setIsAnyFieldModified(true);
        return {
          ...prev,
          [group]: updated,
        };
      });
      setIsAnyFieldModified(true);
      return; // Exit early, no need to run rest of code
    }

    if (group === "new_capex_details" && name === "consumable_product") {
      setSelectedConsumableProduct(value);
      setInitialNewObjects((prev) => ({
        ...prev,
        new_capex_details: {
          ...prev.new_capex_details,
          product: "",
        },
      }));
      setIsAnyFieldModified(true);
      return;
    }

    if (group.startsWith("new_")) {
      setInitialNewObjects((prev) => ({
        ...prev,
        [group]: {
          ...prev[group],
          [name]: value,
        },
      }));
      setIsAnyFieldModified(true);
    } else if (
      group in companyBasicData &&
      typeof companyBasicData[group] === "object" &&
      !Array.isArray(companyBasicData[group])
    ) {
      setCompanyBasicData((prev) => ({
        ...prev,
        [group]: {
          ...prev[group],
          [name]: value,
        },
      }));
      setIsAnyFieldModified(true);
    } else {
      setCompanyBasicData((prev) => {
        const updated = {
          ...prev,
          [name]: value,
        };
        return updated;
      });
      setIsAnyFieldModified(true);
    }
  };

  const handleAddRow = (section, subSection) => {
    const groupData = initialNewObjects[subSection] || {};
    const mandatoryFields = mandatoryFieldsMap[subSection] || [];

    // Find missing mandatory fields
    const missingFields = mandatoryFields.filter(
      (field) => !groupData[field] || String(groupData[field]).trim() === ""
    );

    if (missingFields.length > 0) {
      // Show errors for missing fields
      setCompanyFormErrors((prev) => ({
        ...prev,
        [subSection]: {
          ...(prev[subSection] || {}),
          ...Object.fromEntries(
            missingFields.map((field) => [field, "Required"])
          ),
        },
      }));
      return; // Stop execution if any mandatory field is missing
    }

    // ✅ Clear errors for this subSection if validation passes
    setCompanyFormErrors((prev) => ({
      ...prev,
      [subSection]: {},
    }));

    setCompanyBasicData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), initialNewObjects[subSection]],
    }));

    setIsAnyFieldModified(true);
    // Reset the separate `new_` object in initialNewObjects
    setInitialNewObjects((prev) => ({
      ...prev,
      [subSection]: newObjectsTemplate[subSection],
    }));
  };

  const getCapexOptions = (name, options) => {
    if (name === "product") {
      const key = selectedConsumableProduct || "";
      if (key === "Rotar") return roterList || [];
      if (key === "Shaft") return shaftList || [];
      if (key === "Bottle Plate") return bottlePlateList || [];
      return [];
    }
    return Array.isArray(options) ? options : [];
  };

  const getFilteredData = (data = [], filterType) => {
    return data
      .map((row, index) => ({ ...row, _originalIndex: index }))
      .filter((row) => {
        if (!filterType) return true; // no filtering

        const type = row.type?.toLowerCase();

        if (filterType === "Crucible") return type === "crucible";
        if (filterType === "Other") return type !== "crucible";
        return true;
      });
  };

  const handleSelectRow = (groupKey, index) => {
    setSelectedRow({ groupKey, index });
  };

  const handleDeleteRow = (groupKey, index) => {
    setIsAnyFieldModified(true);
    setCompanyBasicData((prev) => {
      const updatedGroup = [...prev[groupKey]];

      if (updatedGroup[index]?.id) {
        // Existing record → mark for deletion
        updatedGroup[index] = {
          ...updatedGroup[index],
          delete: true,
        };
      } else {
        // Newly added row → remove from array
        updatedGroup.splice(index, 1);
      }

      return {
        ...prev,
        [groupKey]: updatedGroup,
      };
    });

    // Clear selection if the deleted row is the selected one
    setSelectedRow((prev) =>
      prev.groupKey === groupKey && prev.index === index
        ? { groupKey: null, index: null }
        : prev
    );
  };
  //   console.log("Company Data", companyBasicData);

  return (
    <>
      {/* <div className="col">
        <h5 className="my-2">
          {isEdit ? "Update Company" : "Register Company"}
        </h5> */}
      <div className="row align-items-center my-2">
        <div className="col-md-2">
          <h5>{isEdit ? "Update Company" : "Register Company"}</h5>
        </div>
        {!isEdit && (
          <div className="col-md-8">
            {/* <div className="col-md-8"> */}
            <small className="text-danger">
              Note: Mandatory fields to register a company are - Name, Address,
              Latitude & Longitude.
            </small>
            {/* </div> */}
          </div>
        )}

        {/* Company Basic Information */}
        <div className="row align-items-start mt-4">
          <div className="col-md-2">
            <h6>Basic Information</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {companyNameAddressFields.map(({ label, name }) => (
                <div className="col-md-6" key={name}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-4 border border-1 border-dark"
                      placeholder={label}
                      name={name}
                      value={companyBasicData[name]}
                      ref={name === "name" ? nameRef : null}
                      onChange={(e) =>
                        handleCompanyDataChange(e, "flat_fields")
                      }
                    />
                    <label>{label}</label>
                  </div>
                </div>
              ))}

              {companyOtherFields.map(
                ({ label, name, type, options = userFullName.sort() }) => (
                  <div className="col-md-2" key={name}>
                    <div className="form-floating">
                      {type === "select" ? (
                        <select
                          className="form-select form-select-sm rounded-4 border border-1 border-dark"
                          name={name}
                          value={companyBasicData[name]}
                          onChange={(e) =>
                            handleCompanyDataChange(e, "flat_fields")
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
                          className="form-control form-control-sm rounded-4 border border-1 border-dark"
                          placeholder={label}
                          name={name}
                          value={companyBasicData[name]}
                          onChange={(e) =>
                            handleCompanyDataChange(e, "flat_fields")
                          }
                        />
                      )}
                      <label>{label}</label>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Contact Person Information */}
        <div className="row align-items-start my-3">
          <div className="col-md-2">
            <h6>Contact Person</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {contactPersonFields.map(
                ({ label, name, type, options, col = 2 }) => (
                  <div className={`col-${col}`} key={name}>
                    <div className="form-floating">
                      {type === "select" ? (
                        <select
                          className="form-select form-select-sm rounded-4 border border-1 border-dark"
                          name={name}
                          value={initialNewObjects.new_contact_person[name]}
                          onChange={(e) =>
                            handleCompanyDataChange(e, "new_contact_person")
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
                            companyFormErrors?.new_contact_person?.[name]
                              ? "is-invalid"
                              : ""
                          }`}
                          name={name}
                          value={initialNewObjects.new_contact_person[name]}
                          onChange={(e) =>
                            handleCompanyDataChange(e, "new_contact_person")
                          }
                          placeholder={label}
                        />
                      )}
                      <label>{label}</label>
                      {companyFormErrors?.new_contact_person?.[name] && (
                        <small className="invalid-feedback">
                          {companyFormErrors?.new_contact_person?.[name] || ""}
                        </small>
                      )}
                    </div>
                  </div>
                )
              )}
              <div className="col-md-auto ms-auto">
                <a
                  href="#"
                  className="d-flex align-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddRow("contact_person", "new_contact_person");
                  }}
                >
                  Add
                </a>
              </div>
              {companyBasicData?.contact_person?.length > 0 && (
                <div className="row g-1 align-items-center border border-1 border-dark rounded-4 my-2 p-2">
                  <h6>Contact Person Details</h6>
                  <CompanyTable
                    columns={contactPersonColumns}
                    data={getFilteredData(companyBasicData?.contact_person)}
                    selectedId={
                      selectedRow.groupKey === "contact_person"
                        ? selectedRow.index
                        : null
                    }
                    onSelect={handleSelectRow}
                    onDelete={handleDeleteRow}
                    groupKey="contact_person"
                    page="Register"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Furnace Type */}
        <div className="row align-items-start my-3">
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
                    <a
                      href="#"
                      className="float-end"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddRow("furnace_details", "new_crucible_furnace");
                      }}
                    >
                      Add
                    </a>
                  </h6>
                  {crucibleFurnaceFields.map(
                    ({ label, name, type, options, col = 2 }) => (
                      <div className={`col-${col}`} key={name}>
                        <div className="form-floating">
                          {type === "select" ? (
                            <select
                              className={`form-select form-select-sm rounded-4 border border-1 border-dark ${
                                companyFormErrors?.new_crucible_furnace?.[name]
                                  ? "is-invalid"
                                  : ""
                              }`}
                              name={name}
                              value={
                                initialNewObjects.new_crucible_furnace[name]
                              }
                              onChange={(e) =>
                                handleCompanyDataChange(
                                  e,
                                  "new_crucible_furnace"
                                )
                              }
                            >
                              <option value="">-- Select --</option>
                              {(
                                (name === "crucible_size" &&
                                  crucibleSizeList) ||
                                (name === "crucible_stand" &&
                                  crucibleStandList) ||
                                options
                              ).map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                              {companyFormErrors?.new_crucible_furnace?.[
                                name
                              ] && (
                                <small className="invalid-feedback">
                                  {companyFormErrors?.new_crucible_furnace?.[
                                    name
                                  ] || ""}
                                </small>
                              )}
                            </select>
                          ) : (
                            <input
                              type="text"
                              className={`form-control form-control-sm rounded-4 border border-1 border-dark ${
                                companyFormErrors?.new_crucible_furnace?.[name]
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder={label}
                              name={name}
                              value={
                                initialNewObjects.new_crucible_furnace[name]
                              }
                              onChange={(e) =>
                                handleCompanyDataChange(
                                  e,
                                  "new_crucible_furnace"
                                )
                              }
                            />
                          )}
                          <label>{label}</label>
                          {companyFormErrors?.new_crucible_furnace?.[name] && (
                            <small className="invalid-feedback">
                              {companyFormErrors?.new_crucible_furnace?.[
                                name
                              ] || ""}
                            </small>
                          )}
                        </div>
                      </div>
                    )
                  )}
                  {companyBasicData?.furnace_details?.filter(
                    (r) => r.type?.toLowerCase() === "crucible"
                  ).length > 0 && (
                    <CompanyTable
                      columns={crucibleFurnaceColumns}
                      data={getFilteredData(
                        companyBasicData?.furnace_details,
                        "Crucible"
                      )}
                      selectedId={
                        selectedRow.groupKey === "furnace_details"
                          ? selectedRow.index
                          : null
                      }
                      onSelect={handleSelectRow}
                      onDelete={handleDeleteRow}
                      groupKey="furnace_details"
                      page="Register"
                    />
                  )}
                </div>
              )}

              {selectedFurnaceType["Other Furnace"] && (
                <div className="row g-1 align-items-center border border-1 border-dark rounded-4 p-2 my-2 ">
                  <h6>
                    Other Furnace Information
                    <a
                      href="#"
                      className="float-end"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddRow("furnace_details", "new_other_furnace");
                      }}
                    >
                      Add
                    </a>
                  </h6>
                  {otherFurnaceFields.map(
                    ({ label, name, type, options, col = 2 }) => (
                      <div className={`col-${col}`} key={name}>
                        <div className="form-floating">
                          {type === "select" ? (
                            <select
                              className={`form-select form-select-sm rounded-4 border border-1 border-dark ${
                                companyFormErrors?.new_other_furnace?.[name]
                                  ? "is-invalid"
                                  : ""
                              }`}
                              name={name}
                              value={initialNewObjects.new_other_furnace[name]}
                              onChange={(e) =>
                                handleCompanyDataChange(e, "new_other_furnace")
                              }
                            >
                              <option value="">-- Select --</option>
                              {options.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                              {companyFormErrors?.new_other_furnace?.[name] && (
                                <small className="invalid-feedback">
                                  {companyFormErrors?.new_other_furnace[name] ||
                                    ""}
                                </small>
                              )}
                            </select>
                          ) : (
                            <input
                              type="text"
                              className="form-control form-control-sm rounded-4 border border-1 border-dark"
                              name={name}
                              placeholder={label}
                              value={initialNewObjects.new_other_furnace[name]}
                              onChange={(e) =>
                                handleCompanyDataChange(e, "new_other_furnace")
                              }
                            />
                          )}
                          <label>{label}</label>
                        </div>
                      </div>
                    )
                  )}
                  {companyBasicData?.furnace_details?.filter(
                    (r) => r.type.toLowerCase() !== "crucible"
                  ).length > 0 && (
                    <CompanyTable
                      columns={otherFurnaceColumns}
                      data={getFilteredData(
                        companyBasicData?.furnace_details,
                        "Other"
                      )}
                      selectedId={
                        selectedRow.groupKey === "furnace_details"
                          ? selectedRow.index
                          : null
                      }
                      onSelect={handleSelectRow}
                      onDelete={handleDeleteRow}
                      groupKey="furnace_details"
                      page="Register"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Foundry Type */}
        <div className="row align-items-start my-3">
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
                      name={item}
                      checked={companyBasicData?.type_of_foundry?.includes(
                        item
                      )}
                      onChange={(e) =>
                        handleCompanyDataChange(e, "type_of_foundry")
                      }
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
        <div className="row align-items-start my-3">
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
                    name={item}
                    checked={companyBasicData?.alloy_type?.includes(item)}
                    onChange={(e) => handleCompanyDataChange(e, "alloy_type")}
                  />
                  <label className="form-check-label" htmlFor={item}>
                    {item}
                  </label>
                </div>
              ))}
              {companyBasicData?.alloy_type?.includes("Copper Alloys") && (
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
                        checked={companyBasicData?.copper_type?.includes(item)}
                        onChange={(e) =>
                          handleCompanyDataChange(e, "copper_type")
                        }
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
        <div className="row align-items-start my-3">
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
                    checked={companyBasicData?.manufacturing_method?.includes(
                      item
                    )}
                    onChange={(e) =>
                      handleCompanyDataChange(e, "manufacturing_method")
                    }
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
        <div className="row align-items-start my-3">
          <div className="col-md-2">
            <h6>Transfer Laddle</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {transferLaddleFields.map(({ label, name, col = 2 }) => (
                <div className={`col-${col}`} key={name}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control form-control-sm rounded-4 border border-1 border-dark ${
                        companyFormErrors?.new_transfer_laddle?.[name]
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder={label}
                      name={name}
                      value={initialNewObjects.new_transfer_laddle[name]}
                      onChange={(e) =>
                        handleCompanyDataChange(e, "new_transfer_laddle")
                      }
                    />
                    <label>{label}</label>
                    {companyFormErrors?.new_transfer_laddle?.[name] && (
                      <small className="invalid-feedback">
                        {companyFormErrors?.new_transfer_laddle?.[name] || ""}
                      </small>
                    )}
                  </div>
                </div>
              ))}
              <div className="col-md-auto ms-auto">
                <a
                  href="#"
                  className="col-md-1 d-flex align-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddRow("transfer_ladle", "new_transfer_laddle");
                  }}
                >
                  Add
                </a>
              </div>
              {companyBasicData?.transfer_ladle?.length > 0 && (
                <div className="row g-1 align-items-center border border-1 border-dark rounded-4 my-2 p-2">
                  <h6>Transfer Laddle Details</h6>
                  <CompanyTable
                    columns={transferLaddleColumns}
                    data={getFilteredData(companyBasicData?.transfer_ladle)}
                    selectedId={
                      selectedRow.groupKey === "transfer_ladle"
                        ? selectedRow.index
                        : null
                    }
                    onSelect={handleSelectRow}
                    onDelete={handleDeleteRow}
                    groupKey="transfer_ladle"
                    page="Register"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Flux Injector Machine */}
        <div className="row align-items-start my-3">
          <div className="col-md-2">
            <h6>Flux Injector Machine</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {fluxInjectorFields.map(({ label, name, col = 3 }) => (
                <div className={`col-${col}`} key={name}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-4 border border-1 border-dark"
                      placeholder={label}
                      name={name}
                      value={companyBasicData?.flux_injector_machine[name]}
                      onChange={(e) =>
                        handleCompanyDataChange(e, "flux_injector_machine")
                      }
                    />
                    <label>{label}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Capex Details */}
        <div className="row align-items-start my-3">
          <div className="col-md-2">
            <h6>Capex Details</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {densityRptFields.map(({ label, name }) => (
                <div className="col-md-2" key={name}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-4 border border-1 border-dark"
                      placeholder={label}
                      name={name}
                      value={companyBasicData[name]}
                      onChange={(e) =>
                        handleCompanyDataChange(e, "flat_fields")
                      }
                    />
                    <label>{label}</label>
                  </div>
                </div>
              ))}
              <div className="col-md-8"></div>
              {capexDetailsFields.map(
                ({ label, name, type, options, col = 2 }) => {
                  let capexOptions = getCapexOptions(name, options);

                  return (
                    <div className={`col-${col}`} key={name}>
                      <div className="form-floating">
                        {type === "select" ? (
                          <select
                            className="form-select form-select-sm rounded-4 border border-1 border-dark"
                            name={name}
                            value={initialNewObjects.new_capex_details[name]}
                            onChange={(e) => {
                              handleCompanyDataChange(e, "new_capex_details");
                            }}
                          >
                            <option value="">-- Select --</option>
                            {capexOptions.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            className={`form-control form-control-sm rounded-4 border border-1 border-dark ${
                              companyFormErrors?.new_capex_details?.[name]
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder={label}
                            name={name}
                            value={initialNewObjects.new_capex_details[name]}
                            onChange={(e) =>
                              handleCompanyDataChange(e, "new_capex_details")
                            }
                          />
                        )}
                        <label>{label}</label>
                        {companyFormErrors?.new_capex_details?.[name] && (
                          <small className="invalid-feedback">
                            {companyFormErrors?.new_capex_details?.[name] || ""}
                          </small>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
              <div className="col-md-auto ms-auto">
                <a
                  href="#"
                  className="col-md-1 d-flex align-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddRow("capex_details", "new_capex_details");
                  }}
                >
                  Add
                </a>
              </div>
              {companyBasicData.capex_details.length > 0 && (
                <div className="row g-1 align-items-center border border-1 border-dark rounded-4 my-2 p-2">
                  <h6>Capex Details</h6>
                  <CompanyTable
                    columns={capexDetailsColumns}
                    data={getFilteredData(companyBasicData.capex_details)}
                    selectedId={
                      selectedRow.groupKey === "capex_details"
                        ? selectedRow.index
                        : null
                    }
                    onSelect={handleSelectRow}
                    onDelete={handleDeleteRow}
                    groupKey="capex_details"
                    page="Register"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Other Information */}
        <div className="row align-items-start my-3">
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
                        name={name}
                        value={companyBasicData[name]}
                        onChange={(e) =>
                          handleCompanyDataChange(e, "flat_fields")
                        }
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

export default CompanyForm;
