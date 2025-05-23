import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { LoginData } from "../../Redux/slices/loginSlice";
import {
  emailValidation,
  passwordValidation,
} from "../../Utilities/validations";
import "../../Styles/LoginPage.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginData, loginError, loginLoading } = useSelector(
    (state) => state.login.loginState
  );

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (loginData) {
      toast.success("Logged in Successfully");
      navigate("/homepage");
    }
    if (loginError) {
      toast.error(loginError);
    }
  }, [loginData, loginError, navigate]);

  const handleLoginClick = (event) => {
    event.preventDefault();

    // Stop execution if validation fails
    if (!emailValidation(email, setEmailError)) {
      return;
    }
    if (!passwordValidation(password, setPasswordError)) {
      return;
    }

    let payload = { email, password };
    dispatch(LoginData(payload));
  };

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
            <div className="col-11">
              <label htmlFor="email" className="form-label">
                Email <span className="text-danger">*</span>
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
                autoComplete="off"
              />
              {emailError && (
                <div className="invalid-feedback">{emailError}</div>
              )}
            </div>
            <div className="col-11">
              <label htmlFor="password" className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <div className="col-12 input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${
                    passwordError ? "is-invalid" : ""
                  }`}
                  name="password"
                  id="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                />
                <button
                  className="btn btn-light"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <i className="bi bi-eye-fill"></i>
                  ) : (
                    <i className="bi bi-eye-slash-fill"></i>
                  )}
                </button>
                {passwordError && (
                  <div className="invalid-feedback">{passwordError}</div>
                )}
              </div>
            </div>
            <div className="row ">
              <div className="col-12">
                <Link
                  className="link-primary text-primary"
                  to="/forgotpassword"
                >
                  Forgot password ?
                </Link>
              </div>
            </div>
            <div className="col-4">
              <div className="d-grid">
                <button
                  className="btn bsb-btn-xl btn-primary"
                  type="submit"
                  disabled={loginLoading}
                  onClick={handleLoginClick}
                >
                  {loginLoading ? (
                    <>
                      &nbsp; Logging in{" "}
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </>
                  ) : (
                    "Login"
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
export default LoginForm;
