import { useState } from "react";
import "./LoginPage.css";
import ForgotPassword from "./ForgotPassword";

const LoginForm = ({ onForgotPasswordClick }) => {
  
  return (
    <div className="col-md-6 login-section">
      <div className="p-2 p-md-4 p-xl-5">
        <div className="row">
          <div className="col-12">
            <div className="mb-3">
              <h4>Sign in</h4>
            </div>
          </div>
        </div>
        <form action="#!">
          <div className="row gy-3 gy-md-4 overflow-hidden">
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="col-12">
              <label htmlFor="password" className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="password"
                value=""
                required
              />
            </div>
            <div className="row ">
              <div className="col-12">
                  <a
                    href="#"
                    className="link-primary text-primary"
                    onClick={onForgotPasswordClick}
                  >
                    Forgot password
                  </a>
              </div>
            </div>
            <div className="col-4">
              <div className="d-grid">
                <button className="btn bsb-btn-xl btn-primary" type="submit">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginForm;
