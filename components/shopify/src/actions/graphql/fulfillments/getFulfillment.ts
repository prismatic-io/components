import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getFulfillmentExamplePayload as examplePayload } from "../../../examplePayloads";
import { getFulfillmentInputs as inputs } from "../../../inputsGql";

import getFulfillmentQuery from "../queries/fulfillments/GetFulfillment.gql";

export const getFulfillmentGql = action({
  display: {
    label: "Get Fulfillment",
    description: "Retrieves a fulfillment by ID.",
  },
  perform: async (context, { shopifyConnection, fulfillmentId }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data = await client.request(getFulfillmentQuery, {
      id: fulfillmentId,
    });

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
