import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { createFulfillmentServiceExamplePayload as examplePayload } from "../../../examplePayloads";
import { createFulfillmentServiceInputs as inputs } from "../../../inputsGql";

import createFulfillmentServiceQuery from "../queries/fulfillmentServices/CreateFulfillmentService.gql";

export const createFulfillmentServiceGql = action({
  display: {
    label: "Create Fulfillment Service",
    description: "Creates a new fulfillment service.",
  },
  inputs,
  perform: async (
    context,
    {
      shopifyConnection,
      callbackUrl,
      inventoryManagement,
      fulfillmentServiceName,
      trackingSupport,
    },
  ) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: { fulfillmentServiceCreate: Record<string, unknown> } = await client.request(
      createFulfillmentServiceQuery,
      {
        name: fulfillmentServiceName,
        callbackUrl,
        inventoryManagement,
        trackingSupport,
      },
    );

    return {
      data: data.fulfillmentServiceCreate,
    };
  },
  examplePayload,
});
