import { action, outputSchema } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { listCheckoutSessionsInputs } from "../../inputs";
import { listCheckoutSessionsOutputSchema } from "../../outputSchemas";
import { paginateStripeRecords } from "../../util";
import { listCheckoutSessionsExamplePayload } from "../../examplePayloads/checkoutSessions";
export const listCheckoutSessions = action({
  display: {
    label: "List Checkout Sessions",
    description: "Return a list of Stripe Checkout sessions.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { fetchAll, pagination, stripeConnection, timeout },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const sessions = (await paginateStripeRecords(
      client.checkout.sessions,
      fetchAll,
      {
        limit: pagination.limit,
        starting_after: pagination.startingAfter,
        ending_before: pagination.endingBefore,
      },
    )) as Stripe.ApiList<Stripe.Checkout.Session>;
    return {
      data: sessions,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listCheckoutSessionsExamplePayload.data,
  }),
  inputs: listCheckoutSessionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCheckoutSessionsOutputSchema,
  }),
  examplePayload: listCheckoutSessionsExamplePayload,
});
