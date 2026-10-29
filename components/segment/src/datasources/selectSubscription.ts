import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, destinationId, region } from "../inputs";

export const selectSubscription = dataSource({
  display: {
    label: "Select Subscription",
    description:
      "A picklist of subscriptions for the selected destination in your Segment workspace.",
  },
  inputs: {
    connection: connectionInput,
    region,
    destinationId: {
      ...destinationId,
      dataSource: undefined,
    },
  },
  perform: async (_context, { connection, region, destinationId }) => {
    const client = createClient(connection, region, false);
    const { data } = await client.get(
      `/destinations/${destinationId}/subscriptions`,
      {
        params: {
          pagination: {
            count: 200,
          },
        },
      },
    );
    if (data.data?.subscriptions) {
      const result = data.data.subscriptions
        .map((subscription: { id: string; name: string }) => ({
          label: subscription.name,
          key: subscription.id,
        }))
        .sort((a: { label: string }, b: { label: string }) =>
          a.label < b.label ? -1 : 1,
        );
      return { result };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Test Subscription",
        key: "eoeXaMeAYcB2XvEApJDrQs",
      },
    ],
  },
});
