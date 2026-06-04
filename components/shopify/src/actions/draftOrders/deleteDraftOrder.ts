import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { deleteDraftOrderInputs } from "../../inputs";
import { deleteDraftOrderExamplePayload } from "../../payloadExamples";

export const deleteDraftOrder = action({
  display: {
    label: "Delete Draft Order (Deprecated)",
    description:
      "Delete the information and metadata of a Draft Order. This version of the action is being deprecated. Please replace action with Delete Draft Order.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { data, headers } = await client.delete(`/draft_orders/${params.draftOrderId}.json`);
    return { data: { data, headers } };
  },
  inputs: deleteDraftOrderInputs,
  examplePayload: { data: deleteDraftOrderExamplePayload },
});
