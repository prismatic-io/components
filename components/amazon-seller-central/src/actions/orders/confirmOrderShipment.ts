import { action, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { confirmOrderShipmentExamplePayload } from "../../examplePayloads/orders";
import { confirmOrderShipmentInputs } from "../../inputs";

export const confirmOrderShipment = action({
  display: {
    label: "Confirm Order Shipment",
    description:
      "Updates the shipment confirmation status for a specified order.",
  },
  examplePayload: confirmOrderShipmentExamplePayload,
  inputs: confirmOrderShipmentInputs,
  performSafety: PerformSafety.NOT_ALLOWED,
  perform: async (
    context,
    {
      connectionInput,
      orderId,
      marketplaceId,
      packageReferenceId,
      carrierCode,
      trackingNumber,
      shipDate,
      orderItems,
      shipFromSupplySourceId,
      additionalFields,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post(
      `/orders/v0/orders/${orderId}/shipmentConfirmation`,
      {
        packageDetail: {
          packageReferenceId: packageReferenceId || undefined,
          carrierCode: carrierCode || undefined,
          carrierName: additionalFields.carrierName || undefined,
          shippingMethod: additionalFields.shippingMethod || undefined,
          trackingNumber: trackingNumber || undefined,
          shipDate: shipDate || undefined,
          shipFromSupplySourceId: shipFromSupplySourceId || undefined,
          orderItems: orderItems || undefined,
        },
        codCollectionMethod: additionalFields.codCollectionMethod || undefined,
        marketplaceId: marketplaceId || undefined,
      },
    );
    return {
      data,
    };
  },
  examplePerform: async () => confirmOrderShipmentExamplePayload,
});
