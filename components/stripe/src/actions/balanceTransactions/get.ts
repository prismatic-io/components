import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { getBalanceTransactionExamplePayload } from "../../examplePayloads/balanceTransactions";
import { balanceTransactionId, connectionInput, timeout } from "../../inputs";

export const getBalanceTransaction = action({
  display: {
    label: "Get Balance Transaction",
    description: "Retrieve a balance transaction by ID.",
  },
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: util.types.toInt(params.timeout),
    });
    return {
      data: await client.balanceTransactions.retrieve(params.balanceTransactionId),
    };
  },
  inputs: {
    timeout,
    stripeConnection: connectionInput,
    balanceTransactionId,
  },
  examplePayload: getBalanceTransactionExamplePayload,
});
