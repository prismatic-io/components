import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { createWebhookInputs } from "../../inputs";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookHelper, eventsBuilder } from "../../helpers";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description:
      "Create a new Event Webhook configuration to receive email event data.",
  },
  inputs: createWebhookInputs,
  perform: async (
    _context,
    { sendGridConnection, url, friendlyName, enabled, events },
  ) => {
    const client = createAuthorizedClient(sendGridConnection);

    const eventsPayload = eventsBuilder(events);

    const data = await createWebhookHelper(client, {
      enabled,
      url,
      ...eventsPayload,
      friendlyName,
    });

    return {
      data,
    };
  },
  examplePayload: createWebhookExamplePayload,
});
