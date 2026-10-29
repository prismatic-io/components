import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { listFulfillmentServicesExamplePayload as examplePayload } from "../../../examplePayloads";
import { listFulfillmentServicesInputs as inputs } from "../../../inputsGql";
import { listFulfillmentServicesGqlOutputSchema } from "../../../outputSchemas";
import listFulfillmentServicesQuery from "../queries/fulfillmentServices/ListFulfillmentServices.gql";

export const listFulfillmentServicesGql = action({
  display: {
    label: "List Fulfillment Services",
    description: "Lists all fulfillment services.",
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFulfillmentServicesGqlOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data: { shop: Record<string, unknown> } = await client.request(
      listFulfillmentServicesQuery,
    );

    return {
      data: data.shop,
    };
  },
  examplePayload,
});
