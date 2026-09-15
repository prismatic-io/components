import { action, outputSchema } from "@prismatic-io/spectral";
import { createWebhookSubscriptionOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { createWebhookSubscriptionInputs } from "../../inputs";
import { createWebhookSubscriptionExamplePayload } from "../../examplePayloads";
import { postWebhookSubscription } from "../../util";
export const createWebhookSubscription = action({
  display: {
    label: "Create Webhook Subscription",
    description: "Create a Webhook Subscription for an Organization or User.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, url, event, organization, user, scope, signingKey },
  ) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const data = await postWebhookSubscription(
      client,
      url,
      event as string[],
      organization,
      user,
      scope,
      signingKey,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createWebhookSubscriptionExamplePayload.data,
  }),
  inputs: createWebhookSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createWebhookSubscriptionOutputSchema,
  }),
  examplePayload: createWebhookSubscriptionExamplePayload,
});
