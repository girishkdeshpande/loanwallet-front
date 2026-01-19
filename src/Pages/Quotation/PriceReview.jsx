import { useRef, useEffect, useState } from "react";

import { formatINR } from "../../Utilities/GlobalFunctions";

const PriceReview = ({ data, onClose, onUpdate, show }) => {
  const bsModalRef = useRef(null);

  const [revisedPrice, setRevisedPrice] = useState("");

  useEffect(() => {
    const modalElement = document.getElementById("priceReviewModal");

    if (!modalElement) return;

    if (!bsModalRef.current) {
      bsModalRef.current = new window.bootstrap.Modal(modalElement, {
        backdrop: "static",
        keyboard: false,
      });

      modalElement.addEventListener("hidden.bs.modal", () => {
        onClose(); // this calls setShowModal(false) and optionally setShouldRenderModal(false)
      });

      modalElement.addEventListener("shown.bs.modal", () => {
        //   emailRef.current?.focus({ preventScroll: true });
      });
    }

    if (show) {
      bsModalRef.current?.show();
    }
  }, [show, onClose]);

  const handleUpdateClick = () => {
    if (revisedPrice) {
      const updatedProduct = {
        ...data,
        price: parseInt(revisedPrice, 10),
      };
      onUpdate(updatedProduct);
    } else {
      onUpdate(data);
    }
    onClose();
  };

  return (
    <div
      className="modal fade"
      id="priceReviewModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header modal-title-color">
            <h5 className="modal-title d-flex align-items-center">
              <i className="bi bi-info-circle me-3"></i>
              Review
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
              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">Product Name:</div>
                <div className="col-8">{data.name}</div>
              </div>
              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">Actual Price:</div>
                <div className="col-8">{`₹ ${data.price}`}</div>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-4 fw-bold text-start">
                  Enter Revised Price:
                </div>
                <div className="col-8 ">
                  <div className="col-4 form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-4 border border-1 border-dark"
                      placeholder="Revised Price"
                      onChange={(e) => setRevisedPrice(e.target.value)}
                    />
                    <label>Revised Price</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!revisedPrice}
                  onClick={handleUpdateClick}
                >
                  Update
                </button>
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
export default PriceReview;
