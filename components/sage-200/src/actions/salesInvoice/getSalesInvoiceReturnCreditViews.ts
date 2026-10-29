import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { getSalesInvoiceReturnCreditViewsPayload } from "../../examplePayloads";
import { company, connection, site } from "../../inputs/general";

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
