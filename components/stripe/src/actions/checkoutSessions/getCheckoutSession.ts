import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { getCheckoutSessionInputs } from "../../inputs";
import { checkoutSessionOutputSchema } from "../../outputSchemas";
import { createCheckoutSessionExamplePayload as examplePayload } from "../../examplePayloads/checkoutSessions";
export const getCheckoutSession = action({
  display: {
    label: "Get Checkout Session",
    description: "Retrieve a Stripe Checkout session by ID.",
  },
  performSafety: "safe",
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
  inputs: getCheckoutSessionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: checkoutSessionOutputSchema,
  }),
  examplePayload,
});
