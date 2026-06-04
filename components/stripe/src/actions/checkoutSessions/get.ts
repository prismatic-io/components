import { action } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { connectionInput, sessionId, timeout } from "../../inputs";
import { createCheckoutSessionExamplePayload as examplePayload } from "../../examplePayloads/checkoutSessions";

export const getCheckoutSession = action({
  display: {
    label: "Get Checkout Session",
    description: "Retrieve a Stripe Checkout session by ID.",
  },
  perform: async (context, { sessionId, stripeConnection, timeout }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });

    const session = await client.checkout.sessions.retrieve(sessionId);

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
