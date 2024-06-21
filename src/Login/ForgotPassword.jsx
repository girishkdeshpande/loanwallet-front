import "./LoginPage.css";
import handleForgotPass from "./LoginPage";
import { useState } from "react";

const ForgotPassword = ({ onBackToLoginClick }) => {

  return (
    <div className="col-md-6 forgot-pass">
      <div className="p-2 p-md-3 p-xl-5">
        <div className="row">
          <div className="col-12">
            <div className="mb-3">
              <a href="#" className="link-primary text-primary" onClick={onBackToLoginClick}>Back to Login </a>
              <h4>Forgot Password</h4>
            </div>
          </div>
        </div>
        <form action="#">
          <div className="row gy-3 gy-md-4 overflow-hidden">
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Before proceeding further, please ensure provided email is
                correct & valid to receive OTP for resetting password.
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="name@example.com"
                value=""
              />
            </div>
            <div className="col-4">
              <div className="d-grid">
                <button
                  className="btn bsb-btn-xl btn-primary"
                  type="submit"
                >
                  Send OTP
                </button>
              </div>
            </div>
            <div className="col-12">
              <input
                type="otp"
                className="form-control"
                name="otp"
                id="otp"
                placeholder="Enter OTP"
                value=""
                required
                disabled
              />
            </div>
            <div className="col-4">
              <div className="d-grid">
                <button
                  className="btn bsb-btn-xl btn-primary"
                  type="submit"
                  disabled
                >
                  Submit
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
