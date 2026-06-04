import { action } from "@prismatic-io/spectral";
import { createKarbonClient } from "../../client";
import getWebhookInputs from "../../inputs/webhooks/getWebhook";
import { cleanOdata } from "../../utils";
import { getWebhookExamplePayload } from "../../examplePayloads";

export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description:
      "Get a webhook subscription associated with the Karbon entity specified",
  },
  inputs: {
    ...getWebhookInputs,
  },
  perform: async (context, { connection, webhookType }) => {
    const client = createKarbonClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/v3/WebhookSubscriptions/${webhookType}`,
    );

    return { data: cleanOdata(data) };
  },
  examplePayload: getWebhookExamplePayload,
});
