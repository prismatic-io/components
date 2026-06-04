import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { updateWebhookExamplePayload } from "../../examplePayloads";
import { allEvents, connectionInput, events, getEndpoint, getStatus, getWebhookId } from "../../inputs";
import type { UpdateWebhookBody } from "./types/UpdateWebhookBody";

const webhookId = getWebhookId(true, "Webhook ID");
const endpoint = getEndpoint(true, "URL of the webhook endpoint.");
const status = getStatus(true, "Status");

export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description: "Update the configuration of a webhook.",
  },
  examplePayload: updateWebhookExamplePayload,
  perform: async (context, { clickUpConnection, webhookId, endpoint, events, allEvents, status }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const body: UpdateWebhookBody = {
      endpoint,
      events: allEvents ? "*" : events,
      status,
    };

    const { data } = await client.put(`/webhook/${webhookId}`, body);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    webhookId,
    endpoint,
    allEvents,
    events,
    status,
  },
});
