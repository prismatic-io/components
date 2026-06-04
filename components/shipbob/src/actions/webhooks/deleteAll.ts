import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteAllWebhooksExamplePayload } from "../../examplePayloads";
import { connectionInput, version } from "../../inputs";
import type { WebhookData } from "../../interfaces/WebhookData";
import { getAllPaginatedData } from "../../util";

export const deleteAllWebhooks = action({
  display: {
    label: "Delete All Instanced Webhooks",
    description: "Delete all webhooks that point to a flow in this instance",
  },
  perform: async (context, { connectionInput, version }) => {
    const client = createClient(
      connectionInput,
      version,
      context.debug.enabled,
    );

    const data = await getAllPaginatedData<WebhookData>(client, "/webhook");

    if (data.length === 0) {
      return {
        data: {
          message: "No subscriptions found",
        },
      };
    }

    const instanceWebhooks = Object.values(context.webhookUrls);

    const subscriptionsToRemove = data
      .filter(({ subscription_url }) =>
        instanceWebhooks.includes(subscription_url),
      )
      .map(({ id }) => id);

    if (subscriptionsToRemove.length === 0) {
      return {
        data: {
          message: "No subscriptions pointing to this instance found",
        },
      };
    }

    await Promise.all(
      subscriptionsToRemove.map((id) => client.delete(`/webhook/${id}`)),
    );

    return { data: { subscriptionsRemoved: subscriptionsToRemove } };
  },
  inputs: {
    connectionInput,
    version,
  },
  examplePayload: deleteAllWebhooksExamplePayload,
});
