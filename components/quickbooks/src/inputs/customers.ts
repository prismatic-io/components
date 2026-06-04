import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";

export const customerId = input({
  label: "Customer ID",
  placeholder: "Enter customer ID",
  type: "string",
  required: false,
  example: "56",
  dataSource: "selectCustomer",
  comments: "The ID of the customer to attach to the receipt.",
  clean: cleanStringInput,
});

export const customerName = input({
  label: "Customer Name",
  placeholder: "Enter customer name",
  type: "string",
  required: false,
  example: "John Doe",
  comments: "The name of the customer that will show on the receipt.",
  clean: cleanStringInput,
});

export const customerDisplayName = input({
  label: "Customer Display Name",
  placeholder: "Enter customer display name",
  type: "string",
  required: true,
  comments: "The display name of the customer in QuickBooks.",
  example: "Smith Rocket Company",
  clean: util.types.toString,
});
