import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, $select } from "../../inputs/general";
import { docEntry } from "../../inputs/orders/general";

export const getOrder = action({
  display: {
    label: "Get Order",
    description:
      "Retrieve all or some selected properties from an instance of Orders with the given id.",
  },
  inputs: {
    docEntry,
    $select,
    connection,
  },
  perform: async (context, { connection, $select, docEntry }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.get(`/Orders(${docEntry})`, {
      params: {
        $select,
      },
    });
    return {
      data,
    };
  },
});
