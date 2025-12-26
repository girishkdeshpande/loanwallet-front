import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import { toast } from "react-toastify";

import { CompanyNames } from "../../Redux/slices/companySlice";

import { EmailTemplateType } from "../../Utilities/ListConstants";
import "../../Styles/Email.css";
import { holidayInformationFields } from "./EmailFields";
import {
  EmailTemplateNames,
  EmailPreview,
  SaveEmailTemplate,
} from "../../Redux/slices/emailTemplatesSlices";

const EmailTemplate = () => {
  const dispatch = useDispatch();
  const companyRef = useRef(null);
  const contactRef = useRef(null);

  const templateNameData = useSelector(
    (state) => state.emailTemplates.templateNameState
  );
  const emailPreviewData = useSelector(
    (state) => state.emailTemplates.emailPreviewState
  );
  const saveEmailTemplateData = useSelector(
    (state) => state.emailTemplates.saveEmailTemplateState
  );
  const { companyNamesData } = useSelector(
    (state) => state.company.companyNamesState
  );

  const COMPANY_SELECT_OPTION = useMemo(
    () => ({
      company_id: "",
      company_name: "-- Select --",
      isPlaceholder: true,
    }),
    []
  );
  const CONTACT_SELECT_OPTION = useMemo(
    () => ({
      id: "",
      full_name: "-- Select --",
      isPlaceholder: true,
    }),
    []
  );

  const [selectedCategory, setSelectedCategory] = useState("");
  const isCategorySelected = selectedCategory !== "";
  const isHolidayCategory = selectedCategory === "Festive Holiday";
  const allowAllCompanies =
    selectedCategory === "Festive Holiday" ||
    selectedCategory ===
      "Weekly Foundry Consumable Schedule - V Square Foundry Products";
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [contactPersonOptions, setContactPersonOptions] = useState([]);
  const [templateNames, setTemplateNames] = useState([]);
  const [isPreviewClicked, setIsPreviewClicked] = useState(false);
  const [selectedTemplateMeta, setSelectedTemplateMeta] = useState(null);
  const [previewHtml, setPreviewHtml] = useState("");
  const [allCompanies, setAllCompanies] = useState(false);
  const [allContactPersons, setAllContactPersons] = useState(false);
  const [contactsAutoSelected, setContactsAutoSelected] = useState(false);
  const [holidayData, setHolidayData] = useState({
    holiday: "",
    from_date: "",
    to_date: "",
  });

  useEffect(() => {
    dispatch(CompanyNames());
    dispatch(EmailTemplateNames());
  }, [dispatch]);

  useEffect(() => {
    if (companyNamesData) {
      const companies = companyNamesData.data.map((item) => ({
        company_id: item.id,
        company_name: item.name,
      }));

      setCompanyOptions([COMPANY_SELECT_OPTION, ...companies]);
    }

    if (templateNameData) {
      setTemplateNames(
        templateNameData?.templateNameData?.data?.templateNames ?? []
      );
    }

    if (emailPreviewData) {
      setPreviewHtml(emailPreviewData?.emailPreviewData?.html ?? "");
    }

    if (saveEmailTemplateData?.saveEmailTemplateData?.data) {
      toast.success(saveEmailTemplateData?.saveEmailTemplateData?.data);
    }
  }, [
    companyNamesData,
    COMPANY_SELECT_OPTION,
    templateNameData,
    emailPreviewData,
    saveEmailTemplateData,
  ]);

  const handleCompanySelection = (selected) => {
    // If "-- Select --" is selected
    const hasSelect = selected.some((item) => item.isPlaceholder);

    if (hasSelect) {
      setSelectedCompanies([]);
      setContactPersonOptions([]);
      setSelectedContacts([]);
      setAllContactPersons(false);
      setContactsAutoSelected(false);
      return;
    } else {
      setSelectedCompanies(selected);
    }

    if (selected) {
      // derive contacts for selected companies
      const selectedIds = selected.map((c) => c.company_id);

      const contacts = companyNamesData.data
        .filter((c) => selectedIds.includes(c.id))
        .flatMap((c) => c.contact_persons || [])
        .map((contact_person) => ({
          id: contact_person.id,
          full_name: `${contact_person.first_name ?? ""} ${
            contact_person.last_name ?? ""
          } - ${contact_person.designation ?? ""}`.trim(),
        }));

      setContactPersonOptions([CONTACT_SELECT_OPTION, ...contacts]);

      // 🔑 REMOVE invalid selected contacts
      setSelectedContacts((prevSelected) =>
        prevSelected.filter((contact) =>
          contacts.some((c) => c.id === contact.id)
        )
      );
      setAllContactPersons(false);
      setContactsAutoSelected(false);
    }

    if (selected.length === 0) {
      setPreviewHtml("");
      setIsPreviewClicked(false);
    }
  };

  const handleContactPersonSelection = (selected) => {
    // If "-- Select --" is selected
    const hasSelect = selected.some((item) => item.isPlaceholder);

    if (hasSelect || !selectedCompanies.length) {
      setSelectedContacts([]);
      return;
    } else {
      setSelectedContacts(selected);
    }
  };

  const handleTemplateChange = (e) => {
    const selectedName = e.target.value;
    // console.log("Template Name", selectedName);

    setSelectedCompanies([]);
    setSelectedContacts([]);
    setAllCompanies(false);
    setAllContactPersons(false);
    setIsPreviewClicked(false);

    setSelectedCategory(selectedName);
    const template = templateNames?.find((t) => t.name === selectedName);
    setSelectedTemplateMeta(template || null);
  };

  const handleAllCompaniesCheckbox = (e) => {
    const checked = e.target.checked;
    setAllCompanies(checked);

    const companies = companyNamesData.data.map((c) => ({
      company_id: c.id,
      company_name: c.name,
    }));

    const contacts = companyNamesData.data.flatMap((c) =>
      (c.contact_persons || []).map((p) => ({
        id: p.id,
        full_name: `${p.first_name ?? ""} ${p.last_name ?? ""} - ${
          p.designation ?? ""
        }`.trim(),
      }))
    );

    if (checked) {
      // clear manual selections when "All Companies" is ON
      setSelectedCompanies(companies);
      setContactPersonOptions([CONTACT_SELECT_OPTION, ...contacts]);
      setAllContactPersons(false);
    } else {
      setSelectedCompanies([]);
      setContactPersonOptions([CONTACT_SELECT_OPTION, ...contacts]);
      setCompanyOptions([COMPANY_SELECT_OPTION, ...companies]);
      setSelectedContacts([]);
      setAllContactPersons(false);
      setAllCompanies(false);
    }
  };

  const handleAllContactPersonCheckbox = (e) => {
    const checked = e.target.checked;
    setAllContactPersons(checked);

    // real contact persons (exclude placeholder)
    const allContacts = contactPersonOptions.filter((c) => !c.isPlaceholder);

    if (checked) {
      // SCENARIO 2 & 4
      // - manual companies + all contacts
      // - all companies + all contacts
      setSelectedContacts(allContacts);
      setContactsAutoSelected(true);
    } else {
      // SCENARIO 1 & 3
      // - manual selection stays as-is
      // - do NOT auto-clear user selections
      // setSelectedContacts((prev) => prev);
      if (contactsAutoSelected) {
        setSelectedContacts((prev) => prev);
      } else {
        setSelectedContacts([]);
      }
      setContactsAutoSelected(false);
    }
    if (isPreviewClicked) {
      setIsPreviewClicked(false);
    }
  };

  const buildPreviewHtml = (html) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: "Spectral", serif !important;
    }
  </style>
</head>
<body>
  ${html}
</body>
</html>
`;

  const preparePreviewPayload = () => {
    const contactNames = selectedContacts.map((c) =>
      c.full_name.split("-")[0].trim()
    );

    return {
      user_id: localStorage.getItem("id"),
      contact_person_names: contactNames.join(", "),
      template_name: selectedTemplateMeta.file,
    };
  };

  const prepareSendMailPayload = () => {
    const company_ids = selectedCompanies.map((c) => c.company_id);
    const selectedContactIds = selectedContacts.map((c) => c.id);

    const contact_persons = companyNamesData.data
      .flatMap((cp) => cp.contact_persons || [])
      .filter((contact) => selectedContactIds.includes(contact.id))
      .map((contact) => ({
        email: contact.email,
        full_name: `${contact.first_name ?? ""} ${
          contact.last_name ?? ""
        }`.trim(),
      }));

    const subject =
      selectedTemplateMeta.file === "festive.html"
        ? holidayData.holiday + " " + "Holiday"
        : selectedTemplateMeta.subject;

    return {
      user_id: localStorage.getItem("id"),
      company_id: company_ids,
      emails: contact_persons,
      subject: subject,
      templateName: selectedTemplateMeta.file,
      toAllCompany: allCompanies && allContactPersons ? true : false,
      content: holidayData.holiday ? { ...holidayData } : {},
    };
  };

  const handlePreviewClick = () => {
    setIsPreviewClicked(true);
    // setIsResetClicked(false);
    const payload = preparePreviewPayload();
    // console.log("Preview Payload:", payload);
    dispatch(EmailPreview(payload));
  };

  const handleResetClick = () => {
    setIsPreviewClicked(false);
    setAllCompanies(false);
    setSelectedCompanies([]);
    setSelectedCategory("");
    setSelectedContacts([]);
    setAllContactPersons(false);
    setContactsAutoSelected(false);
    setHolidayData({
      holiday: "",
      from_date: "",
      to_date: "",
    });
  };

  const handleSendMailClick = () => {
    const mailPayload = prepareSendMailPayload();
    console.log("Send Mail Payload", mailPayload);
    // dispatch(SaveEmailTemplate(mailPayload));
  };

  //   console.log("Selected Template Meta", selectedTemplateMeta);

  return (
    <>
      <div className="col">
        <h5 className="my-2">Send Business Email</h5>

        <div className="row align-items-start mt-4">
          <div className="col-md-2">
            <h6>Select Email Category</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              <div className="col-md-5">
                <div className="form-floating">
                  <select
                    className="form-select form-select-sm rounded-4 border border-1 border-dark"
                    placeholder="Choose"
                    id="emailTemplate"
                    value={selectedCategory}
                    onChange={handleTemplateChange}
                  >
                    <option value="">-- Select --</option>
                    {EmailTemplateType.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="emailTemplate">Choose Category</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-start mt-2">
          <div className="col-md-2">
            <h6>Send To Information</h6>
          </div>
          <div className="col">
            <div className="row g-1">
              <div className="col-md-10">
                <div
                  className={`typeahead-wrapper ${
                    !isCategorySelected || allCompanies ? "disabled" : ""
                  }`}
                >
                  <Typeahead
                    id="company"
                    ref={companyRef}
                    multiple
                    options={companyOptions}
                    labelKey="company_name"
                    minLength={0}
                    selected={allCompanies ? [] : selectedCompanies}
                    value={selectedCompanies}
                    disabled={!isCategorySelected || allCompanies}
                    placeholder={
                      allCompanies ? "All Companies Selected" : "-- Select --"
                    }
                    filterBy={(option, props) => {
                      if (option.isPlaceholder) return true;

                      const text = props.text || "";
                      return option.company_name
                        .toLowerCase()
                        .includes(text.toLowerCase());
                    }}
                    onChange={handleCompanySelection}
                    className={`custom-typeahead ${
                      !isCategorySelected || allCompanies ? "disabled" : ""
                    }`}
                  />

                  <label className="typeahead-label">Select Company</label>

                  <span
                    className="typeahead-caret"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent clash
                      if (
                        !companyRef.current?.props.disabled &&
                        !allCompanies
                      ) {
                        companyRef.current.toggleMenu();
                      }
                    }}
                  >
                    <i className="bi bi-chevron-down"></i>
                  </span>
                </div>
              </div>

              <div className="col-md-2">
                <div className="d-flex align-items-center gap-3 ms-2 mt-3">
                  <input
                    type="checkbox"
                    className="form-check-input border border-1 border-dark"
                    disabled={!allowAllCompanies}
                    checked={allCompanies}
                    onChange={handleAllCompaniesCheckbox}
                  />
                  <label className="form-check-label">All Companies</label>
                </div>
              </div>

              <div className="col-md-10">
                <div
                  className={`typeahead-wrapper ${
                    !selectedCompanies.length || allContactPersons
                      ? "disabled"
                      : ""
                  }`}
                >
                  <Typeahead
                    id="contact_person"
                    ref={contactRef}
                    multiple
                    options={contactPersonOptions}
                    labelKey="full_name"
                    minLength={0}
                    disabled={
                      !selectedCategory ||
                      !selectedCompanies.length ||
                      allContactPersons
                    }
                    selected={allContactPersons ? [] : selectedContacts}
                    value={selectedContacts}
                    placeholder={
                      allContactPersons
                        ? "All Contact Persons Selected"
                        : "-- Select --"
                    }
                    filterBy={(option, props) => {
                      if (option.isPlaceholder) return true;
                      return option.full_name
                        .toLowerCase()
                        .includes(props.text.toLowerCase());
                    }}
                    onChange={handleContactPersonSelection}
                    className={`custom-typeahead ${
                      !selectedCompanies.length || allContactPersons
                        ? "disabled"
                        : ""
                    }`}
                  />
                  <label className="typeahead-label">
                    Select Contact Person
                  </label>

                  <span
                    className="typeahead-caret"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent clash
                      if (
                        !contactRef.current?.props.disabled &&
                        !allContactPersons
                      ) {
                        contactRef.current.toggleMenu();
                      }
                    }}
                  >
                    <i className="bi bi-chevron-down"></i>
                  </span>
                </div>
              </div>

              <div className="col-md-2">
                <div className="d-flex align-items-center gap-3 ms-2 mt-3">
                  <input
                    type="checkbox"
                    className="form-check-input border border-1 border-dark"
                    disabled={!selectedCompanies.length}
                    checked={allContactPersons}
                    onChange={handleAllContactPersonCheckbox}
                  />
                  <label className="form-check-label">
                    All Contact Persons
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isHolidayCategory && (
          <div className="row align-items-start mt-2">
            <div className="col-md-2">
              <h6>Holiday Information</h6>
            </div>
            <div className="col">
              <div className="row g-1">
                {holidayInformationFields.map(({ label, name, col = 2 }) => (
                  <div className={`col-${col}`} key={name}>
                    <div className="form-floating">
                      <input
                        type="select"
                        className="form-control form-control-sm rounded-4 border border-1 border-dark"
                        placeholder={label}
                        disabled={!selectedContacts.length}
                        onChange={(e) =>
                          setHolidayData((prev) => ({
                            ...prev,
                            [name]: e.target.value,
                          }))
                        }
                      />
                      <label>{label}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="row mt-4">
          <div className="col text-center">
            <button
              className="btn btn-primary mx-2"
              disabled={!selectedContacts.length || isPreviewClicked}
              onClick={handlePreviewClick}
            >
              Preview
            </button>
            <button className="btn btn-primary mx-2" onClick={handleResetClick}>
              Reset
            </button>
          </div>
        </div>

        {previewHtml && isPreviewClicked && (
          <div className="row my-4">
            <div className="col-12">
              <h6>Email Preview</h6>

              {/* <div
                className="email-preview border rounded-3 border-dark p-3"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              /> */}
              <iframe
                title="email-preview"
                srcDoc={buildPreviewHtml(previewHtml)}
                style={{
                  width: "100%",
                  height: "500px",
                  border: "1px solid #000",
                  borderRadius: "0.5rem",
                  backgroundColor: "#fff",
                }}
              />
            </div>
            <div className="col text-center mt-3">
              <button
                className="btn btn-primary mx-2 mb-2"
                //   disabled={!isPreviewClicked}
                onClick={handleSendMailClick}
              >
                Send Mail
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EmailTemplate;
