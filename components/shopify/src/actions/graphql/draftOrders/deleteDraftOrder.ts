import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteDraftOrderExamplePayload as examplePayload } from "../../../examplePayloads";
import { deleteDraftOrderInputs as inputs } from "../../../inputsGql";
import deleteDraftOrderQuery from "../queries/draftOrders/DeleteDraftOrder.gql";

export const deleteDraftOrderGql = action({
  display: {
    label: "Delete Draft Order",
    description: "Deletes an existing draft order.",
  },
  perform: async (context, { shopifyConnection, draftOrderId }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: { draftOrderDelete: Record<string, unknown> } = await client.request(
      deleteDraftOrderQuery,
      {
        input: {
          id: draftOrderId,
        },
      },
    );

    return {
      data: data.draftOrderDelete,
    };
  },
  inputs,
  examplePayload,
});
