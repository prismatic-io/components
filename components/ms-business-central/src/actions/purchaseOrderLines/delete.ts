import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { SUCCESS_PAYLOAD } from "../../examplePayloads";
import { deletePurchaseOrderLineInputs as inputs } from "../../inputs/purchaseOrderLines/deletePurchaseOrderLineInputs";

export const deletePurchaseOrderLine = action({
  display: {
    label: "Delete Purchase Order Line",
    description: "Deletes a purchase order line object in your Business Central Organization.",
  },
  perform: async (context, { companyId, connection, purchaseOrderLineId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    await client.delete(`/companies(${companyId})/purchaseOrderLines(${purchaseOrderLineId})`);

    return SUCCESS_PAYLOAD;
  },
  inputs,
  examplePayload: SUCCESS_PAYLOAD,
});
