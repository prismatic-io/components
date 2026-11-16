import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listSubscriptionsDataSourceExamplePayload } from "../examplePayloads";
import { listSubscriptionsInputs } from "../inputs/dataSources";
import { sortArray } from "../util";
import type { Subscription } from "../types";

export const listSubscriptions = dataSource({
  display: {
    label: "List Subscriptions",
    description: "A picklist of Microsoft Graph subscriptions for the connection.",
  },
  inputs: listSubscriptionsInputs,
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const { data } = await client.get<{
      value: Subscription[];
    }>("/subscriptions");

    return {
      result: sortArray(
        data.value.map((subscription) => {
          return {
            key: subscription.id,
            label: `Resource: ${subscription.resource} - Change Type: ${subscription.changeType}`,
          };
        }),
      ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: listSubscriptionsDataSourceExamplePayload,
});
