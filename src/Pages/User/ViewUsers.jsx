// import Logo1 from "D:/loanwallet-front/src/Image/v-square_02.png";
import avatar from "D:/loanwallet-front/src/Assets/Images/user_avatar.jpg";

const ViewUsers = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6 mt-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item">
                User
              </li>
              <li className="breadcrumb-item" aria-current="page">
                View
              </li>
              <li className="breadcrumb-item" aria-current="page">
                All
              </li>
            </ol>
          </nav>
        </div>

        <div className="col-6 mt-1">
          <select
            className="form-select w-25 float-end me-5"
            aria-label="Default select example"
          >
            <option defaultValue="0">All</option>
            <option value="1" className="text-success">
              Admin
            </option>
            <option value="2" className="text-primary">
              Active
            </option>
            <option value="3" className="text-danger">
              Inactive
            </option>
            <option value="4" className="text-info">
              Non-Admin
            </option>
          </select>
        </div>

        <hr className="bg-dark"></hr>

        <div
          className="card float-start ms-4 bg-secondary"
          style={{ width: 425, height: 225 }}
        >
          <div className="row">
            <div className="col-4 p-1" style={{ height: 175 }}>
              <img src={avatar} className="w-100 h-100 rounded" alt="..."></img>
              <button className="btn btn-secondary mt-2 d-flex mx-auto">
                Active
              </button>
            </div>
            <div className="col-8">
              <div className="card-body" style={{ height: 175 }}>
                <h6 className="card-title">Full Name</h6>
                <p>User Email</p>
                <p>User Contact</p>
                <p>Address</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card float-start ms-4 bg-secondary"
          style={{ width: 425, height: 225 }}
        >
          <div className="row">
            <div className="col-4 p-1" style={{ height: 175 }}>
              <img src={avatar} className="w-100 h-100 rounded" alt="..."></img>
              <button className="btn btn-secondary mt-2 d-flex mx-auto">
                Active
              </button>
            </div>
            <div className="col-8">
              <div className="card-body" style={{ height: 175 }}>
                <h6 className="card-title">Full Name</h6>
                <p>User Email</p>
                <p>User Contact</p>
                <p>Address</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card float-start ms-4 bg-secondary"
          style={{ width: 425, height: 225 }}
        >
          <div className="row">
            <div className="col-4 p-1" style={{ height: 175 }}>
              <img src={avatar} className="w-100 h-100 rounded" alt="..."></img>
              <button className="btn btn-secondary mt-2 d-flex mx-auto">
                Inactive
              </button>
            </div>
            <div className="col-8">
              <div className="card-body" style={{ height: 175 }}>
                <h6 className="card-title">Full Name</h6>
                <p>User Email</p>
                <p>User Contact</p>
                <p>Address</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card float-start ms-4 bg-secondary mt-4"
          style={{ width: 425, height: 225 }}
        >
          <div className="row">
            <div className="col-4 p-1" style={{ height: 175 }}>
              <img src={avatar} className="w-100 h-100 rounded" alt="..."></img>
              <button className="btn btn-secondary mt-2 d-flex mx-auto">
                Inactive
              </button>
            </div>
            <div className="col-8">
              <div className="card-body" style={{ height: 175 }}>
                <h6 className="card-title">Full Name</h6>
                <p>User Email</p>
                <p>User Contact</p>
                <p>Address</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card float-start ms-4 bg-secondary mt-4"
          style={{ width: 425, height: 225 }}
        >
          <div className="row">
            <div className="col-4 p-1" style={{ height: 175 }}>
              <img src={avatar} className="w-100 h-100 rounded" alt="..."></img>
              <button className="btn btn-secondary mt-2 d-flex mx-auto">
                Inactive
              </button>
            </div>
            <div className="col-8">
              <div className="card-body" style={{ height: 175 }}>
                <h6 className="card-title">Full Name</h6>
                <p>User Email</p>
                <p>User Contact</p>
                <p>Address</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card float-start ms-4 bg-secondary mt-4"
          style={{ width: 425, height: 225 }}
        >
          <div className="row">
            <div className="col-4 p-1" style={{ height: 175 }}>
              <img src={avatar} className="w-100 h-100 rounded" alt="..."></img>
              <button className="btn btn-secondary mt-2 d-flex mx-auto">
                Inactive
              </button>
            </div>
            <div className="col-8">
              <div className="card-body" style={{ height: 175 }}>
                <h6 className="card-title">Full Name</h6>
                <p>User Email</p>
                <p>User Contact</p>
                <p>Address</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center mt-3">
          <li className="page-item">
            <a className="page-link bg-dark" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link bg-dark" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default ViewUsers;
