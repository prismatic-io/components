import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { getBalanceTransactionExamplePayload } from "../../examplePayloads/balanceTransactions";
import { getBalanceTransactionInputs } from "../../inputs";
import { balanceTransactionOutputSchema } from "../../outputSchemas";
export const getBalanceTransaction = action({
  display: {
    label: "Get Balance Transaction",
    description: "Retrieve a balance transaction by ID.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: params.timeout,
    });
    return {
      data: await client.balanceTransactions.retrieve(
        params.balanceTransactionId,
      ),
    };
  },
  inputs: getBalanceTransactionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: balanceTransactionOutputSchema,
  }),
  examplePayload: getBalanceTransactionExamplePayload,
});
