import { sortedProductType } from "../../Utilities/ListConstants";

export const productBasicInfoFields = [
  { label: "Product Name *", name: "name" },
  { label: "HSN Code *", name: "HSNcode", col: 2 },
  {
    label: "Standard Pack Size *",
    name: "std_size",
    col: 2,
  },
  {
    label: "Unit *",
    name: "standard_pack_size_unit",
    col: 1,
    type: "select",
    options: ["Box", "Kg", "Ltr", "Nos"],
  },
  { label: "Price *", name: "price", col: 1 },
  {
    label: "Product Group ",
    name: "product_type",
    type: "select",
    options: sortedProductType,
  },
];

export const crucibleProductTypeFields = [
  { label: "Top Diameter", name: "top_diameter" },
  { label: "Bottom Diameter", name: "bottom_diameter" },
  { label: "Height", name: "height" },
  { label: "Weight", name: "weight" },
  { label: "Water Capacity", name: "water_capacity" },
  { label: "Aluminium Capacity", name: "aluminium_capacity" },
];

export const capexRadioFields = [
  { id: "capex", label: "Yes", value: true },
  { id: "nonCapex", label: "No", value: false },
];
