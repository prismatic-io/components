import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import {
  cleanBooleanInput,
  cleanCodeInput,
  cleanNumberInput,
  cleanStringInput,
} from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  comments:
    "Additional fields that might not be covered by the standard inputs.",
  required: false,
  example: "",
  clean: (value: unknown) => cleanCodeInput(value, "Additional Fields"),
});

export const workerId = input({
  label: "Worker ID",
  comments: "Unique identifier for the Workday worker record.",
  type: "string",
  example: "",
  placeholder: "Enter worker ID",
  required: true,
  dataSource: "selectWorker",
  clean: util.types.toString,
});

export const instanceDescriptor = input({
  label: "Instance Descriptor",
  comments: "Human-readable preview label for the referenced instance.",
  type: "string",
  example: "",
  placeholder: "Enter instance descriptor",
  required: true,
  clean: util.types.toString,
});

export const instanceId = input({
  label: "Instance ID",
  comments: "Identifies the Workday instance being referenced.",
  type: "string",
  example: "",
  placeholder: "Enter instance ID",
  required: true,
  clean: util.types.toString,
});

export const instanceHref = input({
  label: "Instance Href",
  comments: "Direct API link pointing to the referenced instance.",
  type: "string",
  example: "",
  placeholder: "Enter instance href",
  required: true,
  clean: util.types.toString,
});

export const referenceId = input({
  label: "Reference ID",
  comments: "Reference ID used for lookups within Workday Web Services.",
  type: "string",
  example: "",
  placeholder: "Enter reference ID",
  required: false,
  clean: cleanStringInput,
});

export const companyId = input({
  label: "Company ID",
  comments: "Identifies the Workday company.",
  type: "string",
  placeholder: "Enter company ID",
  example: "",
  required: false,
  clean: cleanStringInput,
});

export const memo = input({
  label: "Memo",
  comments: "Free-text memo attached to the transaction.",
  type: "string",
  required: false,
  example: "",
  placeholder: "Enter memo",
  clean: cleanStringInput,
});

export const params = input({
  label: "Query Params",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  example: "Key: worker, Value: 123",
  comments:
    "Query parameters to be used in the request. This should be a list of key-value pairs. Ex. Key: worker, Value: 123",
  clean: (value) => util.types.keyValPairListToObject(value as KeyValuePair[]),
});

export const paginationQueryStringInputs = {
  limit: input({
    label: "Limit",
    comments:
      "The maximum number of objects in a single response. The default is 20. The maximum is 100.",
    type: "string",
    example: "5",
    placeholder: "5",
    required: false,
    clean: cleanNumberInput,
  }),
  offset: input({
    label: "Offset",
    comments: `The zero-based index of the first object in a response collection. The default is 0. Use Offset with the Limit input to control paging of a response collection. Example: If Limit is 5 and Offset is 9, the response returns a collection of 5 objects starting with the 10th object.`,
    type: "string",
    example: "5",
    placeholder: "5",
    required: false,
    clean: cleanNumberInput,
  }),
};

export const modelBooleanUpdateInput = input({
  label: "",
  type: "string",
  required: false,
  default: undefined,
  model: ["True", "False"].map((choice) => ({
    label: choice,
    value: choice.toLowerCase(),
  })),
  clean: cleanBooleanInput,
});

export const tenant = input({
  label: "Tenant",
  comments: "The Workday tenant name used in API paths.",
  type: "string",
  placeholder: "Enter tenant",
  example: "",
  required: true,
  clean: util.types.toString,
});
