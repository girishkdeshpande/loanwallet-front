import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import avatar from "D:/loanwallet-front/src/Assets/Images/user_avatar.jpg";
import "../../Styles/Modal.css";

import {
  ShareProductDetails,
  resetShareProductDetailsState,
} from "../../Redux/slices/productSlice";

import { CamelCase } from "../../Utilities/GlobalFunctions";

const ViewSingleProduct = ({ productData, show, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bsModalRef = useRef(null);
  const emailRef = useRef(null);

  let emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [isCopperAlloy, setIsCopperAlloy] = useState(false);
  const [isPds, setIsPds] = useState(false);
  const [isMsds, setIsMsds] = useState(false);
  const [enableShare, setEnableShare] = useState(false);
  const [shareInformationErrors, setShareInformationErrors] = useState({
    email: "",
    subject: "",
    msgBody: "",
  });
  const [shareInfoData, setShareInfoData] = useState({
    email: "",
    subject: `Details & Specifications of Product - ${productData.name}`,
    msgBody: `Dear Sir/Madam,\n\nPlease find the details and specifications of the product "${productData.name}" of type "${productData.alloy_type}" attached.\n\nBest regards,\n[Your Name]`,
    pds: false,
    msds: false,
  });

  const {
    shareProductDetailsData,
    shareProductDetailsLoading,
    shareProductDetailsError,
  } = useSelector((state) => state.product.shareProductDetailsState);

  useEffect(() => {
    if (shareProductDetailsData) {
      toast.success(shareProductDetailsData.data.message);
      setShareInfoData({
        email: "",
        subject: `Details & Specifications of Product - ${productData.name}`,
        msgBody: `Dear Sir/Madam,\n\nPlease find the details and specifications of the product "${productData.name}" of type "${productData.alloy_type}" attached.\n\nBest regards,\n[Your Name]`,
        pds: false,
        msds: false,
      });

      onClose(); // this calls setShowModal(false) and optionally setShouldRenderModal(false)
    }

    if (shareProductDetailsError) {
      toast.error(shareProductDetailsError);
    }
    dispatch(resetShareProductDetailsState());
  }, [
    shareProductDetailsData,
    shareProductDetailsError,
    dispatch,
    onClose,
    productData,
  ]);

  useEffect(() => {
    const modalElement = document.getElementById("productDetailsModal");

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
        emailRef.current?.focus({ preventScroll: true });
      });
    }

    if (show) {
      bsModalRef.current?.show();
    }
  }, [show, onClose]);

  useEffect(() => {
    const copperAlloy = productData?.alloy_type.some((item) =>
      item.toLowerCase().replace(/\s+/g, "").includes("copperalloys")
    );
    setIsCopperAlloy(copperAlloy);
    setIsPds(!!productData?.pds);
    setIsMsds(!!productData?.msds);

    setShareInfoData((prev) => ({
      ...prev,
      pds: !!productData?.pds ? prev.pds : false,
      msds: !!productData?.msds ? prev.msds : false,
    }));
  }, [productData]);

  const handleShareInfoDataChange = (e) => {
    const { name, type, value, checked } = e.target;
    setShareInformationErrors((prev) => ({ ...prev, [name]: "" }));
    setEnableShare(true);
    setShareInfoData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;

    if (!value.trim()) {
      setShareInformationErrors((prev) => ({
        ...prev,
        [name]: `${name.replace("_", " ")} is required`,
      }));
    } else if (name === "email" && !emailRegex.test(name)) {
      setShareInformationErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
    } else {
      setShareInformationErrors((prev) => ({ ...prev, [name]: "" }));
      setEnableShare(true);
    }
  };

  const handleShareClick = () => {
    if (!emailRegex.test(shareInfoData.email)) {
      setShareInformationErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      return;
    }

    const payload = {
      email: shareInfoData.email.trim(),
      subject: shareInfoData.subject.trim(),
      message: shareInfoData.msgBody.trim(),
      includePds: shareInfoData.pds,
      includeMsds: shareInfoData.msds,
      product_id: productData.id,
    };

    console.log("Payload for sharing product details:", payload);
    dispatch(ShareProductDetails(payload));
  };

  return (
    <div
      className="modal fade"
      id="productDetailsModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header modal-title-color">
            <h5 className="modal-title d-flex align-items-center">
              <i className="bi bi-info-circle me-3"></i>
              Product Information
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
                <div className="col-4 fw-bold text-start">Product Image:</div>
                <div className="col-8">
                  {productData?.image ? (
                    <img
                      src={productData.image}
                      alt="Product"
                      className="img-fluid rounded border border-dark user-img"
                    />
                  ) : (
                    <img
                      src={avatar}
                      alt="Product"
                      className="img-fluid rounded border border-dark user-img"
                    />
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">Product Name:</div>
                <div className="col-8">
                  {productData?.name || "No Information"}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">HSN Code:</div>
                <div className="col-8">
                  {productData?.HSNCode || "No Information"}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">
                  Standard Pack Size:
                </div>
                <div className="col-8">
                  {productData?.std_size || "No Information"}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">
                  Standard Pack Size Unit:
                </div>
                <div className="col-8">
                  {productData?.standard_pack_size_unit || "No Information"}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">Price:</div>
                <div className="col-8">
                  {productData?.price || "No Information"}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">Product Group:</div>
                <div className="col-8">
                  {productData?.product_type || "No Information"}
                </div>
              </div>
              {productData?.product_type === "Crucible" && (
                <>
                  <div className="row mb-3">
                    <div className="col-4 fw-bold text-start">
                      Top Diameter:
                    </div>
                    <div className="col-8">
                      {productData?.top_diameter || "No Information"}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-4 fw-bold text-start">
                      Bottom Diameter:
                    </div>
                    <div className="col-8">
                      {productData?.bottom_diameter || "No Information"}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-4 fw-bold text-start">Height:</div>
                    <div className="col-8">
                      {productData?.height || "No Information"}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-4 fw-bold text-start">Weight:</div>
                    <div className="col-8">
                      {productData?.weight || "No Information"}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-4 fw-bold text-start">
                      Water Capacity:
                    </div>
                    <div className="col-8">
                      {productData?.water_capacity || "No Information"}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-4 fw-bold text-start">
                      Aluminium Capacity:
                    </div>
                    <div className="col-8">
                      {productData?.aluminium_capacity || "No Information"}
                    </div>
                  </div>
                </>
              )}

              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">
                  Melting Metals & Alloys:
                </div>
                <div className="col-8">
                  {Array.isArray(productData?.alloy_type) &&
                  productData.alloy_type.length > 0 ? (
                    productData.alloy_type.map((item, index) => (
                      <div key={index}>{CamelCase(item)}</div>
                    ))
                  ) : (
                    <div>No Information</div>
                  )}
                </div>
              </div>

              {isCopperAlloy && (
                <div className="row mb-3">
                  <div className="col-4 fw-bold text-start">Copper Alloys:</div>
                  <div className="col-8">
                    {Array.isArray(productData?.copper_type) &&
                    productData?.copper_type.length > 0 ? (
                      productData?.copper_type.map((item, index) => (
                        <div key={index}>{CamelCase(item)} </div>
                      ))
                    ) : (
                      <div>No Information</div>
                    )}
                  </div>
                </div>
              )}

              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">
                  Manufacturing Method:
                </div>
                <div className="col-8">
                  {Array.isArray(productData?.type_of_foundry) &&
                  productData?.type_of_foundry.length > 0 ? (
                    productData?.type_of_foundry.map((item, index) => (
                      <div key={index}>{CamelCase(item)}</div>
                    ))
                  ) : (
                    <div>No Information</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">Customer Type:</div>
                <div className="col-8">
                  {Array.isArray(productData?.customer_type) &&
                  productData.customer_type.length > 0 ? (
                    productData.customer_type.map((item, index) => (
                      <div key={index}>{CamelCase(item)}</div>
                    ))
                  ) : (
                    <div>No Information</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">Summary:</div>
                <div className="col-8">
                  {productData?.summary || "No Information"}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">
                  Terms & Conditions:
                </div>
                <div className="col-8">
                  {productData?.terms_conditions || "No Information"}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">PDS:</div>
                <div className="col-8">
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={!isPds}
                  >
                    <i className="bi bi-file-arrow-down mx-1"></i>
                    Download
                  </button>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4 fw-bold text-start">MSDS:</div>
                <div className="col-8">
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={!isMsds}
                  >
                    <i className="bi bi-file-arrow-down mx-1"></i>
                    Download
                  </button>
                </div>
              </div>

              <hr></hr>

              <div className="row mb-3">
                <a className="col-4 fw-bold text-start">
                  Share Product Information
                </a>
                <div className="col-8">
                  {[
                    { label: "Email *", name: "email" },
                    {
                      label: "Subject *",
                      name: "subject",
                      //   defaultValue: `Details & Specifications of Product - ${productData.name}`,
                    },
                    {
                      label: "Message *",
                      name: "msgBody",
                      type: "textarea",
                      //   defaultValue: `Dear Sir/Madam,\n\nPlease find the details and specifications of the product "${productData.name}" attached.\n\nBest regards,\n[Your Name]`,
                    },
                  ].map(({ label, name, type }) => (
                    <div className="mb-3" key={name}>
                      <div className="form-floating">
                        {type === "textarea" ? (
                          <textarea
                            className={`form-control form-control-sm rounded-4 border border-1 border-dark ${
                              shareInformationErrors[name] ? "is-invalid" : ""
                            }`}
                            onBlur={handleOnBlur}
                            placeholder={label}
                            name={name}
                            value={shareInfoData[name]}
                            onChange={handleShareInfoDataChange}
                            style={{ height: 100 }}
                            autoComplete="off"
                          />
                        ) : (
                          <input
                            type="text"
                            className={`form-control form-control-sm rounded-4 border border-1 border-dark ${
                              shareInformationErrors[name] ? "is-invalid" : ""
                            }`}
                            ref={name === "email" ? emailRef : null}
                            onBlur={handleOnBlur}
                            placeholder={label}
                            name={name}
                            value={shareInfoData[name]}
                            onChange={handleShareInfoDataChange}
                            autoComplete="off"
                          />
                        )}
                        <label>{label}</label>
                      </div>
                      {shareInformationErrors[name] && (
                        <div className="invalid-feedback d-block">
                          {shareInformationErrors[name]}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Inline checkboxes */}
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input border border-1 border-dark"
                      type="checkbox"
                      id="includePds"
                      name="pds"
                      checked={shareInfoData.pds}
                      onChange={handleShareInfoDataChange}
                      disabled={!isPds}
                    />
                    <label className="form-check-label" htmlFor="includePds">
                      Include PDS
                    </label>
                  </div>
                  <div className="form-check form-check-inline mx-5">
                    <input
                      className="form-check-input border border-1 border-dark"
                      type="checkbox"
                      id="includeMsds"
                      name="msds"
                      checked={shareInfoData.msds}
                      onChange={handleShareInfoDataChange}
                      disabled={!isMsds}
                    />
                    <label className="form-check-label" htmlFor="includeMsds">
                      Include MSDS
                    </label>
                  </div>
                  <div className="App d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary mt-2"
                      onClick={handleShareClick}
                      disabled={
                        !enableShare ||
                        Object.values(shareInformationErrors).some(
                          (error) => error
                        ) ||
                        shareProductDetailsLoading
                      }
                    >
                      {shareProductDetailsLoading ? (
                        <>
                          &nbsp;Sharing...
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        </>
                      ) : (
                        "Share"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer App d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClose}
              disabled={shareProductDetailsLoading}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSingleProduct;
