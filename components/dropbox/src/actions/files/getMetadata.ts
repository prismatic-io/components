import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { getFileOrFolderMetadataExamplePayload } from "../../examplePayloads";
import { getMetadataInputs } from "../../inputs";
import { getMetadataOutputSchema } from "../../outputSchemas";
import { checkDebug, handleDropboxError } from "../../util";

export const getMetadata = action({
  display: {
    label: "Get Metadata for File or Folder",
    description: "Returns the metadata for a file or folder.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { dropboxConnection, teamMemberId, userType, resultOptions, path },
  ) => {
    checkDebug(
      {
        dropboxConnection,
        teamMemberId,
        userType,
        resultOptions,
        path,
      },
      context,
    );
    const dbx = createAuthorizedClient(
      dropboxConnection,
      userType,
      teamMemberId,
    );
    try {
      const result = await dbx.filesGetMetadata({
        path,
        include_deleted: resultOptions.include_deleted,
        include_has_explicit_shared_members:
          resultOptions.include_has_explicit_shared_members,
        include_media_info: resultOptions.include_media_info,
      });
      return {
        data: result,
      };
    } catch (err) {
      handleDropboxError(err, [path]);
    }
  },
  inputs: getMetadataInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getMetadataOutputSchema,
  }),
  examplePayload: {
    data: getFileOrFolderMetadataExamplePayload,
  },
});
