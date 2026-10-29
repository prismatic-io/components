import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  cleanBooleanInput,
  cleanCodeInput,
  cleanKeyValueListInput,
  cleanNumberInput,
  cleanStringInput,
} from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Workday connection to use.",
});

export const extraBody = input({
  label: "Extra Body",
  type: "code",
  language: "json",
  comments:
    "Additional body fields to include in the request as a JSON object.",
  required: false,
  example: JSON.stringify(
    { location: { id: "3aa5550b7fe348b98d7b5741afc65534" } },
    null,
    2,
  ),
  placeholder: "Enter extra body fields as JSON",
  clean: (value: unknown) => cleanCodeInput(value, "Extra Body"),
});

export const workerId = input({
  label: "Worker ID",
  comments: "Unique identifier for the Workday worker record.",
  type: "string",
  example: "3aa5550b7fe348b98d7b5741afc65534",
  placeholder: "Enter worker ID",
  required: true,
  dataSource: "selectWorker",
  clean: util.types.toString,
});

export const instanceDescriptor = input({
  label: "Instance Descriptor",
  comments: "Human-readable preview label for the referenced instance.",
  type: "string",
  example: "Logan McNeil",
  placeholder: "Enter instance descriptor",
  required: true,
  clean: util.types.toString,
});

export const instanceId = input({
  label: "Instance ID",
  comments: "Identifies the Workday instance being referenced.",
  type: "string",
  example: "3aa5550b7fe348b98d7b5741afc65534",
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
  example: "Employee_ID=21001",
  placeholder: "Enter reference ID",
  required: false,
  clean: cleanStringInput,
});

export const companyId = input({
  label: "Company ID",
  comments: "Identifies the Workday company.",
  type: "string",
  placeholder: "Enter company ID",
  example: "cb550da820584750aae8f807882fa79a",
  required: false,
  clean: cleanStringInput,
});

export const memo = input({
  label: "Memo",
  comments: "Free-text memo attached to the transaction.",
  type: "string",
  required: false,
  example: "Payment for June services",
  placeholder: "Enter memo",
  clean: cleanStringInput,
});

export const extraParameters = input({
  label: "Extra Parameters",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  example: '{"worker": "3aa5550b7fe348b98d7b5741afc65534"}',
  placeholder: "Enter extra parameters",
  comments:
    "Query parameters to be used in the request. This should be a list of key-value pairs.",
  clean: cleanKeyValueListInput,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, automatically fetches all pages of results using pagination. Offset is ignored and Limit sets the page size (default 100).",
  required: false,
  default: "false",
});

export const pagination = structuredObjectInput({
  label: "Pagination",
  comments:
    "Page-size and starting-position controls for the result collection.",
  required: false,
  inputs: {
    limit: input({
      label: "Limit",
      comments:
        "The maximum number of objects in a single response. The default is 20. The maximum is 100.",
      type: "string",
      example: "5",
      placeholder: "Enter limit",
      required: false,
      clean: cleanNumberInput,
    }),
    offset: input({
      label: "Offset",
      comments: `The zero-based index of the first object in a response collection. The default is 0. Use Offset with the Limit input to control paging of a response collection. Example: If Limit is 5 and Offset is 9, the response returns a collection of 5 objects starting with the 10th object.`,
      type: "string",
      example: "5",
      placeholder: "Enter offset",
      required: false,
      clean: cleanNumberInput,
    }),
  },
});

export const paginationQueryStringInputs = {
  fetchAll,
  pagination,
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

export const organizationTypeId = input({
  label: "Organization Type ID",
  comments:
    "Workday ID of the organization type to list, such as a supervisory or cost center organization type. Workday documents that organization requests must provide an organization type.",
  type: "string",
  example: "3cb0fdb7e3354a05b0a5e1c8a9d0f4b2",
  placeholder: "Enter organization type ID",
  required: false,
  clean: cleanStringInput,
});

export const tenant = input({
  label: "Tenant",
  comments: "The Workday tenant name used in API paths.",
  type: "string",
  placeholder: "Enter tenant",
  example: "acme",
  required: true,
  clean: util.types.toString,
});

export const reportUrl = input({
  label: "Report URL",
  comments:
    "The report URL from Web Services > View URLs for the report in Workday. Must be on the same host as the connection. Any format parameter in the URL is replaced by the Format input.",
  type: "string",
  example:
    "https://wd2-impl-services1.workday.com/ccx/service/customreport2/acme/ISU_Orgvue/People_Report",
  placeholder: "Enter report URL",
  required: true,
  clean: util.types.toString,
});
