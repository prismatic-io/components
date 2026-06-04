import { dataSource } from "@prismatic-io/spectral";
import { createAnalyticsClient } from "../client";
import { listAccountsDataSourceExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";
import type { Account } from "../types";
import { paginateRecords } from "../util";

const listAccounts = dataSource({
  display: {
    label: "List Accounts",
    description: "Return a list of accounts accessible by the caller",
  },
  dataSourceType: "picklist",
  inputs: { connection: connectionInput },
  perform: async (_context, params) => {
    const client = createAnalyticsClient({
      connection: params.connection,
      endpointType: "adminv1beta",
    });
    const data = await paginateRecords<Account, "accounts">(
      client,
      "/accounts",
      {},
      true,
      "accounts",
    );
    return {
      result: (data.accounts || []).map((account) => ({
        key: account.name,
        label: account.displayName,
      })),
    };
  },
  examplePayload: listAccountsDataSourceExamplePayload,
});

export default { listAccounts };
