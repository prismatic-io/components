import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { getPurchaseOrderExamplePayload as examplePayload } from "../../examplePayloads";
import { getPurchaseOrderInputs as inputs } from "../../inputs/purchaseOrders/getPurchaseOrderInputs";
import type { PurchaseOrder } from "../../interfaces";

export const getPurchaseOrder = action({
  display: {
    label: "Get Purchase Order",
    description: "Retrieves a purchase order object in your Business Central Organization.",
  },
  perform: async (context, { companyId, connection, purchaseOrderId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const { data } = await client.get<PurchaseOrder>(
      `/companies(${companyId})/purchaseOrders(${purchaseOrderId})`,
    );

    return { data };
  },
  inputs,
  examplePayload,
});
