import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";

export const findSubscriptionByDeal = action({
  display: {
    label: "Find Subscription By Deal (Deprecated)",
    description: "Finds a subscription by deal.",
  },
  perform: async (context, { connection, dealId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/subscriptions/find/${dealId}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    dealId: input({
      label: "Deal ID",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The ID of the deal",
    }),
  },
});
