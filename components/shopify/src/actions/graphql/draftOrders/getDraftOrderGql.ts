import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getDraftOrderExamplePayload as examplePayload } from "../../../examplePayloads";
import { getDraftOrderInputs as inputs } from "../../../inputsGql";
import { getDraftOrderGqlOutputSchema } from "../../../outputSchemas";
import getDraftOrderQuery from "../queries/draftOrders/GetDraftOrder.gql";

export const getDraftOrderGql = action({
  display: {
    label: "Get Draft Order",
    description: "Retrieves a draft order by ID.",
  },
  performSafety: "safe",
  perform: async (context, { shopifyConnection, draftOrderId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data = await client.request(getDraftOrderQuery, {
      id: draftOrderId,
    });

    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDraftOrderGqlOutputSchema,
  }),
  examplePayload,
});
