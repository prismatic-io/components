import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs";
import { sortArray } from "../../utils";
import type { Subscription } from "../../interfaces";

export const listSubscriptions = dataSource({
  display: {
    label: "List Subscriptions",
    description: "A picklist of subscriptions",
  },
  inputs: {
    connection,
  },
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
});
