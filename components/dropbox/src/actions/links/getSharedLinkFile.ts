import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { getSharedLinkFileExamplePayload } from "../../examplePayloads";
import { getSharedLinkFileInputs } from "../../inputs";
import { getSharedLinkFileOutputSchema } from "../../outputSchemas";
import { checkDebug, handleDropboxError } from "../../util";
export const getSharedLinkFile = action({
  display: {
    label: "Get Shared Link File",
    description: "Download the shared link's file from a user's Dropbox.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    checkDebug(params, context);
    const dbx = createAuthorizedClient(
      params.dropboxConnection,
      params.userType,
      params.teamMemberId,
    );
    try {
      const data = await dbx.sharingGetSharedLinkFile({
        url: params.urlToSave,
        path: params.path || undefined,
      });
      return {
        data,
      };
    } catch (err) {
      handleDropboxError(err, [params.path]);
    }
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: getSharedLinkFileExamplePayload,
  }),
  inputs: getSharedLinkFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getSharedLinkFileOutputSchema,
  }),
  examplePayload: {
    data: getSharedLinkFileExamplePayload,
  },
});
