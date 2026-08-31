import { action, outputSchema } from "@prismatic-io/spectral";
import { createBoxHttpClient } from "../../client";
import { SHARED_ITEMS_PATH } from "../../constants";
import { findFolderForSharedLinkExamplePayload } from "../../examplePayloads";
import { findFolderForSharedLinkInputs } from "../../inputs";
import { findFolderForSharedLinkOutputSchema } from "../../outputSchemas";
export const findFolderForSharedLink = action({
  display: {
    label: "Find Folder for Shared Link",
    description: "Returns the folder represented by a shared link.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const sharedLink = params.sharedLink;
    const sharedLinkPassword = params.sharedLinkPassword || null;
    const fields = params.fields || null;
    const client = createBoxHttpClient(
      params.boxConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(SHARED_ITEMS_PATH, {
      headers: {
        boxapi: `shared_link=${sharedLink}&shared_link_password=${sharedLinkPassword}`,
      },
      params: {
        fields,
      },
    });
    return {
      data,
    };
  },
  inputs: findFolderForSharedLinkInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: findFolderForSharedLinkOutputSchema,
  }),
  examplePayload: findFolderForSharedLinkExamplePayload,
});
