import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { listWebhookSubscriptionsInputs } from "../../inputs";
import { fetchGuruResults } from "../../util";
import type { GuruWebhookSubscription } from "../../types";
import { listWebhookSubscriptionsPayload } from "../../examplePayloads";

export const listWebhookSubscriptions = action({
  display: {
    label: "List Webhook Subscriptions",
    description: "Retrieve all webhook subscriptions for the current user",
  },
  perform: async (context, { connection }) => {
    const client = getGuruClient(connection, context.debug.enabled);
    
    const data = await fetchGuruResults<GuruWebhookSubscription>(
      client,
      "/webhooks",
      true,
      {},
    );

    return { data };
  },
  inputs: listWebhookSubscriptionsInputs,
  examplePayload: listWebhookSubscriptionsPayload,
});
