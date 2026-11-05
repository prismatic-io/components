import type { Element } from "@prismatic-io/spectral";
import { dataSource } from "@prismatic-io/spectral";
import { getSageClient } from "../client";
import { selectLedgerAccountExamplePayload as examplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs";

export const selectLedgerAccount = dataSource({
  display: {
    label: "Select Ledger Account",
    description: "Select a ledger account from a list of ledger accounts.",
  },
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = getSageClient(connection, false);
    const { data } = await client.get("/ledger_accounts");

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
