import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, $select } from "../../inputs/general";
import { itemCode } from "../../inputs/items/general";

export const getItem = action({
  display: {
    label: "Get Item",
    description:
      "Retrieve all or some selected properties from an instance of Items with the given id.",
  },
  inputs: {
    itemCode,
    $select,
    connection,
  },
  perform: async (context, { connection, $select, itemCode }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.get(`/Items('${itemCode}')`, {
      params: {
        $select,
      },
    });
    return {
      data,
    };
  },
});
