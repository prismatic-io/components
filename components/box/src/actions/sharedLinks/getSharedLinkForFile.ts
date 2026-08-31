import { action, outputSchema } from "@prismatic-io/spectral";
import { createBoxHttpClient } from "../../client";
import { SHARED_LINK_FIELD } from "../../constants";
import { getSharedLinkForFileExamplePayload } from "../../examplePayloads";
import { getSharedLinkForFileInputs } from "../../inputs";
import { getSharedLinkForFileOutputSchema } from "../../outputSchemas";
export const getSharedLinkForFile = action({
  display: {
    label: "Get Shared Link for File",
    description: "Gets the shared link for a file.",
  },
  performSafety: "safe",
  perform: async (context, { fileId, boxConnection }) => {
    const client = createBoxHttpClient(boxConnection, context.debug.enabled);
    const { data } = await client.get(`/files/${fileId}`, {
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
  inputs: getSharedLinkForFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getSharedLinkForFileOutputSchema,
  }),
  examplePayload: getSharedLinkForFileExamplePayload,
});
