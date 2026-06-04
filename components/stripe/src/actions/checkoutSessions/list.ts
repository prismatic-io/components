import { action } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../auth";
import {
  connectionInput,
  timeout,
  limit,
  startingAfter,
  endingBefore,
  fetchAll,
} from "../../inputs";
import { paginateStripeRecords } from "../../util";
import { listCheckoutSessionsExamplePayload } from "../../examplePayloads/checkoutSessions";

export const listCheckoutSessions = action({
  display: {
    label: "List Checkout Sessions",
    description: "Return a list of Stripe Checkout sessions.",
  },
  perform: async (
    context,
    { fetchAll, limit, startingAfter, endingBefore, stripeConnection, timeout },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });

    const sessions = (await paginateStripeRecords(client.checkout.sessions, fetchAll, {
      limit,
      starting_after: startingAfter,
      ending_before: endingBefore,
    })) as Stripe.ApiList<Stripe.Checkout.Session>;

    return {
      data: sessions,
    };
  },
  inputs: {
    fetchAll,
    limit,
    startingAfter,
    endingBefore,
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: listCheckoutSessionsExamplePayload,
});
