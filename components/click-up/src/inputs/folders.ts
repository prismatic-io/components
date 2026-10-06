import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  getArchived,
  getFolderId,
  getSpaceId,
} from "./common";
const folderName = input({
  label: "Name",
  type: "string",
  placeholder: "Enter folder name",
  example: "My Folder",
  comments: "The name of the folder.",
  required: true,
  clean: util.types.toString,
});
export const createFolderInputs = {
  connection: connectionInput,
  spaceId: getSpaceId(true),
  folderName,
};
export const deleteFolderInputs = {
  connection: connectionInput,
  folderId: getFolderId(true, "The unique identifier for the Folder."),
};
export const getFolderInputs = {
  connection: connectionInput,
  folderId: getFolderId(true, "The unique identifier for the Folder."),
};
export const listFoldersInputs = {
  connection: connectionInput,
  spaceId: getSpaceId(true),
  archived: getArchived(false, "When true, returns archived Folders."),
};
export const updateFolderInputs = {
  connection: connectionInput,
  folderId: getFolderId(true, "The unique identifier for the Folder."),
  folderName,
};
