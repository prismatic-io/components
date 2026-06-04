import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { listSubscriptionsExamplePayload } from "../../examplePayloads/subscriptions";
import { connectionInput, limit, startingAfter, timeout } from "../../inputs";

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "Return a list of subscriptions.",
  },
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: util.types.toInt(params.timeout),
    });
    return {
      data: await client.subscriptions.list({
        limit: util.types.toNumber(params.limit) || undefined,
        starting_after: util.types.toString(params.startingAfter) || undefined,
      }),
    };
  },
  inputs: { timeout, limit, startingAfter, stripeConnection: connectionInput },
  examplePayload: listSubscriptionsExamplePayload,
});
