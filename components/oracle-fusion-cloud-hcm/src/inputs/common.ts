import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  cleanId,
  cleanIncludeMetadataLinks,
  cleanOptionalObject,
  cleanString,
} from "../util/transforms";
export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Oracle Fusion Cloud HCM connection to use.",
});
export const offset = input({
  label: "Offset",
  type: "string",
  required: false,
  comments: "The number of records to skip before returning results.",
  placeholder: "Enter offset",
  example: "25",
  clean: util.types.toNumber,
});
export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments:
    "The maximum number of records to return per request. Oracle HCM default is 25.",
  placeholder: "Enter limit",
  example: "100",
  clean: util.types.toNumber,
});
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Offset and limit controls for paging through results.",
  inputs: {
    offset,
    limit,
  },
});
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, retrieves every page of results and ignores the pagination offset and limit. When false, returns a single page.",
  clean: util.types.toBool,
});
export const effectiveDate = input({
  label: "Effective Date",
  type: "string",
  required: false,
  comments:
    "Filter results by effective date in YYYY-MM-DD format. Defaults to today if omitted.",
  placeholder: "Enter effective date (YYYY-MM-DD)",
  example: "2024-01-01",
  clean: cleanString,
});
export const expand = input({
  label: "Expand",
  type: "string",
  required: false,
  comments:
    "A comma-separated list of sub-resources to expand inline (e.g., assignments,phones,addresses). Use 'all' to expand all available sub-resources.",
  placeholder: "Enter sub-resources to expand",
  example: "assignments",
  clean: cleanString,
});
export const includeMetadataLinks = input({
  label: "Include Metadata Links",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, includes the metadata links (_links) in the response. When false, returns only data fields.",
  clean: cleanIncludeMetadataLinks,
});
export const personId = input({
  label: "Person ID",
  type: "string",
  required: true,
  comments:
    "The unique numeric identifier for the Oracle HCM worker (PersonId).",
  placeholder: "Enter person ID",
  example: "100000012345678",
  clean: cleanId,
});
export const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Any additional request-body fields not covered above, including nested collections (e.g. addresses, attachments). Provided as JSON and merged into the request body.",
  placeholder: "Enter additional fields as JSON",
  example: JSON.stringify(
    { addresses: [{ AddressLine1: "123 Main St" }] },
    null,
    2,
  ),
  clean: cleanOptionalObject,
});
