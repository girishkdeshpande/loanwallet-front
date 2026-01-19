import { useRef, useEffect, useState } from "react";

import CompanyTable from "./CompanyTable";
import { CamelCase } from "../../Utilities/GlobalFunctions";
import {
  contactPersonColumns,
  crucibleFurnaceColumns,
  otherFurnaceColumns,
  transferLaddleColumns,
  capexDetailsColumns,
  fluxInjectorMachineColumns,
} from "../../Utilities/TableColumns";

import "../../Styles/Modal.css";

const ViewSingleCompany = ({ companyData, show, onClose }) => {
  const bsModalRef = useRef(null);

  const [isCopperAlloy, setIsCopperAlloy] = useState(false);
  const [crucibleFurnace, setCrucibleFurnace] = useState([]);
  const [otherFurnace, setOtherFurnace] = useState([]);

  useEffect(() => {
    const modalElement = document.getElementById("companyDetailsModal");

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
    const copperAlloy = companyData?.alloy_type.some((item) =>
      item.toLowerCase().replace(/\s+/g, "").includes("copperalloys")
    );
    setIsCopperAlloy(copperAlloy);

    const crucibleData = companyData?.furnacedetail_set.filter(
      (r) => r.type === "Crucible"
    );
    const otherData = companyData?.furnacedetail_set.filter(
      (r) => r.type !== "Crucible"
    );

    if (crucibleData) {
      setCrucibleFurnace(crucibleData);
    }

    if (otherData) {
      setOtherFurnace(otherData);
    }
  }, [companyData]);

  return (
    <div
      className="modal fade"
      id="companyDetailsModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
        <div className="modal-content">
          <div className="modal-header modal-title-color">
            <h5 className="modal-title d-flex align-items-center">
              <i className="bi bi-info-circle me-3"></i>
              Company Information
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
                  {companyData?.name || "No Information"}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Address:</div>
                <div className="col-9">
                  {companyData?.address || "No Information"}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">GST Number:</div>
                <div className="col-9">
                  {companyData?.gst_in || "No Information"}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Latitude:</div>
                <div className="col-9">
                  {companyData?.latitude || "No Information"}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Longitude:</div>
                <div className="col-9">
                  {companyData?.longitude || "No Information"}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">
                  Number of Furnace:
                </div>
                <div className="col-9">
                  {companyData?.no_of_furnace || "No Information"}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Tonnage:</div>
                <div className="col-9">
                  {companyData?.tonnage || "No Information"}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">
                  Client Executive:
                </div>
                <div className="col-9">
                  {companyData?.customer_representative || "No Information"}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Contact Person:</div>

                <div className="col-9">
                  {companyData?.contactpersons_set?.length > 0 ? (
                    <CompanyTable
                      columns={contactPersonColumns}
                      data={companyData?.contactpersons_set || []}
                      page="View"
                    />
                  ) : (
                    "No Information"
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Furnace Type:</div>
                <div className="col-9">
                  {crucibleFurnace.length > 0 && (
                    <>
                      <h6 className="fw-bold text-start">Crucible Furnace</h6>
                      <CompanyTable
                        columns={crucibleFurnaceColumns}
                        data={crucibleFurnace}
                        page="View"
                      />
                    </>
                  )}

                  {otherFurnace.length > 0 && (
                    <>
                      <h6 className="fw-bold text-start mt-3">Other Furnace</h6>
                      <CompanyTable
                        columns={otherFurnaceColumns}
                        data={otherFurnace}
                        page="View"
                      />
                    </>
                  )}

                  {crucibleFurnace.length === 0 &&
                    otherFurnace.length === 0 && <div>No Information</div>}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Foundry Type:</div>
                <div className="col-9">
                  {Array.isArray(companyData?.type_of_foundry) &&
                  companyData?.type_of_foundry.length > 0 ? (
                    companyData?.type_of_foundry.map((item, index) => (
                      <div key={index}>{CamelCase(item)}</div>
                    ))
                  ) : (
                    <div>No Information</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">
                  Melting Metals & Alloys:
                </div>
                <div className="col-9">
                  {Array.isArray(companyData?.alloy_type) &&
                  companyData.alloy_type.length > 0 ? (
                    companyData.alloy_type.map((item, index) => (
                      <div key={index}>{CamelCase(item)}</div>
                    ))
                  ) : (
                    <div>No Information</div>
                  )}
                </div>
              </div>

              {isCopperAlloy && (
                <div className="row mb-3">
                  <div className="col-3 fw-bold text-start">Copper Alloys:</div>
                  <div className="col-9">
                    {Array.isArray(companyData?.copper_type) &&
                    companyData?.copper_type.length > 0 ? (
                      companyData?.copper_type.map((item, index) => (
                        <div key={index}>{CamelCase(item)} </div>
                      ))
                    ) : (
                      <div>No Information</div>
                    )}
                  </div>
                </div>
              )}

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">
                  Manufacturing Method:
                </div>
                <div className="col-9">
                  {Array.isArray(companyData?.manufacturing_method) &&
                  companyData?.manufacturing_method.length > 0 ? (
                    companyData?.manufacturing_method.map((item, index) => (
                      <div key={index}>{CamelCase(item)}</div>
                    ))
                  ) : (
                    <div>No Information</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Transfer Laddle:</div>
                <div className="col-9">
                  {companyData?.trans_ladle.length > 0 ? (
                    <CompanyTable
                      columns={transferLaddleColumns}
                      data={companyData?.trans_ladle}
                      page="View"
                    />
                  ) : (
                    "No Information"
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">
                  Flux Injector Machine:
                </div>
                <div className="col-9">
                  {companyData?.flux_injector_machine.length > 0 ? (
                    <CompanyTable
                      columns={fluxInjectorMachineColumns}
                      data={companyData?.flux_injector_machine}
                      page="View"
                    />
                  ) : (
                    "No Information"
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">Capex Details:</div>
                <div className="col-9">
                  {companyData?.capexdetails_set.length > 0 ? (
                    <CompanyTable
                      columns={capexDetailsColumns}
                      data={companyData?.capexdetails_set || []}
                      page="View"
                    />
                  ) : (
                    "No Information"
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">
                  Other Information:
                </div>
                <div className="col-9">
                  {companyData?.other_info || "No Information"}
                </div>
              </div>

              <hr></hr>

              <div className="row mb-3">
                <div className="col-3 fw-bold text-start">
                  Product Suggestions:
                </div>
                <div className="col-9">
                  {/* {companyData?.other_information || "No Information"} */}
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

export default ViewSingleCompany;
