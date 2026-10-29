import { action } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { getWebhookExamplePayload } from "../../examplePayloads";
import { getWebhookInputs } from "../../inputs";
import type { WebhookResponse } from "../../types";

export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description: "Get a single webhook subscription by ID.",
  },
  inputs: getWebhookInputs,
  perform: async (context, { connection, resourceId }) => {
    const client = await createClassicClient(connection, context.debug.enabled);
    const { data } = await client.get<WebhookResponse>(
      `/webhooks/id/${resourceId}`,
    );
    return { data };
  },
  examplePayload: getWebhookExamplePayload,
});
