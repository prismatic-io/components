import { util } from "@prismatic-io/spectral";
import { connection, employeeId } from "../common";
import { documentId, folderId, folderType } from "./common";

export const deleteFileFromFolderInputs = {
  connection,
  employeeId: {
    ...employeeId,
    comments: "The ID of the employee whose file to delete.",
  },
  documentId: {
    ...documentId,
    comments: "The ID of the document to delete.",
  },
  folderType: {
    ...folderType,
    comments: "The type of folder containing the file to delete.",
  },
  folderId: {
    ...folderId,
    comments:
      "Required if folder type is 'Custom'. The ID of the custom folder containing the file.",
    clean: util.types.toString,
  },
};
