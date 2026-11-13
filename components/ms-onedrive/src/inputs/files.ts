import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  cleanKeyValueList,
  toOptionalNumber,
  toOptionalString,
  toOptionalTrimmedString,
  toTrimmedString,
} from "../util/clean";
import { fetchAll, oneDriveConnection, pagination } from "./common";
import { driveId } from "./drives";

const timeout = input({
  label: "Timeout",
  type: "string",
  required: false,
  example: "3000",
  placeholder: "Enter timeout in milliseconds",
  comments: "The maximum time in milliseconds to wait for a response.",
  clean: toOptionalNumber,
});

export const dir = input({
  label: "Directory",
  type: "string",
  required: true,
  example: "/myFolder/examples",
  placeholder: "Enter directory path",
  comments:
    "The directory path of the file. Use a forward slash (/) to access the root directory.",
  clean: toTrimmedString,
});

const itemId = input({
  label: "Item ID",
  type: "string",
  required: true,
  example: "01NKDM7HMOJTVYMDOSXFDK2QJDXCDI3WUK",
  placeholder: "Enter item ID",
  comments: "The unique identifier of the drive item (file or folder).",
  dataSource: "selectDriveItem",
  clean: toTrimmedString,
});

const path = input({
  label: "Path",
  type: "string",
  required: true,
  example: "/myfiles/myfile.txt",
  placeholder: "Enter file or folder path",
  comments:
    "The path to the desired SharePoint resource. The root directory does not need to be included.",
  clean: toTrimmedString,
});

const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  example: "exampleFile.txt",
  placeholder: "Enter file name",
  comments: "The new name for the file.",
  clean: toTrimmedString,
});

const search = input({
  label: "Search",
  type: "string",
  required: true,
  example: "myFile",
  placeholder: "Enter search text",
  comments: "The text to search for within the current drive.",
  clean: toTrimmedString,
});

const fileData = input({
  label: "File Data",
  type: "data",
  required: true,
  comments: "The binary content of the file to upload.",
  clean: util.types.toData,
});

const deltaURL = input({
  label: "Delta URL",
  type: "string",
  required: true,
  comments:
    "The URL to track changes in a driveItem and its children over time. The @odata.nextLink or @odata.deltaLink from a previous response can also be used to resume tracking changes. See [Microsoft Graph delta query documentation](https://learn.microsoft.com/en-us/graph/delta-query-overview).",
  example: "/drives/{drive-id}/root/delta",
  placeholder: "Enter delta URL or token",
  default: "/drives/{drive-id}/root/delta",
  clean: util.types.toString,
});

const values = input({
  label: "Optional Values",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  comments: "Optional key-value pairs to include in the request body.",
  example: '{"description": "Updated quarterly report"}',
  placeholder: "Enter key-value pairs",
  clean: cleanKeyValueList,
});

const $select = input({
  label: "Select",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of properties to include in the response. See [Microsoft Graph $select documentation](https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http#select).",
  example: "id,name,lastModifiedDateTime",
  placeholder: "Enter properties to select",
  clean: toOptionalString,
});

const $expand = input({
  label: "Expand",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of related resources to include in the response. See [Microsoft Graph $expand documentation](https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http#expand).",
  example: "thumbnails",
  placeholder: "Enter relationships to expand",
  clean: toOptionalString,
});

const $top = input({
  label: "Top",
  type: "string",
  required: false,
  comments:
    "The maximum number of results to return per page. See [Microsoft Graph $top documentation](https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http#top).",
  example: "5",
  placeholder: "Enter maximum results",
  clean: toOptionalNumber,
});

export const deleteFileInputs = {
  connection: oneDriveConnection,
  driveId,
  itemId,
};

export const downloadFileInputs = {
  connection: oneDriveConnection,
  fileLocation: {
    ...dir,
    label: "File Location",
    example: "/folder1/myExampleFile.csv",
    comments:
      "Provide a leading slash followed by the location of the file within the current user's drive.",
  },
  timeout,
};

export const getItemInputs = {
  connection: oneDriveConnection,
  dir: {
    ...dir,
    label: "File Location",
    comments:
      "Provide a leading slash, followed by the location and name of the file.",
    example: "/folder1/myFile.txt",
  },
};

export const getItemByIdInputs = {
  connection: oneDriveConnection,
  driveId,
  itemId,
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
  oneDriveConnection,
  deltaURL,
  queryParameters,
};

export const listChildrenInputs = {
  connection: oneDriveConnection,
  driveId,
  itemId,
  fetchAll,
  pagination,
};

export const listDriveItemsInputs = {
  connection: oneDriveConnection,
  dir,
  fetchAll,
  pagination,
};

export const listSharedInputs = {
  connection: oneDriveConnection,
};

export const listSharedFilesInputs = {
  connection: oneDriveConnection,
  fetchAll,
  pagination,
};

export const moveFileInputs = {
  connection: oneDriveConnection,
  dir: {
    ...dir,
    label: "Current Location",
    comments:
      "Provide a leading slash, followed by the location and name of the file",
    example: "/myFile.txt",
  },
  path: {
    ...path,
    label: "New Location",
    comments:
      "Provide a leading slash, followed by the new location of the file.",
  },
  fileName: { ...fileName, label: "New File Name", example: "myNewFile.txt" },
};

export const searchDriveInputs = {
  connection: oneDriveConnection,
  search,
};

export const updateFileInputs = {
  connection: oneDriveConnection,
  dir: {
    ...dir,
    label: "File Location",
    comments:
      "Provide a leading slash, followed by the location and name of the file.",
    example: "/folder1/myFile.txt",
  },
  fileName: {
    ...fileName,
    label: "New File Name",
    required: false,
    clean: toOptionalTrimmedString,
  },
  path: {
    ...path,
    label: "New File Path",
    required: false,
    clean: toOptionalTrimmedString,
  },
  values,
};

export const uploadFileInputs = {
  connection: oneDriveConnection,
  fileName: {
    ...fileName,
    label: "File Location",
    example: "/folder1/myNewFile.csv",
    comments:
      "Provide a leading slash, followed by the location and name of the new file.",
  },
  fileData,
  timeout,
};
