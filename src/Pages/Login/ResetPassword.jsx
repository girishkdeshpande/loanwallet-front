import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { setForgotPassword } from "../../Redux/slices/loginSlice";
import {
  passwordValidation,
  PasswordMatchValidation,
} from "../../Utilities/validations";
import "../../Styles/LoginPage.css";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setPasswordData, setPasswordLoading, setPasswordError } = useSelector(
    (state) => state.login.setPasswordState
  );
  const { fpValues } = useSelector((state) => state.login.forgotPasswordState);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (setPasswordData) {
      toast.success("Password reset successfully");
      navigate("/loginform");
    }
  }, [setPasswordData, navigate]);

  useEffect(() => {
    if (setPasswordError) {
      toast.error(setPasswordError);
    }
  }, [setPasswordError]);

  const handleReset = (e) => {
    e.preventDefault();
    // Stop execution if validation fails
    if (!passwordValidation(newPassword, setNewPasswordError)) {
      return;
    }
    if (!passwordValidation(confirmPassword, setConfirmPasswordError)) {
      return;
    }
    if (
      !PasswordMatchValidation(
        newPassword,
        confirmPassword,
        setConfirmPasswordError
      )
    ) {
      return;
    }

    let payload = {
      email: fpValues.email,
      OTP: fpValues.otp,
      password: confirmPassword,
    };

    dispatch(setForgotPassword(payload));
  };

  return (
    <div className="col-md-6 login-section">
      <div className="p-2 p-md-4 p-xl-5">
        <div className="row">
          <div className="col-12">
            <div className="mb-3">
              <h4>Set New Password</h4>
            </div>
          </div>
        </div>
        <form action="#!">
          <div className="row gy-3 gy-md-4 overflow-hidden">
            <div className="col-11">
              <label htmlFor="password" className="form-label">
                New Password <span className="text-danger">*</span>
              </label>
              <div className="col-12 input-group">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className={`form-control ${
                    newPasswordError ? "is-invalid" : ""
                  }`}
                  name="password"
                  id="password"
                  placeholder="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setNewPasswordError("");
                  }}
                />
                {newPasswordError && (
                  <div className="invalid-feedback">{newPasswordError}</div>
                )}
                <button
                  className="btn btn-light"
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? (
                    <i className="bi bi-eye-fill"></i>
                  ) : (
                    <i className="bi bi-eye-slash-fill"></i>
                  )}
                </button>
              </div>
            </div>
            <div className="col-11">
              <label htmlFor="pass" className="form-label">
                Confirm Password <span className="text-danger">*</span>
              </label>
              <div className="col-12 input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`form-control ${
                    confirmPasswordError ? "is-invalid" : ""
                  }`}
                  name="pass"
                  id="pass"
                  placeholder="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError("");
                  }}
                />
                {confirmPasswordError && (
                  <div className="invalid-feedback">{confirmPasswordError}</div>
                )}
                <button
                  className="btn btn-light"
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <i class="bi bi-eye-fill"></i>
                  ) : (
                    <i className="bi bi-eye-slash-fill"></i>
                  )}
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="d-grid">
                <button
                  className="btn bsb-btn-xl btn-primary"
                  type="submit"
                  onClick={handleReset}
                >
                  {setPasswordLoading ? (
                    <>
                      &nbsp; Resetting{" "}
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </>
                  ) : (
                    "Reset"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
