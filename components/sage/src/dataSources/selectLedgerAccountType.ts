import type { Element } from "@prismatic-io/spectral";
import { dataSource } from "@prismatic-io/spectral";
import { getSageClient } from "../client";
import { selectLedgerAccountTypeExamplePayload as examplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs";

export const selectLedgerAccountType = dataSource({
  display: {
    label: "Select Ledger Account Type",
    description: "Select a ledger account type from a list of ledger account types.",
  },
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = getSageClient(connection, false);
    const { data } = await client.get("/ledger_account_types");

    const items = data?.$items ?? [];

    const result: Element[] = items
      .map((item: { displayed_as?: string; id?: string }) => ({
        label: item.displayed_as || item.id || "",
        key: item.id || "",
      }))
      .sort((a: Element, b: Element) => (a.label || "").localeCompare(b.label || ""));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload,
});
