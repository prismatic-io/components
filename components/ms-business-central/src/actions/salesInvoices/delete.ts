import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { SUCCESS_PAYLOAD } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../../inputs/general";
import { salesInvoiceId } from "../../inputs/salesInvoice/updateSalesInvoiceInputs";

export const deleteSalesInvoice = action({
  display: {
    label: "Delete Sales Invoice",
    description: "Deletes a sales invoice object in your Business Central Organization.",
  },
  perform: async (context, { companyId, connection, salesInvoiceId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    await client.delete(`/companies(${companyId})/salesInvoices(${salesInvoiceId})`);

    return SUCCESS_PAYLOAD;
  },
  inputs: {
    connection: connectionInput,
    companyId,
    salesInvoiceId,
  },
  examplePayload: SUCCESS_PAYLOAD,
});
