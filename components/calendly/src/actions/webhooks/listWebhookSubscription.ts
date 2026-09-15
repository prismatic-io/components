import { action, outputSchema } from "@prismatic-io/spectral";
import { listWebhookSubscriptionOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { listWebhookSubscriptionInputs } from "../../inputs";
import { listWebhookSubscriptionExamplePayload } from "../../examplePayloads";
import { paginator } from "../../util";
export const listWebhookSubscription = action({
  display: {
    label: "List Webhook Subscription",
    description:
      "Get a list of Webhook Subscriptions for a specified Organization or User.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, organization, scope, sort, user }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const data = await paginator(client, "/webhook_subscriptions", {
      organization,
      scope,
      sort: sort,
      user: user,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listWebhookSubscriptionExamplePayload.data,
  }),
  inputs: listWebhookSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listWebhookSubscriptionOutputSchema,
  }),
  examplePayload: listWebhookSubscriptionExamplePayload,
});
