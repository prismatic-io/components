import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { createPurchaseOrdersInputs } from "../../inputs/purchaseOrders/create";

export const createPurchaseOrder = action({
  display: {
    label: "Create Purchase Order",
    description: "Create an instance of Purchase Orders.",
  },
  inputs: {
    ...createPurchaseOrdersInputs,
    connection,
  },
  perform: async (context, { connection, bodyFields, CardCode, DocumentLines }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.post(`/PurchaseOrders`, {
      CardCode,
      DocumentLines,
      ...bodyFields,
    });
    return {
      data,
    };
  },
});
