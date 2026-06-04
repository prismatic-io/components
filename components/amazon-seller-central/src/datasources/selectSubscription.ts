import type { Element } from "@prismatic-io/spectral";
import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, notificationType } from "../inputs";
import type { Subscription, SubscriptionsResponse } from "../interfaces";

export const selectSubscription = dataSource({
  display: {
    label: "Select Subscription",
    description:
      "Select a subscription from your Amazon Seller Central account.",
  },
  inputs: {
    connection: connectionInput,
    notificationType,
  },
  perform: async (_context, { connection, notificationType }) => {
    const client = createClient(connection);
    const { data } = await client.get<SubscriptionsResponse>(
      `/notifications/v1/subscriptions/${notificationType}`,
    );

    const result: Element[] = (data.subscriptions ?? [])
      .map<Element>((subscription: Subscription) => ({
        label: `${subscription.subscriptionId} - ${subscription.processingDirective?.eventFilter?.eventFilterType ?? notificationType}`,
        key: subscription.subscriptionId.toString(),
      }))
      .sort((a, b) => (a.label < b.label ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d - ANY_OFFER_CHANGED",
        key: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
      },
      {
        label: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e - ORDER_CHANGE",
        key: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
      },
    ],
  },
});
