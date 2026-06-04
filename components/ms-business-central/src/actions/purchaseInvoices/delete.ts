import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { SUCCESS_PAYLOAD } from "../../examplePayloads";
import { deletePurchaseInvoiceInputs } from "../../inputs/purchaseInvoices";

export const deletePurchaseInvoice = action({
  display: {
    label: "Delete Purchase Invoice",
    description: "Deletes a purchase invoice object in your Business Central organization.",
  },
  inputs: deletePurchaseInvoiceInputs,
  perform: async (context, { purchaseInvoiceId, connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);

    await client.delete(`/companies(${companyId})/purchaseInvoices(${purchaseInvoiceId})`);

    return SUCCESS_PAYLOAD;
  },
  examplePayload: SUCCESS_PAYLOAD,
});
