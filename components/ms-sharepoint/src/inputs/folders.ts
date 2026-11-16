import { input, util } from "@prismatic-io/spectral";
import { connection, driveId, folderId, parentItemId, siteId } from "./common";

const folderName = input({
  label: "Folder Name",
  type: "string",
  required: true,
  example: "MyFolder",
  placeholder: "Enter folder name",
  comments: "The display name of the folder, unique within its parent folder.",
  clean: util.types.toString,
});

export const createFolderInputs = {
  connection,
  siteId: {
    ...siteId,
    comments: "Provide the id of the site to create the folder in.",
  },
  driveId: {
    ...driveId,
    comments: "Provide the id of the drive to create the folder in.",
  },
  parentItemId: {
    ...parentItemId,
    comments: "Provide the id of the parent element to create the folder in.",
  },
  folderName: {
    ...folderName,
    comments: "Provide the name of the new folder.",
  },
};

export const renameFolderInputs = {
  connection,
  siteId: {
    ...siteId,
    comments: "Provide the id of the site to rename the folder in.",
  },
  driveId: {
    ...driveId,
    comments: "Provide the id of the drive to rename the folder in.",
  },
  folderId: {
    ...folderId,
    comments: "Provide the id of the folder to rename.",
    required: true,
  },
  folderName: {
    ...folderName,
    comments: "Provide the new name of the folder.",
  },
};
