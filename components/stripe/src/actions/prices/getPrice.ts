import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { getPriceExamplePayload } from "../../examplePayloads/prices";
import { getPriceInputs } from "../../inputs";
import { priceOutputSchema } from "../../outputSchemas";
export const getPrice = action({
  display: {
    label: "Get Price",
    description: "Retrieve the information and metadata of a price by ID.",
  },
  performSafety: "safe",
  perform: async (context, { priceId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.prices.retrieve(priceId),
    };
  },
  inputs: getPriceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: priceOutputSchema,
  }),
  examplePayload: getPriceExamplePayload,
});
