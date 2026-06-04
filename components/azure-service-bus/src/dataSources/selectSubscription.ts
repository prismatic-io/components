import { dataSource } from "@prismatic-io/spectral";
import { getAzureServiceBusClient } from "../client";
import { connection } from "../inputs";
import type { SubscriptionItem } from "../types/DataSources";
import { toSortedPicklist } from "./helpers";

export const selectSubscription = dataSource({
  display: {
    label: "Select Subscription",
    description: "A picklist of Azure subscriptions.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = getAzureServiceBusClient(connection, false);
    const { data } = await client.get("?api-version=2022-12-01");
    return {
      result: toSortedPicklist(data.value ?? [], (item: SubscriptionItem) => ({
        key: item.subscriptionId,
        label: item.displayName,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "My Subscription",
        key: "00000000-0000-0000-0000-000000000000",
      },
    ],
  },
});
