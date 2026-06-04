import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { connection } from "../inputs/shared";
import { toSortedPicklist } from "./helpers";

export const selectInvoice = dataSource({
  display: {
    label: "Select Invoice",
    description: "A picklist of customer invoices in your Workday tenant.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(`${SERVICES.customerAccounts}/invoices`);

    return {
      result: toSortedPicklist(
        data.data,
        (item: { id: string; invoiceNumber: string }) => ({
          key: item.id,
          label: item.invoiceNumber,
        }),
      ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "INV-001234", key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1" },
    ],
  },
});
