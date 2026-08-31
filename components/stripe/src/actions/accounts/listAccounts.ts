import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { listAccountsExamplePayload } from "../../examplePayloads/accounts";
import { listAccountsInputs } from "../../inputs";
import { listAccountsOutputSchema } from "../../outputSchemas";
export const listAccounts = action({
  display: {
    label: "List Accounts",
    description: "Return a list of accounts connected to the platform.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: params.timeout,
    });
    return {
      data: await client.accounts.list({
        limit: params.pagination.limit,
        starting_after: params.pagination.startingAfter,
      }),
    };
  },
  inputs: listAccountsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAccountsOutputSchema,
  }),
  examplePayload: listAccountsExamplePayload,
});
