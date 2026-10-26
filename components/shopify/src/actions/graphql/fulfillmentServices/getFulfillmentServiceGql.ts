import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getFulfillmentServiceExamplePayload as examplePayload } from "../../../examplePayloads";
import { getFulfillmentServiceInputs as inputs } from "../../../inputsGql";
import { getFulfillmentServiceGqlOutputSchema } from "../../../outputSchemas";
import getFulfillmentServiceQuery from "../queries/fulfillmentServices/GetFulfillmentService.gql";
export const getFulfillmentServiceGql = action({
  display: {
    label: "Get Fulfillment Service",
    description: "Retrieves a fulfillment service by ID.",
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getFulfillmentServiceGqlOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { shopifyConnection, fulfillmentServiceId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data = await client.request(getFulfillmentServiceQuery, {
      id: fulfillmentServiceId,
    });
    return {
      data,
    };
  },
  examplePayload,
});
