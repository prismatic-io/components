import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { getSharedMetadataForFolderExamplePayload } from "../../examplePayloads";
import {
  getSharedMetadataForFolderInputs,
  shared_folder_id,
} from "../../inputs";
import { getSharedMetadataForFolderOutputSchema } from "../../outputSchemas";
import { checkDebug, handleDropboxError } from "../../util";
export const getSharedMetadataForFolder = action({
  display: {
    label: "Get Shared Metadata for Folder",
    description: "Returns shared folder metadata.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { dropboxConnection, teamMemberId, userType, fileId },
  ) => {
    checkDebug({ dropboxConnection, teamMemberId, userType, fileId }, context);
    const dbx = createAuthorizedClient(
      dropboxConnection,
      userType,
      teamMemberId,
    );
    try {
      const result = await dbx.sharingGetFolderMetadata({
        shared_folder_id: fileId,
      });
      return {
        data: result,
      };
    } catch (err) {
      handleDropboxError(err, [shared_folder_id]);
    }
  },
  inputs: getSharedMetadataForFolderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getSharedMetadataForFolderOutputSchema,
  }),
  examplePayload: {
    data: getSharedMetadataForFolderExamplePayload,
  },
});
