import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { getAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { getAssetInputs as inputs } from "../../inputs";
import { assetOutputSchema } from "../../outputSchemas";
export const getAsset = action({
  display: {
    label: "Get Asset (Deprecated)",
    description:
      "Retrieves details of an asset by display ID. Applies to Freshservice accounts created before the March 31, 2026 IT Asset Management release.",
  },
  performSafety: "safe",
  perform: async (context, { connection, assetDisplayId }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await client.get(`/assets/${assetDisplayId}`);
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: assetOutputSchema,
  }),
  inputs,
  examplePayload,
});
