import { useRef, useEffect } from "react";

import avatar from "D:/loanwallet-front/src/Assets/Images/user_avatar.jpg";
import "../../Styles/Modal.css";

const ViewSingleUser = ({ userData, show, onClose }) => {
  const bsModalRef = useRef(null);

  useEffect(() => {
    const modalElement = document.getElementById("userDetailsModal");

    if (!modalElement) return;

    if (!bsModalRef.current) {
      bsModalRef.current = new window.bootstrap.Modal(modalElement, {
        backdrop: "static",
        keyboard: false,
      });

      modalElement.addEventListener("hidden.bs.modal", () => {
        onClose(); // this calls setShowModal(false) and optionally setShouldRenderModal(false)
      });
    }

    if (show) {
      bsModalRef.current?.show();
    }
  }, [show, onClose]);

  return (
    <div
      className="modal fade"
      id="userDetailsModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header modal-title-color">
            <h5 className="modal-title d-flex align-items-center">
              <i class="bi bi-info-circle me-3"></i>
              User Information
            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body App">
            <div className="container">
              <div className="row mb-3 align-items-start">
                <div className="col-3 fw-bold text-start">Profile Image:</div>
                <div className="col-9">
                  {userData?.image ? (
                    <img
                      src={userData.image}
                      alt="User"
                      className="img-fluid rounded border border-dark user-img"
                    />
                  ) : (
                    <img
                      src={avatar}
                      alt="User"
                      className="img-fluid rounded border border-dark user-img"
                    />
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">First Name:</div>
                <div className="col-9">{userData?.first_name || ""}</div>
              </div>
              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Last Name:</div>
                <div className="col-9">{userData?.last_name || ""}</div>
              </div>
              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Address:</div>
                <div className="col-9">{userData?.address || ""}</div>
              </div>
              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Contact Number:</div>
                <div className="col-9">{userData?.contactNo || ""}</div>
              </div>
              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Email:</div>
                <div className="col-9">{userData?.email || ""}</div>
              </div>
              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Total Visits:</div>
                <div className="col-9">{userData?.total_visits || "0"}</div>
              </div>
              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">User Category:</div>
                <div className="col-9">
                  {userData?.isAdmin === true ? "Admin" : "Non-Admin"}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Status:</div>
                <div className="col-9">
                  {userData?.status === true ? "Active" : "Inactive"}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer App d-flex justify-content-center">
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSingleUser;
