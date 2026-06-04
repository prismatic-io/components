import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ASSETS_PATH } from "../../constants";
import { deleteAssetExamplePayload } from "../../examplePayloads";
import { deleteAssetInputs } from "../../inputs";

export const deleteAsset = action({
  examplePayload: deleteAssetExamplePayload,
  display: {
    label: "Delete Asset",
    description: "Delete a Content Builder asset by ID.",
  },
  inputs: deleteAssetInputs,
  perform: async (context, { connection, assetId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`${ASSETS_PATH}/${encodeURIComponent(assetId)}`);

    return {
      data: {
        success: true,
        id: assetId,
        message: "Asset deleted successfully",
      },
    };
  },
});
