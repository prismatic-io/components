import { action, util } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { unsubscribeToWebhookExamplePayload } from "../../examplePayloads";
import { unsubscribeToWebhookInputs } from "../../inputs";

export const unsubscribeToWebhook = action({
  display: {
    label: "Unsubscribe from Webhook",
    description: "Unsubscribes from a specific type of webhook in ShipStation.",
  },
  perform: async (context, { connectionInput, webhookId }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const { data } = await client.delete(`/webhooks/${webhookId}`);
    return { data };
  },
  inputs: unsubscribeToWebhookInputs,
  examplePayload: unsubscribeToWebhookExamplePayload,
});
