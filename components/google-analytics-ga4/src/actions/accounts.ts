import { action, outputSchema } from "@prismatic-io/spectral";
import { createAnalyticsClient } from "../client";
import { listAccountsExamplePayload } from "../examplePayloads";
import { listAccountsInputs } from "../inputs";
import { listAccountsOutputSchema } from "../outputSchemas";
import type { Account } from "../types";
import { paginateRecords } from "../util";
const listAccounts = action({
  display: {
    label: "List Accounts",
    description: "Return a list of accounts accessible by the caller",
  },
  inputs: listAccountsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAccountsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, pagination }) => {
    const client = createAnalyticsClient({
      connection,
      endpointType: "adminv1beta",
      debug: context.debug.enabled,
    });
    const data = await paginateRecords<Account, "accounts">(
      client,
      "/accounts",
      {
        pageSize: pagination.pageSize,
        pageToken: pagination.pageToken,
      },
      fetchAll,
      "accounts",
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    ...listAccountsExamplePayload,
  }),
  examplePayload: listAccountsExamplePayload,
});
export default { listAccounts };
