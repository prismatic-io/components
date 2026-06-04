import { dataSource } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { selectWebhookSubscriptionInputs } from "../inputs";
import { fetchAllPages, sortByLabel } from "../util";

export const selectWebhookSubscription = dataSource({
  display: {
    label: "Select Webhook Subscription",
    description: "Lists webhook subscriptions in the Square account.",
  },
  inputs: selectWebhookSubscriptionInputs,
  perform: async (_context, { squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection);

    const allSubscriptions = await fetchAllPages(
      client,
      "/v2/webhooks/subscriptions",
      "subscriptions",
    );

    const result = (allSubscriptions.subscriptions as Record<string, unknown>[])
      .map((subscription: Record<string, unknown>) => {
        const eventTypesArray = subscription.event_types as string[] | undefined;
        const eventTypes = eventTypesArray?.slice(0, 2).join(", ") || "";
        const label = subscription.name
          ? `${subscription.name as string} (${eventTypes})`
          : `${(subscription.id as string).substring(0, 12)}... (${eventTypes})`;

        return {
          label,
          key: subscription.id as string,
        };
      })
      .sort(sortByLabel);

    return {
      result,
    };
  },
  dataSourceType: "picklist",
});
