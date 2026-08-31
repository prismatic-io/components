import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { valueListInputClean } from "../util";
import {
  connectionInput,
  endDateInput,
  managerCustomerIdInput,
  pageSizeInput,
  pageTokenInput,
  startDateInput,
} from "./common";
const customerIds = input({
  label: "Customer IDs",
  placeholder: "Enter customer ID",
  type: "string",
  collection: "valuelist",
  required: false,
  clean: valueListInputClean,
  comments:
    "The Google Ads customer IDs to filter the Local Services report. Leave empty to include all accessible customers.",
});
const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page size and cursor controls for the result set.",
  inputs: {
    pageSizeInput: {
      ...pageSizeInput,
      required: false,
      default: "1000",
    },
    pageTokenInput,
  },
});
export const accountReportsInputs = {
  connection: connectionInput,
  managerCustomerIdInput,
  pagination,
  customerIds,
  startDateInput,
  endDateInput,
};
export const detailedLeadReportsInputs = {
  connection: connectionInput,
  managerCustomerIdInput,
  pagination,
  customerIds,
  startDateInput,
  endDateInput,
};
