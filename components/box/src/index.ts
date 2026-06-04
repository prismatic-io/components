import { component } from "@prismatic-io/spectral";
import { copyObject } from "./actions/copyObject";
import { createFolder } from "./actions/createFolder";
import { deleteObject } from "./actions/deleteObject";
import { downloadFile } from "./actions/downloadFile";
import { getFileDownloadUrl } from "./actions/getFileDownloadURL";
import { listFolder, listFolderWithPagination } from "./actions/listFolder";
import { moveObject } from "./actions/moveObject";
import { pathDetails } from "./actions/pathDetails";
import { uploadFile } from "./actions/uploadFile";
import { getCurrentUser } from "./actions/users";
import {
  findFileForSharedLink,
  getSharedLinkForFile,
  addSharedLinkToFile,
  updateSharedLinkToFile,
  removeSharedLinkFromFile,
} from "./actions/sharedLinksFiles";
import {
  findFolderForSharedLink,
  getSharedLinkForFolder,
  addSharedLinkToFolder,
  updateSharedLinkOnFolder,
  removeSharedLinkFromFolder,
} from "./actions/sharedLinksFolders";

import webhookActions from "./actions/webhooks";
import rawRequest from "./actions/rawRequest";
import connections from "./connections";
import triggers from "./triggers";
import dataSources from "./dataSources";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "box",
  documentationUrl: "https://prismatic.io/docs/components/box/",
  public: true,
  display: {
    label: "Box",
    description: "Manage files stored in Box",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions: {
    copyObject,
    createFolder,
    deleteObject,
    downloadFile,
    getFileDownloadUrl,
    listFolder,
    listFolderWithPagination,
    moveObject,
    pathDetails,
    uploadFile,
    getCurrentUser,
    findFileForSharedLink,
    getSharedLinkForFile,
    addSharedLinkToFile,
    rawRequest,
    updateSharedLinkToFile,
    removeSharedLinkFromFile,
    findFolderForSharedLink,
    getSharedLinkForFolder,
    addSharedLinkToFolder,
    updateSharedLinkOnFolder,
    removeSharedLinkFromFolder,
    ...webhookActions,
  },
  connections,
  triggers,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
