import { input, util } from "@prismatic-io/spectral";
import { connection, driveId, folderId, siteId } from "./common";
import { toOptionalString } from "../util/clean";

const query = input({
  label: "Query",
  type: "string",
  required: true,
  example: "Invoices",
  placeholder: "Enter search query",
  comments: "The search query to find items by name.",
  clean: util.types.toString,
});

const itemPath = input({
  label: "Item Path",
  type: "string",
  required: true,
  example: "MyFolder/example.txt",
  placeholder: "Enter item path",
  comments: "The path to the file or folder, relative to the drive root.",
  clean: util.types.toString,
});

export const listItemsInputs = {
  connection,
  siteId: { ...siteId, required: false, clean: toOptionalString },
  driveId: {
    ...driveId,
    comments: "Provide the id of the drive to list the items in.",
  },
  folderId: {
    ...folderId,
    comments: "Provide the id of the folder to list the items in.",
    required: true,
  },
};

export const searchItemsInputs = {
  connection,
  siteId: {
    ...siteId,
    comments: "Provide the id of the site to search the items in.",
  },
  query: {
    ...query,
    comments: "Provide the query to search for items by name.",
  },
};

export const checkItemExistsInputs = {
  connection,
  siteId: {
    ...siteId,
    comments: "Provide the id of the site to check the item in.",
  },
  driveId: {
    ...driveId,
    comments: "Provide the id of the drive to check the item in.",
  },
  itemPath: {
    ...itemPath,
    comments: "Provide the path to the file or folder, relative to the drive root.",
  },
};
