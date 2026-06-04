import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { generalLedgerAccountDatasource } from "../examplePayloads/datasources";
import { connection } from "../inputs";
import type { LedgerAccount } from "../interfaces/ledgerAccount";
import { fetchAllData } from "../util";

export const selectLedgerAccount = dataSource({
  display: {
    label: "Select General Ledger Account",
    description: "Select an General Ledger Account from a dropdown menu",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection);
    const { data } = await fetchAllData<LedgerAccount>(client, "/accounting/accounts", {}, true);

    const objects = data
      .sort((a, b) => (a.id < b.id ? -1 : 1))
      .map<Element>((ledgerAccount) => ({
        key: ledgerAccount.id,
        label: ledgerAccount.code
          ? `${ledgerAccount.name} - ${ledgerAccount.code}`
          : ledgerAccount.name,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: generalLedgerAccountDatasource,
  },
});
