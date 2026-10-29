import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { billDatasource } from "../examplePayloads/datasources";
import { connection } from "../inputs";
import type { Bill } from "../interfaces/bills";
import { fetchAllData } from "../util";

export const selectBill = dataSource({
  display: {
    label: "Select Bill",
    description: "Select a Bill from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection);
    const { data } = await fetchAllData<Bill>(client, "bills", {}, true);

    const objects = data
      .sort((a, b) => (a.id < b.id ? -1 : 1))
      .map<Element>((bill) => ({
        key: bill.id,
        label: `${bill.invoice_number} - ${bill.status}`,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: billDatasource,
  },
});
