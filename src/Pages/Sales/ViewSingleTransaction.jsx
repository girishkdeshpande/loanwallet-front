import { useRef, useEffect, useState } from "react";

import moment from "moment";

import TransactionTable from "./TransactionTable";
import { transactionDetailsColumns } from "../../Utilities/TableColumns";

const ViewSingleTransaction = ({ transactionData, show, onClose }) => {
  const bsModalRef = useRef(null);

  useEffect(() => {
    const modalElement = document.getElementById("transactionDetailsModal");

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

  console.log("Transaction Data", transactionData);

  return (
    <div
      className="modal fade"
      id="transactionDetailsModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header modal-title-color">
            <h5 className="modal-title d-flex align-items-center">
              <i className="bi bi-info-circle me-3"></i>
              Transaction Information
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
                <div className="col-3 fw-bold text-start">Company Name:</div>
                <div className="col-9">
                  {transactionData.transaction_type === "Sale"
                    ? transactionData?.to_company
                    : transactionData?.from_company}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Invoice Number:</div>
                <div className="col-9">
                  {transactionData?.invoice_number || "No Information"}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Invoice Date:</div>
                <div className="col-9">
                  {moment(transactionData?.trasaction_date).format(
                    "DD-MM-YYYY"
                  ) || "No Information"}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">
                  Transaction Details:
                </div>
                <div className="col-9"></div>
              </div>
              <div>
                <TransactionTable
                  data={transactionData}
                  columns={transactionDetailsColumns}
                />
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
export default ViewSingleTransaction;
