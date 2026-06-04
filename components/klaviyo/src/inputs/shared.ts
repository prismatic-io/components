import { input, util } from "@prismatic-io/spectral";
import { cleanValueListInput } from "../utils";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const fields = input({
  label: "Fields",
  comments: "The fields to include in the response.",
  type: "string",
  collection: "valuelist",
  required: false,
  clean: cleanValueListInput,
});

export const excludeAuthorization = input({
  label: "Exclude Authorization",
  comments:
    "Exclude the Authorization header from the request. Turn this on and include the company_id query param when calling public endpoints (/client).",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});
