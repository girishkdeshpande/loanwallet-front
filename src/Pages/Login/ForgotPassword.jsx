import "./LoginPage.css";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  forgotPasswordValues,
  ForgotPasswordData,
  verifyOtp,
} from "../../Redux/slices/loginSlice";

import {
  otpValidation,
  forgotPasswordEmailValidation,
} from "../../Utilities/validations";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const {
    forgotPasswordData,
    forgotPasswordError,
    forgotPasswordLoading,
  } = useSelector((state) => state.login.forgotPasswordState);
  const { verifyOtpData, verifyOtpError, verifyOtpLoading } = useSelector(
    (state) => state.login.verifyOtpState
  );

  useEffect(() => {
    if (forgotPasswordData) {
      toast.success(forgotPasswordData.data.msg);
    }
  }, [forgotPasswordData]);

  useEffect(() => {
    if (forgotPasswordError) {
      toast.error(forgotPasswordError);
    }
  }, [forgotPasswordError]);

  useEffect(() => {
    if (verifyOtpData) {
      toast.success("OTP verified successfully");
      navigate("/resetpassword");
    }
  }, [verifyOtpData, navigate]);

  useEffect(() => {
    if (verifyOtpError) {
      toast.error(verifyOtpError);
    }
  }, [verifyOtpError]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    
    if (!forgotPasswordEmailValidation(email, setEmailError)) {
      return;
    }
    setEmail(email);
    dispatch(ForgotPasswordData({ email: email }));
    setIsSubmitEnabled(true);
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    
    if (!otpValidation(otp, setOtpError)) {
      return;
    }
    setEmail(email);
    setOtp(otp);
    dispatch(forgotPasswordValues({ email, otp }));
    dispatch(verifyOtp({ email: email, OTP: otp }));
  };

  return (
    <div className="col-md-6 forgot-pass">
      <div className="p-2 p-md-3 p-xl-5">
        <div className="row">
          <div className="col-12">
            <div className="mb-3">
              <Link className="link-primary text-primary" to="/loginform">
                Back to Login{" "}
              </Link>
              <h4>Forgot Password</h4>
            </div>
          </div>
        </div>
        <form>
          <div className="row gy-3 gy-md-4 overflow-hidden">
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                For resetting password please enter your registered email to
                receive OTP.
              </label>
              <input
                type="email"
                className={`form-control ${emailError ? "is-invalid" : ""}`}
                name="email"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
              {emailError && (
                <div className="invalid-feedback">{emailError}</div>
              )}
            </div>
            <div className="col-4">
              <div className="d-grid">
                <button
                  className="btn bsb-btn-xl btn-primary"
                  type="submit"
                  onClick={handleSendOtp}
                >
                  {forgotPasswordLoading ? (
                  <>
                      &nbsp; Sending {" "}
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </>) : (
                  "Send OTP" )}
                </button>
              </div>
            </div>
            <div className="col-12">
              <input
                type="otp"
                className={`form-control ${otpError ? "is-invalid" : ""}`}
                name="otp"
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setOtpError("");
                }}
                disabled={!isSubmitEnabled}
              />
              {otpError && <div className="invalid-feedback">{otpError}</div>}
            </div>
            <div className="col-4">
              <div className="d-grid">
                <button
                  className="btn bsb-btn-xl btn-primary"
                  type="submit"
                  disabled={!isSubmitEnabled}
                  onClick={handleSubmitOtp}
                >
                  {verifyOtpLoading ? (
                    <>
                      &nbsp; Verifying {" "}
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </>
                  ) : (
                    "Verify OTP"
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
export default ForgotPassword;
