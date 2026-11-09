import { input, util } from "@prismatic-io/spectral";
import {
  cleanCustomerId,
  cleanString,
  toOptionalCustomerId,
  toOptionalInt,
} from "../util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Google Ads connection to use.",
});

export const customerIdInput = input({
  label: "Customer ID",
  placeholder: "Enter customer ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier for the Google Ads client account. Accepts hyphenated or number forms. See [Customer ID documentation](https://developers.google.com/google-ads/api/docs/concepts/call-structure#cid).",
  example: "111-222-4444",
  dataSource: "listAccessibleCustomers",
  clean: cleanCustomerId,
});

export const managerCustomerIdInput = input({
  label: "Manager Customer ID",
  placeholder: "Enter manager customer ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier for the Google Ads Manager account. Accepts hyphenated or number forms. When used in conjunction with a sub account as the customer ID, this value is used as the 'login-customer-id' header for the HTTP request. See [Customer ID documentation](https://developers.google.com/google-ads/api/docs/concepts/call-structure#cid).",
  example: "123-456-7890",
  dataSource: "listAccessibleCustomers",
  clean: cleanCustomerId,
});

export const pageSizeInput = input({
  label: "Page Size",
  placeholder: "Enter page size",
  type: "string",
  required: false,
  example: "100",
  clean: toOptionalInt,
  comments: "The maximum number of results to return per page.",
});

export const pageTokenInput = input({
  label: "Page Token",
  placeholder: "Enter page token",
  type: "string",
  required: false,
  example: "CJL5XLT2PWDmIpGNGciABRnu",
  clean: cleanString,
  comments:
    "The pagination cursor from a previous request. Returned in previous page responses.",
});

export const validateOnly = input({
  label: "Validate Only",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  default: "false",
  comments:
    "When true, the request is validated but not executed. Only errors are returned, not results.",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
  comments:
    "When true, automatically fetches all pages of results. When false, only the first page of results will be returned.",
});

export const startDateInput = input({
  label: "Start Date",
  placeholder: "Enter start date (MM-DD-YYYY)",
  type: "string",
  required: false,
  example: "01-01-2025",
  comments: "The start date of the date range, inclusive. Format: MM-DD-YYYY.",
  clean: cleanString,
});

export const endDateInput = input({
  label: "End Date",
  placeholder: "Enter end date (MM-DD-YYYY)",
  type: "string",
  required: false,
  example: "12-31-2025",
  comments: "The end date of the date range, inclusive. Format: MM-DD-YYYY.",
  clean: cleanString,
});

export const customerClientLevel = input({
  label: "Customer Client Level",
  type: "string",
  required: false,
  comments:
    "The hierarchy depth level of the customer client to retrieve. Defaults to 1 (direct children only).",
  example: "1",
  placeholder: "Enter level",
  default: "1",
  clean: cleanString,
});

export const encodingInput = input({
  label: "Hash Encoding",
  type: "string",
  required: false,
  example: "HEX",
  model: [
    { label: "HEX", value: "HEX" },
    { label: "BASE64", value: "BASE64" },
  ],
  comments:
    "The encoding format to select for hashed user data fields (such as email or phone). Required when `userData` fields are included in events.",
  clean: cleanString,
});

export const partialFailure = input({
  label: "Partial Failure",
  type: "boolean",
  required: true,
  clean: util.types.toBool,
  default: "false",
  comments:
    "When true, successful operations will be carried out and invalid operations will return errors. When false, all operations will be carried out in one transaction if and only if they are all valid. This should always be set to true. See [Partial failure documentation](https://developers.google.com/google-ads/api/docs/best-practices/partial-failures).",
});

export const linkedCustomerIdInput = input({
  label: "Linked Customer ID",
  placeholder: "Enter linked customer ID",
  type: "string",
  required: false,
  example: "111-222-4444",
  comments:
    "For partners acting on an advertiser's account through an account link: the advertiser's Google Ads customer ID, sent as the linked-customer-id header alongside the partner's Manager Customer ID. Accepts hyphenated or number forms. See [Google Ads REST authorization](https://developers.google.com/google-ads/api/rest/auth).",
  clean: toOptionalCustomerId,
});
