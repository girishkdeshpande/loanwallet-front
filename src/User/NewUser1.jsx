import avatar from "D:/loanwallet-front/src/Image/user_avatar.jpg";

const NewUser1 = () => {
  const PrimaryInfo = () => {
    return (
      <>
        <div className="col-12">
          <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
            Primary Information
          </label>
        </div>

        <div className="row">
          <div className="col-3">
            <input
              type="text"
              className="form-control mt-2"
              aria-describedby="inputFirstName"
              placeholder="First Name"
              required
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control mt-2"
              aria-describedby="inputLastName"
              placeholder="Last Name"
              required
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              className="form-control mt-2"
              aria-describedby="inputEmail"
              placeholder="Email"
              required
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control mt-2"
              aria-describedby="inputContact"
              placeholder="Contact No"
              required
            />
          </div>
          <div className="col-6">
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
      </>
    );
  };

  const ProfileImage = () => {
    return (
      <>
        <div className="col-12">
          <label className="bg-info rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
            Profile Picture
          </label>
        </div>
        <div>
          <img
            src={avatar}
            className="img-fluid rounded d-block border border-dark mt-3 mb-3 mx-auto"
            alt="..."
            style={{ width: 200, height: 200 }}
          />
        </div>
        <div className="input-group mb-3 mx-auto" style={{ width: 300 }}>
          <input type="file" className="form-control" id="inputGroupFile02" />
          <label className="input-group-text" htmlFor="inputGroupFile02">
            Upload
          </label>
        </div>
      </>
    );
  };

  const SetPassword = () => {
    return (
      <>
        <div className="col-12">
          <label className="bg-info rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
            Set Password
          </label>
        </div>
        <div className="row">
          <div className="col-4 mt-2">
            <input
              type="text"
              className="form-control"
              aria-describedby="inputPassword"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="col-4 mt-2">
            <input
              type="text"
              className="form-control"
              aria-describedby="inputReEnterPass"
              placeholder="Re-Enter Password"
              required
            />
          </div>
        </div>
      </>
    );
  };
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mb-2 mx-2">
          <label className="col-12 border border-2 border-secondary rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100">
            New User
          </label>
        </div>

        <div className="col-2">
          <div className="container rounded border border-2 border-secondary ms-2">
            <label className="my-4">Primary Information</label>
            <label className="my-4">Profile Image</label>
            <label className="my-4">Set Password</label>
          </div>
        </div>

        <div className="col-10">
          <div className="container border border-2 border-secondary rounded ms-2"></div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary my-3 mx-2">Cancel</button>
        <button className="btn btn-primary my-3 mx-2">Submit</button>
      </div>
    </div>
  );
};
export default NewUser1;
