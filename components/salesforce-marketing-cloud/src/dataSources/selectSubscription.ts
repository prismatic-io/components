import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENS_SUBSCRIPTIONS_PATH } from "../constants";
import { connection } from "../inputs/common";

interface SubscriptionItem {
  subscriptionId: string;
  subscriptionName: string;
  [key: string]: unknown;
}

export const selectSubscription = dataSource({
  display: {
    label: "Select ENS Subscription",
    description:
      "Select an Event Notification Service subscription from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const { data } = await client.get<SubscriptionItem[]>(
      ENS_SUBSCRIPTIONS_PATH,
    );

    const subscriptions = Array.isArray(data) ? data : [];

    const result = subscriptions
      .map<Element>((item) => ({
        label: util.types.toString(item.subscriptionName),
        key: util.types.toString(item.subscriptionId),
      }))
      .sort((a, b) => (a.label ?? "").localeCompare(b.label ?? ""));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Email Events Subscription",
        key: "6807835e-a82f-498e-a0b9-55d6bde4814d",
      },
      {
        label: "SMS Events Subscription",
        key: "d89c87c4-70f8-43d6-be1e-f01dce97fe4c",
      },
    ],
  },
});
