import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { DEFAULT_DELETE_RESPONSE } from "../../constants";
import { itemCode } from "../../inputs/items/general";

export const deleteItem = action({
  display: {
    label: "Delete Item",
    description: "Delete an instance of Items with the specified id.",
  },
  inputs: {
    itemCode,
    connection,
  },
  perform: async (context, { connection, itemCode }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    await client.delete(`/Items('${itemCode}')`);
    return {
      data: DEFAULT_DELETE_RESPONSE,
    };
  },
  examplePayload: {
    data: DEFAULT_DELETE_RESPONSE,
  },
});
