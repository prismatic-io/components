import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { listSubscriptionsExamplePayload } from "../../examplePayloads/subscriptions";
import { listSubscriptionsInputs } from "../../inputs";
import { listSubscriptionsOutputSchema } from "../../outputSchemas";
export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "Return a list of subscriptions.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: params.timeout,
    });
    return {
      data: await client.subscriptions.list({
        limit: params.pagination.limit,
        starting_after: params.pagination.startingAfter,
      }),
    };
  },
  inputs: listSubscriptionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSubscriptionsOutputSchema,
  }),
  examplePayload: listSubscriptionsExamplePayload,
});
