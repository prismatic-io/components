import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../auth";
import { getTemporaryUploadLinkExamplePayload } from "../../examplePayloads";
import { getTemporaryUploadLinkInputs } from "../../inputs";
import { getTemporaryUploadLinkOutputSchema } from "../../outputSchemas";
import { checkDebug, handleDropboxError } from "../../util";
export const getTemporaryUploadLink = action({
  display: {
    label: "Get Temporary Upload Link",
    description: "Get a temporary presigned link to upload a file",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    checkDebug(params, context);
    const dbx = createAuthorizedClient(params.dropboxConnection);
    try {
      return {
        data: await dbx.filesGetTemporaryUploadLink({
          duration: params.duration,
          commit_info: { path: params.path, mode: { ".tag": "overwrite" } },
        }),
      };
    } catch (err) {
      handleDropboxError(err);
    }
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: getTemporaryUploadLinkExamplePayload,
  }),
  inputs: getTemporaryUploadLinkInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTemporaryUploadLinkOutputSchema,
  }),
  examplePayload: {
    data: getTemporaryUploadLinkExamplePayload,
  },
});
