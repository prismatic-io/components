import { input, util } from "@prismatic-io/spectral";
import { connection } from "./common";
const returnIdInput = input({
  label: "Return ID",
  type: "boolean",
  comments:
    "Turn on to return the ID of the object (e.g. CUSTOMERID, PROJECTID, VENDORID, etc.) instead of the Record No.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});
const returnContactNameInput = input({
  label: "Return Contact Name",
  type: "boolean",
  comments: "Turn on to return the Contact Name instead of the Record No.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});
export const selectContactInputs = {
  connection,
  returnContactNameInput,
};
export const selectCustomerInputs = {
  connection,
  returnIdInput,
};
export const selectInvoiceInputs = {
  connection,
};
export const selectProjectInputs = {
  connection,
  returnIdInput,
};
export const selectVendorInputs = {
  connection,
  returnIdInput,
};
