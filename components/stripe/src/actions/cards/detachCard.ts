import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { detachCardExamplePayload } from "../../examplePayloads/cards";
import { detachCardInputs } from "../../inputs";
import { paymentMethodOutputSchema } from "../../outputSchemas";
export const detachCard = action({
  display: {
    label: "Detach Card",
    description: "Detach a card from a customer.",
  },
  performSafety: "notAllowed",
  perform: async (context, { paymentId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.paymentMethods.detach(util.types.toString(paymentId)),
    };
  },
  examplePerform: async (
    _context,
    { paymentId },
  ): Promise<{
    data: unknown;
  }> => {
    const card = detachCardExamplePayload.data as Record<string, unknown>;
    return {
      data: {
        ...card,
        id: paymentId ?? card.id,
      },
    };
  },
  inputs: detachCardInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: paymentMethodOutputSchema,
  }),
  examplePayload: detachCardExamplePayload,
});
