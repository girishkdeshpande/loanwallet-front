import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { toast } from "react-toastify";

import "../../Styles/Expense.css";

import { ApproveExpense } from "../../Redux/slices/expenseSlices";

import moment from "moment";
import * as bootstrap from "bootstrap";
import { formatINR } from "../../Utilities/GlobalFunctions";

const ViewSingleExpense = ({ expenseData, show, onClose }) => {
  const bsModalRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const modalElement = document.getElementById("expenseDetailsModal");

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

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );

    tooltipTriggerList.forEach((el) => {
      new bootstrap.Tooltip(el);
    });
  }, []);

  const handleApproveClick = () => {
    let expense_id = expenseData.id;
    console.log("Expense Id", expense_id);
    dispatch(ApproveExpense({ exp_id: expense_id }))
      .unwrap()
      .then((response) => {
        toast.success(response.data);
        onClose();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div
      className="modal fade"
      id="expenseDetailsModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header modal-title-color">
            <h5 className="modal-title d-flex align-items-center">
              <i className="bi bi-info-circle me-3"></i>
              Expense Information
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
                <div className="col-3 fw-bold text-start">Expense Date:</div>
                <div className="col-9">
                  {moment(expenseData.timeline).format("DD-MM-YYYY")}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">
                  Expense Raised By:
                </div>
                <div className="col-9">
                  {expenseData.user.first_name +
                    " " +
                    expenseData.user.last_name}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">
                  Expense Catrgory:
                </div>
                <div className="col-9">{expenseData.category}</div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Expense Summary:</div>
                <div className="col-9">{expenseData.summary}</div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Expense Amount:</div>
                <div className="col-9">{`₹ ${formatINR(
                  expenseData.price
                )}`}</div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Attachments:</div>

                <div className="col-9">
                  {expenseData.attachment.length === 0 && "No Attachments"}{" "}
                </div>
              </div>
              <div>
                {expenseData.attachment.length > 0 && (
                  <div className="col d-flex gap-3 flex-wrap mt-3">
                    {expenseData.attachment.map((src, index) => (
                      <TransformWrapper
                        initialScale={1}
                        minScale={0.5}
                        maxScale={4}
                        wheel={{ step: 0.2 }}
                        doubleClick={{ disabled: true }}
                      >
                        {({ zoomIn, zoomOut, resetTransform }) => (
                          //   <div className="d-flex flex-column align-items-start image-box">
                          <div className="attachment-wrapper">
                            {/* Tools at TOP-LEFT of image box */}
                            <div className="zoom-tools mb-2">
                              <button
                                type="button"
                                title="Zoom In"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                onClick={() => zoomIn()}
                                className="mx-1"
                              >
                                +
                              </button>

                              <button
                                type="button"
                                onClick={() => zoomOut()}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Zoom Out"
                                className="mx-1"
                              >
                                -
                              </button>

                              <button
                                type="button"
                                onClick={() => resetTransform()}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Reset"
                                className="mx-1"
                              >
                                x
                              </button>
                            </div>
                            <div
                              key={index}
                              className="border border-dark rounded image-box"
                            >
                              <TransformComponent>
                                <div style={{ cursor: "grab" }}>
                                  <img
                                    src={src}
                                    alt={`Attachment-${index}`}
                                    className="expense-img img-fluid"
                                    //   style={{
                                    //     width: "fit-content",
                                    //     height: "350px",
                                    //     objectFit: "cover",
                                    //     display: "block",
                                    //   }}
                                  />
                                </div>
                              </TransformComponent>
                            </div>
                          </div>
                        )}
                      </TransformWrapper>
                    ))}
                  </div>
                )}
              </div>

              <div className="col text-center mt-3">
                <button
                  className="btn btn-primary mx-2"
                  disabled={expenseData.approved}
                  onClick={handleApproveClick}
                >
                  {expenseData.approved ? "Approved" : "Approve"}
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

export default ViewSingleExpense;
