import "./NewUser.css";
import avatar from "D:/loanwallet-front/src/Image/user_avatar.jpg";

const NewUser = ({ handleMenuClick }) => {
  return (
    <div className="container-fluid w-100 h-75 m-0">
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="#" onClick={() => handleMenuClick("Home")}>
                  Home
                </a>
              </li>
              <li class="breadcrumb-item">
                <a>User</a>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                New User
              </li>
            </ol>
          </nav>

          {/* <hr></hr> */}

          <div className="container rounded w-100 h-100 mx-auto">
            <form>
              <div className="row">
                <div className="col-4 mt-3">
                  <label className="col-12 bg-info rounded text-center col-form-label col-form-label-sm fw-normal fs-6">
                    Primary Information
                  </label>
                  <div className="float-start w-100 mt-2">
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="inputFirstName"
                      placeholder="First Name"
                      required
                    />
                    <input
                      type="text"
                      className="form-control mt-2"
                      aria-describedby="inputLastName"
                      placeholder="Last Name"
                      required
                    />
                    <input
                      type="text"
                      className="form-control mt-2"
                      aria-describedby="inputContact"
                      placeholder="Mobile No"
                      required
                    />
                    <input
                      type="text"
                      className="form-control mt-2"
                      aria-describedby="inputEmail"
                      placeholder="Email"
                      required
                    />
                    <textarea
                      type="text"
                      className="form-control mt-2"
                      aria-describedby="inputAddress"
                      rows="3"
                      placeholder="Address"
                      required
                    />
                  </div>
                </div>

                <div className="col-4 mt-3">
                  <label className="col-12 bg-info rounded text-center col-form-label col-form-label-sm fw-normal fs-6">
                    Profile Picture
                  </label>
                  <div>
                    <img
                      src={avatar}
                      className="img-fluid rounded d-block border border-dark mt-3 mb-3 mx-auto"
                      alt="..."
                      style={{ width: 200, height: 200 }}
                    />
                  </div>
                  <div
                    className="input-group mb-3 mx-auto"
                    style={{ width: 300 }}
                  >
                    <input
                      type="file"
                      className="form-control"
                      id="inputGroupFile02"
                    />
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupFile02"
                    >
                      Upload
                    </label>
                  </div>
                </div>

                <div className="col-4 mt-3">
                  <label className="col-12 bg-info rounded text-center col-form-label col-form-label-sm fw-normal fs-6">
                    Set Password
                  </label>
                  <div className="float-start w-100 mt-2">
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="inputPassword"
                      placeholder="Enter Password"
                      required
                    />
                    <input
                      type="text"
                      className="form-control mt-2"
                      aria-describedby="inputReEnterPass"
                      placeholder="Re-Enter Password"
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-auto mx-auto my-auto">
          <button className="btn btn-primary mx-3 mt-3">Cancel</button>
          <button className="btn btn-primary mx-3 mt-3" disabled>
            Save
          </button>
        </div>
        <label className="form-label text-danger mt-5 p-4">
            Note: All fields of Primary Information & Set Password are mandatory
          </label>
      </div>
    </div>
  );
};
export default NewUser;
