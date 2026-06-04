import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { getFulfillmentInputs } from "../../inputs";
import { getFulfillmentExamplePayload } from "../../payloadExamples";

export const getFulfillment = action({
  display: {
    label: "Get Fulfillment (Deprecated)",
    description:
      "Get the information and metadata of a fulfillment enabled on your platform. This version of the action is being deprecated. Please replace action with Get Fulfillment.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.get(`/fulfillments/${params.fulfillmentId}`);
    return { data: { data, headers } };
  },
  inputs: getFulfillmentInputs,
  examplePayload: { data: getFulfillmentExamplePayload },
});
