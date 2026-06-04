import { input, util } from "@prismatic-io/spectral";

import { toOptionalString } from "./utils";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const actionInput = input({
  label: "Action",
  placeholder: "Action",
  type: "string",
  required: true,
  default: "createOrUpdate",
  model: [
    { label: "Create or Update", value: "createOrUpdate" },
    { label: "Create Only", value: "createOnly" },
    { label: "Update Only", value: "updateOnly" },
  ],
  comments: "Type of sync operation to perform",
  clean: (value): string => util.types.toString(value, "createOrUpdate"),
});

export const fieldsInput = input({
  label: "Fields",
  type: "string",
  required: false,
  collection: "valuelist",
  clean: (values): string =>
    (Array.isArray(values) ? values : [])
      .map((value) => util.types.toString(value))
      .join(","),
  comments: "List of field names to include",
});

export const filterTypeInput = input({
  label: "Filter Type",
  type: "string",
  required: true,
  clean: (value): string => util.types.toString(value),
  comments: "The field to filter on",
});

export const filterValuesInput = input({
  label: "Filter Values",
  type: "string",
  required: true,
  collection: "valuelist",
  clean: (values): string =>
    (Array.isArray(values) ? values : [])
      .map((value) => util.types.toString(value))
      .join(","),
  comments: "A list of values to filter on for the specified field",
});

export const dedupeByInput = input({
  label: "Dedupe Field",
  type: "string",
  required: false,
  default: "dedupeFields",
  clean: (value): string => util.types.toString(value, "dedupeFields"),
  comments:
    "Field to deduplicate on. If the value in the field for a given record is not unique, an error will be returned for the individual record.",
});

export const batchSizeInput = input({
  label: "Batch Size",
  type: "string",
  required: false,
  clean: (value): number => util.types.toInt(value, 300),
  comments: "The batch size to return",
});

export const nextPageTokenInput = input({
  label: "Next Page Token",
  type: "string",
  required: false,
  clean: (value): string => util.types.toString(value),
  comments:
    "A token will be returned by this endpoint if the result set is greater than the batch size and can be passed in a subsequent call through this parameter",
});

export const deleteByField = input({
  label: "Delete By",
  placeholder: "Delete By",
  type: "string",
  required: true,
  default: "dedupeFields",
  model: [
    { label: "Dedupe Fields", value: "dedupeFields" },
    { label: "idField", value: "idField" },
  ],
  comments: "The type of deletion method",
  clean: util.types.toString,
});

export const idsToDeleteInput = input({
  label: "Ids",
  type: "data",
  required: true,
  clean: util.types.toObject,
  comments:
    "An array of objects that specify the id->value mapping for objects to delete.",
});

export const filterQueryInput = input({
  label: "Filter Query",
  type: "string",
  required: false,
  comments: "Filter results by matching this text.",
  example: "Some text to filter by",
  placeholder: "Enter text to filter by",
  clean: toOptionalString,
});

export const selectCompanyInputs = {
  connection: connectionInput,
  filterType: filterTypeInput,
  filterValues: filterValuesInput,
  filterQuery: filterQueryInput,
};

export const selectLeadInputs = {
  connection: connectionInput,
  filterQuery: filterQueryInput,
};

export const fetchAllInput = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments: "Whether to fetch all records or just the first page.",
  clean: util.types.toBool,
});
