import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { getPurchaseOrderLineExamplePayload as examplePayload } from "../../examplePayloads";
import { getPurchaseOrderLineInputs as inputs } from "../../inputs/purchaseOrderLines/getPurchaseOrderLineInputs";
import type { PurchaseOrderLine } from "../../interfaces";

export const getPurchaseOrderLine = action({
  display: {
    label: "Get Purchase Order Line",
    description: "Retrieves a purchase order line object in your Business Central Organization.",
  },
  perform: async (context, { companyId, connection, purchaseOrderLineId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const { data } = await client.get<PurchaseOrderLine>(
      `/companies(${companyId})/purchaseOrderLines(${purchaseOrderLineId})`,
    );

    return { data };
  },
  inputs,
  examplePayload,
});
