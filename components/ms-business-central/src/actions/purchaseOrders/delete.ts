import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { SUCCESS_PAYLOAD } from "../../examplePayloads";
import { deletePurchaseOrderInputs as inputs } from "../../inputs/purchaseOrders/deletePurchaseOrderInputs";

export const deletePurchaseOrder = action({
  display: {
    label: "Delete Purchase Order",
    description: "Deletes a purchase order object in your Business Central Organization.",
  },
  perform: async (context, { companyId, connection, purchaseOrderId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    await client.delete(`/companies(${companyId})/purchaseOrders(${purchaseOrderId})`);

    return SUCCESS_PAYLOAD;
  },
  inputs,
  examplePayload: SUCCESS_PAYLOAD,
});
