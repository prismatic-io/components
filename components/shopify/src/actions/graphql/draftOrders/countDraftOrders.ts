import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { countDraftOrdersExamplePayload as examplePayload } from "../../../examplePayloads";
import { countDraftOrdersInputs as inputs } from "../../../inputsGql";
import type { Count } from "../../interfaces/Count";
import countDraftOrdersQuery from "../queries/draftOrders/CountDraftOrders.gql";

export const countDraftOrdersGql = action({
  display: {
    label: "Count Draft Orders",
    description:
      "Returns a count of all draft orders. Note: this action currently utilizes an unstable version of the Shopify Admin GraphQL API and is subject to change.",
  },
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, "unstable", context.debug.enabled);

    const data: {
      draftOrderCount: Count;
    } = await client.request(countDraftOrdersQuery);

    return {
      data: data.draftOrderCount,
    };
  },
  inputs,
  examplePayload,
});
