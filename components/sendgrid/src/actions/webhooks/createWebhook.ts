import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import { createWebhookOutputSchema } from "../../outputSchemas";
import { createWebhookHelper, eventsBuilder } from "../../util";
export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description:
      "Creates a new Event Webhook configuration to receive email event data.",
  },
  inputs: createWebhookInputs,
  performSafety: "notAllowed",
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createWebhookOutputSchema,
  }),
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createWebhookExamplePayload.data,
  }),
  examplePayload: createWebhookExamplePayload,
});
