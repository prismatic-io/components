import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createAssetResponse as getAssetResponse } from "../../examplePayloads";
import { assetId, connectionInput } from "../../inputs";

export const getAsset = action({
  display: {
    label: "Get Asset",
    description: "Retrieve a single asset",
  },
  inputs: {
    assetId: {
      ...assetId,
      required: true,
    },
    connectionInput,
  },
  perform: async (context, { connectionInput, assetId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/assets/${assetId}`);
    return { data };
  },
  examplePayload: {
    data: getAssetResponse,
  },
});
