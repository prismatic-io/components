import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { updatePurchaseOrderLineExamplePayload as examplePayload } from "../../examplePayloads";
import { updatePurchaseOrderLineInputs as inputs } from "../../inputs/purchaseOrderLines/updatePurchaseOrderLineInputs";
import type { PurchaseOrderLine } from "../../interfaces";

export const updatePurchaseOrderLine = action({
  display: {
    label: "Update Purchase Order Line",
    description: "Updates a purchase order line object in your Business Central organization.",
  },
  perform: async (
    context,
    {
      connection,
      companyId,
      purchaseOrderLineId,
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

    const { data } = await client.patch<PurchaseOrderLine>(
      `/companies(${companyId})/purchaseOrderLines(${purchaseOrderLineId})`,
      payload,
      {
        headers: {
          "If-Match": "*",
        },
      },
    );

    return { data };
  },
  inputs,
  examplePayload,
});
