import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { uploadFileFromUrlExamplePayload } from "../../examplePayloads";
import { uploadFileFromUrlInputs } from "../../inputs";
import { FolderType } from "../../types/folderTypes";

export const uploadFileFromUrl = action({
  display: {
    label: "Upload File From URL",
    description: "Uploads a file from a URL to an employee's document folder.",
  },
  perform: async (
    context,
    {
      connection,
      employeeId,
      folderType,
      folderId,
      documentName,
      documentUrl,
      tags,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    let endpoint: string;
    switch (folderType) {
      case FolderType.SHARED:
        endpoint = `/docs/people/${employeeId}/shared`;
        break;
      case FolderType.CONFIDENTIAL:
        endpoint = `/docs/people/${employeeId}/confidential`;
        break;
      case FolderType.CUSTOM:
        if (!folderId) {
          throw new Error("Folder ID is required for custom folder type");
        }
        endpoint = `/docs/people/${employeeId}/custom/${folderId}`;
        break;
      default:
        throw new Error(`Invalid folder type: ${folderType}`);
    }

    const { data } = await client.post(endpoint, {
      documentUrl,
      documentName,
      tags,
    });
    return {
      data,
    };
  },
  inputs: uploadFileFromUrlInputs,
  examplePayload: uploadFileFromUrlExamplePayload,
});
