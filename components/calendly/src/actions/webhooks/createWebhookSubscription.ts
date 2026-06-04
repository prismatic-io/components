import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import {
  connection,
  url,
  event,
  organization,
  user,
  scope,
  signingKey,
} from "../../inputs";
import { createWebhookSubscriptionExamplePayload } from "../../examplePayloads";
import { postWebhookSubscription } from "../../util";

export const createWebhookSubscription = action({
  display: {
    label: "Create Webhook Subscription",
    description: "Create a Webhook Subscription for an Organization or User.",
  },
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
  inputs: {
    connection,
    organization: {
      ...organization,
      required: true,
      dataSource: "organizations",
      comments:
        "The unique reference to the organization that the webhook will be tied to.",
    },
    user: {
      ...user,
      required: false,
      comments:
        "The unique reference to the user that the webhook will be tied to.",
    },
    url,
    event,
    scope,
    signingKey,
  },
  examplePayload: createWebhookSubscriptionExamplePayload,
});
