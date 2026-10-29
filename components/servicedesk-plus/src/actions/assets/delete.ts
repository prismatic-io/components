import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteResponse } from "../../examplePayloads";
import { assetId, connectionInput } from "../../inputs";

export const deleteAsset = action({
  display: {
    label: "Delete Asset",
    description: "Delete an existing asset",
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
    const { data } = await client.delete(`/assets/${assetId}`);
    return { data };
  },
  examplePayload: {
    data: deleteResponse,
  },
});
