import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { ASSETS_API_PATH } from "../../constants";
import { listAssetRenditionsExamplePayload } from "../../examplePayloads";
import { listAssetRenditionsInputs } from "../../inputs";
import { listAssetRenditionsOutputSchema } from "../../outputSchemas";

export const listAssetRenditions = action({
  display: {
    label: "List Asset Renditions",
    description: "List the renditions available for an asset.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, assetId }) => {
    const client = createAemClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${ASSETS_API_PATH}/${encodeURIComponent(assetId)}/renditions`,
    );
    return { data };
  },
  inputs: listAssetRenditionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAssetRenditionsOutputSchema,
  }),
  examplePerform: async () => listAssetRenditionsExamplePayload,
  examplePayload: listAssetRenditionsExamplePayload,
});
