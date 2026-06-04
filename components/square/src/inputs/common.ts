import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util";

export function validateJSON(input: unknown): Record<string, unknown> {
  if (!util.types.isJSON(util.types.toString(input))) {
    throw new Error("Invalid JSON provided.");
  }
  return JSON.parse(util.types.toString(input));
}

export const squareConnection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Square connection to use.",
});

export const cursor = input({
  label: "Cursor",
  placeholder: "Enter cursor from previous response",
  type: "string",
  required: false,
  comments: "The pagination cursor returned by a previous call to this endpoint.",
  clean: toOptionalString,
});

export const limit = input({
  label: "Limit",
  placeholder: "Enter maximum results per page",
  type: "string",
  required: false,
  comments: "The maximum number of results to return in a single page.",
  example: "100",
  clean: toOptionalNumber,
});

export const sortField = input({
  label: "Sort Field",
  placeholder: "Select sort field",
  type: "string",
  required: false,
  comments: "The field used to sort the results.",
  model: [
    { label: "DEFAULT", value: "DEFAULT" },
    { label: "CREATED_AT", value: "CREATED_AT" },
    { label: "None", value: "" },
  ],
  clean: toOptionalString,
});

export const sortOrder = input({
  label: "Sort Order",
  placeholder: "Select sort order",
  type: "string",
  required: false,
  comments: "The order in which results are sorted.",
  model: [
    { label: "DESC", value: "DESC" },
    { label: "ASC", value: "ASC" },
    { label: "None", value: "" },
  ],
  clean: toOptionalString,
});

export const customerId = input({
  label: "Customer ID",
  placeholder: "Enter Customer ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the customer.",
  example: "JDKYHBWT1D4F8MFH63DBMEN8Y4",
  dataSource: "selectCustomers",
  clean: util.types.toString,
});

export const locationId = input({
  label: "Location ID",
  placeholder: "Enter Location ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the location.",
  example: "LH2G9VFHJRWKR",
  dataSource: "selectLocations",
  clean: util.types.toString,
});

export const location_id = input({
  label: "Location ID",
  placeholder: "Enter Location ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the location used to filter results.",
  example: "LH2G9VFHJRWKR",
  clean: toOptionalString,
});

export const idempotencyKey = input({
  type: "string",
  label: "Idempotency Key",
  required: false,
  placeholder: "Enter idempotency key",
  example: "a7c8e4b1-3f5d-4e2a-9c1b-7d3e5f8a2c6b",
  comments: "A unique string that identifies this request to ensure idempotent operations.",
  clean: toOptionalString,
});

export const beginTime = input({
  label: "Begin Time",
  type: "text",
  placeholder: "Enter start time (RFC 3339 format)",
  example: "2024-01-01T00:00:00Z",
  comments: "The timestamp marking the start of the time range. Format: RFC 3339.",
  required: true,
  clean: util.types.toString,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, automatically fetches all pages of results using cursor pagination.",
  clean: util.types.toBool,
});

export const version = input({
  label: "Version",
  placeholder: "Enter version number",
  type: "string",
  required: false,
  comments:
    "The version number used for optimistic concurrency control. Ensures the object has not been modified by another request.",
  example: "1",
  clean: toOptionalNumber,
});
