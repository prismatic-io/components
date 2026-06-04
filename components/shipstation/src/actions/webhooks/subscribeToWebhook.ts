import { action, util } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { subscribeToWebhookExamplePayload } from "../../examplePayloads";
import { subscribeToWebhookInputs } from "../../inputs";

export const subscribeToWebhook = action({
  display: {
    label: "Subscribe to Webhook",
    description: "Subscribes to a specific type of webhook in ShipStation.",
  },
  perform: async (
    context,
    { connectionInput, targetUrl, event, storeId, friendlyName },
  ) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const storeIdNumber = storeId ? util.types.toNumber(storeId) : null;

    const body = {
      target_url: targetUrl,
      event,
      store_id: storeIdNumber,
      friendly_name: friendlyName,
    };

    const { data } = await client.post("/webhooks/subscribe", body);
    return { data };
  },
  inputs: subscribeToWebhookInputs,
  examplePayload: subscribeToWebhookExamplePayload,
});
