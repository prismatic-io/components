import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  CONTENT_FRAGMENT_PROJECTIONS,
  CONTENT_FRAGMENT_REFERENCES,
  CONTENT_FRAGMENT_SORT_FIELDS,
  CONTENT_FRAGMENT_STATUSES,
} from "../constants";
import {
  cleanDamPath,
  cleanOptionalDateTime,
  cleanRequiredString,
  cleanString,
  cleanStringList,
} from "../utils/clean";
import { connection, fetchAll, pagination, sortOrder } from "./common";

const fragmentId = input({
  label: "Content Fragment ID",
  placeholder: "Select content fragment",
  type: "string",
  required: true,
  dataSource: "selectContentFragment",
  comments:
    "The unique identifier for the content fragment, a UUID as returned by List Content Fragments or Search Content Fragments.",
  example: "4f2b6c1e-8d3a-4b5c-9e7f-0a1b2c3d4e5f",
  clean: cleanRequiredString,
});

export const tags = input({
  label: "Tags",
  placeholder: "Enter tag ID",
  type: "string",
  collection: "valuelist",
  required: false,
  default: [],
  comments: "Only return content fragments with at least one of these tag IDs.",
  example: "wknd-shared:season/summer",
  clean: cleanStringList,
});

export const locales = input({
  label: "Locales",
  placeholder: "Enter locale",
  type: "string",
  collection: "valuelist",
  required: false,
  default: [],
  comments: "Only return content fragments in one of these locales.",
  example: "en",
  clean: cleanStringList,
});

export const fragmentPath = input({
  label: "Path",
  placeholder: "Enter path",
  type: "string",
  required: false,
  dataSource: "selectFolderPath",
  comments:
    "Only return content fragments under this folder path below /content/dam, such as wknd/en/adventures. A full repository path starting with /content/dam is also accepted.",
  example: "wknd/en/adventures",
  clean: cleanDamPath,
});

const onlyDirectChildren = input({
  label: "Only Direct Children",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, only returns content fragments directly under Path, not in its subfolders.",
  clean: util.types.toBool,
});

const projection = input({
  label: "Projection",
  type: "string",
  required: false,
  model: CONTENT_FRAGMENT_PROJECTIONS,
  comments: "How much of each content fragment to return. Leave empty for the API default.",
  clean: cleanString,
});

const includeMetadata = input({
  label: "Include Metadata",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, includes each content fragment's metadata in the response.",
  clean: util.types.toBool,
});

const references = input({
  label: "References",
  type: "string",
  required: false,
  model: CONTENT_FRAGMENT_REFERENCES,
  comments: "Which referenced content to include. Leave empty to omit references.",
  clean: cleanString,
});

const statuses = input({
  label: "Statuses",
  type: "string",
  collection: "valuelist",
  required: false,
  default: [],
  model: CONTENT_FRAGMENT_STATUSES,
  comments: "Only return content fragments in one of these statuses.",
  clean: cleanStringList,
});

export const modelIds = input({
  label: "Content Fragment Models",
  placeholder: "Select content fragment model",
  type: "string",
  collection: "valuelist",
  required: false,
  default: [],
  dataSource: "selectContentFragmentModel",
  comments: "Only return content fragments based on one of these model IDs.",
  example: "L2NvbmYvd2tuZC1zaGFyZWQvc2V0dGluZ3MvZGFtL2NmbS9tb2RlbHMvYWR2ZW50dXJl",
  clean: cleanStringList,
});

const modifiedAfter = input({
  label: "Modified After",
  placeholder: "Enter date-time (ISO 8601)",
  type: "string",
  required: false,
  comments: "Only return content fragments modified after this ISO 8601 date-time.",
  example: "2026-01-01T00:00:00Z",
  clean: cleanOptionalDateTime,
});

const modifiedBefore = input({
  label: "Modified Before",
  placeholder: "Enter date-time (ISO 8601)",
  type: "string",
  required: false,
  comments: "Only return content fragments modified before this ISO 8601 date-time.",
  example: "2026-02-01T00:00:00Z",
  clean: cleanOptionalDateTime,
});

const publishedAfter = input({
  label: "Published After",
  placeholder: "Enter date-time (ISO 8601)",
  type: "string",
  required: false,
  comments: "Only return content fragments published after this ISO 8601 date-time.",
  example: "2026-01-01T00:00:00Z",
  clean: cleanOptionalDateTime,
});

const publishedBefore = input({
  label: "Published Before",
  placeholder: "Enter date-time (ISO 8601)",
  type: "string",
  required: false,
  comments: "Only return content fragments published before this ISO 8601 date-time.",
  example: "2026-02-01T00:00:00Z",
  clean: cleanOptionalDateTime,
});

const fullText = input({
  label: "Full Text",
  placeholder: "Enter search text",
  type: "string",
  required: false,
  comments: "Only return content fragments whose content matches this text.",
  example: "summer camping",
  clean: cleanString,
});

const sortOn = input({
  label: "Sort By",
  type: "string",
  required: false,
  model: CONTENT_FRAGMENT_SORT_FIELDS,
  comments: "The field to sort results by. Leave empty for the API default order.",
  clean: cleanString,
});

const dateRangeFilters = structuredObjectInput({
  label: "Date Range Filters",
  required: false,
  comments:
    "Optional date-range filters. Narrow results by when content fragments were last modified or published.",
  inputs: { modifiedAfter, modifiedBefore, publishedAfter, publishedBefore },
});

const filters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments: "Optional query controls to sort and refine the results.",
  inputs: { fullText, sortOn, sortOrder },
});

export const listContentFragmentsInputs = {
  connection,
  fetchAll,
  pagination,
  path: fragmentPath,
  projection,
  includeMetadata,
  references,
};

export const searchContentFragmentsInputs = {
  connection,
  fetchAll,
  pagination,
  path: fragmentPath,
  onlyDirectChildren,
  statuses,
  modelIds,
  tags,
  locales,
  dateRangeFilters,
  filters,
  projection,
  includeMetadata,
};

export const getContentFragmentInputs = {
  connection,
  fragmentId,
  includeMetadata,
  references,
};

export const listContentFragmentVariationsInputs = {
  connection,
  fragmentId,
  fetchAll,
  pagination,
};

export const listContentFragmentModelsInputs = {
  connection,
  fetchAll,
  pagination,
  projection,
};
