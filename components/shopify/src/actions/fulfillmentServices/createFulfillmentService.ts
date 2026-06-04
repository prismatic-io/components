import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { createFulfillmentServiceInputs } from "../../inputs";
import { createFulfillmentServiceExamplePayload } from "../../payloadExamples";

export const createFulfillmentService = action({
  display: {
    label: "Create Fulfillment Service (Deprecated)",
    description:
      "Create a fulfillment service. This version of the action is being deprecated. Please replace action with Create Fulfillment Service.",
  },
  inputs: createFulfillmentServiceInputs,
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const payload = {
      fulfillment_service: {
        callback_url: params.callbackUrl,
        inventory_management: params.inventoryManagement || undefined,
        name: params.fulfillmentServiceName,
        fulfillment_orders_opt_in: true,
        format: "json",
        permits_sku_sharing: params.permitsSkuSharing || undefined,
        requires_shipping_method: params.requiresShippingMethod || undefined,
        tracking_support: params.trackingSupport || undefined,
      },
    };
    const { data } = await client.post("/fulfillment_services.json", payload);
    return { data };
  },
  examplePayload: { data: createFulfillmentServiceExamplePayload },
});
