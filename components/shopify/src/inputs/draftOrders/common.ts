import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanStringInput } from "../../util";

export const lineItems = input({
  label: "Line Items",
  type: "code",
  required: true,
  language: "json",
  example: `[{ title: "Custom Tee", price: "20.00", quantity: 2 }]`,
  placeholder: "Enter line items array",
  comments:
    "A JSON array of line item objects for the draft order. See [Draft Order line items](https://shopify.dev/api/admin-rest/2021-10/resources/draftorder#post-draft-orders) for available fields.",
  clean: cleanCodeInput,
});

export const useCustomerAddress = input({
  label: "Use Customer Address",
  type: "boolean",
  required: true,
  default: "true",
  comments: "When true, the order uses the customer's default address.",
  clean: util.types.toBool,
});

export const totalPrice = input({
  label: "Total Price",
  type: "string",
  required: false,
  example: "11.94",
  comments: "The total price of the order.",
  placeholder: "Enter total price",
  clean: cleanStringInput,
});

export const totalTax = input({
  label: "Total Tax",
  type: "string",
  required: false,
  example: "1.94",
  comments: "The total tax of the order.",
  placeholder: "Enter total tax",
  clean: cleanStringInput,
});

export const taxIncluded = input({
  label: "Taxes Included",
  type: "boolean",
  required: true,
  comments: "When true, tax is included in the total order price.",
  clean: util.types.toBool,
});

export const subTotalPrice = input({
  label: "Subtotal Price",
  type: "string",
  required: false,
  example: "398",
  comments: "The subtotal price of the order.",
  placeholder: "Enter subtotal price",
  clean: cleanStringInput,
});
