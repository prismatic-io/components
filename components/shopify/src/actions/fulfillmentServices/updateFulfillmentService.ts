import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { updateFulfillmentServiceInputs } from "../../inputs";
import { updateFulfillmentServiceExamplePayload } from "../../payloadExamples";

export const updateFulfillmentService = action({
  display: {
    label: "Update Fulfillment Service (Deprecated)",
    description:
      "Modify an existing fulfillment service. This version of the action is being deprecated. Please replace action with Update Fulfillment Service.",
  },
  inputs: updateFulfillmentServiceInputs,
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const payload = {
      fulfillment_service: {
        callback_url: params.callbackUrl || undefined,
        inventory_management: params.inventoryManagement || undefined,
        name: params.fulfillmentServiceName || undefined,
        format: "json",
        permits_sku_sharing: params.permitsSkuSharing || undefined,
        requires_shipping_method: params.requiresShippingMethod || undefined,
        tracking_support: params.trackingSupport || undefined,
      },
    };
    const { data } = await client.put(
      `/fulfillment_services/${params.fulfillmentServiceId}`,
      payload,
    );
    return { data };
  },
  examplePayload: { data: updateFulfillmentServiceExamplePayload },
});
