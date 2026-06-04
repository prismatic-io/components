import { dataSource, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../auth";
import { connectionInput } from "../inputs";
import type { StripeResponse, Subscription } from "../types";

export const selectSubscription = dataSource({
  display: {
    label: "Select Subscription",
    description: "A picklist of subscriptions in your Stripe account.",
  },
  dataSourceType: "picklist",
  perform: async (_, { stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
    });
    const { data } = (await client.subscriptions.list()) as StripeResponse<Subscription>;
    return {
      result: data.map(({ id, collection_method, description }) => ({
        key: util.types.toString(id),
        label: `${collection_method || "No collection method"} - ${
          description || "No description"
        }`,
      })),
    };
  },
  inputs: {
    stripeConnection: connectionInput,
  },
});
