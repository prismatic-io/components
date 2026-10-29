import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { submitSupplierInvoiceRequestExamplePayload } from "../../examplePayloads";
import { submitSupplierInvoiceRequestInputs } from "../../inputs";
import { submitSupplierInvoiceRequestOutputSchema } from "../../outputSchemas";

export const submitSupplierInvoiceRequest = action({
  display: {
    label: "Submit Supplier Invoice Request",
    description:
      "Submits a supplier invoice instance with the specified ID for approval.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      supplierInvoiceRequestId,
      supplierInvoiceInstanceId,
      supplierInvoiceInstanceDescriptor,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      id: supplierInvoiceInstanceId,
      descriptor: supplierInvoiceInstanceDescriptor,
    };
    const { data } = await client.post(
      `${SERVICES.accountsPayable}/supplierInvoiceRequests/${supplierInvoiceRequestId}/submit`,
      body,
    );
    return {
      data,
    };
  },
  examplePerform: async () => submitSupplierInvoiceRequestExamplePayload,
  inputs: submitSupplierInvoiceRequestInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: submitSupplierInvoiceRequestOutputSchema,
  }),
  examplePayload: submitSupplierInvoiceRequestExamplePayload,
});
