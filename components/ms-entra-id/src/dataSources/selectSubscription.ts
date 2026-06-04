import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/common";
import { getValues } from "../util";

export const selectSubscription = dataSource({
  display: {
    label: "Select Subscription",
    description: "Select an active subscription from a picklist.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await getValues(true, client, `/subscriptions`, {});
    return {
      result: data.value
        .map((subscription: { id: string; resource: string }) => ({
          label: subscription.resource,
          key: subscription.id,
        }))
        .sort((a: { label: string }, b: { label: string }) =>
          a.label < b.label ? -1 : 1,
        ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "/users", key: "example-subscription-id-123" }],
  },
});
