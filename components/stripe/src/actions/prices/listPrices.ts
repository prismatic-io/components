import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { listPricesExamplePayload } from "../../examplePayloads/prices";
import { listPricesInputs } from "../../inputs";
import { listPricesOutputSchema } from "../../outputSchemas";
export const listPrices = action({
  display: {
    label: "List Prices",
    description: "Return a list of all available prices.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: params.timeout,
    });
    return {
      data: await client.prices.list({
        limit: params.pagination.limit,
        starting_after: params.pagination.startingAfter,
      }),
    };
  },
  inputs: listPricesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPricesOutputSchema,
  }),
  examplePayload: listPricesExamplePayload,
});
