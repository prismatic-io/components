import { dataSource } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { selectInvoiceInputs } from "../inputs";
import { fetchAllPages, sortByLabel } from "../util";

export const selectInvoice = dataSource({
  display: {
    label: "Select Invoice",
    description: "Lists invoices in the Square account.",
  },
  inputs: selectInvoiceInputs,
  perform: async (_context, { squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection);

    const allInvoices = await fetchAllPages(client, "/v2/invoices", "invoices");

    const result = (allInvoices.invoices as Record<string, unknown>[])
      .map((invoice: Record<string, unknown>) => ({
        label: `${invoice.invoice_number}` || `${invoice.title}` || `${invoice.id}`,
        key: invoice.id as string,
      }))
      .sort(sortByLabel);

    return {
      result,
    };
  },
  dataSourceType: "picklist",
});
