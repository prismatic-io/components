import { action, outputSchema } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { listBalanceTransactionsExamplePayload } from "../../examplePayloads/balanceTransactions";
import { listBalanceTransactionsInputs } from "../../inputs";
import { listBalanceTransactionsOutputSchema } from "../../outputSchemas";
export const listBalanceTransactions = action({
  display: {
    label: "List Balance Transactions",
    description:
      "Return a list of transactions that have contributed to the Stripe account balance (such as charges, transfers, and so forth).",
  },
  performSafety: "safe",
  perform: async (
    context,
    { timeout, created, currency, source, pagination, stripeConnection },
  ) => {
    const client = createStripeClient({
      stripeConnection: stripeConnection,
      timeout,
    });
    const options: Stripe.BalanceTransactionListParams = {
      created: created,
      ...(currency && { currency }),
      ...(pagination.endingBefore && {
        ending_before: pagination.endingBefore,
      }),
      limit: pagination.limit,
      ...(source && { source }),
      ...(pagination.startingAfter && {
        starting_after: pagination.startingAfter,
      }),
    };
    return {
      data: await client.balanceTransactions.list(options),
    };
  },
  inputs: listBalanceTransactionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listBalanceTransactionsOutputSchema,
  }),
  examplePayload: listBalanceTransactionsExamplePayload,
});
