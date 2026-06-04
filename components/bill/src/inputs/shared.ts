import { input, util } from "@prismatic-io/spectral";
import { cleanArrayCodeInput, cleanCodeInput } from "../util";
export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Bill.com connection to use.",
});

export const filters = input({
  label: "Filters",
  type: "code",
  language: "json",
  comments: "An array of filters to apply.",
  required: false,
  placeholder: "Enter filter criteria",
  example: JSON.stringify(
    [{ field: "field1", op: "=", value: "something" }],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Filters"),
});

export const sort = input({
  label: "Sort",
  type: "code",
  language: "json",
  comments: "An array of sort objects.",
  required: false,
  placeholder: "Enter sort criteria",
  example: JSON.stringify([{ field: "field1", asc: true }], null, 2),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Sort"),
});

export const start = input({
  label: "Start",
  type: "string",
  comments: "Index of the first result.",
  required: true,
  placeholder: "Enter start index",
  example: "0",
  default: "0",
  clean: util.types.toNumber,
});

export const max = input({
  label: "Max",
  type: "string",
  comments: "Maximum number of results to return.",
  required: true,
  placeholder: "Enter maximum results",
  example: "999",
  default: "999",
  clean: util.types.toNumber,
});

export const nested = input({
  label: "Nested",
  type: "boolean",
  comments: "When true, includes additional nested data in the response.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  comments:
    "Additional fields that might not be covered by the standard inputs.",
  required: false,
  placeholder: "Enter additional fields",
  example: JSON.stringify({ customField: "value" }, null, 2),
  clean: (value: unknown) => cleanCodeInput(value, "Additional Fields"),
});

export const customerId = input({
  label: "Customer ID",
  type: "string",
  example: "0cu...",
  placeholder: "Enter customer ID",
  required: true,
  comments: "The unique identifier for the customer.",
  clean: util.types.toString,
  dataSource: "selectCustomer",
});

export const vendorId = input({
  label: "Vendor ID",
  type: "string",
  example: "009...",
  placeholder: "Enter vendor ID",
  required: true,
  comments: "The unique identifier for the vendor.",
  clean: util.types.toString,
  dataSource: "selectVendor",
});

export const accountNumber = input({
  label: "Account Number",
  type: "string",
  example: "0112345678",
  placeholder: "Enter account number",
  required: true,
  comments: "The bank account number.",
  clean: util.types.toString,
});

export const routingNumber = input({
  label: "Routing Number",
  type: "string",
  example: "012345678",
  placeholder: "Enter routing number",
  required: true,
  comments: "The bank routing number.",
  clean: util.types.toString,
});

export const mfaId = input({
  label: "MFA ID",
  type: "string",
  example: "!b_EJCd_jPIsZYT...",
  placeholder: "Enter MFA ID",
  required: true,
  comments:
    "The unique identifier for the MFA session. Retrieved from the 'Authenticate MFA session' action.",
  clean: util.types.toString,
});
export const deviceId = input({
  label: "Device ID",
  type: "string",
  example: "Acme-...",
  placeholder: "Enter device ID",
  required: true,
  comments:
    "The unique identifier for the device. Retrieved from the 'Authenticate MFA session' action.",
  clean: util.types.toString,
});
