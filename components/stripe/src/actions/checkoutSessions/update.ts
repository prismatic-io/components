import { action } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { connectionInput, metadata, sessionId, timeout } from "../../inputs";
import { keyValPairListToObject } from "../../util";
import { createCheckoutSessionExamplePayload as examplePayload } from "../../examplePayloads/checkoutSessions";

export const updateCheckoutSession = action({
  display: {
    label: "Update Checkout Session",
    description: "Update an existing Stripe Checkout session.",
  },
  perform: async (context, { sessionId, metadata, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });

    const session = await client.checkout.sessions.update(sessionId, {
      metadata: keyValPairListToObject(metadata),
    });

    return {
      data: session,
    };
  },
  inputs: {
    sessionId,
    metadata,
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload,
});
