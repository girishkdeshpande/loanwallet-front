import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  RegisterCompany,
  resetRegisterCompanyState,
} from "../../Redux/slices/companySlice";

import { showWarningMessage } from "../../Redux/slices/globalMessageSlice";
import { confirmAction } from "../../Components/WarningMessage";
import CompanyForm from "./CompanyForm";

const NewCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerCompanyForm, setRegisterCompanyForm] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFieldModified, setIsFieldModified] = useState(false);
  const [formKey, setFormKey] = useState(Date.now());

  const { registerCompanyData, registerCompanyLoading, registerCompanyError } =
    useSelector((state) => state.company.registerCompanyState);

  /* Catch response of backend API */
  useEffect(() => {
    if (registerCompanyData) {
      toast.success(registerCompanyData?.data?.message);
      setFormKey(Date.now());
    }

    if (registerCompanyError) {
      toast.error(registerCompanyError);
    }
    dispatch(resetRegisterCompanyState());
  }, [registerCompanyData, registerCompanyError, dispatch]);

  /* Handle form changes received from CompanyForm component */
  const handleRegisterCompanyChange = (
    updatedCompanyData,
    isFormValid,
    isFieldModified
  ) => {
    if (isFormValid) {
      setIsFormValid(true);
      setRegisterCompanyForm(updatedCompanyData);
    } else {
      setIsFormValid(false);
    }
    if (isFieldModified) {
      setIsFieldModified(true);
    } else {
      setIsFieldModified(false);
    }
  };

  /* Handle Register button click */
  const handleRegisterCompanyClick = () => {
    const updatedFields = { ...registerCompanyForm };

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
    dispatch(RegisterCompany(updatedFields));
  };

  const handleCancelCompanyClick = () => {
    confirmAction.current = () => {
      navigate("/homepage");
    };

    if (isFieldModified) {
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
      <CompanyForm
        key={formKey}
        onCompanyFormChange={handleRegisterCompanyChange}
        isEdit={false}
      />

      {/* Buttons */}
      <div className="row mt-4">
        <div className="col text-center">
          <button
            className="btn btn-primary mx-2"
            onClick={handleCancelCompanyClick}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary mx-2"
            disabled={registerCompanyLoading || !isFormValid}
            onClick={handleRegisterCompanyClick}
          >
            {registerCompanyLoading ? (
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
    </>
  );
};
export default NewCompany;
