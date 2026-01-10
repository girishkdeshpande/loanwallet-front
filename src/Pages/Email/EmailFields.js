export const sendToInformationFields = [
  { label: "Select Company", name: "company", optionKey: "CompanyName" },
  {
    label: "Select Contact Person",
    name: "contact_person",
    optionKey: "ContactPersonName",
  },
];

export const checkBoxFields = [
  { label: "Select All Companies", name: "all_companies" },
  {
    label: "Select All Contact Persons",
    name: "all_contact_persons",
  },
];

export const holidayInformationFields = [
  { label: "Holiday Reason", name: "festive", type: "text", col: 3 },
  { label: "From Date *", name: "fromDate", type: "date" },
  { label: "To Date *", name: "toDate", type: "date" },
];
