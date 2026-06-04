import { dataSource, type Element } from "@prismatic-io/spectral";
import { getXeroClient } from "../client";
import { connectionInput } from "../inputs";
import { fetchAllData } from "../util";
import { type Invoice } from "../interfaces/Invoice";

export const selectInvoice = dataSource({
  display: {
    label: "Select Invoice",
    description: "Select an invoice from the list",
  },
  inputs: { xeroConnection: connectionInput },
  dataSourceType: "picklist",
  perform: async (context, { xeroConnection }) => {
    const client = await getXeroClient(xeroConnection, false);
    const data = await fetchAllData<Invoice, "Invoices">({
      client,
      path: "/invoices",
      key: "Invoices",
      queryParams: {},
      headers: {},
      fetchAll: true,
    });

    const result = (data.Invoices || []).map<Element>((invoice) => ({
      label: invoice.InvoiceNumber,
      key: invoice.InvoiceID,
    }));
    return { result };
  },
});
