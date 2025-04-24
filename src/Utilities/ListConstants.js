export const furnaceFunction = ["Holding", "Melting", "Melting cum Holding"];

export const furnaceType = ["Crucible", "Other Furnace"];

const contactPersonDesignation = [
  "Owner",
  "Plant Head",
  "Production Head",
  "Purchase Head",
  "Account Head",
  "Quality Head",
  "Store Head",
  "Melting Head",
  "R&D Head",
  "Maintenance Head",
  "Other Designation",
];

export const sortedDesignation = [...contactPersonDesignation].sort((a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
);

export const degassingMachine = [
  "HDU",
  "Mini HDU",
  "FDU",
  "MDU",
  "Smart MDU",
  "MTS 1500",
  "Other",
];

export const foundryType = [
  "Iron Foundry",
  "Steel Foundry",
  "Non-Ferrous Foundry",
];

export const meltingMetalsAndAlloys = [
  "Aluminium Alloys",
  "Copper Alloys",
  "Steel Alloys",
  "Zinc Alloys",
  "Iron Alloys",
];

export const manufacturingMethod = [
  "GDC",
  "LPDC",
  "HPDC",
  "Centrifugal",
  "Lost Foam",
  "Utensil",
  "Sand Moulding",
  "Shell Moulding",
  "Investment Casting",
  "Plaster Casting",
  "Vaccum Casting",
  "Continuous Casting",
  "Alloy Manufacturing",
];

const furnaceChargeMedia = [
  "Coal",
  "Induction",
  "Gas Fired",
  "Oil Fired",
  "Electric Resistance",
];

export const sortedFurnaceChargeMedia = [...furnaceChargeMedia].sort((a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
);

export const copperAlloysType = [
  "Brass",
  "Commercial Copper",
  "High Conductivity Copper",
  "Bronze & Gun Metal",
  "Aluminium Bronze & Mangneze Bronze",
  "Nickel Silver Alloys - Casting",
  "Nickel Silver Alloys - Hot & Cold Work",
  "Nickel Bronze & Nickel Silver Alloys",
];

const otherFurnaceType = [
  "Skelner",
  "Induction",
  "Tower",
  "Cupola",
  "Electric Arc",
  "Reverberatory",
];

export const sortedOtherFurnaceType = [...otherFurnaceType].sort((a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
);

export const consumableProductsType = ["Rotar", "Shaft", "Bottle Plate"];

const productType = [
  "Crucible",
  "Binder",
  "Powder Flux",
  "Granular Flux",
  "DX Tube",
  "DG Shape",
  "MOD Alloy",
  "Crucible Stand",
  "Melting",
  "Mould & Core Preparation",
  "Mould & Core Coatings",
  "Diecoatings",
  "Metal Treatment",
  "Copper Alloy Metal Treatment",
  "Degassing & Metal Treatment Station",
  "Feeding",
  "Filteration",
  "Melt Shop Refractories",
  "Machines",
  "Other Products",
];

export const sortedProductType = [...productType].sort((a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
);
