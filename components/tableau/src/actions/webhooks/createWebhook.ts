import { action } from "@prismatic-io/spectral";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import { createWebhookSubscription, getTableauClient } from "../../util";
export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a new webhook for a site.",
  },
  examplePayload: createWebhookExamplePayload,
  perform: async (
    context,
    {
      apiVersion,
      events,
      tableauConnection,
      timeout,
      webhookEnabled,
      webhookName,
      webhookUrl,
    },
  ) => {
    const client = await getTableauClient({
      tableauConnection,
      timeout,
      debug: context.debug.enabled,
      apiVersion,
    });
    const { data } = await createWebhookSubscription(
      client,
      webhookUrl,
      events,
      webhookName,
      webhookEnabled,
    );
    return {
      data,
    };
  },
  inputs: createWebhookInputs,
});
