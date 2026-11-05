import type { Element } from "@prismatic-io/spectral";
import { dataSource } from "@prismatic-io/spectral";
import { getSageClient } from "../client";
import { selectCurrencyExamplePayload as examplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs";

export const selectCurrency = dataSource({
  display: {
    label: "Select Currency",
    description: "Select a currency from a list of currencies.",
  },
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = getSageClient(connection, false);
    const { data } = await client.get("/currencies");

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
