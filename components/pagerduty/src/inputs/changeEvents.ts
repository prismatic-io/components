import { input } from "@prismatic-io/spectral";
import { toOptionalStringArray } from "../util";

export const integrationIds = input({
  label: "Integration IDs",
  type: "string",
  placeholder: "Enter an integration ID",
  example: "PEYSGVF",
  required: false,
  collection: "valuelist",
  clean: toOptionalStringArray,
  comments:
    "The unique identifiers of the integrations to filter results by.",
});
