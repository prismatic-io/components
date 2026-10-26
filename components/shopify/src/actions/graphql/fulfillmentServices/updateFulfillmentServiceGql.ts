import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { updateFulfillmentServiceExamplePayload as examplePayload } from "../../../examplePayloads";
import { updateFulfillmentServiceInputs as inputs } from "../../../inputsGql";
import { updateFulfillmentServiceGqlOutputSchema } from "../../../outputSchemas";
import updateFulfillmentServiceQuery from "../queries/fulfillmentServices/UpdateFulfillmentService.gql";
export const updateFulfillmentServiceGql = action({
  display: {
    label: "Update Fulfillment Service",
    description: "Updates an existing fulfillment service.",
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateFulfillmentServiceGqlOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      shopifyConnection,
      fulfillmentServiceId,
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
      fulfillmentServiceUpdate: Record<string, unknown>;
    } = await client.request(updateFulfillmentServiceQuery, {
      id: fulfillmentServiceId,
      name: fulfillmentServiceName,
      callbackUrl,
      inventoryManagement,
      trackingSupport,
    });
    return {
      data: data.fulfillmentServiceUpdate,
    };
  },
  examplePerform: async () => examplePayload,
  examplePayload,
});
