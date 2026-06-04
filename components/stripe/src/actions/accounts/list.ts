import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { listAccountsExamplePayload } from "../../examplePayloads/accounts";
import { connectionInput, limit, startingAfter, timeout } from "../../inputs";

export const listAccounts = action({
  display: {
    label: "List Accounts",
    description: "Return a list of accounts connected to your platform.",
  },
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: util.types.toInt(params.timeout),
    });
    return {
      data: await client.accounts.list({
        limit: util.types.toNumber(params.limit) || undefined,
        starting_after: util.types.toString(params.startingAfter) || undefined,
      }),
    };
  },
  inputs: { timeout, limit, startingAfter, stripeConnection: connectionInput },
  examplePayload: listAccountsExamplePayload,
});
