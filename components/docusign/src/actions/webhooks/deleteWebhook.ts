import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../../client";
import { deleteWebhookInputs } from "../../inputs";
import { deleteWebhook as deleteWebhookFn } from "../../util";
import { deleteWebhookExamplePayload } from "../../examplePayloads";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a single webhook.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, connectId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const data = await deleteWebhookFn(client, connectId);
    return { data };
  },
  examplePerform: async () => deleteWebhookExamplePayload,
  inputs: deleteWebhookInputs,
  examplePayload: deleteWebhookExamplePayload,
});
