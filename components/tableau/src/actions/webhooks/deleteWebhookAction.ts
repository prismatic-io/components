import { action } from "@prismatic-io/spectral";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookInputs } from "../../inputs";
import { deleteWebhook, getTableauClient } from "../../util";
export const deleteWebhookAction = action({
  display: {
    label: "Delete Webhook",
    description: "Delete the specified webhook.",
  },
  examplePayload: deleteWebhookExamplePayload,
  perform: async (
    context,
    { apiVersion, tableauConnection, timeout, webhookId },
  ) => {
    const client = await getTableauClient({
      tableauConnection,
      timeout,
      debug: context.debug.enabled,
      apiVersion,
    });
    const { data } = await deleteWebhook(client, webhookId);
    return {
      data,
    };
  },
  inputs: deleteWebhookInputs,
});
