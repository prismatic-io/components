import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../auth";
import { connectionInput } from "../inputs";

export const selectBalanceTransaction = dataSource({
  display: {
    label: "Select Balance Transaction",
    description: "Select a balance transaction from a list of transactions in your Stripe account.",
  },
  dataSourceType: "picklist",
  inputs: {
    stripeConnection: connectionInput,
  },
  perform: async (_context, { stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
    });

    const { data } = await client.balanceTransactions.list({ limit: 100 });

    return {
      result: data
        .map<Element>((txn) => ({
          label:
            `${txn.description || txn.id} - ${txn.amount / 100} ${txn.currency?.toUpperCase() || ""}`.trim(),
          key: util.types.toString(txn.id),
        }))
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    };
  },
  examplePayload: {
    result: [
      {
        label: "Payment for order #1234 - 50 USD",
        key: "txn_1Jb9jvDtJQgcyrdS1Z9KW5",
      },
    ],
  },
});
