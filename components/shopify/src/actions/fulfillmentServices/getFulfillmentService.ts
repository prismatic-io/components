import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { getFulfillmentServiceInputs } from "../../inputs";
import { getFulfillmentServiceExamplePayload } from "../../payloadExamples";

export const getFulfillmentService = action({
  display: {
    label: "Get Fulfillment Service (Deprecated)",
    description:
      "Retrieve a fulfillment service enabled on your platform by its ID. This version of the action is being deprecated. Please replace action with Get Fulfillment Service.",
  },
  inputs: getFulfillmentServiceInputs,
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { data } = await client.get(`/fulfillment_services/${params.fulfillmentServiceId}`);
    return { data };
  },
  examplePayload: { data: getFulfillmentServiceExamplePayload },
});
