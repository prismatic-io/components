import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import { getSalesInvoiceReturnCreditViewsPayload } from "../../examplePayloads";

export const getSalesInvoiceReturnCreditViews = action({
  display: {
    label: "Get Sales Invoice, Return, and Credit Views",
    description:
      "Retrieve a view of sales orders and returns and invoices and credit notes.",
  },
  perform: async (context, { connection, site, company }) => {
    const client = getClient(connection, context.debug.enabled, site, company);

    const { data } = await client.get(
      "/customer_sop_invoice_credit_line_views",
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
  },

  examplePayload: getSalesInvoiceReturnCreditViewsPayload,
});
