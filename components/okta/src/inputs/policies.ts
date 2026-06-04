import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util/clean";
import { TYPE_MODEL } from "../util/constants";
import { after, connection, expand, fetchAll, limit, q, sortBy } from "./general";

export const type = input({
  label: "Type",
  type: "string",
  comments:
    "Specifies the type of policy to return. The following policy types are available only with the Okta Identity Engine.",
  model: TYPE_MODEL,
  clean: util.types.toString,
  required: true,
});

export const status = input({
  label: "Status",
  type: "string",
  comments: "Specifies the status of the policies to return.",
  model: [
    { label: "ACTIVE", value: "ACTIVE" },
    { label: "INACTIVE", value: "INACTIVE" },
  ],
  clean: cleanString,
  required: false,
});

export const resourceId = input({
  label: "Resource ID",
  type: "string",
  comments: "Reference to the associated authorization server.",
  example: "00g1abcd2EFGH3IJK4l5",
  placeholder: "Add resource ID",
  required: false,
  clean: cleanString,
});

export const listPoliciesInputs = {
  type,
  status,
  fetchAll,
  q,
  expand,
  sortBy,
  limit,
  after,
  resourceId,
  connection,
};
