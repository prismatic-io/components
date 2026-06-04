import { action } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { connectionInput, sessionId, timeout } from "../../inputs";
import { createCheckoutSessionExamplePayload as examplePayload } from "../../examplePayloads/checkoutSessions";

export const expireCheckoutSession = action({
  display: {
    label: "Expire Checkout Session",
    description: "Expire a Stripe Checkout session.",
  },
  perform: async (context, { sessionId, stripeConnection, timeout }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });

    const session = await client.checkout.sessions.expire(sessionId);

    return {
      data: session,
    };
  },
  inputs: {
    sessionId,
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload,
});
