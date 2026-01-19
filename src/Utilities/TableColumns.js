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

export const contactPersonColumns = [
  { key: "first_name", label: "First Name", width: "19%" },
  { key: "last_name", label: "Last Name", width: "19%" },
  { key: "designation", label: "Designation", width: "16%" },
  { key: "email", label: "Email", width: "25%" },
  { key: "contactno", label: "Contact Number", width: "15%" },
];

export const crucibleFurnaceColumns = [
  { key: "crucible_size", label: "Crucible Size", width: "25%" },
  { key: "crucible_size_quantity", label: "Quantity", width: "3%" },
  { key: "crucible_stand", label: "Crucible Stand", width: "27%" },
  { key: "crucible_stand_quantity", label: "Quantity", width: "3%" },
  { key: "function_of_furnace", label: "Function Of Furnace", width: "17%" },
  {
    key: "charge_media",
    label: "Furnace Charge Media",
    width: "18%",
  },
];

export const otherFurnaceColumns = [
  { key: "type", label: "Furnace Type", width: "25%" },
  { key: "melting_capacity", label: "Melting Capacity", width: "23%" },
  { key: "function_of_furnace", label: "Function Of Furnace", width: "23%" },
  { key: "charge_media", label: "Charge Media", width: "23%" },
];

export const transferLaddleColumns = [
  { key: "lining_material", label: "Lining Material", width: "54%" },
  { key: "capacity", label: "Capacity (KG)", width: "30%" },
  { key: "quantity", label: "Quantity", width: "10%" },
];

export const capexDetailsColumns = [
  { key: "degassing_machine", label: "Degassing Machine", width: "15%" },
  { key: "make", label: "Make", width: "15%" },
  { key: "quantity", label: "Quantity", width: "5%" },
  { key: "consumable_product", label: "Consumable Products", width: "15%" },
  { key: "product", label: "Product", width: "24%" },
  { key: "remark", label: "Remark", width: "20%" },
];

export const fluxInjectorMachineColumns = [
  { key: "make", label: "Make", width: "24%" },
  { key: "quantity", label: "Quantity", width: "10%" },
  { key: "remark", label: "Remark", width: "60%" },
];

export const salesColumns = [
  { key: "trasaction_date", label: "Invoice Date", width: "12%" },
  { key: "invoice_number", label: "Invoice Number", width: "12%" },
  { key: "transaction_type", label: "Transaction Type", width: "11%" },
  {
    key: "company",
    label: "Company",
    width: "44%",
    render: (row) =>
      row.transaction_type === "Sale" ? row.to_company : row.from_company,
  },
  { key: "total_amount", label: "Total Amount", width: "11%" },
];

export const transactionDetailsColumns = [
  { key: "item_code", label: "Item", width: "40%" },
  { key: "quantity", label: "Quantity", width: "10%" },
  { key: "unit_price", label: "Per Quantity Price (₹)", width: "20%" },
  { key: "taxable_amount", label: "Total Price (₹)", width: "15%" },
];

export const visitColumns = [
  { key: "date_of_visit", label: "Visit Date", width: "8%" },
  { key: "time_of_visit", label: "Visit Time", width: "7%" },
  { key: "user_name", label: "Visit By", width: "12%" },
  { key: "company_name", label: "Visit to Company", width: "16%" },
  {
    key: "quotation",
    label: "Quotation ?",
    width: "8%",
    render: (row) => (row.quotation === null ? "No" : "Yes"),
  },
  {
    key: "valid_visit",
    label: "Valid Visit",
    width: "8%",
    render: (row) => (row.valid_visit === false ? "No" : "Yes"),
  },
  { key: "summary", label: "Summary", width: "37%", truncate: true },
];

export const expenseColumns = [
  { key: "timeline", label: "Expense Date", width: "10%" },
  {
    key: "user_name",
    label: "Expense Raised By",
    width: "15%",
    render: (row) =>
      row.user.first_name && row.user.last_name
        ? row.user.first_name + " " + row.user.last_name
        : row.user.first_name || row.user.last_name,
  },
  { key: "category", label: "Expense Category", width: "12%" },
  { key: "summary", label: "Expense Summary", width: "40%", truncate: true },
  { key: "price", label: "Expense Amount", width: "13%" },
  {
    key: "status",
    label: "Status",
    width: "10%",
    render: (row) => (row.approved === false ? "Not Approved" : "Approved"),
  },
];

export const quotationColumns = [
  { key: "date", label: "Date", width: "10%" },
  { key: "user_name", label: "Quotation Prepared By", width: "25%" },
  { key: "company_name", label: "Prepared for Company", width: "42%" },
  { key: "total_price", label: "Quotation Amount", width: "13%" },
  {
    key: "open_close_status",
    label: "Status",
    width: "10%",
    render: (row) => (row.open_close_status === false ? "Closed" : "Open"),
  },
];

export const quotationDetailsColumns = [
  {
    key: "name",
    label: "Product Name",
    width: "40%",
    render: (row) => row.product.name || "",
  },
  {
    key: "HSNcode",
    label: "HSN Code",
    width: "10%",
    render: (row) => row.product.HSNcode || "",
  },
  { key: "gst", label: "GST", width: "5%" },
  { key: "price", label: "Price", width: "10%" },
];

export const quotationPreviewColumns = [
  { key: "name", label: "Product Name", width: "20%" },
  { key: "HSNcode", label: "HSN Code", width: "10%" },
  { key: "std_size", label: "Pack Size", width: "5%" },
  { key: "price", label: "Unit Price", width: "7%" },
  { key: "gst", label: "GST", width: "5%" },
  { key: "total_price", label: "Total Price", width: "10%" },
];

export const todoColumns = [
  { key: "user_name", label: "Event Scheduler", width: "15%" },
  { key: "plan_time", label: "Event Time", width: "10%" },
  { key: "title", label: "Event Title", width: "35%" },
  {
    key: "description",
    label: "Event Description",
    width: "35%",
    truncate: true,
  },
];
