import { input, util } from "@prismatic-io/spectral";
import { DEFAULT_DAM_ROOT, FOLDER_LISTING_TYPES, FOLDER_ORDER_BY } from "../constants";
import {
  cleanFolderPaths,
  cleanRequiredDamPath,
  cleanRequiredString,
  cleanString,
} from "../utils/clean";
import { connection, fetchAll, pagination } from "./common";

const folderPath = input({
  label: "Folder Path",
  placeholder: "Enter folder path",
  type: "string",
  required: true,
  default: DEFAULT_DAM_ROOT,
  dataSource: "selectFolderPath",
  comments:
    "The folder path below /content/dam, such as wknd-shared/en. A full repository path starting with /content/dam is also accepted.",
  example: "wknd-shared/en",
  clean: cleanRequiredDamPath,
});

const types = input({
  label: "Item Types",
  type: "string",
  required: false,
  default: "FOLDER,ASSET",
  model: FOLDER_LISTING_TYPES,
  comments: "Which kinds of items to list.",
  clean: cleanString,
});

const orderBy = input({
  label: "Order By",
  type: "string",
  required: false,
  model: FOLDER_ORDER_BY,
  comments: "The field to order items by. Leave empty for the API default order.",
  clean: cleanString,
});

export const listFolderContentsInputs = {
  connection,
  path: folderPath,
  fetchAll,
  pagination,
  types,
  orderBy,
};

export const listAssetsInFolderTreeInputs = {
  connection,
  path: {
    ...folderPath,
    label: "Root Folder Path",
    dataSource: "selectFolderPath",
    comments:
      "The path of the folder to walk, below /content/dam, such as wknd-shared/en. Assets in every subfolder are included. A full repository path starting with /content/dam is also accepted.",
  },
};

const folderPaths = input({
  label: "Folder Paths",
  placeholder: "Enter folder path",
  type: "string",
  collection: "valuelist",
  required: true,
  comments:
    "The folder paths below /content/dam, such as wknd-shared/en/new-folder. A full repository path starting with /content/dam is also accepted.",
  example: "wknd-shared/en/new-folder",
  clean: cleanFolderPaths,
});

const recursive = input({
  label: "Recursive",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, deletes each folder and everything inside it.",
  clean: util.types.toBool,
});

const force = input({
  label: "Force",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, deletes even when assets in the folders are referenced elsewhere.",
  clean: util.types.toBool,
});

export const jobId = input({
  label: "Job ID",
  placeholder: "Enter job ID",
  type: "string",
  required: true,
  comments: "The job ID returned by the action that started the job.",
  example: "5f8b2c1e-3a4d-4e6f-9b7a-1c2d3e4f5a6b",
  clean: cleanRequiredString,
});

export const createFoldersInputs = { connection, folderPaths };

export const deleteFoldersInputs = {
  connection,
  folderPaths: { ...folderPaths, dataSource: "selectFolderPath" },
  recursive,
  force,
};

export const getFolderJobStatusInputs = { connection, jobId };
