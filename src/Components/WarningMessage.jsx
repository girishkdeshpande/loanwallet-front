import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

import { hideWarningMessage } from "../Redux/slices/globalMessageSlice";

const confirmAction = { current: null };

const WarningMessage = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);

  const { show, message, loadingKey } = useSelector(
    (state) => state.globalMessage
  );

  // NEW: Dynamically access loading from the right slice
  const loading = useSelector((state) => {
    if (!loadingKey) return false;

    const keys = loadingKey.split(".");
    let value = state;

    for (const key of keys) {
      value = value?.[key];
    }

    return value ?? false;
  });

  const handleClose = () => {
    dispatch(hideWarningMessage());
  };

  const handleConfirm = () => {
    if (confirmAction.current) {
      confirmAction.current();
      dispatch(hideWarningMessage());
    }
  };

  useEffect(() => {
    if (modalRef.current) {
      // Bootstrap Modal instance
      bsModalRef.current = new window.bootstrap.Modal(modalRef.current, {
        backdrop: false,
        keyboard: false,
      });
    }
  }, []);

  useEffect(() => {
    if (show && bsModalRef.current) {
      bsModalRef.current.show();
    } else if (!show && bsModalRef.current) {
      if (
        document.activeElement &&
        modalRef.current.contains(document.activeElement)
      ) {
        document.activeElement.blur();
      }
      bsModalRef.current.hide();
    }
  }, [show]);

  return (
    <div
      className="modal fade"
      ref={modalRef}
      tabIndex="-1"
      aria-labelledby="globalModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-danger text-white">
            <h4
              className="modal-title d-flex align-items-center"
              id="globalModalLabel"
            >
              <i className="bi bi-exclamation-triangle me-3"></i>
              Warning
            </h4>
            <button
              type="button"
              className="btn-close"
              disabled={loading}
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body bg-secondary text-white">
            <h5>{message}</h5>
          </div>
          <div className="modal-footer bg-secondary d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary fs-5 mx-3"
              disabled={loading}
              onClick={handleClose}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-primary fs-5 mx-3"
              onClick={handleConfirm}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Yes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export { confirmAction };
export default WarningMessage;