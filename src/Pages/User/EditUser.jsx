import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { showWarningMessage } from "../../Redux/slices/globalMessageSlice";
import { UpdateUser, resetUpdateUserState } from "../../Redux/slices/userSlice";
import { userFormValidation } from "../../Utilities/validations";
import { confirmAction } from "../../Components/WarningMessage";
import UserForm from "./UserForm";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const initialData = location.state.initialData;
  const [updateFormData, setUpdateFormData] = useState({});
  const [updateUserFormErrors, setUpdateUserFormErrors] = useState({});
  const [areFieldsModified, setAreFieldsModified] = useState(false);
  const [modifiedFields, setModifiedFields] = useState({});

  const { updateUserData, updateUserLoading, updateUserError } = useSelector(
    (state) => state.user.updateUserState
  );

  /* Catch response of backend API */
  useEffect(() => {
    if (updateUserData) {
      toast.success(updateUserData.data);
      navigate("/homepage/user_records");
    }

    if (updateUserError) {
      toast.error(updateUserError);
    }
    dispatch(resetUpdateUserState());
  }, [updateUserData, updateUserError, dispatch, navigate]);

  /* Handle form changes  */
  const handleUpdateFormChange = (
    updatedFormData,
    areFieldsModified,
    modifiedFields
  ) => {
    setUpdateFormData(updatedFormData);
    setAreFieldsModified(areFieldsModified);
    setModifiedFields(modifiedFields);
  };

  /* Handle Update button click */
  const handleUpdateClick = () => {
    const { isValid, userFormErrors } = userFormValidation(modifiedFields);
    if (!isValid) {
      setUpdateUserFormErrors(userFormErrors);
      return;
    }

    dispatch(
      UpdateUser({
        updateData: modifiedFields,
        id: updateFormData.id,
      })
    );
  };

  /* Handle Cancel button click */
  const handleCancelClick = () => {
    confirmAction.current = () => {
      navigate("/homepage/user_records");
    };

    if (areFieldsModified) {
      dispatch(
        showWarningMessage({
          message: "Are you sure, you want to discard changes ?",
          loadingKey: "",
        })
      );
    } else {
      navigate("/homepage/user_records");
    }
  };

  return (
    <>
      {/* Render UserForm Component*/}
      <UserForm
        userData={initialData}
        onFormChange={handleUpdateFormChange}
        userFormErrors={updateUserFormErrors}
        setUserFormErrors={setUpdateUserFormErrors}
        isEdit={true}
      />

      {/* Buttons */}
      <div className="row mt-4">
        <div className="col text-center">
          <button className="btn btn-primary mx-2" onClick={handleCancelClick}>
            Cancel
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={handleUpdateClick}
            disabled={updateUserLoading || !areFieldsModified}
          >
            {updateUserLoading ? (
              <>
                &nbsp;"Updating..."
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditUser;
