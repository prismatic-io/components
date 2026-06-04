import { action } from "@prismatic-io/spectral";
import { createAnalyticsClient } from "../client";
import { listAccountsExamplePayload } from "../examplePayloads";
import { listAccountsInputs } from "../inputs";
import type { Account } from "../types";
import { paginateRecords } from "../util";

const listAccounts = action({
  display: {
    label: "List Accounts",
    description: "Return a list of accounts accessible by the caller",
  },
  inputs: listAccountsInputs,
  perform: async (context, { connection, fetchAll, pageSize, pageToken }) => {
    const client = createAnalyticsClient({
      connection,
      endpointType: "adminv1beta",
      debug: context.debug.enabled,
    });
    const data = await paginateRecords<Account, "accounts">(
      client,
      "/accounts",
      {
        pageSize,
        pageToken,
      },
      fetchAll,
      "accounts",
    );
    return { data };
  },
  examplePayload: listAccountsExamplePayload,
});

export default { listAccounts };
