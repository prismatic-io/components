import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import {
  connection,
  id,
  metapropertyId,
  metapropertyOptionsIds,
} from "../../inputs";

export const deleteAssetMetapropertyOptions = action({
  display: {
    label: "Delete Asset Metaproperty Options",
    description: "Remove metaproperty options from an asset",
  },
  inputs: {
    assetId: {
      ...id,
      label: "Asset ID",
      comments: "Id of the asset.",
      dataSource: "selectAsset",
    },
    metapropertyId,
    metapropertyOptionsIds,
    connection,
  },
  perform: async (
    context,
    { connection, assetId, metapropertyId, metapropertyOptionsIds },
  ) => {
    const client = createApiClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/media/options`, {
      data: {
        asset_id: assetId,
        metaproperty_id: metapropertyId,
        metaproperty_option_ids: metapropertyOptionsIds,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { data };
  },
  examplePayload: {
    data: {},
  },
});
