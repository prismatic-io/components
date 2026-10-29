import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { confirmOrderShipmentExamplePayload } from "../../examplePayloads/orders";
import {
  carrierCode,
  carrierName,
  codCollectionMethod,
  connectionInput,
  marketplaceId,
  orderId,
  orderItems,
  packageReferenceId,
  ShipDate,
  shipFromSupplySourceId,
  shippingMethod,
  trackingNumber,
} from "../../inputs";

export const confirmOrderShipment = action({
  display: {
    label: "Confirm Order Shipment",
    description:
      "Updates the shipment confirmation status for a specified order.",
  },
  examplePayload: confirmOrderShipmentExamplePayload,
  inputs: {
    connectionInput,
    orderId,
    marketplaceId,
    packageReferenceId,
    carrierCode,
    trackingNumber,
    shipDate: ShipDate,
    orderItems,
    carrierName,
    shippingMethod,
    shipFromSupplySourceId,
    codCollectionMethod,
  },
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
      carrierName,
      shippingMethod,
      shipFromSupplySourceId,
      codCollectionMethod,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post(
      `/orders/v0/orders/${orderId}/shipmentConfirmation`,
      {
        packageDetail: {
          packageReferenceId: packageReferenceId || undefined,
          carrierCode: carrierCode || undefined,
          carrierName: carrierName || undefined,
          shippingMethod: shippingMethod || undefined,
          trackingNumber: trackingNumber || undefined,
          shipDate: shipDate || undefined,
          shipFromSupplySourceId: shipFromSupplySourceId || undefined,
          orderItems: orderItems || undefined,
        },
        codCollectionMethod: codCollectionMethod || undefined,
        marketplaceId: marketplaceId || undefined,
      },
    );
    return {
      data,
    };
  },
});
