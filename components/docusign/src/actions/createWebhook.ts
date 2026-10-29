import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import {
  connection,
  urlToPublishTo,
  webhookName,
  webhookEvents,
  includeHMAC,
} from "../inputs";
import { createWebhook as createWebhookFn } from "../utils";
import { createWebhookPayload } from "../examplePayloads";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a new webhook (Account Level).",
  },
  perform: async (
    context,
    { connection, urlToPublishTo, webhookName, webhookEvents, includeHMAC },
  ) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const data = await createWebhookFn(
      client,
      urlToPublishTo,
      webhookName,
      webhookEvents as string[],
      includeHMAC,
    );
    return { data };
  },
  inputs: {
    connection,
    urlToPublishTo,
    webhookName,
    webhookEvents,
    includeHMAC,
  },
  examplePayload: createWebhookPayload,
});
