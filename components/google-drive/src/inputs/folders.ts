import { input, util } from "@prismatic-io/spectral";
import {
  connection,
  driveId,
  fetchAll,
  fields,
  folderId,
  pagination,
  searchQuery,
} from "./common";
export const folderName = input({
  label: "Folder Name",
  placeholder: "Enter folder name",
  type: "string",
  required: true,
  example: "Pictures",
  comments: "The name of the folder.",
  clean: util.types.toString,
});
export const createFolderInputs = {
  connection,
  folderName,
  parentFolderId: { ...folderId, label: "Parent Folder ID" },
};
export const listFoldersInputs = {
  connection,
  driveId,
  fetchAll,
  pagination,
  fields,
  folderId,
};
export const searchFoldersInputs = {
  connection,
  driveId,
  searchQuery,
  folderId: { ...folderId, label: "Parent Folder ID" },
  fields,
  fetchAll,
  pagination,
};
