import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { updateItemInputs } from "../../inputs/items/update";
import { DEFAULT_UPDATE_RESPONSE } from "../../constants";

export const updateItem = action({
  display: {
    label: "Update Item",
    description: "Update an instance of Items",
  },
  inputs: {
    ...updateItemInputs,
    connection,
  },
  perform: async (context, { connection, ItemCode, ItemName, ItemType, bodyFields }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    await client.patch(`/Items('${ItemCode}')`, {
      ItemName,
      ItemType,
      ...bodyFields,
    });

    return {
      data: DEFAULT_UPDATE_RESPONSE,
    };
  },
  examplePayload: {
    data: DEFAULT_UPDATE_RESPONSE,
  },
});
