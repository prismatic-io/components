import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { getCardExamplePayload } from "../../examplePayloads/cards";
import { getCardInputs } from "../../inputs";
import { paymentMethodOutputSchema } from "../../outputSchemas";
export const getCard = action({
  display: {
    label: "Get Card",
    description: "Retrieve the information and metadata of a card by ID.",
  },
  performSafety: "safe",
  perform: async (context, { paymentId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.paymentMethods.retrieve(
        util.types.toString(paymentId),
      ),
    };
  },
  inputs: getCardInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: paymentMethodOutputSchema,
  }),
  examplePayload: getCardExamplePayload,
});
