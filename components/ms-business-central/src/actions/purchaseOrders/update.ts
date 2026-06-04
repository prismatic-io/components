import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { updatePurchaseOrderExamplePayload as examplePayload } from "../../examplePayloads";
import { updatePurchaseOrderInputs as inputs } from "../../inputs/purchaseOrders/updatePurchaseOrderInputs";
import type { PurchaseOrder } from "../../interfaces";

export const updatePurchaseOrder = action({
  display: {
    label: "Update Purchase Order",
    description: "Updates a purchase order object in your Business Central organization.",
  },
  perform: async (
    context,
    {
      connection,
      companyId,
      purchaseOrderId,
      shipToAddressLine1,
      shipToName,
      currencyCode,
      orderDate,
      vendorNumber,
      payToVendorId,
      payToVendorNumber,
      purchaser,
      discountAmount,
      additionalProperties,
    },
  ) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const payload = {
      ...additionalProperties,
      shipToName,
      shipToAddressLine1,
      currencyCode,
      orderDate,
      vendorNumber,
      payToVendorId,
      payToVendorNumber,
      purchaser,
      discountAmount,
    };

    const { data } = await client.patch<PurchaseOrder>(
      `/companies(${companyId})/purchaseOrders(${purchaseOrderId})`,
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
