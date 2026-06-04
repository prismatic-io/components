import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { completeDraftOrderExamplePayload as examplePayload } from "../../../examplePayloads";
import { completeDraftOrderInputs as inputs } from "../../../inputsGql";
import completeDraftOrderQuery from "../queries/draftOrders/CompleteDraftOrder.gql";

export const completeDraftOrderGql = action({
  display: {
    label: "Complete Draft Order",
    description: "Marks a draft order as complete.",
  },
  perform: async (context, { shopifyConnection, draftOrderId }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: { draftOrderComplete: Record<string, unknown> } = await client.request(
      completeDraftOrderQuery,
      {
        id: draftOrderId,
      },
    );

    return {
      data: data.draftOrderComplete,
    };
  },
  inputs,
  examplePayload,
});
