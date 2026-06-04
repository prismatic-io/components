import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createPurchaseOrderExamplePayload as examplePayload } from "../../examplePayloads";
import { createPurchaseOrderInputs as inputs } from "../../inputs/purchaseOrders/createPurchaseOrderInputs";
import type { PurchaseOrder } from "../../interfaces";

export const createPurchaseOrder = action({
  display: {
    label: "Create Purchase Order",
    description: "Creates a purchase order object in your Business Central organization.",
  },
  perform: async (
    context,
    {
      connection,
      shipToAddressLine1,
      shipToName,
      currencyCode,
      companyId,
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

    const { data } = await client.post<PurchaseOrder>(
      `/companies(${companyId})/purchaseOrders`,
      payload,
    );

    return { data };
  },
  inputs,
  examplePayload,
});
