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
    valueResolver: (row) =>
      row.transaction_type === "Sale" ? row.to_company : row.from_company,
  },
  { key: "total_amount", label: "Total Amount", width: "11%" },
];

export const transactionDetailsColumns = [
  { key: "item_code", label: "Item", width: "40%" },
  { key: "quantity", label: "Quantity", width: "10%" },
  { key: "unit_price", label: "Individual Price (₹)", width: "20%" },
  { key: "taxable_amount", label: "Total Price (₹)", width: "15%" },
];
