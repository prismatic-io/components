import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";
import { computeEndpointBasedOnConnection, fetchAllData } from "../util";
import type { Subscription } from "@microsoft/microsoft-graph-types";

export const selectSubscription = dataSource({
  display: {
    label: "Select Subscription",
    description: "Select a subscription from the list of subscriptions.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, false);

    const data = await fetchAllData<Subscription>(
      client,
      computeEndpointBasedOnConnection(connection, "/subscriptions"),
      true,
      {},
    );
    const result = data.value.map<Element>((subscription) => ({
      label: `${subscription.resource} (${subscription.notificationUrl})`,
      key: util.types.toString(subscription.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
