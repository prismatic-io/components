import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { attachCardExamplePayload } from "../../examplePayloads/cards";
import { attachCardInputs } from "../../inputs";
import { paymentMethodOutputSchema } from "../../outputSchemas";
export const attachCard = action({
  display: {
    label: "Attach Card",
    description: "Attach a card to a customer.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { paymentId, customerId, timeout, stripeConnection },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.paymentMethods.attach(util.types.toString(paymentId), {
        customer: util.types.toString(customerId),
      }),
    };
  },
  examplePerform: async (
    _context,
    { paymentId, customerId },
  ): Promise<{
    data: unknown;
  }> => {
    const card = attachCardExamplePayload.data as Record<string, unknown>;
    return {
      data: {
        ...card,
        id: paymentId ?? card.id,
        customer: customerId ?? card.customer,
      },
    };
  },
  inputs: attachCardInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: paymentMethodOutputSchema,
  }),
  examplePayload: attachCardExamplePayload,
});
