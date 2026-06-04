import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";
import { optionalUpdateBoolean } from "../general";
import sharedInputs from "./sharedInputs";

const customerId = input({
  label: "Customer ID",
  type: "string",
  comments: "The ID of the customer to update.",
  required: true,
  placeholder: "82060",
  example: "82060",
  dataSource: "selectCustomer",
  clean: cleanStringInput,
});

const onHold = {
  ...optionalUpdateBoolean,
  label: sharedInputs.onHold.label,
  comments: sharedInputs.onHold.comments,
};

export default {
  customerId,
  ...sharedInputs,
  onHold,
};
