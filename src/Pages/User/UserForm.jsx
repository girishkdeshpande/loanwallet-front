import { useEffect, useState, useRef } from "react";

import avatar from "D:/loanwallet-front/src/Assets/Images/user_avatar.jpg";
import {
  userFormFields,
  userPasswordFields,
  userCategoryFields,
} from "./UserFormFields";

const UserForm = ({
  userData = {},
  onFormChange,
  userFormErrors,
  setUserFormErrors,
  isEdit,
}) => {
  const [userFormData, setUserFormData] = useState({
    first_name: "",
    last_name: "",
    contactNo: "",
    email: "",
    address: "",
    enterPassword: "",
    password: "",
    isAdmin: false,
  });
  const [initialState, setInitialState] = useState({});
  const isInitialized = useRef(false);

  /* Set Initial state & form values depending upon isEdit */
  useEffect(() => {
    if (!isInitialized.current) {
      if (isEdit && userData) {
        setUserFormData(userData);
        setInitialState(userData);
      } else if (!isEdit) {
        setInitialState(userFormData);
      }
    }
    isInitialized.current = true;
  }, [isEdit, userData, userFormData]);

  /* Handle form change & notify changes to parent component */
  const handleUserFormChange = (event) => {
    const { name, value, type } = event.target;
    const updatedValue =
      type === "radio" && name === "isAdmin" ? value === "true" : value;

    const updatedFormData = {
      ...userFormData,
      [name]: updatedValue,
    };
    setUserFormData(updatedFormData);
    setUserFormErrors((prev) => ({ ...prev, [name]: "" }));

    // Notify parent component about the change status
    if (onFormChange && initialState) {
      const modifiedFields = {};

      // Compare & fetch changed fields only
      Object.keys(initialState).forEach((key) => {
        if (
          Object.prototype.hasOwnProperty.call(updatedFormData, key) &&
          updatedFormData[key] !== initialState[key]
        ) {
          modifiedFields[key] = updatedFormData[key];
        }
      });

      const isModified = Object.keys(modifiedFields).length > 0;

      onFormChange(updatedFormData, isModified, modifiedFields);
    }
  };

  return (
    <>
      <div className="col">
        <h5 className="my-2">{isEdit ? "Update User" : "Register User"}</h5>

        {/* User Photograph */}
        <div className="row align-items-start mt-4">
          <div className="col-2">
            <h6>User Photograph</h6>
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
                  className="input-group-text rounded-4 bg-info mx-2 border border-1 border-dark"
                  htmlFor="inputGroupFile02"
                >
                  Upload
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="row align-items-start my-4">
          <div className="col-2">
            <h6>User Basic Information</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {userFormFields.map(({ label, type, name, col = 2 }) => (
                <div className={`col-${col}`} key={name}>
                  <div className="form-floating">
                    <input
                      type={type}
                      className={`form-control rounded-4 border border-1 border-dark ${
                        userFormErrors[name] ? "is-invalid" : ""
                      }`}
                      placeholder={label}
                      name={name}
                      value={userFormData[name] || ""}
                      onChange={handleUserFormChange}
                      disabled={isEdit && name === "email"}
                      autoComplete="off"
                    />
                    <label>{label}</label>
                    {userFormErrors[name] && (
                      <small className="invalid-feedback">
                        {userFormErrors[name] || ""}
                      </small>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Set Password for Register User only*/}
        {!isEdit && (
          <div className="row align-items-start my-4">
            <div className="col-2">
              <h6>Set Default Password</h6>
            </div>
            <div className="col">
              <div className="row g-1">
                {userPasswordFields.map(({ label, name }) => (
                  <div className="col-3" key={name}>
                    <div className="form-floating">
                      <input
                        type="password"
                        className={`form-control rounded-4 border border-1 border-dark ${
                          userFormErrors[name] ? "is-invalid" : ""
                        }`}
                        placeholder={label}
                        name={name}
                        value={userFormData[name] || ""}
                        onChange={handleUserFormChange}
                        autoComplete="off"
                      />
                      <label>{label}</label>
                      {userFormErrors[name] && (
                        <small className="invalid-feedback">
                          {userFormErrors[name] || ""}
                        </small>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* User Category (Radio Buttons) */}
        <div className="row align-items-start my-4">
          <div className="col-2">
            <h6>User Category</h6>
          </div>
          <div className="col">
            <div className="row g-1 align-items-center">
              {userCategoryFields.map(({ id, label, value }) => (
                <div
                  key={id}
                  className="col-md-2 d-flex align-items-center gap-3"
                >
                  <input
                    className="form-check-input border border-1 border-dark"
                    type="radio"
                    name="isAdmin"
                    id={id}
                    value={value}
                    checked={userFormData?.isAdmin === value}
                    onChange={handleUserFormChange}
                  />
                  <label className="form-check-label" htmlFor={id}>
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserForm;
