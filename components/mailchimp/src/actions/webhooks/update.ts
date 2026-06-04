import { action } from "@prismatic-io/spectral";
import { updateWebhookInputs } from "../../inputs";
import { updateWebhookExamplePayload } from "../../examplePayloads";
import { updateWebhook } from "../../utils/webhooks";

export default action({
  display: {
    label: "Update Webhook",
    description: "Update an existing webhook for a specific list/audience.",
  },
  inputs: updateWebhookInputs,
  examplePayload: updateWebhookExamplePayload,
  perform: async (
    _context,
    {
      connection,
      listId,
      webhookId,
      webhookUrl,
      webhookEvents,
      webhookSources,
    },
  ) => {
    const webhook = await updateWebhook(
      connection,
      listId,
      webhookId,
      webhookUrl,
      webhookEvents,
      webhookSources,
    );

    return { data: webhook };
  },
});
