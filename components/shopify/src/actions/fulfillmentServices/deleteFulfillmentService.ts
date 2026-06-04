import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { deleteFulfillmentServiceInputs } from "../../inputs";

export const deleteFulfillmentService = action({
  display: {
    label: "Delete Fulfillment Service (Deprecated)",
    description:
      "Deletes an existing fulfillment service. This version of the action is being deprecated. Please replace action with Delete Fulfillment Service.",
  },
  inputs: deleteFulfillmentServiceInputs,
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    await client.delete(`/fulfillment_services/${params.fulfillmentServiceId}`);
    return { data: {} };
  },
  examplePayload: { data: {} },
});
