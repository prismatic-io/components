import { component } from "@prismatic-io/spectral";
import connections from "./connections";
import listDrives from "./actions/listDrives";
import { rawRequest } from "./actions/rawRequest";
import { getDrive } from "./actions/getDrive";
import { listSharedFiles } from "./actions/listSharedFiles";
import { downloadFile } from "./actions/downloadFile";
import { deleteFile } from "./actions/deleteFile";
import { listSites } from "./actions/listSites";
import { moveFile } from "./actions/moveFile";
import { updateFile } from "./actions/updateFile";
import { searchDrive } from "./actions/searchDrive";
import { getItem } from "./actions/getItem";
import { getSite } from "./actions/getSite";
import { listChildren } from "./actions/listChildren";
import { searchUser } from "./actions/findUser";
import { listGroups } from "./actions/listGroups";
import { listDriveItems } from "./actions/listDriveItems";
import { getItemById } from "./actions/getItemById";
import { uploadFile } from "./actions/uploadFile";
import { listShared } from "./actions/listShared";
import dataSources from "./dataSources";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import subscriptions from "./actions/subscriptions";
import triggers from "./triggers";
import { listChanges } from "./actions/listChanges";

export default component({
  key: "ms-onedrive",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ms-onedrive/",
  display: {
    label: "Microsoft OneDrive",
    category: "Data Platforms",
    description:
      "Manage drives, files, shared content, and monitor changes in Microsoft OneDrive.",
    iconPath: "icon.png",
  },
  dataSources,
  actions: {
    ...listDrives,
    getDrive,
    rawRequest,
    listSharedFiles,
    downloadFile,
    searchDrive,
    getItem,
    getSite,
    listChildren,
    searchUser,
    updateFile,
    moveFile,
    listSites,
    deleteFile,
    listGroups,
    listDriveItems,
    getItemById,
    uploadFile,
    listShared,
    ...subscriptions,
    listChanges,
  },
  hooks: { error: handleErrors },
  connections,
  triggers,
});
