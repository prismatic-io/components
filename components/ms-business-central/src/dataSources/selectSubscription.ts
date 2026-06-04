import { dataSource } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { connectionInput } from "../inputs/general";
import type { Subscription } from "../interfaces";
import { toSortedPicklist } from "./helpers";

export const selectSubscription = dataSource({
  display: {
    label: "Select Subscription",
    description: "A picklist of subscriptions in your Business Central organization.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (context, { connection }) => {
    const client = getMsBusinessCentralClient(connection, context, false);
    const { data } = await client.get<Subscription>("/subscriptions");

    return {
      result: toSortedPicklist(data.value, (sub) => ({
        key: sub.subscriptionId,
        label: sub.resource,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "/api/v1.0/companies(abc)/customers", key: "7d577253-3ef0-4a0a-bb7f-8335c2596e70" },
    ],
  },
});
