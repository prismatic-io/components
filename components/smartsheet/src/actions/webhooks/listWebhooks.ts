import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";
import type { SmartsheetWebhook } from "../../types";
import { paginateByPage } from "../../util/pagination";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Lists all webhooks owned by the authenticated user.",
  },
  perform: async (context, { connection, showAll }) => {
    const instanceWebhookUrls = Object.values(context.webhookUrls);
    const client = createClient(connection, context.debug.enabled);
    const allWebhooks = await paginateByPage<SmartsheetWebhook>(
      client,
      "/webhooks",
    );
    const data = showAll
      ? allWebhooks
      : allWebhooks.filter((webhook) =>
          instanceWebhookUrls.includes(webhook.callbackUrl),
        );

    return { data };
  },
  inputs: listWebhooksInputs,
  examplePayload: listWebhooksExamplePayload,
});
