import { action } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { timeout, connectionInput } from "../../inputs";
import { deleteWebhookFn, listWebhookEventsFn } from "../../util";
import { deleteWebhooksExamplePayload } from "../../examplePayloads/webhooks";

export const deleteWebhooks = action({
  display: {
    label: "Delete All Instance Webhooks",
    description: "Delete all webhook endpoints associated with each flow of the current instance.",
  },
  perform: async (context, { stripeConnection, timeout }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const webhooks = await listWebhookEventsFn(client.webhookEndpoints, true, {});
    const instanceWebhookUrls = Object.values(context.webhookUrls);
    const webhookToDelete = webhooks.data
      .map(async ({ url, id }) => {
        if (instanceWebhookUrls.find((instanceUrl) => instanceUrl === url)) {
          return await deleteWebhookFn(client, id);
        }
      })
      .filter(Boolean);
    const deletedWebhooks = await Promise.all(webhookToDelete);
    return {
      data: deletedWebhooks,
    };
  },
  inputs: {
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: deleteWebhooksExamplePayload,
});
