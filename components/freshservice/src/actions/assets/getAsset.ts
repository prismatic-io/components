import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { getAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { getAssetInputs as inputs } from "../../inputs/assets";

export const getAsset = action({
  display: {
    label: "Get Asset",
    description: "Retrieves details of an asset by display ID.",
  },
  perform: async (context, { connection, assetDisplayId }) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const { data } = await client.get(`/assets/${assetDisplayId}`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
