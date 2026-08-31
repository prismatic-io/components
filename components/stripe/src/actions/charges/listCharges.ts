import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { listChargesExamplePayload } from "../../examplePayloads/charges";
import { listChargesInputs } from "../../inputs";
import { listChargesOutputSchema } from "../../outputSchemas";
export const listCharges = action({
  display: {
    label: "List Charges",
    description: "Return a list of all charges.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: params.timeout,
    });
    return {
      data: await client.charges.list({
        limit: params.pagination.limit,
        starting_after: params.pagination.startingAfter,
      }),
    };
  },
  inputs: listChargesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listChargesOutputSchema,
  }),
  examplePayload: listChargesExamplePayload,
});
