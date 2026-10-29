import { dataSource, type Element } from "@prismatic-io/spectral";
import { createEventGridHttpClient } from "../client";
import { getEventSubscriptionUrl, paginateResults } from "../util";
import { selectSubscriptionInputs } from "../inputs/dataSources";
import type { EventSubscription } from "../interfaces";

export const selectEventSubscription = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Event Subscription",
    description: "Select an event subscription from the specified topic.",
  },
  perform: async (
    _context,
    { connection, topicName, subscriptionId, resourceGroupName },
  ) => {
    const managementClient = createEventGridHttpClient(connection, false);

    const eventSubscriptionURL = getEventSubscriptionUrl(
      subscriptionId,
      resourceGroupName,
      topicName,
    );

    const data = await paginateResults(
      managementClient,
      eventSubscriptionURL,
      true,
      {},
    );

    const subscriptions: EventSubscription[] = data.value || [];

    return {
      result: subscriptions.map(
        (subscription): Element => ({
          label: subscription.name,
          key: subscription.name,
        }),
      ),
    };
  },
  inputs: selectSubscriptionInputs,
});
