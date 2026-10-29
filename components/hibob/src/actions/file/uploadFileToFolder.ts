import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { getClient } from "../../client";
import { uploadFileToFolderExamplePayload } from "../../examplePayloads";
import { uploadFileToFolderInputs } from "../../inputs";
import { FolderType } from "../../types/folderTypes";

export const uploadFileToFolder = action({
  display: {
    label: "Upload File To Folder",
    description: "Uploads a file directly to an employee's document folder.",
  },
  perform: async (
    context,
    { connection, employeeId, folderType, fileData, fileName, folderId },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    let endpoint: string;
    switch (folderType) {
      case FolderType.SHARED:
        endpoint = `/docs/people/${employeeId}/shared/upload`;
        break;
      case FolderType.CONFIDENTIAL:
        endpoint = `/docs/people/${employeeId}/confidential/upload`;
        break;
      case FolderType.CUSTOM:
        if (!folderId) {
          throw new Error("Folder ID is required for custom folder type");
        }
        endpoint = `/docs/people/${employeeId}/folders/${folderId}/upload`;
        break;
      default:
        throw new Error(`Invalid folder type: ${folderType}`);
    }

    const formData = new FormData();
    formData.append("file", fileData.data, {
      filename: fileName,
      contentType: fileData.contentType,
    });

    const { data } = await client.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      data,
    };
  },
  inputs: uploadFileToFolderInputs,
  examplePayload: uploadFileToFolderExamplePayload,
});
