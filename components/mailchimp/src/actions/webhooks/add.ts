import { action } from "@prismatic-io/spectral";
import { addWebhookInputs } from "../../inputs";
import { addWebhookExamplePayload } from "../../examplePayloads";
import { createWebhook } from "../../utils/webhooks";

export default action({
  display: {
    label: "Add Webhook",
    description: "Create a new webhook for a specific list/audience.",
  },
  inputs: addWebhookInputs,
  examplePayload: addWebhookExamplePayload,
  perform: async (
    _context,
    { connection, listId, webhookUrl, webhookEvents, webhookSources },
  ) => {
    const webhook = await createWebhook(
      connection,
      listId,
      webhookUrl,
      webhookEvents,
      webhookSources,
    );

    return { data: webhook };
  },
});
