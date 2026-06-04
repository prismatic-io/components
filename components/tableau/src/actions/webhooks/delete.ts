import { getTableuClient } from "../../auth";
import { action } from "@prismatic-io/spectral";
import { connectionInput, timeout, webhookId, apiVersion } from "../../inputs";
import { deleteWebhook } from "../../utils";
import { deleteWebhookExamplePayload } from "../../examplePayloads";

export const deleteWebhookAction = action({
  display: {
    label: "Delete Webhook",
    description: "Deletes the specified webhook.",
  },
  examplePayload: deleteWebhookExamplePayload,
  perform: async (
    context,
    { apiVersion, tableauConnection, timeout, webhookId },
  ) => {
    const client = await getTableuClient({
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
  inputs: {
    tableauConnection: connectionInput,
    webhookId,
    timeout,
    apiVersion,
  },
});
