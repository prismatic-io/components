import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getFulfillmentExamplePayload as examplePayload } from "../../../examplePayloads";
import { getFulfillmentInputs as inputs } from "../../../inputsGql";
import { getFulfillmentGqlOutputSchema } from "../../../outputSchemas";

import getFulfillmentQuery from "../queries/fulfillments/GetFulfillment.gql";

export const getFulfillmentGql = action({
  display: {
    label: "Get Fulfillment",
    description: "Retrieves a fulfillment by ID.",
  },
  performSafety: "safe",
  perform: async (context, { shopifyConnection, fulfillmentId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data = await client.request(getFulfillmentQuery, {
      id: fulfillmentId,
    });

    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getFulfillmentGqlOutputSchema,
  }),
  examplePayload,
});
