import { action } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";
import type { WebhooksListResponse } from "../../types";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "List all webhook subscriptions configured in Jamf Pro.",
  },
  inputs: listWebhooksInputs,
  perform: async (context, { connection }) => {
    const client = await createClassicClient(connection, context.debug.enabled);
    const { data } = await client.get<WebhooksListResponse>("/webhooks");
    return { data };
  },
  examplePayload: listWebhooksExamplePayload,
});
