import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  RegisterUser,
  resetRegisterUserState,
} from "../../Redux/slices/userSlice";
import { showWarningMessage } from "../../Redux/slices/globalMessageSlice";

import { userFormValidation } from "../../Utilities/validations";
import { confirmAction } from "../../Components/WarningMessage";

import UserForm from "./UserForm";

const NewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerFormData, setRegisterFormData] = useState({
    first_name: "",
    last_name: "",
    contactNo: "",
    email: "",
    address: "",
    enterPassword: "",
    password: "",
    isAdmin: false,
  });
  const [registerUserFormErrors, setRegisterUserFormErrors] = useState({});
  const [areFieldsModified, setAreFieldsModified] = useState(false);
  const [formKey, setFormKey] = useState(Date.now());

  const { registerUserData, registerUserLoading, registerUserError } =
    useSelector((state) => state.user.registerUserState);

  /* Catch response of backend API */
  useEffect(() => {
    if (registerUserData) {
      toast.success(registerUserData?.data);
      setFormKey(Date.now());
    }

    if (registerUserError) {
      toast.error(registerUserError);
    }
    dispatch(resetRegisterUserState());
  }, [registerUserData, registerUserError, dispatch, navigate]);

  /* Handle form changes received from UserForm component */
  const handleRegisterFormChange = (updatedFormData, areFieldsModified) => {
    setRegisterFormData(updatedFormData);
    setAreFieldsModified(areFieldsModified);
  };

  /* Handle Register button click */
  const handleRegisterClick = () => {
    const { isValid, userFormErrors } = userFormValidation(registerFormData);
    if (!isValid) {
      setRegisterUserFormErrors(userFormErrors);
      return;
    }
    dispatch(RegisterUser(registerFormData));
  };

  /* Handle Cancel button click */
  const handleCancelClick = () => {
    confirmAction.current = () => {
      navigate("/homepage");
    };

    if (areFieldsModified) {
      dispatch(
        showWarningMessage({
          message: "Are you sure, you want to discard changes ?",
          loadingKey: "",
        })
      );
    } else {
      navigate("/homepage");
    }
  };

  return (
    <>
      {/* Render UserForm component */}
      <UserForm
        key={formKey}
        onFormChange={handleRegisterFormChange}
        userFormErrors={registerUserFormErrors}
        setUserFormErrors={setRegisterUserFormErrors}
        isEdit={false}
      />

      {/* Buttons */}
      <div className="row mt-4">
        <div className="col text-center">
          <button className="btn btn-primary mx-2" onClick={handleCancelClick}>
            Cancel
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={handleRegisterClick}
            disabled={registerUserLoading || !areFieldsModified}
          >
            {registerUserLoading ? (
              <>
                &nbsp;"Registering..."
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
    </>
  );
};
export default NewUser;
