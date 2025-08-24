import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { showWarningMessage } from "../../Redux/slices/globalMessageSlice";
import {
  UpdateCompany,
  resetUpdateCompanyState,
} from "../../Redux/slices/companySlice";
import { confirmAction } from "../../Components/WarningMessage";

import CompanyForm from "./CompanyForm";

const EditCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { updateCompanyData, updateCompanyLoading, updateCompanyError } =
    useSelector((state) => state.company.updateCompanyState);

  const companyData = location.state.initialData;
  const [updateCompanyForm, setUpdateCompanyForm] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFieldModified, setIsFieldModified] = useState(false);

  useEffect(() => {
    if (updateCompanyData) {
      toast.success(updateCompanyData.data);
      navigate("/homepage/company_records");
    }

    if (updateCompanyError) {
      toast.error(updateCompanyError.error);
    }
    dispatch(resetUpdateCompanyState());
  }, [updateCompanyData, updateCompanyError, dispatch, navigate]);

  const handleUpdateFormChange = (
    updateCompanyData,
    isFormValid,
    isFieldModified
  ) => {
    // if (isFormValid) {
    //   setIsFormValid(true);
    //   setUpdateCompanyForm(updateCompanyData);
    // } else {
    //   setIsFormValid(false);
    //   setIsFieldModified(false);
    // }
    // if (isFieldModified) {
    //   setIsFieldModified(true);
    // } else {
    //   setIsFieldModified(false);
    // }

    setIsFormValid(isFormValid);
    setIsFieldModified(isFieldModified);

    if (isFormValid) {
      setUpdateCompanyForm(updateCompanyData);
    }
  };

  const handleUpdateCompanyClick = () => {
    const updatedFields = { ...updateCompanyForm };

    updatedFields.tonnage =
      updatedFields.tonnage === "" ? 0.0 : updatedFields.tonnage;
    updatedFields.no_of_furnace =
      updatedFields.no_of_furnace === "" ? 0.0 : updatedFields.no_of_furnace;

    if (
      updatedFields.flux_injector_machine &&
      typeof updatedFields.flux_injector_machine === "object"
    ) {
      const values = Object.values(updatedFields.flux_injector_machine);
      if (values.every((val) => val === "")) {
        updatedFields.flux_injector_machine = [];
      } else if (
        updatedFields.flux_injector_machine["make"] !== "" &&
        updatedFields.flux_injector_machine["quantity"] === ""
      ) {
        updatedFields.flux_injector_machine["quantity"] = 1;
      }
    }
    dispatch(UpdateCompany(updatedFields));
  };

  const handleCancelUpdateClick = () => {
    confirmAction.current = () => {
      navigate("/homepage/company_records");
    };

    if (isFieldModified) {
      dispatch(
        showWarningMessage({
          message: "Are you sure, you want to discard changes ?",
          loadingKey: "",
        })
      );
    } else {
      navigate("/homepage/company_records");
    }
  };

  console.log("Is Form Valid", isFormValid);
  console.log("Is Any Field Changed", isFieldModified);

  return (
    <>
      {/* Render CompanyForm Component*/}
      <CompanyForm
        companyData={companyData}
        onCompanyFormChange={handleUpdateFormChange}
        isEdit={true}
      />

      {/* Buttons */}
      <div className="row mt-4">
        <div className="col text-center">
          <button
            className="btn btn-primary mx-2"
            onClick={handleCancelUpdateClick}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={handleUpdateCompanyClick}
            disabled={updateCompanyLoading || !isFieldModified || !isFormValid}
          >
            {updateCompanyLoading ? (
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
export default EditCompany;
