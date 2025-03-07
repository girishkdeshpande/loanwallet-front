import "./LoginPage.css";
import Logo from "D:/loanwallet-front/src/Assets/Images/v-square_02.png";

import { Outlet } from "react-router-dom";

const LoginPage = () => {

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
          <Outlet />
        </div>
      </div>
    </section>
  );
};
export default LoginPage;
