import { input } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../../util";
import sharedInputs from "./sharedInputs";

const customerId = input({
  label: "Customer ID",
  comments: "Customer record ID to create the sales order for.",
  type: "string",
  required: true,
  placeholder: "27903",
  example: "27903",
  dataSource: "selectCustomer",
  clean: cleanNumberInput,
});

const documentNo = input({
  label: "Document Number",
  comments:
    "Sales order document number. If the SOP setting in Sage 200 Professional is to NOT automatically generate numbers, then this property MUST be set. If the SOP setting in Sage 200 Professional is to automatically generate numbers, or you are using Sage 200 Standard (which doesn't allow you to set this option), then setting this will be ignored.",
  type: "string",
  required: false,
  placeholder: "123",
  example: "123",
  clean: cleanStringInput,
});

export default {
  customerId,
  documentNo,
  ...sharedInputs,
};
