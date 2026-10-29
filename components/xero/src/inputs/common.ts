import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanStringInput } from "../util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Xero connection to use.",
});

export const contactId = input({
  label: "Contact ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the contact.",
  example: "example-e40f-414a-8f95-ce6a63196e1a",
  placeholder: "Enter contact ID",
  dataSource: "selectContact",
  clean: cleanStringInput,
});

export const invoiceId = input({
  label: "Invoice ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the invoice.",
  example: "example-e40f-414a-8f95-ce6a63196e1a",
  placeholder: "Enter invoice ID",
  dataSource: "selectInvoice",
  clean: util.types.toString,
});

export const accountId = input({
  label: "Account ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the account.",
  example: "example-e40f-414a-8f95-ce6a63196e1a",
  placeholder: "Enter account ID",
  dataSource: "selectAccount",
  clean: util.types.toString,
});

export const notes = input({
  label: "Notes",
  type: "string",
  required: false,
  comments: "The note text to add to the object's history.",
  placeholder: "Enter notes",
  example: "These are example notes.",
  clean: cleanStringInput,
});

export const description = input({
  label: "Description",
  type: "string",
  required: false,
  comments: "A summary that describes the item.",
  example: "This is an example description",
  placeholder: "Enter description",
  clean: cleanStringInput,
});

export const purchaseTaxType = input({
  label: "Purchase Tax Type",
  type: "string",
  required: false,
  comments:
    "The tax type applied to purchases. Choose a value from the [Xero tax types](https://developer.xero.com/documentation/api/accounting/types#tax-types).",
  example: "NONE",
  placeholder: "Enter purchase tax type",
  clean: cleanStringInput,
});

export const dateString = input({
  label: "Date String",
  type: "string",
  required: false,
  comments: "The date the record was created. Format: YYYY-MM-DDTHH:MM:SS.",
  placeholder: "Enter date string",
  example: "2021-05-27T00:00:00",
  clean: cleanStringInput,
});

export const fieldValues = input({
  label: "Optional Values",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  comments:
    "For each item, provide a key and value to be used in the request body.",
  placeholder: "Enter optional values",
  example: "exampleValue",
});

export const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  comments:
    "Additional fields that might not be covered by the standard inputs.",
  required: false,
  clean: (value: unknown) => cleanCodeInput(value, "Additional Fields"),
});

export const page = input({
  label: "Page Number",
  type: "string",
  required: false,
  example: "3",
  comments:
    "The page of results to return (1-based). Pagination is only enabled when more than 100 elements are returned by the request. The page size cannot be specified.",
  placeholder: "Enter page number",
  clean: cleanStringInput,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "When true, automatically fetches all pages of results. This ignores the page number input.",
  default: "false",
  clean: util.types.toBool,
});

export const modifiedAfter = input({
  label: "Modified After",
  type: "string",
  required: false,
  example: "2021-05-27T00:00:00",
  comments:
    "Only records created or modified since this timestamp will be returned. Format: YYYY-MM-DDTHH:MM:SS.",
  placeholder: "Enter modified after timestamp",
  clean: cleanStringInput,
});

export const where = input({
  label: "Where",
  type: "string",
  required: false,
  example: `Name.Contains("Peter")`,
  comments:
    "A filter expression applied to endpoints and elements that don't have explicit parameters.",
  placeholder: "Enter where filter",
  clean: cleanStringInput,
});
