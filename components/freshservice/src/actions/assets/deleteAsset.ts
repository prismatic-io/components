import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { deleteAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteAssetInputs as inputs } from "../../inputs/assets";

export const deleteAsset = action({
  display: {
    label: "Delete Asset",
    description: "Deletes an asset by display ID.",
  },
  perform: async (context, { connection, assetDisplayId }) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    await client.delete(`/assets/${assetDisplayId}`);

    return SUCCESS_RESPONSE;
  },
  inputs,
  examplePayload,
});
