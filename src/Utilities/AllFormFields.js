/* Quotation Module Fields */
import {
  quotationPrice,
  quotationDeliveryPeriod,
  quotationFreight,
  quotationPayment,
} from "./ListConstants";

export const sendToInfoFields = [
  {
    label: "To Company",
    name: "to_company",
    type: "s-typeahead",
  },
  {
    label: "Contact Person",
    name: "contact_person",
    type: "select",
  },
  {
    label: "CC Email To",
    name: "cc_to",
    type: "m-typeahead",
  },
  {
    label: "Subject",
    name: "subject",
  },
];

export const termsConditionFields = [
  {
    label: "Price",
    name: "tc_price",
    options: quotationPrice,
  },
  {
    label: "Delivery Period",
    name: "delivery_period",
    options: quotationDeliveryPeriod,
  },
  {
    label: "Freight",
    name: "freight",
    options: quotationFreight,
  },
  {
    label: "Payment",
    name: "payment",
    options: quotationPayment,
  },
];
