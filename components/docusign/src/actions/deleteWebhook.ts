import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, connectId } from "../inputs";
import { deleteWebhook as deleteWebhookFn } from "../utils";
import { deleteWebhookPayload } from "../examplePayloads";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a single webhook.",
  },
  perform: async (context, { connection, connectId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const data = await deleteWebhookFn(client, connectId);
    return { data };
  },
  inputs: {
    connection,
    connectId: {
      ...connectId,
      comments:
        "The ID of the custom Connect (Webhook) configuration to delete.",
    },
  },
  examplePayload: deleteWebhookPayload,
});
