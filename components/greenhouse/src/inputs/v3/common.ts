import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  toOptionalNumber,
  toOptionalObject,
  toOptionalString,
} from "../../util/clean";
import { connectionInput, per_page } from "../v1/common";
export { connectionInput };
export const connectionOnlyInputs = {
  connection: connectionInput,
};
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, fetches all pages of results by following the response Link headers. Page Size and Cursor are ignored.",
  clean: util.types.toBool,
});
export const perPage = {
  ...per_page,
  comments:
    "The maximum number of results to return per page. Must be an integer between 1 and 500. Defaults to 100.",
  clean: toOptionalNumber,
};
export const cursor = input({
  label: "Cursor",
  type: "string",
  required: false,
  comments:
    "The opaque pagination cursor from a previous response's Link header. When provided, it is sent as the only query parameter — the API rejects cursor requests that carry additional filters.",
  placeholder: "Enter cursor",
  example: "eyJwYWdlIjoyfQ",
  clean: toOptionalString,
});
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page-size and cursor controls for the results list.",
  inputs: { perPage, cursor },
});
export const cursorPaginationInputs = {
  fetchAll,
  pagination,
};
export const createTimestampOperatorInput = (
  field: string,
  label: string,
  operator: "gte" | "lte",
) =>
  input({
    label: `${label} ${operator === "gte" ? "At or After" : "At or Before"}`,
    type: "string",
    required: false,
    comments: `The ${operator === "gte" ? "lower" : "upper"} bound timestamp filter — sent as ${field}[${operator}]. Format: ISO-8601.`,
    placeholder: "Enter timestamp (ISO-8601 format)",
    example:
      operator === "gte" ? "2026-01-01T00:00:00Z" : "2026-01-15T10:30:00Z",
    clean: toOptionalString,
  });
export const createdAtGte = createTimestampOperatorInput(
  "created_at",
  "Created",
  "gte",
);
export const createdAtLte = createTimestampOperatorInput(
  "created_at",
  "Created",
  "lte",
);
export const updatedAtGte = createTimestampOperatorInput(
  "updated_at",
  "Updated",
  "gte",
);
export const updatedAtLte = createTimestampOperatorInput(
  "updated_at",
  "Updated",
  "lte",
);
export const customFieldsV3 = input({
  label: "Custom Fields",
  type: "code",
  language: "json",
  required: false,
  comments:
    "JSON array of custom field values. Each item must include either name_key (string) or custom_field_id (integer), plus a value.",
  example: '[{"name_key": "salary_expectation", "value": "80000"}]',
  clean: toOptionalObject,
});
