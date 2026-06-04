import { action, input, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { listBalanceTransactionsExamplePayload } from "../../examplePayloads/balanceTransactions";
import {
  connectionInput,
  created,
  currency,
  endingBefore,
  limit,
  source,
  startingAfter,
  timeout,
} from "../../inputs";
import type Stripe from "stripe";

export const listBalanceTransactions = action({
  display: {
    label: "List Balance Transactions",
    description:
      "Return a list of transactions that have contributed to the Stripe account balance (such as charges, transfers, and so forth).",
  },
  perform: async (
    context,
    { timeout, created, currency, endingBefore, limit, source, startingAfter, stripeConnection },
  ) => {
    const client = createStripeClient({
      stripeConnection: stripeConnection,
      timeout: util.types.toInt(timeout),
    });

    const options: Stripe.BalanceTransactionListParams = {
      ...(created && { created: JSON.parse(created) }),
      ...(currency && { currency }),
      ...(endingBefore && { ending_before: endingBefore }),
      ...(limit && { limit: util.types.toInt(limit) }),
      ...(source && { source }),
      ...(startingAfter && { starting_after: startingAfter }),
    };
    return {
      data: await client.balanceTransactions.list(options),
    };
  },
  inputs: {
    timeout,
    created,
    currency: input({
      ...currency,
      comments:
        "Only return transactions in a certain currency. Three-letter ISO currency code, in lowercase. Must be a supported currency.",
      clean: util.types.toString,
    }),
    endingBefore: input({ ...endingBefore, clean: util.types.toString }),
    limit: input({ ...limit, clean: util.types.toString }),
    source,
    startingAfter: input({ ...startingAfter, clean: util.types.toString }),
    stripeConnection: connectionInput,
  },
  examplePayload: listBalanceTransactionsExamplePayload,
});
