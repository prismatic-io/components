import { connection, employeeId } from "../common";
import {
  documentName,
  documentUrl,
  folderId,
  folderType,
  tags,
} from "./common";

export const uploadFileFromUrlInputs = {
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
  documentName,
  documentUrl,
  folderId: {
    ...folderId,
    comments:
      "Required if folder type is 'Custom'. The ID of the custom folder to upload to.",
  },
  tags,
};
