import {
  sortedDesignation,
  furnaceFunction,
  sortedFurnaceChargeMedia,
  sortedOtherFurnaceType,
  degassingMachine,
  consumableProductsType,
} from "../../Utilities/ListConstants";

export const companyNameAddressFields = [
  { label: "Company Name *", name: "name" },
  { label: "Company Address *", name: "address" },
];

export const companyOtherFields = [
  { label: "GST Number", name: "gst_in" },
  { label: "Latitude *", name: "latitude" },
  { label: "Longitude *", name: "longitude" },
  { label: "Number of Furnace", name: "no_of_furnace" },
  { label: "Monthly Tonnage", name: "tonnage" },
  {
    label: "Client Executive",
    name: "customer_representative",
    type: "select",
  },
];

export const contactPersonFields = [
  { label: "First Name *", name: "first_name" },
  { label: "Last Name *", name: "last_name" },
  {
    label: "Designation",
    name: "designation",
    type: "select",
    options: sortedDesignation,
  },
  { label: "Email *", name: "email", col: 3 },
  { label: "Contact Number", name: "contactno" },
];

export const crucibleFurnaceFields = [
  {
    label: "Crucible Size*",
    name: "crucible_size",
    type: "select",
    col: 3,
  },
  { label: "Quantity*", name: "crucible_size_quantity", col: 1 },
  {
    label: "Crucible Stand*",
    name: "crucible_stand",
    type: "select",
    col: 3,
  },
  { label: "Quantity*", name: "crucible_stand_quantity", col: 1 },
  {
    label: "Function of Furnace*",
    name: "function_of_furnace",
    type: "select",
    options: furnaceFunction,
  },
  {
    label: "Furnace Charge Media*",
    name: "charge_media",
    type: "select",
    options: sortedFurnaceChargeMedia,
  },
];

export const otherFurnaceFields = [
  {
    label: "Furnace Type",
    name: "type",
    type: "select",
    options: sortedOtherFurnaceType,
  },
  { label: "Melting Capacity", name: "melting_capacity" },
  {
    label: "Function of Furnace*",
    name: "function_of_furnace",
    type: "select",
    options: furnaceFunction,
  },
  {
    label: "Charge Media*",
    name: "charge_media",
    type: "select",
    options: sortedFurnaceChargeMedia,
  },
];

export const transferLaddleFields = [
  { label: "Lining Material *", name: "lining_material", col: 3 },
  { label: "Capacity in KG *", name: "capacity" },
  { label: "Quantity *", name: "quantity", col: 1 },
];

export const fluxInjectorFields = [
  { label: "Make", name: "make" },
  { label: "Quantity", name: "quantity", col: 1 },
  { label: "Remark", name: "remark" },
];

export const densityRptFields = [
  { label: "Density", name: "density" },
  { label: "RPT", name: "rpt" },
];

export const capexDetailsFields = [
  {
    label: "Degassing Machine",
    name: "degassing_machine",
    type: "select",
    options: degassingMachine,
  },
  { label: "Make *", name: "make" },
  { label: "Quantity *", name: "quantity", col: 1 },
  {
    label: "Consumable Products",
    name: "consumable_product",
    type: "select",
    options: consumableProductsType,
  },
  {
    label: "Product",
    name: "product",
    type: "select",
    options: [],
  },
  { label: "Remark", name: "remark" },
];

export const companyRegisteringFields = [
  "name",
  "address",
  "latitude",
  "longitude",
];

export const mandatoryFieldsMap = {
  new_contact_person: ["first_name", "last_name", "email"],
  new_crucible_furnace: [
    "crucible_size",
    "crucible_size_quantity",
    "crucible_stand",
    "crucible_stand_quantity",
    "function_of_furnace",
    "charge_media",
  ],
  new_other_furnace: ["function_of_furnace", "charge_media"],
  new_transfer_laddle: ["lining_material", "capacity", "quantity"],
  new_capex_details: ["make", "quantity"],
};
