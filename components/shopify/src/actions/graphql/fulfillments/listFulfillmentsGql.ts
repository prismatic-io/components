import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { listFulfillmentsExamplePayload } from "../../../examplePayloads";
import { listFulfillmentsInputs as inputs } from "../../../inputsGql";
import { listFulfillmentsGqlOutputSchema } from "../../../outputSchemas";
import type { Fulfillment } from "../../../types";
import { fulfillmentMapper } from "../mappers/fulfillmentMapper";
import listFulfillmentsQuery from "../queries/fulfillments/ListFulfillments.gql";
export const listFulfillmentsGql = action({
  display: {
    label: "List Fulfillments",
    description: "Lists all fulfillments for a specified order.",
  },
  perform: async (context, { shopifyConnection, orderId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data: {
      order: {
        fulfillments: Fulfillment[];
      };
    } = await client.request(listFulfillmentsQuery, {
      orderId,
      first: 10000,
    });
    return {
      data: {
        data: {
          fulfillments: data.order.fulfillments.map(fulfillmentMapper),
        },
      },
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFulfillmentsGqlOutputSchema,
  }),
  examplePayload: listFulfillmentsExamplePayload.restMap,
});
