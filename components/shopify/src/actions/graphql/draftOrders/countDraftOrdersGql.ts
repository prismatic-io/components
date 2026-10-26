import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { countDraftOrdersExamplePayload as examplePayload } from "../../../examplePayloads";
import { countDraftOrdersInputs as inputs } from "../../../inputsGql";
import { countDraftOrdersGqlOutputSchema } from "../../../outputSchemas";
import type { Count } from "../../../types";
import countDraftOrdersQuery from "../queries/draftOrders/CountDraftOrders.gql";
export const countDraftOrdersGql = action({
  display: {
    label: "Count Draft Orders",
    description:
      "Returns a count of all draft orders. Note: this action currently utilizes an unstable version of the Shopify Admin GraphQL API and is subject to change.",
  },
  performSafety: "safe",
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      "unstable",
      context.debug.enabled,
      context.logger,
    );
    const data: {
      draftOrderCount: Count;
    } = await client.request(countDraftOrdersQuery);
    return {
      data: data.draftOrderCount,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: countDraftOrdersGqlOutputSchema,
  }),
  examplePayload,
});
