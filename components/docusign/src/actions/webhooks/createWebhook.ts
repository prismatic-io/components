import { action, outputSchema } from "@prismatic-io/spectral";
import { createWebhookOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { createWebhookInputs } from "../../inputs";
import { createWebhook as createWebhookFn } from "../../util";
import { createWebhookExamplePayload } from "../../examplePayloads";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a new webhook (Account Level).",
  },
  performSafety: "notAllowed",
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
      webhookEvents,
      includeHMAC,
    );
    return { data };
  },
  examplePerform: async () => createWebhookExamplePayload,
  inputs: createWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createWebhookOutputSchema,
  }),
  examplePayload: createWebhookExamplePayload,
});
