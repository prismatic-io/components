import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { deleteItemInputs } from "../../inputs";
import { deleteItemExamplePayload } from "../../examplePayloads";

export const deleteItem = action({
  display: {
    label: "Delete Item",
    description: "Delete an item by ID.",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/items/${params.itemId}`);
    return { data };
  },
  inputs: deleteItemInputs,
  examplePayload: deleteItemExamplePayload,
});
