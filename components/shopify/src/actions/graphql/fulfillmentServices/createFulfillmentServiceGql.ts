import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { createFulfillmentServiceExamplePayload as examplePayload } from "../../../examplePayloads";
import { createFulfillmentServiceInputs as inputs } from "../../../inputsGql";
import { createFulfillmentServiceGqlOutputSchema } from "../../../outputSchemas";
import createFulfillmentServiceQuery from "../queries/fulfillmentServices/CreateFulfillmentService.gql";
export const createFulfillmentServiceGql = action({
  display: {
    label: "Create Fulfillment Service",
    description: "Creates a new fulfillment service.",
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createFulfillmentServiceGqlOutputSchema,
  }),
  performSafety: "notAllowed",
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
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data: {
      fulfillmentServiceCreate: Record<string, unknown>;
    } = await client.request(createFulfillmentServiceQuery, {
      name: fulfillmentServiceName,
      callbackUrl,
      inventoryManagement,
      trackingSupport,
    });
    return {
      data: data.fulfillmentServiceCreate,
    };
  },
  examplePerform: async () => examplePayload,
  examplePayload,
});
