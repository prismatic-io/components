import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { createOrderExamplePayload as examplePayload } from "../../../examplePayloads";
import { createOrderInputs as inputs } from "../../../inputsGql";
import { createOrderGqlOutputSchema } from "../../../outputSchemas";
import createOrderQuery from "../queries/orders/CreateOrder.gql";

export const createOrderGql = action({
  display: {
    label: "Create Order",
    description: "Creates a new order.",
  },
  performSafety: "notAllowed",
  perform: async (context, { shopifyConnection, orderData }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data: { orderCreate: Record<string, unknown> } = await client.request(
      createOrderQuery,
      {
        order: orderData,
      },
    );
    return { data: data.orderCreate };
  },
  examplePerform: async () => examplePayload,
  examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createOrderGqlOutputSchema,
  }),
});
