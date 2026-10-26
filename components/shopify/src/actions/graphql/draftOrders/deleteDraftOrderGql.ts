import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteDraftOrderExamplePayload as examplePayload } from "../../../examplePayloads";
import { deleteDraftOrderInputs as inputs } from "../../../inputsGql";
import { deleteDraftOrderGqlOutputSchema } from "../../../outputSchemas";
import deleteDraftOrderQuery from "../queries/draftOrders/DeleteDraftOrder.gql";
export const deleteDraftOrderGql = action({
  display: {
    label: "Delete Draft Order",
    description: "Deletes an existing draft order.",
  },
  performSafety: "notAllowed",
  perform: async (context, { shopifyConnection, draftOrderId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data: {
      draftOrderDelete: Record<string, unknown>;
    } = await client.request(deleteDraftOrderQuery, {
      input: {
        id: draftOrderId,
      },
    });
    return {
      data: data.draftOrderDelete,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteDraftOrderGqlOutputSchema,
  }),
  examplePerform: async () => examplePayload,
  examplePayload,
});
