import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/general";
import { paginateResults } from "../util";

export const selectSubscription = dataSource({
  display: {
    label: "Select Subscription",
    description: "Select a subscription from the list of subscriptions.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const data = await paginateResults(client, "/subscriptions", true);

    const result = (
      data.value as { id: string; resource: string; changeType: string }[]
    )
      .map<Element>((subscription) => ({
        label: `${subscription.resource} (${subscription.changeType})`,
        key: subscription.id.toString(),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Users (updated,deleted)",
        key: "0fc0d6db-0073-42e5-a186-853da75fb308",
      },
    ],
  },
});
