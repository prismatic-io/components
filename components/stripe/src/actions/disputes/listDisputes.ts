import { action, outputSchema } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { listDisputesExamplePayload } from "../../examplePayloads/disputes";
import { listDisputesInputs } from "../../inputs";
import { listDisputesOutputSchema } from "../../outputSchemas";
export const listDisputes = action({
  display: {
    label: "List Disputes",
    description: "Return a list of disputes.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { stripeConnection, timeout, chargeId, paymentIntent, created, pagination },
  ) => {
    const client = createStripeClient({
      stripeConnection: stripeConnection,
      timeout,
    });
    const params: Stripe.DisputeListParams = {
      charge: chargeId,
      payment_intent: paymentIntent,
      created: created,
      ending_before: pagination.endingBefore,
      limit: pagination.limit,
      starting_after: pagination.startingAfter,
    };
    return {
      data: await client.disputes.list(params),
    };
  },
  inputs: listDisputesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDisputesOutputSchema,
  }),
  examplePayload: listDisputesExamplePayload,
});
