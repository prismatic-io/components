import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { createCheckoutSessionExamplePayload as examplePayload } from "../../examplePayloads/checkoutSessions";
import { updateCheckoutSessionInputs } from "../../inputs";
import { checkoutSessionOutputSchema } from "../../outputSchemas";
export const updateCheckoutSession = action({
  display: {
    label: "Update Checkout Session",
    description: "Update an existing Stripe Checkout session.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { sessionId, metadata, timeout, stripeConnection },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const session = await client.checkout.sessions.update(sessionId, {
      metadata,
    });
    return {
      data: session,
    };
  },
  examplePerform: async (
    _context,
    { sessionId, metadata },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...examplePayload.data,
      id: sessionId,
      metadata,
    },
  }),
  inputs: updateCheckoutSessionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: checkoutSessionOutputSchema,
  }),
  examplePayload,
});
