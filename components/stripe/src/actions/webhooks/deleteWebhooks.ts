import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { deleteWebhooksInputs } from "../../inputs";
import { deleteWebhooksOutputSchema } from "../../outputSchemas";
import { deleteWebhookFn, listWebhookEventsFn } from "../../util";
import { deleteWebhooksExamplePayload } from "../../examplePayloads/webhooks";
export const deleteWebhooks = action({
  display: {
    label: "Delete All Instance Webhooks",
    description:
      "Delete all webhook endpoints associated with each flow of the current instance.",
  },
  performSafety: "notAllowed",
  perform: async (context, { stripeConnection, timeout }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const webhooks = await listWebhookEventsFn(
      client.webhookEndpoints,
      true,
      {},
    );
    const instanceWebhookUrls = Object.values(context.webhookUrls);
    const webhookToDelete = webhooks.data
      .filter(({ url }) => instanceWebhookUrls.includes(url))
      .map(({ id }) => deleteWebhookFn(client, id));
    const deletedWebhooks = await Promise.all(webhookToDelete);
    return {
      data: deletedWebhooks,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteWebhooksExamplePayload.data,
  }),
  inputs: deleteWebhooksInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteWebhooksOutputSchema,
  }),
  examplePayload: deleteWebhooksExamplePayload,
});
