import { action } from "@prismatic-io/spectral";
import { createKarbonClient } from "../../client";
import deleteAllWebhookSubscriptionsInputs from "../../inputs/webhooks/deleteAllWebhookSubscriptions";

import { deleteAllWebhookSubscriptionsExamplePayload } from "../../examplePayloads";
import { SUCCESS_MESSAGE } from "../../constants";

export const deleteAllWebhookSubscriptions = action({
  display: {
    label: "Delete All Webhook Subscriptions",
    description:
      "Deletes all Webhook Subscriptions associated with Contact, Work, and Note",
  },
  inputs: {
    ...deleteAllWebhookSubscriptionsInputs,
  },
  perform: async (context, { connection }) => {
    const client = createKarbonClient(connection, context.debug.enabled);

    await client.delete(`/v3/WebhookSubscriptions`);

    return { data: SUCCESS_MESSAGE };
  },
  examplePayload: deleteAllWebhookSubscriptionsExamplePayload,
});
