import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import { connection, fetchAll } from "./common";

export const count = input({
  label: "Count",
  type: "string",
  required: false,
  comments: "The maximum number of results to return.",
  example: "10",
  placeholder: "Enter count",
  clean: util.types.toString,
});

export const include = input({
  label: "Include",
  type: "string",
  required: false,
  comments:
    "A comma-separated list of folder types to include in the response. Valid values are: envelope_folders, template_folders and shared_template_folders.",
  example: "envelope_folders",
  placeholder: "Enter folder types",
  clean: cleanString,
});

export const includeItems = input({
  label: "Include Items",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, folder items are included in the response.",
  clean: util.types.toBool,
});

export const startPosition = input({
  label: "Start Position",
  type: "string",
  required: false,
  comments:
    "The zero-based index of the result from which to start returning results.",
  example: "0",
  placeholder: "Enter start position",
  clean: util.types.toString,
});

export const subFolderDepth = input({
  label: "Sub Folder Depth",
  type: "string",
  required: false,
  comments:
    "If missing or any value other than -1, the returned list contains only the top-level folders. A value of -1 returns the complete folder hierarchy.",
  example: "1",
  placeholder: "Enter subfolder depth",
  clean: cleanString,
});

export const userFilter = input({
  label: "User Filter",
  type: "string",
  required: false,
  comments:
    "Narrows down the resulting folder list by the following values: all, owned_by_me and shared_with_me.",
  example: "all",
  placeholder: "Enter user filter",
  clean: cleanString,
});

const folderId = input({
  label: "Folder ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the folder.",
  example: "d6f6a764-1021-43df-b8db-06c5477dd28a",
  placeholder: "Enter Folder ID",
  clean: util.types.toString,
});

export const listFolderItemsInputs = {
  connection,
  folderId,
  fetchAll,
  includeItems,
};

const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { startPosition, count },
});

export const listFoldersInputs = {
  connection,
  fetchAll,
  pagination,
  include,
  includeItems,
  subFolderDepth,
  userFilter,
};
