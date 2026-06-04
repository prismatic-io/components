import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { itemId, connectionInput } from "../../inputs";
import { deleteItemExamplePayload } from "../../examplePayloads";

export const deleteItem = action({
  display: {
    label: "Delete Item",
    description: "Delete the information and metadata of an item by Id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/items/${params.itemId}`);
    return { data };
  },
  inputs: { itemId, xeroConnection: connectionInput },
  examplePayload: deleteItemExamplePayload,
});
