import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../inputs";
import { queryRecordsPaginated } from "../utils";

export const selectInvoice = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Invoice",
    description: "A picklist of AR invoices in Sage Intacct.",
  },
  perform: async (_context, { connection }) => {
    const invoices = await queryRecordsPaginated(
      connection,
      "ARINVOICE",
      
      ["*"],
      "",
    );

    return {
      result: invoices.map(
        (invoice: { RECORDNO: string; INVOICENO: string }): Element => {
          const label = invoice.INVOICENO;
          return {
            label,
            key: invoice.RECORDNO,
          };
        },
      ),
    };
  },
  inputs: { connection },
});
