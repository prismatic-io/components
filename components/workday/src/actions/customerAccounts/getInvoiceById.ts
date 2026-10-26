import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getInvoiceByIdExamplePayload } from "../../examplePayloads";
import { getInvoiceByIdInputs } from "../../inputs";
import { getInvoiceByIdOutputSchema } from "../../outputSchemas";
export const getInvoiceById = action({
  display: {
    label: "Get Invoice by ID",
    description:
      "Retrieves a customer invoice or adjustment with the specified ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, invoiceId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.customerAccounts}/invoices/${invoiceId}`,
    );
    return {
      data,
    };
  },
  inputs: getInvoiceByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getInvoiceByIdOutputSchema,
  }),
  examplePayload: getInvoiceByIdExamplePayload,
});
