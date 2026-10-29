import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { deleteFileFromFolderExamplePayload } from "../../examplePayloads";
import { deleteFileFromFolderInputs } from "../../inputs";
import { FolderType } from "../../types/folderTypes";

export const deleteFileFromFolder = action({
  display: {
    label: "Delete File From Folder",
    description: "Deletes a file from an employee's document folder.",
  },
  perform: async (
    context,
    { connection, employeeId, documentId, folderType, folderId },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    let endpoint: string;
    switch (folderType) {
      case FolderType.SHARED:
        endpoint = `/docs/people/${employeeId}/shared/${documentId}`;
        break;
      case FolderType.CONFIDENTIAL:
        endpoint = `/docs/people/${employeeId}/confidential/${documentId}`;
        break;
      case FolderType.CUSTOM:
        if (!folderId) {
          throw new Error("Folder ID is required for custom folder type");
        }
        endpoint = `/docs/people/${employeeId}/folders/${folderId}/${documentId}`;
        break;
      default:
        throw new Error(`Invalid folder type: ${folderType}`);
    }

    await client.delete(endpoint);
    return {
      data: {
        success: true,
        message: `Document ${documentId} deleted successfully`,
      },
    };
  },
  inputs: deleteFileFromFolderInputs,
  examplePayload: deleteFileFromFolderExamplePayload,
});
