import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import { connectionInput, fetchAllInput, pageLimitInput, pageSkipInput } from "./common";

export const parentFolderIdInput = input({
  label: "Parent Folder ID",
  type: "string",
  required: false,
  dataSource: "selectMailFolder",
  comments: "The unique identifier of the parent folder (optional for nested folders).",
  example: "AAMkAGI2TGuLAAA=",
  placeholder: "Enter Parent Folder ID",
  clean: cleanStringInput,
});

const folderDisplayNameInput = input({
  label: "Display Name",
  required: true,
  type: "string",
  comments: "The display name shown for the folder in the mailbox.",
  example: "Project Files",
  placeholder: "Enter folder name",
  clean: util.types.toString,
});

const deleteFolderIdInput = input({
  label: "Folder ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the mail folder.",
  example: "AAMkAGI2TGuLAAA=",
  placeholder: "Select a folder",
  dataSource: "selectMailFolder",
  clean: util.types.toString,
});

export const listMailFoldersInputs = {
  connection: connectionInput,
  fetchAll: fetchAllInput,
  pageLimit: pageLimitInput,
  pageSkip: pageSkipInput,
  parentFolderId: {
    ...parentFolderIdInput,
    comments:
      "The unique identifier of the parent folder. Lists all folders contained within this folder. Omit to list root-level folders.",
  },
};

export const createMailFolderInputs = {
  connection: connectionInput,
  parentFolderId: {
    ...parentFolderIdInput,
    comments:
      "The unique identifier of the parent folder. Creates the folder under this parent. Omit to create a root-level folder.",
  },
  name: folderDisplayNameInput,
};

export const deleteMailFolderInputs = {
  connection: connectionInput,
  folderId: deleteFolderIdInput,
};
