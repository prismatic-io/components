import { input, util } from "@prismatic-io/spectral";
import { cleanString, jsonInputClean } from "../util";
import { connectionInput } from "./common";

export const resource = input({
  label: "Resource",
  type: "string",
  clean: util.types.toString,
  comments:
    "The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.",
  example: "projects/my-project/datasets/my-dataset/tables/my-table",
  placeholder: "Enter resource name",
  required: true,
});

export const updateMask = input({
  label: "Update Mask",
  type: "string",
  clean: cleanString,
  comments:
    "OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: paths: 'bindings, etag' \n This is a comma-separated list of fully qualified names of fields. Example: 'user.displayName,photo'.",
  example: "user.displayName,photo",
  placeholder: "Enter update mask",
  required: false,
});

export const options = input({
  label: "Options",
  type: "code",
  language: "json",
  comments:
    "OPTIONAL: A GetPolicyOptions object for specifying options to tables.getIamPolicy.",
  example: JSON.stringify({
    requestedPolicyVersion: "integer",
  }),
  clean: jsonInputClean,
  required: false,
});

export const policy = input({
  label: "Policy",
  type: "code",
  language: "json",
  comments:
    "The complete policy to be applied to the resource. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them.",
  example:
    "Reference to the Google docs for this input. https://cloud.google.com/bigquery/docs/reference/rest/v2/Policy",
  clean: jsonInputClean,
  required: false,
});


export const getPolicyInputs = {
  connectionInput,
  resource,
  options,
};

export const setPolicyInputs = {
  connectionInput,
  resource,
  policy,
  updateMask,
};
