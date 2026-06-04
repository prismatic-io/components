import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { saveAsNewAssetResponse } from "../../examplePayloads";
import { connection, id } from "../../inputs";

export const saveAsNewAssetVersion = action({
  display: {
    label: "Save as a New Asset Version",
    description: "Save a completed upload as a new asset version.",
  },
  inputs: {
    assetId: {
      ...id,
      label: "Asset ID",
      comments: "Asset id for which to save the new version.",
      dataSource: "selectAsset",
    },
    importId: {
      ...id,
      label: "Import ID",
      comments: "Import id of a finalized and processed upload to be saved.",
    },
    connection,
  },
  perform: async (context, { connection, importId, assetId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/media/${assetId}/save/${importId}`);
    return { data };
  },
  examplePayload: {
    data: saveAsNewAssetResponse,
  },
});
