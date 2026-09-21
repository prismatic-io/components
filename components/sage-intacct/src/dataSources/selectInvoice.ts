import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectInvoiceExamplePayload } from "../examplePayloads";
import { selectInvoiceInputs } from "../inputs";
import { queryRecordsPaginated } from "../util";
export const selectInvoice = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Invoice",
    description: "Lists AR invoices in Sage Intacct.",
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
  inputs: selectInvoiceInputs,
  examplePayload: selectInvoiceExamplePayload,
});
