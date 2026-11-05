import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createSalesInvoiceExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../../inputs/general";
import { salesInvoiceId } from "../../inputs/salesInvoice/updateSalesInvoiceInputs";
import type { SalesInvoice } from "../../interfaces";

export const getSalesInvoice = action({
  display: {
    label: "Get Sales Invoice",
    description: "Retrieves a sales invoice object in your Business Central Organization.",
  },
  perform: async (context, { companyId, connection, salesInvoiceId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);

    const { data } = await client.get<SalesInvoice>(
      `/companies(${companyId})/salesInvoices(${salesInvoiceId})`,
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
    salesInvoiceId,
  },
  examplePayload: createSalesInvoiceExamplePayload,
});
