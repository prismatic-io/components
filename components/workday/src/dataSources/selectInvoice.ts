import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectInvoiceExamplePayload } from "../examplePayloads";
import { selectInvoiceInputs } from "../inputs";
import type { CustomerInvoiceSummary } from "../types";
import { paginateResults, toSortedPicklist } from "../util";

export const selectInvoice = dataSource({
  display: {
    label: "Select Invoice",
    description: "A picklist of customer invoices in the Workday tenant.",
  },
  inputs: selectInvoiceInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await paginateResults({
      client,
      endpoint: `${SERVICES.customerAccounts}/invoices`,
      fetchAll: true,
    });

    return {
      result: toSortedPicklist(data as CustomerInvoiceSummary[], (item) => ({
        key: item.id,
        label: item.invoiceNumber,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectInvoiceExamplePayload,
});
