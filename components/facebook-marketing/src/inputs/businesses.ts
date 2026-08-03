import { input, util } from "@prismatic-io/spectral";
import { myConnectionField, version } from "./common";
const businessName = input({
  label: "Business Name",
  type: "string",
  required: true,
  example: "My Business",
  placeholder: "My Business",
  comments: "Provide the name of the business to search for.",
  clean: util.types.toString,
});
export const businessByNameInputs = {
  connection: myConnectionField,
  businessName,
  version,
};
