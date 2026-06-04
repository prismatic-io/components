import { input, util } from "@prismatic-io/spectral";
import {
  cleanKeyValueListInput,
  cleanStringInput,
  validateJSON,
} from "../util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The ShipStation connection to use.",
});

export const sortBy = input({
  label: "Sort By",
  type: "string",
  required: false,
  comments: "The API field name used to sort the returned results.",
  placeholder: "Enter sort field",
  clean: cleanStringInput,
});

export const sortDir = input({
  label: "Sort Direction",
  type: "string",
  required: false,
  comments: "The direction to sort results (asc or desc).",
  placeholder: "Enter sort direction",
  clean: cleanStringInput,
});

export const page = input({
  label: "Page",
  type: "string",
  required: false,
  comments: "The page number to retrieve (starts at 1).",
  placeholder: "Enter page number",
  clean: util.types.toNumber,
});

export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments: "The maximum number of results to return per page. Maximum: 500.",
  placeholder: "Enter page size",
  clean: util.types.toNumber,
});

export const startDate = input({
  label: "Start Date",
  type: "string",
  required: true,
  comments:
    "The start date to filter products by creation date in YYYY-MM-DD format.",
  example: "2014-04-03",
  placeholder: "Enter start date (YYYY-MM-DD)",
  clean: util.types.toString,
});

export const endDate = input({
  label: "End Date",
  type: "string",
  required: true,
  comments:
    "The end date to filter products by creation date in YYYY-MM-DD format.",
  example: "2014-05-04",
  placeholder: "Enter end date (YYYY-MM-DD)",
  clean: util.types.toString,
});



export const customerName = input({
  label: "Customer Name",
  type: "string",
  required: true,
  comments: "The full name associated with the customer record.",
  example: "John Smith",
  placeholder: "Enter customer name",
  clean: util.types.toString,
});

export const tagId = input({
  label: "Tag ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the tag to filter results by.",
  placeholder: "Enter tag ID",
  clean: cleanStringInput,
});

export const marketplaceId = input({
  label: "Marketplace ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the marketplace to filter results by.",
  placeholder: "Enter marketplace ID",
  clean: cleanStringInput,
});

export const showInactive = input({
  label: "Show Inactive",
  type: "boolean",
  required: false,
  comments: "When true, includes inactive stores in the results.",
  clean: util.types.toBool,
});

export const shipTo = input({
  label: "Shipping Address",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      name: "Jane Doe",
      company: "JD Company",
      street1: "123 Main St",
      city: "Austin",
      state: "TX",
      postalCode: "78701",
      country: "US",
      phone: "123-456-7890",
      residential: true,
    },
    null,
    2,
  ),
  comments: "Provide the shipping address in JSON format.",
  clean: validateJSON,
});

export const carrierCode = input({
  label: "Carrier Code",
  type: "string",
  required: true,
  comments: "The carrier code for the shipping label.",
  placeholder: "Enter carrier code",
  dataSource: "selectCarriers",
  clean: util.types.toString,
});

export const serviceCode = input({
  label: "Service Code",
  type: "string",
  required: true,
  comments: "The shipping service code for the label.",
  placeholder: "Enter service code",
  dataSource: "selectServices",
  clean: util.types.toString,
});

export const confirmation = input({
  label: "Confirmation",
  type: "string",
  required: true,
  comments:
    "The delivery confirmation type (e.g., none, delivery, signature, adult_signature, direct_signature).",
  example: "none, delivery, signature, adult_signature, direct_signature",
  placeholder: "Enter confirmation type",
  clean: util.types.toString,
});

export const shipDate = input({
  label: "Ship Date",
  type: "string",
  required: true,
  comments: "The date the order should be shipped in YYYY-MM-DD format.",
  example: "2014-04-03",
  placeholder: "Enter ship date (YYYY-MM-DD)",
  clean: util.types.toString,
});

export const testLabel = input({
  label: "Test Label",
  type: "boolean",
  required: true,
  comments: "When true, creates a test label.",
  clean: util.types.toBool,
});

export const labelAdditionalFieldsInput = input({
  label: "Additional Fields",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "A list of additional fields to include in the label for order.",
  example: "weight: {value: 2, units: 'pounds'}",
  clean: cleanKeyValueListInput,
});
