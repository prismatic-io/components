import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectInvoiceExamplePayload } from "../examplePayloads";
import { selectInvoiceInputs } from "../inputs";
import type { CustomerInvoiceSummary } from "../types";
import { toSortedPicklist } from "../util";

export const selectInvoice = dataSource({
  display: {
    label: "Select Invoice",
    description: "A picklist of customer invoices in the Workday tenant.",
  },
  inputs: selectInvoiceInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(`${SERVICES.customerAccounts}/invoices`);

    return {
      result: toSortedPicklist(data.data, (item: CustomerInvoiceSummary) => ({
        key: item.id,
        label: item.invoiceNumber,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectInvoiceExamplePayload,
});
