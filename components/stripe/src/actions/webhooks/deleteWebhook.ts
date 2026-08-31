import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { deleteWebhookInputs } from "../../inputs";
import { deletedWebhookEndpointOutputSchema } from "../../outputSchemas";
import { deleteWebhookExamplePayload } from "../../examplePayloads/webhooks";
import { deleteWebhookFn } from "../../util";
export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook endpoint by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { stripeConnection, timeout, webhookId }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const data = await deleteWebhookFn(client, webhookId);
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { webhookId },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...deleteWebhookExamplePayload.data,
      id: webhookId,
    },
  }),
  inputs: deleteWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deletedWebhookEndpointOutputSchema,
  }),
  examplePayload: deleteWebhookExamplePayload,
});
