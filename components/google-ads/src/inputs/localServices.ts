import { input } from "@prismatic-io/spectral";
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

export const accountReportsInputs = {
  connection: connectionInput,
  managerCustomerIdInput,
  customerIds,
  pageSizeInput: {
    ...pageSizeInput,
    required: false,
    default: "1000",
  },
  pageTokenInput,
  startDateInput,
  endDateInput,
};

export const detailedLeadReportsInputs = {
  connection: connectionInput,
  managerCustomerIdInput,
  customerIds,
  pageSizeInput: {
    ...pageSizeInput,
    required: false,
    default: "1000",
  },
  pageTokenInput,
  startDateInput,
  endDateInput,
};
