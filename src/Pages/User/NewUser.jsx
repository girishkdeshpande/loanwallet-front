import avatar from "D:/loanwallet-front/src/Assets/Images/user_avatar.jpg";
import { registerUserValidations } from "../../Utilities/validations";
import {
  RegisterUser,
  resetRegisterUserState,
} from "../../Redux/slices/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";

const NewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerUserData, registerUserLoading, registerUserError } =
    useSelector((state) => state.user.registerUserState);

  const [userForm, setUserForm] = useState({
    first_name: "",
    last_name: "",
    contactNo: "",
    email: "",
    address: "",
    enterPassword: "",
    password: "",
    isAdmin: null,
  });

  const [userFormErrors, setUserFormErrors] = useState({});

  const handleUserFormChange = (event) => {
    const { name, value } = event.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
    setUserFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRadioChange = (event) => {
    setUserForm((prev) => ({
      ...prev,
      isAdmin: event.target.value === "true",
    }));
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();
    console.log("Register Clicked");
    let registerPayload = userForm;
    if (
      !registerUserValidations(
        registerPayload,
        userFormErrors,
        setUserFormErrors
      )
    ) {
      return;
    }
    dispatch(RegisterUser(registerPayload));
  };

  const handleCancelClick = (event) => {
    event.preventDefault();
    window.location.reload();
  };

  useEffect(() => {
    if (registerUserData) {
      toast.success(registerUserData.data, { className: "toast-font" });
      dispatch(resetRegisterUserState());
      setUserForm({
        first_name: "",
        last_name: "",
        contactNo: "",
        email: "",
        address: "",
        enterPassword: "",
        password: "",
        isAdmin: null,
      });
    }

    if (registerUserError) {
      toast.error(registerUserError, { className: "toast-font" });
    }
  }, [registerUserData, registerUserError, dispatch]);

  return (
    <div className="container-fluid">
      <div className="col">
        <h5 className="my-2"> User Registration </h5>
        <hr className="border border-1 border-dark" />

        {/* User Photograph */}
        <div className="row align-items-start">
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
                  className="form-control rounded-4"
                  id="inputGroupFile02"
                />
                <label
                  className="input-group-text rounded-4 mx-2"
                  htmlFor="inputGroupFile02"
                >
                  Upload
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* <hr className="border border-1 border-dark" /> */}

        {/* User Information */}
        <div className="row align-items-start my-4">
          <div className="col-2">
            <h6>User Basic Information</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {[
                { label: "First Name", type: "text", name: "first_name" },
                { label: "Last Name", type: "text", name: "last_name" },
                { label: "Contact Number", type: "text", name: "contactNo" },
                { label: "Email", type: "email", name: "email", col: 3 },
                { label: "Address", type: "text", name: "address", col: 3 },
              ].map(({ label, type, name, col = 2 }) => (
                <div className={`col-${col}`} key={name}>
                  <div className="form-floating">
                    <input
                      type={type}
                      className="form-control rounded-4"
                      placeholder={label}
                      name={name}
                      value={userForm[name]}
                      onChange={handleUserFormChange}
                    />
                    <label>{label}</label>
                    {userFormErrors[name] && (
                      <small className="text-danger">
                        {userFormErrors[name]}
                      </small>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <hr className="border border-1 border-dark" /> */}

        {/* Set Password */}
        <div className="row align-items-start my-4">
          <div className="col-2">
            <h6>Set Default Password</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              {[
                { label: "Enter Password", name: "enterPassword" },
                { label: "Re-Enter Password", name: "password" },
              ].map(({ label, name }) => (
                <div className="col-3" key={name}>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control rounded-4"
                      placeholder={label}
                      name={name}
                      value={userForm[name]}
                      onChange={handleUserFormChange}
                    />
                    <label>{label}</label>
                    {userFormErrors[name] && (
                      <small className="text-danger">
                        {userFormErrors[name]}
                      </small>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <hr className="border border-1 border-dark" /> */}

        {/* User Category (Radio Buttons) */}
        <div className="row align-items-start my-4">
          <div className="col-2">
            <h6>User Category</h6>
          </div>
          <div className="col">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="isAdmin"
                id="admin"
                value="true"
                checked={userForm.isAdmin === true}
                onChange={handleRadioChange}
              />
              <label className="form-check-label" htmlFor="admin">
                Admin
              </label>
            </div>
            <div className="form-check form-check-inline mx-5">
              <input
                className="form-check-input"
                type="radio"
                name="isAdmin"
                id="nonAdmin"
                value="false"
                checked={userForm.isAdmin === false}
                onChange={handleRadioChange}
              />
              <label className="form-check-label" htmlFor="nonAdmin">
                Non-Admin
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* <hr className="border border-1 border-primary" /> */}

      {/* Buttons */}
      <div className="row mt-4">
        <div className="col text-center">
          <button
            className="btn btn-secondary mx-2"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={handleRegisterClick}
          >
            {registerUserLoading ? (
              <>
                &nbsp; Registering{" "}
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              </>
            ) : (
              "Register"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewUser;
