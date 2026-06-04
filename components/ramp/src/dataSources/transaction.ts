import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";
import type { Transaction } from "../interfaces/transactions";
import { fetchAllData } from "../util";

export const selectTransaction = dataSource({
  display: {
    label: "Select Transaction",
    description: "Select a transaction from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection);
    const { data } = await fetchAllData<Transaction>(client, "transactions", {}, true);

    const objects = data
      .sort((a, b) => (a.id < b.id ? -1 : 1))
      .map<Element>((transaction) => ({
        key: transaction.id,
        label: `${transaction.merchant_name} - $${transaction.amount / 100}`,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Amazon - $49.99", key: "96bb7007-eec5-430f-8d09-e033cbc000c2" }],
  },
});
