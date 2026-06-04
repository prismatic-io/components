import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { deletePurchaseOrderPayload as examplePayload } from "../../examplePayloads";
import { connectionInput, purchaseOrderId, syncToken } from "../../inputs";

export const deletePurchaseOrder = action({
  display: {
    label: "Delete Purchase Order",
    description: "Delete an existing Purchase Order.",
  },
  inputs: {
    connection: connectionInput,
    id: {
      ...purchaseOrderId,
      comments: "The id of the purchase order to delete.",
    },
    syncToken: {
      ...syncToken,
      comments: "The sync token of the purchase order to delete.",
    },
  },
  perform: async (context, params) => {
    const client = createHttpClient(params.connection, context.debug.enabled);

    const payload = {
      Id: params.id,
      SyncToken: params.syncToken,
    };

    const { data } = await client.post("/purchaseorder", payload, {
      params: {
        operation: "delete",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { data: data.PurchaseOrder };
  },
  examplePayload,
});
