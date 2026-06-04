import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { downloadSpecificAssetItemResponse } from "../../examplePayloads";
import { connection, hash, id } from "../../inputs";

export const downloadSpecificAssetItem = action({
  display: {
    label: "Download Specific Asset Item",
    description: "Download an specific asset item",
  },
  inputs: {
    id: {
      ...id,
      label: "Asset ID",
      comments: "The id of the asset you’d like to download a item of.",
      dataSource: "selectAsset",
    },
    itemId: {
      ...id,
      label: "Item ID",
      comments: "The id of the specific asset item you’d like to download.",
    },
    hash,
    connection,
  },
  perform: async (context, { connection, id, hash, itemId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/media/${id}/download/${itemId}`, {
      params: {
        hash,
      },
    });
    return { data };
  },
  examplePayload: {
    data: downloadSpecificAssetItemResponse,
  },
});
