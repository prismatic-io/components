import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { createItemInputs } from "../../inputs/items/create";

export const createItem = action({
  display: {
    label: "Create Item",
    description:
      "Retrieve all or some selected properties from an instance of Items with the given id.",
  },
  inputs: {
    ...createItemInputs,
    connection,
  },
  perform: async (context, { connection, ItemCode, ItemName, ItemType, bodyFields }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.post(`/Items`, {
      ItemCode,
      ItemName,
      ItemType,
      ...bodyFields,
    });
    return {
      data,
    };
  },
});
