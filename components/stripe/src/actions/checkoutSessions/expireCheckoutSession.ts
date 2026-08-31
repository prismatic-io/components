import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { expireCheckoutSessionInputs } from "../../inputs";
import { checkoutSessionOutputSchema } from "../../outputSchemas";
import { createCheckoutSessionExamplePayload as examplePayload } from "../../examplePayloads/checkoutSessions";
export const expireCheckoutSession = action({
  display: {
    label: "Expire Checkout Session",
    description: "Expire a Stripe Checkout session.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async (
    _context,
    { sessionId },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...examplePayload.data,
      id: sessionId,
      status: "expired",
      url: null,
    },
  }),
  inputs: expireCheckoutSessionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: checkoutSessionOutputSchema,
  }),
  examplePayload,
});
