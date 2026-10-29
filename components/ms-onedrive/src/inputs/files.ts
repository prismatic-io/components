import { input, util } from "@prismatic-io/spectral";
import {
  cleanKeyValueList,
  cleanString,
  toOptionalString,
} from "../util/clean";
import {
  fetchAll,
  oneDriveConnection,
  pageLimit,
  pageToken,
  timeout,
} from "./common";
import { driveId } from "./drives";

export const dir = input({
  label: "Directory",
  type: "string",
  required: true,
  example: "/myFolder/examples",
  placeholder: "Enter directory path",
  comments:
    "The directory path of the file. Use a forward slash (/) to access the root directory.",
  clean: cleanString,
});

export const itemId = input({
  label: "Item Id",
  type: "string",
  required: true,
  example: "01NKDM7HMOJTVYMDOSXFDK2QJDXCDI3WUK",
  placeholder: "Enter item ID",
  comments: "The unique identifier of the drive item (file or folder).",
  dataSource: "listFilesInDirectory",
  clean: cleanString,
});

export const path = input({
  label: "Path",
  type: "string",
  required: true,
  example: "/myfiles/myfile.txt",
  placeholder: "Enter file or folder path",
  comments:
    "The path to the desired SharePoint resource. The root directory does not need to be included.",
  clean: cleanString,
});

export const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  example: "exampleFile.txt",
  placeholder: "Enter file name",
  comments: "The new name for the file.",
  clean: cleanString,
});

const search = input({
  label: "Search",
  type: "string",
  required: true,
  example: "myFile",
  placeholder: "Enter search text",
  comments: "The text to search for within the current drive.",
  clean: cleanString,
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
    "The URL to track changes in a driveItem and its children over time. You can also use the @odata.nextLink or @odata.deltaLink from a previous response to resume tracking changes. See [Microsoft Graph delta query documentation](https://learn.microsoft.com/en-us/graph/delta-query-overview).",
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
  clean: cleanKeyValueList,
});

const $select = input({
  label: "$select Parameter",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of properties to include in the response. See [Microsoft Graph $select documentation](https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http#select-parameter).",
  example: "givenName,surname",
  placeholder: "Enter properties to select",
  clean: toOptionalString,
});

const $expand = input({
  label: "$expand Parameter",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of related resources to include in the response. See [Microsoft Graph $expand documentation](https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http#expand-parameter).",
  example: "members",
  placeholder: "Enter relationships to expand",
  clean: toOptionalString,
});

const $top = input({
  label: "$top Parameter",
  type: "string",
  required: false,
  comments:
    "The maximum number of results to return per page. See [Microsoft Graph $top documentation](https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http#top-parameter).",
  example: "5",
  placeholder: "Enter maximum results",
  clean: toOptionalString,
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
      "Provide a leading slash followed by the location of your file within the current user's drive.",
  },
  timeout,
};

export const getItemInputs = {
  connection: oneDriveConnection,
  dir: {
    ...dir,
    label: "File Location",
    comments:
      "Provide a leading slash, followed by the location and name of your file.",
    example: "/folder1/myFile.txt",
  },
};

export const getItemByIdInputs = {
  connection: oneDriveConnection,
  driveId,
  itemId,
};

export const listChangesInputs = {
  oneDriveConnection,
  deltaURL,
  $select,
  $expand,
  $top,
};

export const listChildrenInputs = {
  connection: oneDriveConnection,
  driveId,
  itemId,
  fetchAll,
  pageLimit,
  pageToken,
};

export const listDriveItemsInputs = {
  connection: oneDriveConnection,
  dir,
  fetchAll,
  pageLimit,
  pageToken,
};

export const listSharedInputs = {
  connection: oneDriveConnection,
};

export const listSharedFilesInputs = {
  connection: oneDriveConnection,
  fetchAll,
  pageLimit,
  pageToken,
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
  fileName: { ...fileName, label: "New File Name", required: false },
  path: { ...path, label: "New File Path", required: false },
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
