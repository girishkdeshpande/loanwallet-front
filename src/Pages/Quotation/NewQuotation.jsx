import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { CompanyNames } from "../../Redux/slices/companySlice";
import { ProductList } from "../../Redux/slices/productSlice";
import { showWarningMessage } from "../../Redux/slices/globalMessageSlice";
import { SendAddQuotation } from "../../Redux/slices/quotationSlices";

import SingleSelectTypeahead from "../../Components/SingleSelectTypeahead";
import MultiSelectTypeahead from "../../Components/MultiSelectTypeahead";
import Table from "../../Components/Table";
import { confirmAction } from "../../Components/WarningMessage";

import {
  sendToInfoFields,
  termsConditionFields,
} from "../../Utilities/AllFormFields";
import { quotationPreviewColumns } from "../../Utilities/TableColumns";
import { formatINR } from "../../Utilities/GlobalFunctions";

import PriceReview from "./PriceReview";
import QuotationTable from "./QuotationTable";

const NewQuotation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quotationRef = useRef(null);

  const { companyNamesData, companyNamesLoading, companyNamesError } =
    useSelector((state) => state.company.companyNamesState);
  const { productListData, productListLoading, productListError } = useSelector(
    (state) => state.product.productListState,
  );

  const {
    sendAddQuotationData,
    sendAddQuotationLoading,
    sendAddQuotationError,
  } = useSelector((state) => state.quotation.sendAddQuotationState);

  const [companyOptions, setCompanyOptions] = useState([]);
  const [contactOptions, setContactOptions] = useState([]);
  const [ccEmailOptions, setCcEmailOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shouldRenderModal, setShouldRenderModal] = useState(false);
  const [isProductAddClicked, setIsProductAddClicked] = useState(false);
  const [isCompanySelected, setIsCompanySelected] = useState(false);
  const [isFieldModified, setIsFieldModified] = useState(false);
  const [isSendEnabled, setIsSendEnabled] = useState(false);
  const [isTermsConditionsEnabled, setIsTermsConditionsEnabled] =
    useState(false);
  const [reviewPriceData, setReviewPriceData] = useState(null);
  const [reviewPrice, setReviewPrice] = useState(null);
  const [updatedPriceData, setUpdatedPriceData] = useState(null);
  const [quotationData, setQuotationData] = useState({
    company: null,
    contactPerson: null,
    ccEmail: [],
    subject: "Quotation for below Products/Unit",
    products: [],
    tc_price: "",
    delivery_period: "",
    freight: "",
    freight_amount: "",
    payment: "",
    payment_days: "",
    isMsds: true,
  });

  const isQuotationValid = (data) => {
    if (!data.company) return false;
    if (!data.contactPerson) return false;
    if (!data.products || data.products.length === 0) return false;
    if (!data.subject?.trim()) return false;
    if (!data.tc_price) return false;
    if (!data.delivery_period) return false;
    if (!data.freight) return false;
    if (!data.payment) return false;

    if (data.freight === "Paid" && !data.freight_amount) return false;
    if (data.payment === "Credit" && !data.payment_days) return false;

    return true;
  };

  const COMPANY_SELECT_OPTION = useMemo(
    () => ({
      company_id: "",
      company_name: "-- Select --",
      isPlaceholder: true,
    }),
    [],
  );
  const CONTACT_SELECT_OPTION = useMemo(
    () => ({
      id: "",
      full_name: "-- Select --",
      isPlaceholder: true,
    }),
    [],
  );
  {
    /* Call Backend API */
  }
  useEffect(() => {
    dispatch(CompanyNames());
    dispatch(ProductList());
  }, [dispatch]);

  {
    /* Set Company & Product options */
  }
  useEffect(() => {
    if (companyNamesData) {
      const companies = companyNamesData.data.map((item) => ({
        companyId: item.id,
        companyName: item.name,
        companyAddress: item.address,
      }));
      setCompanyOptions(companies);
    }

    if (productListData) {
      setProductOptions(productListData.data);
    }

    if (sendAddQuotationData) {
      toast.success(sendAddQuotationData.data);
    }
  }, [companyNamesData, productListData, sendAddQuotationData]);

  {
    /* Enable / Disable Terms & Conditions */
  }
  useEffect(() => {
    setIsTermsConditionsEnabled(
      quotationData.products && quotationData.products.length > 0,
    );
  }, [quotationData.products]);

  {
    /* Enable / Disable Send button */
  }
  useEffect(() => {
    setIsSendEnabled(isQuotationValid(quotationData));
  }, [quotationData]);

  {
    /* Handle Company Selection */
  }
  const handleCompanySelection = (selected) => {
    console.log("Selected Company", selected);
    if (!selected || selected.length === 0) {
      setQuotationData((prev) => ({
        ...prev,
        company: null,
        contactPerson: null,
        ccEmail: [],
      }));

      // restore full company list
      setCompanyOptions(
        companyNamesData.data.map((c) => ({
          companyId: c.id,
          companyName: c.name,
          companyAddress: c.address,
        })),
      );

      setContactOptions([]);
      setCcEmailOptions([]);
      setIsCompanySelected(false);
      setIsFieldModified(false);
      return;
    }

    setQuotationData((prev) => ({
      ...prev,
      company: selected,
    }));

    // derive contacts for selected companies
    const selectedCompanyId = selected.companyId;

    // 🔹 Remove selected companies from dropdown options
    const remainingCompanies = companyNamesData.data
      .filter((c) => c.id !== selectedCompanyId)
      .map((c) => ({
        companyId: c.id,
        companyName: c.name,
        companyAddress: c.address,
      }));

    setCompanyOptions(remainingCompanies);

    const contacts =
      companyNamesData.data
        .find((c) => c.id === selectedCompanyId)
        ?.contact_persons?.map((contact_person) => ({
          id: contact_person.id,
          full_name: `${contact_person.first_name ?? ""} ${
            contact_person.last_name ?? ""
          }`.trim(),
          email: contact_person.email,
        })) || [];

    setContactOptions(contacts);
    // setCcEmailOptions([]);
    setIsCompanySelected(true);
    setIsFieldModified(true);

    // 🔑 REMOVE invalid selected contacts
    // setSelectedContacts((prevSelected) =>
    //   prevSelected.filter((contact) =>
    //     contacts.some((c) => c.id === contact.id)
    //   )
    // );
    // setAllContactPersons(false);
    // setContactsAutoSelected(false);
  };

  {
    /* Handle Contact Person Selection */
  }
  const handleContactSelection = (e) => {
    // const cp_name = e.target.value;
    const cp_id = e.target.value;
    if (!cp_id) {
      setQuotationData((prev) => ({
        ...prev,
        contactPerson: null,
        ccEmail: [],
      }));
      setCcEmailOptions([]);
      return;
    }

    const contactPersonObj = contactOptions.find(
      (cp) => String(cp.id) === cp_id,
    );
    setQuotationData((prev) => ({
      ...prev,
      contactPerson: contactPersonObj,
      ccEmail: [], // reset CC emails when contact person changes
    }));
    // 🔹 Remove selected contacts from dropdown options
    const remainingContacts = contactOptions
      .filter((cp) => cp.id !== contactPersonObj.id)
      .map((cp) => ({
        id: cp.id,
        full_name: cp.full_name,
        email: cp.email,
      }));
    // console.log("Remainaing contacts", remainingContacts);
    setCcEmailOptions(remainingContacts);
  };

  {
    /* Handle CC Email Selection */
  }
  const handleCcEmailChange = (selected) => {
    setQuotationData((prev) => ({
      ...prev,
      ccEmail: selected,
    }));
  };

  {
    /* Handle Subject Selection */
  }
  const handleSubjectChange = (e) => {
    setQuotationData((prev) => ({
      ...prev,
      subject: e.target.value,
    }));
  };

  {
    /* Handle Product Selection */
  }
  const handleProductSelection = (selected) => {
    if (!selected || selected.length === 0) {
      setSelectedProduct(null);

      // restore full product list
      setProductOptions(productListData.data);
      setQuotationData((prev) => ({
        ...prev,
        tc_price: "",
        delivery_period: "",
        freight: "",
        freight_days: "",
        payment: "",
        payment_rupees: "",
      }));
      return;
    }

    setSelectedProduct(selected);

    const prod_id = selected.id;

    // 🔹 Remove selected contacts from dropdown options
    const remainingProducts = productOptions.filter((cp) => cp.id !== prod_id);
    setProductOptions(remainingProducts);
  };

  {
    /* Handle Product Add Click */
  }
  const handleProductAddClick = (product) => {
    if (!product || product.length === 0) return;
    setIsProductAddClicked(true);
    setReviewPrice(product.price);
  };

  const handleUpdatedProduct = (updatedProduct) => {
    console.log("Updated product:", updatedProduct);

    // Example: store it in state / list
    // setReviewPriceData((prev) => [...prev, updatedProduct]);
    setUpdatedPriceData(updatedProduct);

    // setShowModal(false);
  };

  const handleViewClose = () => {
    const modalEl = document.getElementById("priceReviewModal");

    if (window.bootstrap && modalEl) {
      // Prevent focus-related accessibility warning
      if (document.activeElement && modalEl.contains(document.activeElement)) {
        document.activeElement.blur();
      }

      const instance = window.bootstrap.Modal.getInstance(modalEl);
      instance?.hide(); // Trigger Bootstrap fade-out
    }

    // Delay unmounting to match fade-out duration (300ms)
    setTimeout(() => {
      setShowModal(false); // Hide modal JSX
      setShouldRenderModal(false); // Actually remove from DOM
    }, 300);
  };

  {
    /* Handle Product Update Click */
  }
  const handleUpdateClick = () => {
    const finalPrice =
      reviewPrice === null || reviewPrice === "" ? 0 : Number(reviewPrice);

    const totalPrice =
      Number(selectedProduct.std_size || 0) * Number(finalPrice);

    const updatedProduct = {
      ...selectedProduct,
      price: finalPrice,
      total_price: totalPrice,
      gst: 18,
    };

    setQuotationData((prev) => ({
      ...prev,
      products: [...prev.products, updatedProduct], // ✅ array append
    }));

    setSelectedProduct(null);
    setReviewPrice(null);
    setIsProductAddClicked(false);
    setIsTermsConditionsEnabled(true);
  };

  {
    /* Handle Terms & Selction Selection */
  }
  const handleTermsConditionChange = (e) => {
    const { name, value } = e.target;

    setQuotationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  {
    /* Handle Reset Button Click */
  }
  const handleResetClick = () => {
    setQuotationData({
      company: null,
      contactPerson: null,
      ccEmail: [],
      subject: "Quotation for below Products/Unit",
      products: [],
      tc_price: "",
      delivery_period: "",
      freight: "",
      freight_amount: "",
      payment: "",
      payment_days: "",
      isMsds: true,
    });

    const companies = companyNamesData.data.map((item) => ({
      companyId: item.id,
      companyName: item.name,
      companyAddress: item.address,
    }));
    setCompanyOptions(companies);
    setProductOptions(productListData.data);
    setIsTermsConditionsEnabled(false);
    setSelectedProduct(null);
  };

  {
    /* Handle Delete Button Click of table */
  }
  const handleDeleteProduct = (productId) => {
    setQuotationData((prev) => {
      // Safety check
      if (!prev.products || prev.products.length === 0) {
        return prev;
      }

      // Find deleted product
      const deletedProduct = prev.products.find((p) => p.id === productId);

      if (!deletedProduct) return prev;

      // Remaining products after delete
      const remainingProducts = prev.products.filter((p) => p.id !== productId);

      // 🔹 Restore deleted product to productOptions
      setProductOptions((opts) => [...opts, deletedProduct]);

      // 🔹 Return updated quotationData
      return {
        ...prev,
        products: remainingProducts,

        // 🔹 Clear terms only when last product is deleted
        ...(remainingProducts.length === 0 && {
          tc_price: "",
          delivery_period: "",
          freight: "",
          payment: "",
          freight_amount: "",
          payment_days: "",
        }),
      };
    });
  };

  {
    /* Handle Cancel Button Click */
  }
  const handleCancelClick = () => {
    confirmAction.current = () => {
      navigate("/homepage");
    };

    if (isFieldModified) {
      dispatch(
        showWarningMessage({
          message: "Are you sure, you want to discard changes ?",
          loadingKey: "",
        }),
      );
    } else {
      navigate("/homepage");
    }
  };

  const buildPayload = () => {
    return {
      user_id: localStorage.getItem("id"),
      company_id: quotationData.company.companyId,
      contact_persons: quotationData.contactPerson?.email
        ? [quotationData.contactPerson.email]
        : [],
      contact_persons_id: quotationData.contactPerson?.id
        ? [quotationData.contactPerson.id]
        : [],
      cc: quotationData.ccEmail.map((c) => c.email),
      subject: quotationData.subject,
      products: quotationData.products,
      msds: quotationData.isMsds,
      term_and_condition: {
        Price: quotationData.tc_price,
        "Delivery Period": quotationData.delivery_period,
        Freight: quotationData.freight,
        Payment: quotationData.payment,
        Validity: "These are current Prices.",
        Note: "There is No Guaranty or warranty on Crucibles & The company does not accept the debit note after the use of the products",
      },
    };
  };

  const handleSendClick = () => {
    const payload = buildPayload();
    console.log("Payload", payload);
    dispatch(SendAddQuotation(payload));
  };

  //   console.log("Quotation Data Products", quotationData.products);

  return (
    <>
      <div className="col">
        <h5 className="mt-2 mb-4">Fresh Quotation</h5>
      </div>

      <div className="vh-100">
        <div className="row h-100">
          <div className="col-md-5">
            {/* Send To Information */}
            <div className="row align-items-start my-2">
              <div className="col-md-3">
                <h6>Send To Information</h6>
              </div>
              <div className="col">
                <div className="d-flex flex-column gap-2">
                  {sendToInfoFields.map(({ label, name, type }) => (
                    <div className="row g-2 align-items-center" key={name}>
                      {type === "s-typeahead" ? (
                        <div className="col-10">
                          <SingleSelectTypeahead
                            id="s_new_quotation"
                            label={label}
                            options={companyOptions}
                            typeaheadRef={quotationRef}
                            selected={
                              quotationData.company
                                ? [quotationData.company]
                                : []
                            }
                            placeholder="--Select--"
                            className="custom-typeahead"
                            onChange={handleCompanySelection}
                            labelKey="companyName"
                          />
                        </div>
                      ) : type === "select" ? (
                        <div className="col-10 form-floating">
                          <select
                            className="form-select form-select-sm rounded-4 border border-1 border-dark"
                            value={quotationData.contactPerson?.id || ""}
                            onChange={handleContactSelection}
                            disabled={!quotationData.company}
                          >
                            <option value="">-- Select --</option>
                            {contactOptions.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.full_name}
                              </option>
                            ))}
                          </select>
                          <label>{label}</label>
                        </div>
                      ) : type === "m-typeahead" ? (
                        <div className="col-10">
                          <MultiSelectTypeahead
                            id="m_new_quotation"
                            label={label}
                            options={ccEmailOptions}
                            typeaheadRef={quotationRef}
                            selected={quotationData.ccEmail}
                            disabled={!quotationData.contactPerson}
                            onChange={handleCcEmailChange}
                            className={`custom-typeahead ${!quotationData.contactPerson ? "disabled" : ""}`}
                            placeholder="--Select--"
                            labelKey="full_name"
                          />
                        </div>
                      ) : (
                        <div className="col-10 form-floating">
                          <input
                            type="text"
                            className="form-control form-control-sm rounded-4 border border-1 border-dark"
                            placeholder={label}
                            value={quotationData.subject}
                            onChange={handleSubjectChange}
                            disabled={!quotationData.contactPerson}
                          />
                          <label>{label}</label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Select Products */}
            <div className="row align-items-start my-2">
              <div className="col-md-3">
                <h6>Select Products</h6>
              </div>
              <div className="col">
                {/* <div className="d-flex flex-column"> */}
                <div className="d-flex align-items-center gap-5">
                  <div className="col-10">
                    <SingleSelectTypeahead
                      id="quotation_product"
                      label="Select Product *"
                      options={productOptions}
                      typeaheadRef={quotationRef}
                      selected={selectedProduct ? [selectedProduct] : []}
                      placeholder="--Select--"
                      disabled={!quotationData.contactPerson}
                      className={`custom-typeahead ${!quotationData.contactPerson ? "disabled" : ""}`}
                      onChange={handleProductSelection}
                      labelKey="name"
                    />
                  </div>
                  <div className="col-2">
                    <a
                      href="#"
                      className="d-flex align-items-end"
                      // disabled={!quotationData.contactPerson}
                      onClick={(e) => {
                        e.preventDefault();
                        handleProductAddClick(selectedProduct);
                      }}
                    >
                      Add
                    </a>
                  </div>
                </div>
                {/* </div> */}
                {isProductAddClicked && (
                  <div className="col d-flex align-items-center">
                    <div className="col-8 form-floating mt-2">
                      <input
                        type="text"
                        className="form-control form-control-sm rounded-4 border border-1 border-dark"
                        placeholder="Review Price"
                        value={reviewPrice}
                        onChange={(e) => setReviewPrice(e.target.value)}
                      />
                      <label>Review Price</label>
                    </div>
                    <div className="col-2 text-center">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleUpdateClick}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="row align-items-start my-2">
              <div className="col-md-3">
                <h6>Terms & Conditions</h6>
              </div>
              <div className="col-md">
                <div className="d-flex flex-column gap-2">
                  {termsConditionFields.map(({ label, name, options }) => (
                    <div className="d-flex align-items-center gap-1" key={name}>
                      <div className="col-10 form-floating flex-grow-1">
                        <select
                          className="form-select form-select-sm rounded-4 border border-1 border-dark"
                          name={name}
                          value={quotationData[name] || ""}
                          disabled={!isTermsConditionsEnabled}
                          onChange={handleTermsConditionChange}
                        >
                          <option value="">-- Select --</option>
                          {options.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}{" "}
                        </select>
                        <label>{label}</label>
                      </div>
                      {(name === "freight" &&
                        quotationData.freight === "Amount") ||
                      (name === "payment" &&
                        quotationData.payment === "Credit") ? (
                        <div className="col-2 form-floating">
                          <input
                            type="text"
                            className="form-control form-control-sm rounded-4 border border-1 border-dark"
                            placeholder="Condition"
                            value={
                              name === "freight"
                                ? quotationData.freight_amount || ""
                                : quotationData.payment_days || ""
                            }
                            onChange={(e) =>
                              setQuotationData((prev) => ({
                                ...prev,
                                ...(name === "freight"
                                  ? { freight_amount: e.target.value }
                                  : { payment_days: e.target.value }),
                              }))
                            }
                          />
                          <label>
                            {name === "freight" ? "Rupees" : "Days"}
                          </label>
                        </div>
                      ) : (
                        <div className="col-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MSDS */}
            <div className="row align-items-start my-2">
              <div className="col-md-3">
                <h6>MSDS</h6>
              </div>
              <div className="col-md ms-2">
                <input
                  type="checkbox"
                  className="form-check-input border border-1 border-dark"
                  disabled={
                    !quotationData.products ||
                    quotationData.products.length === 0
                  }
                  checked={quotationData.isMsds}
                  onChange={(e) =>
                    setQuotationData((prev) => ({
                      ...prev,
                      isMsds: e.target.checked,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Quotation Preview Section */}
          <div className="col-md-7 h-100">
            <div className="row align-items-start h-100 my-2 me-1 overflow-auto">
              <div className="col-md-12">
                {quotationData.company && (
                  <>
                    <strong>To,</strong>
                    <div>{quotationData.company.companyName}</div>
                    <div>{quotationData.company.companyAddress}</div>
                  </>
                )}
                {quotationData.contactPerson && (
                  <>
                    <div>
                      <strong>Kind Attn:</strong>{" "}
                      {quotationData.contactPerson.full_name}
                    </div>
                    <div className="mt-4">
                      <strong>Subject:</strong> {quotationData.subject}
                    </div>
                    <div className="mt-4">Dear Sir/Ma'am,</div>
                    <div>
                      This has reference to the discussion regarding the
                      products for your plant, we propose as follows.
                    </div>
                    <div>
                      We are pleased to offer the quote for our following
                      Consumable product.
                    </div>
                  </>
                )}
                {quotationData.products.length > 0 && (
                  <>
                    <div className="mt-3 mb-2">
                      <u>
                        <strong>Quotation for Products.</strong>
                      </u>
                    </div>
                    <QuotationTable
                      columns={quotationPreviewColumns}
                      data={quotationData.products}
                      onDelete={handleDeleteProduct}
                    />
                    <div className="mt-3">
                      <u>
                        <strong>Terms & Conditions</strong>
                      </u>
                    </div>
                    <div className="row mt-2">
                      <div className="col-3">
                        <strong>Price</strong>
                      </div>
                      <div className="col-9">
                        <strong className="me-2">:</strong>
                        {quotationData.tc_price}
                      </div>

                      <div className="col-3">
                        <strong>Delivery Period</strong>
                      </div>

                      <div className="col-9">
                        <strong className="me-2">:</strong>
                        {quotationData.delivery_period}
                      </div>

                      <div className="col-3">
                        <strong>Freight</strong>
                      </div>

                      <div className="col-9">
                        <strong className="me-2">:</strong>
                        {quotationData.freight === "Amount"
                          ? "Amount" +
                            ` ₹ ${formatINR(quotationData.freight_amount)}`
                          : quotationData.freight}
                      </div>

                      <div className="col-3">
                        <strong>Payment</strong>
                      </div>

                      <div className="col-9">
                        <strong className="me-2">:</strong>
                        {quotationData.payment === "Credit"
                          ? quotationData.payment_days + " " + "Days"
                          : quotationData.payment}
                      </div>

                      <div className="col-3">
                        <strong>Validity</strong>
                      </div>

                      <div className="col-9">
                        <strong className="me-2">:</strong>
                        These are current Prices.
                      </div>
                    </div>
                    <div className="col-2 mt-1">
                      <strong>Note:</strong>
                    </div>

                    <div className="col-10">
                      1. There is no guarantee and warranty on the Silicon
                      Carbide Crucible range.
                      <div className="col-10">
                        2. We do not accept debit notes after the use of the
                        products.
                      </div>
                    </div>
                    <div className="mt-1">
                      We trust you will find our above offer in line with your
                      requirement and look forward to receiving your valued
                      order which we assure you will receive our best and
                      immediate attention.
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col text-center">
          <button
            className="btn btn-primary mx-2"
            disabled={!isSendEnabled || sendAddQuotationLoading}
            onClick={handleSendClick}
          >
            {sendAddQuotationLoading ? (
              <>
                &nbsp; Sending{" "}
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              </>
            ) : (
              "Send"
            )}
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={handleResetClick}
            disabled={sendAddQuotationLoading}
          >
            Reset
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={handleCancelClick}
            disabled={sendAddQuotationLoading}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col text-center"></div>
      </div>

      {/* Modal */}
      {/* {showModal && (
        <PriceReview
          data={reviewPriceData}
          show={showModal}
          onClose={handleViewClose}
          onUpdate={handleUpdatedProduct}
        />
      )} */}
    </>
  );
};

export default NewQuotation;
