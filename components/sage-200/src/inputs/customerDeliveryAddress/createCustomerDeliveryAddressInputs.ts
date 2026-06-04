import { input } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../../util";
import sharedInputs from "./sharedInputs";

const customerId = input({
  label: "Customer Id",
  comments: "Unique Id of the customer account the customer delivery address is associated with.",
  type: "string",
  required: true,
  example: "27912",
  placeholder: "27912",
  dataSource: "selectCustomer",
  clean: cleanNumberInput,
});

const description = input({
  label: "Description",
  comments: "The description of the customer delivery address.",
  type: "string",
  required: true,
  example: "Home Address",
  placeholder: "Home Address",
  clean: cleanStringInput,
});

const taxCodeId = input({
  label: "Tax Code Id",
  comments: "The tax code record Id.",
  type: "string",
  required: true,
  example: "1729",
  placeholder: "1729",
  dataSource: "selectTaxCode",
  clean: cleanNumberInput,
});

export default {
  customerId,
  description,
  taxCodeId,
  ...sharedInputs,
};
