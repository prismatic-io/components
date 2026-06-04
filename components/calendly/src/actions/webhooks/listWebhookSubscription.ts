import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, organization, scope, sort, user } from "../../inputs";
import { listWebhookSubscriptionExamplePayload } from "../../examplePayloads";
import { paginator } from "../../util";

export const listWebhookSubscription = action({
  display: {
    label: "List Webhook Subscription",
    description:
      "Get a list of Webhook Subscriptions for a specified Organization or User.",
  },
  perform: async (context, { connection, organization, scope, sort, user }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const data = await paginator(client, "/webhook_subscriptions", {
      organization,
      scope,
      sort: sort || undefined,
      user: user || undefined,
    });
    return { data };
  },
  inputs: {
    connection,
    organization: {
      ...organization,
      required: true,
      dataSource: "organizations",
      comments: "Indicates if the results should be filtered by organization",
    },
    scope: {
      ...scope,
      required: true,
      comments: "Filter the list by organization or user",
    },
    sort: {
      ...sort,
      default: undefined,
      comments:
        "Order results by the specified field and direction. Accepts comma-separated list of {field}:{direction} values. Supported fields are: created_at. Sort direction is specified as: asc, desc.",
    },
    user: {
      ...user,
      comments:
        "Indicates if the results should be filtered by user. This parameter is only required if the scope parameter is set to user.",
    },
  },
  examplePayload: listWebhookSubscriptionExamplePayload,
});
