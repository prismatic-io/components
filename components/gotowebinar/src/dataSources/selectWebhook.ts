import { dataSource, Element } from "@prismatic-io/spectral";
import { connection } from "../inputs/general";
import { createGotoWebinarClient } from "../client";
import { UserSubscription } from "../interfaces";

export const selectWebhook = dataSource({
  display: {
    label: "Select Webhook",
    description: "Select a webhook from a list of available webhooks.",
  },
  inputs: {
    connection,
  },
  perform: async (context, { connection }) => {
    const { client } = createGotoWebinarClient(connection, false);
    const url = `/userSubscriptions`;
    const { data } = await client.get(url, {
      params: {
        product: "g2w",
      },
    });

    const userSubscriptions = data?._embedded
      ?.userSubscriptions as UserSubscription[];

    if (!userSubscriptions) {
      return {
        result: [],
      };
    }

    const result = userSubscriptions.map(
      ({ eventName, webhookKey, userSubscriptionState }): Element => {
        return {
          key: webhookKey,
          label: `${webhookKey} - ${eventName} - ${userSubscriptionState}`,
        };
      },
    );

    return {
      result,
    };
  },
  dataSourceType: "picklist",
});
