import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { $top, connection, driveId, fetchAll, folderId, pagination, siteId } from "./common";
import { toOptionalString } from "../util/clean";

const deltaURL = input({
  label: "Delta URL",
  type: "string",
  required: true,
  placeholder: "Enter delta URL or link",
  comments:
    "The URL to track changes in a driveItem and its children over time. The @odata.nextLink or @odata.deltaLink from a previous response can also be pasted here to resume tracking changes.",
  example: "/drives/{drive-id}/root/delta",
  default: "/drives/{drive-id}/root/delta",
  clean: util.types.toString,
});

const $select = input({
  label: "Select",
  type: "string",
  required: false,
  placeholder: "Enter comma-separated field names",
  comments:
    "Filters properties (columns). See [select parameter](https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http#select).",
  example: "givenName,surname",
  clean: toOptionalString,
});

const $expand = input({
  label: "Expand",
  type: "string",
  required: false,
  placeholder: "Enter relationship to expand",
  comments:
    "Retrieves related resources. See [expand parameter](https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http#expand).",
  example: "members",
  clean: toOptionalString,
});

const recursive = input({
  label: "Recursive",
  type: "boolean",
  required: false,
  comments: "When true, returns files from all subfolders in addition to the specified folder.",
  clean: util.types.toBool,
});

export const listDrivesInputs = {
  connection,
  siteId,
  fetchAll,
  pagination,
};

export const getDriveInputs = {
  connection,
  siteId: { ...siteId, required: false, clean: toOptionalString },
  driveId,
};

export const getFilesFromDriveWithPaginationInputs = {
  connection,
  siteId: { ...siteId, required: false, clean: toOptionalString },
  driveId,
  fetchAll,
  pagination,
  recursive,
};

export const getFilesFromDriveFolderWithPaginationInputs = {
  connection,
  siteId: { ...siteId, required: false, clean: toOptionalString },
  driveId,
  folderId,
  fetchAll,
  pagination,
};

const queryParameters = structuredObjectInput({
  label: "Query Parameters",
  required: false,
  comments: "OData system query options to shape the delta query results.",
  inputs: {
    $select,
    $expand,
    $top,
  },
});

export const listChangesInputs = {
  connection,
  deltaURL,
  fetchAll,
  queryParameters,
};
