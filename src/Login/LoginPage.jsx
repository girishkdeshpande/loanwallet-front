import Logo from "D:/loanwallet-front/src/Image/v-square_02.png";
import "./LoginPage.css";
import ForgotPassword from "./ForgotPassword.jsx";
import LoginForm from "./LoginForm.jsx";
import { useState } from "react";

const LoginPage = () => {

  const [isForgotPassVisible, setIsForgotPassVisible] = useState(false);

    const handleForgotPasswordClick = (event) => {
        event.preventDefault();
        setIsForgotPassVisible(true);
    };

    const handleBackToLoginClick = (event) => {
        event.preventDefault();
        setIsForgotPassVisible(false);
    };  

  return (
    <section className="p-5 section">
      <div className="container m-5">
        <div className="row">
          <div className="col-6">
            <div className="d-flex flex-column h-100 p-5">
              <img
                className="img-fluid rounded"
                loading="lazy"
                src={Logo}
                width="500"
                height="50"
                alt="V-Square Logo"
              />
            </div>
          </div>
          {isForgotPassVisible ? (
                <ForgotPassword onBackToLoginClick={handleBackToLoginClick}/>
            ) : (
                <LoginForm onForgotPasswordClick={handleForgotPasswordClick} />
            )}
        </div>
      </div>
    </section>
  );
};
export default LoginPage;
