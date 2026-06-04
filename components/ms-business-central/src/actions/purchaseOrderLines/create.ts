import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createPurchaseOrderLineExamplePayload as examplePayload } from "../../examplePayloads";
import { createPurchaseOrderLineInputs as inputs } from "../../inputs/purchaseOrderLines/createPurchaseOrderLineInputs";
import type { PurchaseOrderLine } from "../../interfaces";

export const createPurchaseOrderLine = action({
  display: {
    label: "Create Purchase Order Line",
    description: "Creates a purchase order line object in your Business Central organization.",
  },
  perform: async (
    context,
    {
      connection,
      companyId,
      documentId,
      itemId,
      accountId,
      lineType,
      lineObjectNumber,
      description,
      quantity,
      directUnitCost,
      additionalProperties,
    },
  ) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const payload = {
      ...additionalProperties,
      documentId,
      itemId,
      accountId,
      lineType,
      lineObjectNumber,
      description,
      quantity,
      directUnitCost,
    };

    const { data } = await client.post<PurchaseOrderLine>(
      `/companies(${companyId})/purchaseOrderLines`,
      payload,
    );

    return { data };
  },
  inputs,
  examplePayload,
});
