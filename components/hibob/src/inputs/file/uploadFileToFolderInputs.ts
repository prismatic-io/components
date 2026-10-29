import { connection, employeeId } from "../common";
import { fileData, fileName, folderId, folderType } from "./common";

export const uploadFileToFolderInputs = {
  connection,
  employeeId: {
    ...employeeId,
    comments: "The ID of the employee to upload the file for.",
    example: "23278123",
  },
  folderType: {
    ...folderType,
    comments: "The type of folder to upload the file to.",
  },
  fileData,
  fileName,
  folderId: {
    ...folderId,
    comments:
      "Required if folder type is 'Custom'. The ID of the custom folder to upload to.",
  },
};
