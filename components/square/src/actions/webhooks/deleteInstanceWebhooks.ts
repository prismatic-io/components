import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { deleteInstanceWebhooksExamplePayload } from "../../examplePayloads";
import { deleteInstanceWebhooksInputs } from "../../inputs";

export const deleteInstanceWebhooks = action({
  display: {
    label: "Delete Instance Webhooks",
    description: "Deletes all webhooks that point to a flow in this instance.",
  },
  perform: async (context, { squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    
    const listResponse = await client.get("/v2/webhooks/subscriptions");
    const allSubscriptions = listResponse.data;

    
    for (const subscription of allSubscriptions) {
      await client.delete(`/v2/webhooks/subscriptions/${subscription.id}`);
    }

    return {
      data: "All webhooks deleted",
    };
  },
  inputs: deleteInstanceWebhooksInputs,
  examplePayload: deleteInstanceWebhooksExamplePayload,
});
