import { deleteFile } from "./deleteFile";
import { downloadFile } from "./downloadFile";
import { getItem } from "./getItem";
import { getItemById } from "./getItemById";
import { listChanges } from "./listChanges";
import { listChildren } from "./listChildren";
import { listDriveItems } from "./listDriveItems";
import { listShared } from "./listShared";
import { listSharedFiles } from "./listSharedFiles";
import { moveFile } from "./moveFile";
import { searchDrive } from "./searchDrive";
import { updateFile } from "./updateFile";
import { uploadFile } from "./uploadFile";

export default {
  deleteFile,
  downloadFile,
  uploadFile,
  updateFile,
  moveFile,
  getItem,
  getItemById,
  listChildren,
  listDriveItems,
  listShared,
  listSharedFiles,
  listChanges,
  searchDrive,
};
