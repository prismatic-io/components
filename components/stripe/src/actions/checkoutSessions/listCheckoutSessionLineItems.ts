import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { listCheckoutSessionLineItemsInputs } from "../../inputs";
import { listCheckoutSessionLineItemsOutputSchema } from "../../outputSchemas";
import { listCheckoutSessionLineItemsExamplePayload } from "../../examplePayloads/checkoutSessions";
import type Stripe from "stripe";
export const listCheckoutSessionLineItems = action({
  display: {
    label: "List Checkout Session Line Items",
    description: "Return a list of line items for a Stripe Checkout session.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { sessionId, pagination, stripeConnection, timeout },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const lineItems = (await client.checkout.sessions.listLineItems(sessionId, {
      limit: pagination.limit,
      starting_after: pagination.startingAfter,
      ending_before: pagination.endingBefore,
    })) as Stripe.ApiList<Stripe.LineItem>;
    return {
      data: lineItems,
    };
  },
  inputs: listCheckoutSessionLineItemsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCheckoutSessionLineItemsOutputSchema,
  }),
  examplePayload: listCheckoutSessionLineItemsExamplePayload,
});
