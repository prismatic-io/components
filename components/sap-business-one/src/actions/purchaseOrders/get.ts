import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, $select } from "../../inputs/general";
import { docEntry } from "../../inputs/purchaseOrders/general";

export const getPurchaseOrder = action({
  display: {
    label: "Get Purchase Order",
    description:
      "Retrieve all or some selected properties from an instance of Purchase Orders with the given id.",
  },
  inputs: {
    docEntry,
    $select,
    connection,
  },
  perform: async (context, { connection, $select, docEntry }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.get(`/PurchaseOrders(${docEntry})`, {
      params: {
        $select,
      },
    });
    return {
      data,
    };
  },
});
