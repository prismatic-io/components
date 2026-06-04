import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getDraftOrderExamplePayload as examplePayload } from "../../../examplePayloads";
import { getDraftOrderInputs as inputs } from "../../../inputsGql";
import getDraftOrderQuery from "../queries/draftOrders/GetDraftOrder.gql";

export const getDraftOrderGql = action({
  display: {
    label: "Get Draft Order",
    description: "Retrieves a draft order by ID.",
  },
  perform: async (context, { shopifyConnection, draftOrderId }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const data = await client.request(getDraftOrderQuery, {
      id: draftOrderId,
    });

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
