import { action } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import {
  connectionInput,
  timeout,
  limit,
  startingAfter,
  endingBefore,
  sessionId,
} from "../../inputs";
import { listCheckoutSessionLineItemsExamplePayload } from "../../examplePayloads/checkoutSessions";
import type Stripe from "stripe";

export const listCheckoutSessionLineItems = action({
  display: {
    label: "List Checkout Session Line Items",
    description: "Return a list of line items for a Stripe Checkout session.",
  },
  perform: async (
    context,
    { sessionId, limit, startingAfter, endingBefore, stripeConnection, timeout },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });

    const lineItems = (await client.checkout.sessions.listLineItems(sessionId, {
      limit,
      starting_after: startingAfter,
      ending_before: endingBefore,
    })) as Stripe.ApiList<Stripe.LineItem>;

    return {
      data: lineItems,
    };
  },
  inputs: {
    sessionId,
    limit,
    startingAfter,
    endingBefore,
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: listCheckoutSessionLineItemsExamplePayload,
});
