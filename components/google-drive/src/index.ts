import { component } from "@prismatic-io/spectral";
import getAbout from "./actions/getAbout";
import getFile from "./actions/getFile";
import createFile from "./actions/createFile";
import listFiles from "./actions/listFiles";
import copyFile from "./actions/copyFile";
import moveFile from "./actions/moveFile";
import updateFile from "./actions/updateFile";
import deleteFile from "./actions/deleteFile";
import emptyTrash from "./actions/emptyTrash";
import createFolder from "./actions/createFolder";
import { listFolders } from "./actions/listFolders";
import rawRequest from "./actions/rawRequest";
import { searchFolders } from "./actions/searchFolders";
import { listExportTypes } from "./actions/listExportTypes";
import { searchFiles } from "./actions/searchFiles";
import { listDrives } from "./actions/drives";
import changeActions from "./actions/changes";
import { getCurrentUser } from "./actions/users";
import { queryDriveActivity } from "./actions/getActivity";
import { connection } from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
import getFileMetadata from "./actions/getFileMetadata";

export default component({
  key: "google-drive",
  documentationUrl: "https://prismatic.io/docs/components/google-drive/",
  public: true,
  display: {
    label: "Google Drive",
    category: "Data Platforms",
    description: "Manage files in Google Drive",
    iconPath: "icon.png",
  },
  actions: {
    getAbout,
    getFile,
    getFileMetadata,
    createFile,
    listFiles,
    copyFile,
    updateFile,
    deleteFile,
    emptyTrash,
    createFolder,
    listFolders,
    rawRequest,
    searchFolders,
    listExportTypes,
    searchFiles,
    listDrives,
    ...changeActions,
    getCurrentUser,
    moveFile,
    queryDriveActivity,
  },
  triggers,
  connections: [connection],
  dataSources,
});
