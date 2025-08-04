export const userColumns = [
  {
    key: "first_name",
    label: "User Name",
    width: "20%",
    render: (user) =>
      user.first_name && user.last_name
        ? user.first_name + " " + user.last_name
        : user.first_name || user.last_name,
  },
  { key: "email", label: "Email", width: "33%" },
  { key: "contactNo", label: "Contact Number", width: "15%" },
  { key: "total_visits", label: "Total Visits", width: "10%" },
  {
    key: "admin",
    label: "User Category",
    width: "12%",
    render: (user) => (user.isAdmin ? "Admin" : "Non-Admin"),
  },
  {
    key: "status",
    label: "Status",
    width: "7%",
    render: (user) => (user.status ? "Active" : "Inactive"),
  },
];

export const productColumns = [
  { key: "name", label: "Product Name", width: "30%" },
  { key: "HSNCode", label: "HSN Code", width: "15%" },
  { key: "product_type", label: "Product Type", width: "20%" },
  { key: "weight", label: "Weight", width: "10%" },
  { key: "aluminium_capacity", label: "Aluminium Capacity", width: "15%" },
  { key: "price", label: "Price", width: "10%" },
];

export const companyColumns = [
  { key: "name", label: "Company Name", width: "25%" },
  { key: "address", label: "Company Address", width: "45%" },
  { key: "gst_in", label: "GST Number", width: "15%" },
  { key: "tonnage", label: "Monthly Tonnage", width: "15%" },
];
