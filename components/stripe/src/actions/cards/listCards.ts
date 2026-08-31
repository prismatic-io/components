import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { listCardsExamplePayload } from "../../examplePayloads/cards";
import { listCardsInputs } from "../../inputs";
import { listCardsOutputSchema } from "../../outputSchemas";
export const listCards = action({
  display: {
    label: "List Cards",
    description: "Return a list of cards for a customer.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { customerId, timeout, pagination, stripeConnection },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.paymentMethods.list({
        customer: customerId,
        type: "card",
        ending_before: pagination.endingBefore,
        limit: pagination.limit,
        starting_after: pagination.startingAfter,
      }),
    };
  },
  inputs: listCardsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCardsOutputSchema,
  }),
  examplePayload: listCardsExamplePayload,
});
