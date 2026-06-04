import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  folderId,
  includeAll,
  page,
  pageSize,
  workspaceIdOptional,
} from "./common";

const folderName = input({
  label: "Folder Name",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The display name for the folder.",
  example: "My Folder",
  placeholder: "Enter folder name",
  dataSource: "selectFolder",
});

export const createFolderInputs = {
  connection: connectionInput,
  folderId: {
    ...folderId,
    required: false,
    comments:
      "The unique identifier of the parent folder to create a subfolder within. Omit to create a top-level home folder.",
  },
  workspaceId: {
    ...workspaceIdOptional,
    comments:
      "The unique identifier of the workspace to create the folder in. Omit to create the folder outside of a workspace.",
  },
  folderName,
};

export const deleteFolderInputs = {
  connection: connectionInput,
  folderId,
};

export const getFolderInputs = {
  connection: connectionInput,
  folderId,
};

export const listFoldersInputs = {
  connection: connectionInput,
  folderId: {
    ...folderId,
    required: false,
    comments:
      "The unique identifier of the parent folder whose subfolders should be listed. Omit to list top-level home folders.",
  },
  workspaceId: {
    ...workspaceIdOptional,
    comments:
      "The unique identifier of the workspace whose folders should be listed. Omit to list folders outside of a workspace.",
  },
  includeAll,
  page,
  pageSize,
};

export const moveFolderInputs = {
  connection: connectionInput,
  folderId,
  destinationId: { ...folderId, label: "Destination Folder ID" },
};

export const updateFolderInputs = {
  connection: connectionInput,
  folderId,
  folderName,
};
