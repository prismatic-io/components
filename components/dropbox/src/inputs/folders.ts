import { input } from "@prismatic-io/spectral";
import {
  connectionInput,
  directoryPath,
  fetchAll,
  pagination,
  path,
  teamMemberId,
  userType,
} from "./common";
import { fileName, includeDeleted, recursive } from "./files";
export const folderActions = input({
  label: "Folder Actions",
  placeholder: "Enter a folder action",
  collection: "keyvaluelist",
  type: "string",
  required: false,
  comments:
    "A list of `FolderAction`s corresponding to `FolderPermission`s that should appear in the response's SharedFolderMetadata.permissions field describing the actions the authenticated user can perform on the folder. This field is optional.",
  example: "disable_viewer_info",
  clean: (value) => {
    const folderActions = (value as []) || [];
    if (folderActions.length === 0) {
      return undefined;
    }
    return folderActions.map((value) => ({ ".tag": value }));
  },
});
export const createFolderInputs = {
  dropboxConnection: connectionInput,
  path,
};
export const listChangesInputs = {
  dropboxConnection: connectionInput,
  directoryPath,
  recursive,
  includeDeleted,
  userType,
  teamMemberId,
};
export const listFolderInputs = {
  dropboxConnection: connectionInput,
  path: directoryPath,
  recursive,
  fetchAll,
  pagination,
  userType,
  teamMemberId,
};
export const searchFoldersInputs = {
  dropboxConnection: connectionInput,
  query: {
    ...fileName,
    label: "Folder Name",
    comments: "The name of the folder to search for",
    example: "My Folder",
    required: true,
  },
  path: { ...directoryPath },
  fetchAll,
  pagination,
  userType,
  teamMemberId,
};
