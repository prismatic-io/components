import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postSupplierInvoiceRequestsExamplePayload } from "../../examplePayloads";
import { postSupplierInvoiceRequestsInputs } from "../../inputs";
import { compactRows, getAmountObject, getIdObject } from "../../util";
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
      lines = [],
      assignmentIds = {},
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
      taxAmount: getAmountObject(amount.taxAmount),
      requester: getIdObject(assignmentIds.requesterId),
      controlTotalAmount: getAmountObject(amount.controlTotalAmount),
      lines: compactRows(
        lines.map((line) => ({
          itemDescription: line.itemDescription,
          quantity: line.quantity,
          unitCost: getAmountObject(line.unitCost),
          extendedAmount: getAmountObject(line.extendedAmount),
          memo: line.memo,
          internalMemo: line.internalMemo,
          billable: line.billable,
          spendCategory: getIdObject(line.spendCategoryId),
          item: getIdObject(line.itemId),
          unitOfMeasure: getIdObject(line.unitOfMeasureId),
        })),
      ),
      paymentTerms: getIdObject(assignmentIds.paymentTermsId),
      referenceType: getIdObject(assignmentIds.referenceTypeId),
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
