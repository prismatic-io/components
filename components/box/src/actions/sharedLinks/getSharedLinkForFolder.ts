import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createBoxHttpClient } from "../../client";
import { SHARED_LINK_FIELD } from "../../constants";
import { getSharedLinkForFolderExamplePayload } from "../../examplePayloads";
import { getSharedLinkForFolderInputs } from "../../inputs";
import { getSharedLinkForFolderOutputSchema } from "../../outputSchemas";
export const getSharedLinkForFolder = action({
  display: {
    label: "Get Shared Link for Folder",
    description: "Gets the shared link for a folder.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const folderId = util.types.toString(params.folderId);
    const client = createBoxHttpClient(
      params.boxConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/folders/${folderId}`, {
      params: {
        fields: SHARED_LINK_FIELD,
      },
    });
    return {
      data: {
        sharedLink: data.shared_link.url,
      },
    };
  },
  inputs: getSharedLinkForFolderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getSharedLinkForFolderOutputSchema,
  }),
  examplePayload: getSharedLinkForFolderExamplePayload,
});
