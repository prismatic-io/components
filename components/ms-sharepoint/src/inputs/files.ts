import { input, util } from "@prismatic-io/spectral";
import { connection, driveId, folderId, itemId, listId, parentItemId, siteId } from "./common";
import { toOptionalString, toTrimmedString } from "../util/clean";

const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  placeholder: "Enter file name",
  comments: "The name of the file including extension.",
  example: "reports.csv",
  clean: toTrimmedString,
});

const fileData = input({
  label: "File Data",
  type: "data",
  required: true,
  comments:
    "The file content to upload to SharePoint. Reference a file from a previous step or provide file data.",
  clean: util.types.toData,
});

export const getFileInputs = {
  connection,
  siteId: { ...siteId, required: false, clean: toOptionalString },
  listId: { ...listId, required: false, clean: toOptionalString },
  driveId,
  itemId,
};

export const uploadFileInputs = {
  connection,
  siteId: { ...siteId, required: false, clean: toOptionalString },
  driveId,
  fileName,
  fileData,
  folderId,
};

export const updateFileInputs = {
  connection,
  siteId: { ...siteId, required: false, clean: toOptionalString },
  listId: { ...listId, required: false, clean: toOptionalString },
  driveId,
  itemId,
  fileData,
};

export const downloadFileInputs = {
  connection,
  siteId: { ...siteId, required: false, clean: toOptionalString },
  listId: { ...listId, required: false, clean: toOptionalString },
  driveId,
  itemId,
};

export const moveFileInputs = {
  connection,
  siteId: { ...siteId, required: false, clean: toOptionalString },
  listId: { ...listId, required: false, clean: toOptionalString },
  driveId: {
    ...driveId,
    comments: "Provide the id of the drive to move the file in.",
  },
  itemId: {
    ...itemId,
    comments: "Provide the id of the file to move.",
  },
  parentItemId: {
    ...parentItemId,
    label: "Destination Parent ID",
    comments: "Provide the Id of the destination parent element to move file to.",
  },
};
