import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postSupplierInvoiceRequestsExamplePayload } from "../../examplePayloads";
import { postSupplierInvoiceRequestsInputs } from "../../inputs";
import { getIdObject } from "../../util";

export const postSupplierInvoiceRequests = action({
  display: {
    label: "Create Supplier Invoice Request",
    description: "Creates a supplier invoice request with the specified data.",
  },
  perform: async (
    context,
    {
      connection,
      currencyId,
      companyId,
      taxAmount,
      requesterId,
      controlTotalAmount,
      paymentTermsId,
      referenceTypeId,
      memo,
      supplierInvoceId,
      supplierInvoiceDescriptor,
      additionalFields,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    const body = {
      currency: getIdObject(currencyId),
      company: getIdObject(companyId),
      taxAmount,
      requester: getIdObject(requesterId),
      controlTotalAmount,
      paymentTerms: getIdObject(paymentTermsId),
      referenceType: getIdObject(referenceTypeId),
      memo,
      id: supplierInvoceId,
      descriptor: supplierInvoiceDescriptor,
      ...(additionalFields || {}),
    };
    const { data } = await client.post(
      `${SERVICES.accountsPayable}/supplierInvoiceRequests`,
      body,
    );
    return {
      data,
    };
  },
  inputs: postSupplierInvoiceRequestsInputs,
  examplePayload: postSupplierInvoiceRequestsExamplePayload,
});
