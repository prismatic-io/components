import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";
import sharedInputs from "./sharedInputs";

const reference = input({
  label: "Reference",
  type: "string",
  comments:
    "Customer account reference. Note: For Sage 200 Professional this is not required if customer reference is set to 'generate automatically' inside the Sage 200 application settings.",
  required: false,
  placeholder: "ref-1234",
  example: "ref-1234",
  clean: cleanStringInput,
});

const name = input({
  label: "Name",
  type: "string",
  comments: "Customer name.",
  required: true,
  placeholder: "John Doe",
  example: "John Doe",
  clean: cleanStringInput,
});

export default {
  reference,
  name,
  ...sharedInputs,
};
