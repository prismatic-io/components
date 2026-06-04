import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { genericCreateResponse as addAssetMetapropertyOptionsResponse } from "../../examplePayloads";
import {
  connection,
  id,
  metapropertyId,
  metapropertyOptionsIds,
} from "../../inputs";

export const addAssetMetapropertyOptions = action({
  display: {
    label: "Add Asset Metaproperty Options",
    description: "Add metaproperty options to an asset",
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
    const { data } = await client.post(
      `/media/options`,
      {
        asset_id: assetId,
        metaproperty_id: metapropertyId,
        metaproperty_option_ids: metapropertyOptionsIds,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return { data };
  },
  examplePayload: {
    data: addAssetMetapropertyOptionsResponse,
  },
});
