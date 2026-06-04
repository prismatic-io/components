import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { submitSupplierInvoiceRequestExamplePayload } from "../../examplePayloads";
import { submitSupplierInvoiceRequestInputs } from "../../inputs";

export const submitSupplierInvoiceRequest = action({
  display: {
    label: "Submit Supplier Invoice Request",
    description:
      "Submits a supplier invoice instance with the specified ID for approval.",
  },
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
  inputs: submitSupplierInvoiceRequestInputs,
  examplePayload: submitSupplierInvoiceRequestExamplePayload,
});
