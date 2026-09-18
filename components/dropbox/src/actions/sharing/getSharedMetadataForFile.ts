import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { getSharedMetadataForFileExamplePayload } from "../../examplePayloads";
import { getSharedMetadataForFileInputs, shared_folder_id } from "../../inputs";
import { getSharedMetadataForFileOutputSchema } from "../../outputSchemas";
import { checkDebug, handleDropboxError } from "../../util";
export const getSharedMetadataForFile = action({
  display: {
    label: "Get Shared Metadata for File",
    description: "Returns shared file metadata.",
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
      const result = await dbx.sharingGetFileMetadata({
        file: fileId,
      });
      return {
        data: result,
      };
    } catch (err) {
      handleDropboxError(err, [shared_folder_id]);
    }
  },
  inputs: getSharedMetadataForFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getSharedMetadataForFileOutputSchema,
  }),
  examplePayload: {
    data: getSharedMetadataForFileExamplePayload,
  },
});
