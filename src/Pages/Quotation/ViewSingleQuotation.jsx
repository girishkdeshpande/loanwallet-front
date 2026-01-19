import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { ChangeQuotationStatus } from "../../Redux/slices/quotationSlices";

import moment from "moment";

import QuotationTable from "./QuotationTable";
import { quotationDetailsColumns } from "../../Utilities/TableColumns";

const ViewSingleExpense = ({ quotationData, show, onClose }) => {
  const bsModalRef = useRef(null);
  const dispatch = useDispatch();

  const [closureRemark, setClosureRemark] = useState("");

  useEffect(() => {
    const modalElement = document.getElementById("quotationDetailsModal");

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
    const payload = {
      id: quotationData.id,
      remark: closureRemark ? closureRemark : "",
    };

    console.log("Status Payload", payload);
    dispatch(ChangeQuotationStatus(payload))
      .unwrap()
      .then((response) => {
        toast.success("Quotation Status Updated Successfully");
        setClosureRemark("");
        onClose();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div
      className="modal fade"
      id="quotationDetailsModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header modal-title-color">
            <h5 className="modal-title d-flex align-items-center">
              <i className="bi bi-info-circle me-3"></i>
              Quotation Information
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
                <div className="col-4 fw-bold text-start">Company Name:</div>
                <div className="col-8">{quotationData.company_name}</div>
              </div>
              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">
                  Quotation Date & Time:
                </div>
                <div className="col-8">
                  {`${moment(quotationData.date).format("DD-MM-YYYY")}  ${
                    quotationData.time
                  }`}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">
                  Quotation Prepared By:
                </div>
                <div className="col-8">{quotationData.user_name}</div>
              </div>

              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">
                  Quotation for Number of Products:
                </div>
                <div className="col-8">{quotationData.no_of_products}</div>
              </div>

              {/* <div className="row mb-3">
                <div className="col-4 fw-bold text-start">
                  Quotation Status:
                </div>
                <div className="col-8">
                  {quotationData.open_close_status ? "Open" : "Closed"}
                </div>
              </div> */}

              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">
                  Quotation Details:
                </div>

                <div className="col-8"></div>
              </div>
              <div>
                <QuotationTable
                  data={quotationData}
                  columns={quotationDetailsColumns}
                />
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-4 fw-bold text-start">
                  Quotation Status:
                </div>

                <div className="col-8">
                  <div className="d-flex align-items-center">
                    <div className="col-2">
                      {quotationData.open_close_status ? "Open" : "Closed"}
                    </div>

                    {quotationData.open_close_status && (
                      <>
                        <div className="col-8 form-floating">
                          <input
                            type="text"
                            className="form-control form-control-sm rounded-4 border border-1 border-dark"
                            placeholder="Closure Remarks"
                            onChange={(e) => setClosureRemark(e.target.value)}
                          />
                          <label>Closure Remarks *</label>
                        </div>

                        <div className="col-2 ms-2">
                          <button
                            className="btn btn-primary"
                            disabled={!closureRemark}
                            onClick={handleUpdateClick}
                          >
                            Update
                          </button>
                        </div>
                      </>
                    )}
                  </div>
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

export default ViewSingleExpense;
