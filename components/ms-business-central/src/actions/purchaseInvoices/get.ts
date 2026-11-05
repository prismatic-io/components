import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { getPurchaseInvoiceExamplePayload } from "../../examplePayloads";
import { getPurchaseInvoiceInputs } from "../../inputs/purchaseInvoices";
import type { PurchaseInvoice } from "../../interfaces";

export const getPurchaseInvoice = action({
  display: {
    label: "Get Purchase Invoice",
    description:
      "Retrieve the properties and relationships of a purchase invoice object in your Business Central organization.",
  },
  inputs: getPurchaseInvoiceInputs,
  perform: async (context, { connection, purchaseInvoiceId, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const { data } = await client.get<PurchaseInvoice>(
      `/companies(${companyId})/purchaseInvoices(${purchaseInvoiceId})`,
    );

    return { data };
  },
  examplePayload: getPurchaseInvoiceExamplePayload,
});
