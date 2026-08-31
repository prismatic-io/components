import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { listWebhooksInputs } from "../../inputs";
import { listWebhooksOutputSchema } from "../../outputSchemas";
import { listWebhookEventsFn } from "../../util";
import { listWebhooksExamplePayload } from "../../examplePayloads/webhooks";
export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Return a list of all webhook endpoints.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { stripeConnection, timeout, pagination, fetchAll },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const data = await listWebhookEventsFn(client.webhookEndpoints, fetchAll, {
      limit: pagination.limit,
      starting_after: pagination.startingAfter,
      ending_before: pagination.endingBefore,
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listWebhooksExamplePayload.data,
  }),
  inputs: listWebhooksInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listWebhooksOutputSchema,
  }),
  examplePayload: listWebhooksExamplePayload,
});
