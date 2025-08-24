export const userFormFields = [
  { label: "First Name*", type: "text", name: "first_name" },
  { label: "Last Name*", type: "text", name: "last_name" },
  { label: "Contact Number*", type: "text", name: "contactNo" },
  {
    label: "Email*",
    type: "email",
    name: "email",
    col: 3,
  },
  { label: "Address*", type: "text", name: "address", col: 3 },
];

export const userPasswordFields = [
  { label: "Enter Password*", name: "enterPassword" },
  { label: "Re-Enter Password*", name: "password" },
];

export const userCategoryFields = [
  {
    id: "admin",
    label: "Admin",
    value: true,
  },
  {
    id: "nonAdmin",
    label: "Non-Admin",
    value: false,
  },
];
