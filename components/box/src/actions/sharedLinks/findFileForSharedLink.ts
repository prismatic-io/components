import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createBoxHttpClient } from "../../client";
import { SHARED_ITEMS_PATH } from "../../constants";
import { findFileForSharedLinkExamplePayload } from "../../examplePayloads";
import { findFileForSharedLinkInputs } from "../../inputs";
import { findFileForSharedLinkOutputSchema } from "../../outputSchemas";
export const findFileForSharedLink = action({
  display: {
    label: "Find File for Shared Link",
    description: "Returns the file represented by a shared link.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const sharedLink = util.types.toString(params.sharedLink);
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
  inputs: findFileForSharedLinkInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: findFileForSharedLinkOutputSchema,
  }),
  examplePayload: findFileForSharedLinkExamplePayload,
});
