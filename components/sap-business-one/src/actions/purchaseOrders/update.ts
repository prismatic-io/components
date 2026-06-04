import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { DEFAULT_UPDATE_RESPONSE } from "../../constants";
import { updatePurchaseOrderInputs } from "../../inputs/purchaseOrders/update";

export const updatePurchaseOrder = action({
  display: {
    label: "Update Purchase Order",
    description: "Update an instance of Purchase Orders.",
  },
  inputs: {
    ...updatePurchaseOrderInputs,
    connection,
  },
  perform: async (context, { connection, bodyFields, Comments, docEntry }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    await client.patch(`/PurchaseOrders(${docEntry})`, {
      Comments,
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
