import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getInvoicePdfExamplePayload } from "../../examplePayloads";
import { getInvoicePdfInputs } from "../../inputs";

export const getInvoicePdf = action({
  display: {
    label: "Get Invoice PDF",
    description: "Retrieves printed customer invoice PDF documents.",
  },
  perform: async (context, { connection, invoicePdfId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.customerAccounts}/invoicePDFs/${invoicePdfId}`,
    );
    return {
      data,
    };
  },
  inputs: getInvoicePdfInputs,
  examplePayload: getInvoicePdfExamplePayload,
});
