import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getFulfillmentServiceExamplePayload as examplePayload } from "../../../examplePayloads";
import { getFulfillmentServiceInputs as inputs } from "../../../inputsGql";
import getFulfillmentServiceQuery from "../queries/fulfillmentServices/GetFulfillmentService.gql";

export const getFulfillmentServiceGql = action({
  display: {
    label: "Get Fulfillment Service",
    description: "Retrieves a fulfillment service by ID.",
  },
  inputs,
  perform: async (context, { shopifyConnection, fulfillmentServiceId }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data = await client.request(getFulfillmentServiceQuery, {
      id: fulfillmentServiceId,
    });

    return {
      data,
    };
  },
  examplePayload,
});
