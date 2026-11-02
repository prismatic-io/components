import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { ASSETS_API_PATH } from "../../constants";
import { getAssetMetadataExamplePayload } from "../../examplePayloads";
import { getAssetMetadataInputs } from "../../inputs";
import { getAssetMetadataOutputSchema } from "../../outputSchemas";

export const getAssetMetadata = action({
  display: {
    label: "Get Asset Metadata",
    description: "Retrieve the repository and asset metadata of an asset.",
  },
  performSafety: "safe",
  perform: async (context, { connection, assetId }) => {
    const client = createAemClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${ASSETS_API_PATH}/${encodeURIComponent(assetId)}/metadata`,
    );
    return { data };
  },
  inputs: getAssetMetadataInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getAssetMetadataOutputSchema,
  }),
  examplePayload: getAssetMetadataExamplePayload,
});
