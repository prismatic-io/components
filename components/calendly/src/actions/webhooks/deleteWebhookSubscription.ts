import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, webhookUuid } from "../../inputs";
import { deleteWebhook } from "../../util";

export const deleteWebhookSubscription = action({
  display: {
    label: "Delete Webhook Subscription",
    description: "Delete a Webhook Subscription.",
  },
  perform: async (context, { connection, webhookUuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const data = await deleteWebhook(client, webhookUuid);
    return { data };
  },
  inputs: {
    connection,
    webhookUuid,
  },
});
