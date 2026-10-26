import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postSupplierInvoiceRequestsExamplePayload } from "../../examplePayloads";
import { postSupplierInvoiceRequestsInputs } from "../../inputs";
import { getIdObject } from "../../util";
import { postSupplierInvoiceRequestsOutputSchema } from "../../outputSchemas";
export const postSupplierInvoiceRequests = action({
  display: {
    label: "Create Supplier Invoice Request",
    description: "Creates a supplier invoice request with the specified data.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      companyId,
      supplierId,
      invoiceDate,
      amount = {},
      requesterId,
      paymentTermsId,
      referenceTypeId,
      memo,
      supplierInvoiceId,
      supplierInvoiceDescriptor,
      extraBody,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      supplier: getIdObject(supplierId),
      invoiceDate,
      currency: getIdObject(amount.currencyId),
      company: getIdObject(companyId),
      taxAmount: amount.taxAmount,
      requester: getIdObject(requesterId),
      controlTotalAmount: amount.controlTotalAmount,
      paymentTerms: getIdObject(paymentTermsId),
      referenceType: getIdObject(referenceTypeId),
      memo,
      id: supplierInvoiceId,
      descriptor: supplierInvoiceDescriptor,
      ...(extraBody || {}),
    };
    const { data } = await client.post(
      `${SERVICES.accountsPayable}/supplierInvoiceRequests`,
      body,
    );
    return {
      data,
    };
  },
  examplePerform: async () => postSupplierInvoiceRequestsExamplePayload,
  inputs: postSupplierInvoiceRequestsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: postSupplierInvoiceRequestsOutputSchema,
  }),
  examplePayload: postSupplierInvoiceRequestsExamplePayload,
});
