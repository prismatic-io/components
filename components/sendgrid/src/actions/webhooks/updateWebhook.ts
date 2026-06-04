import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { updateWebhookInputs } from "../../inputs";
import { updateWebhookExamplePayload } from "../../examplePayloads";
import { eventsBuilder, updateWebhookHelper } from "../../helpers";

export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description: "Update an existing Event Webhook configuration.",
  },
  inputs: updateWebhookInputs,
  perform: async (
    _context,
    { sendGridConnection, webhookId, url, friendlyName, enabled, events },
  ) => {
    const client = createAuthorizedClient(sendGridConnection);

    const eventsPayload = eventsBuilder(events);

    const data = await updateWebhookHelper(client, {
      webhookId,
      enabled,
      url,
      ...eventsPayload,
      friendlyName,
    });

    return {
      data,
    };
  },
  examplePayload: updateWebhookExamplePayload,
});
