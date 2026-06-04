import { action, type KeyValuePair, util } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { createInvoiceV2ExamplePayload as examplePayload } from "../../examplePayloads";
import {
  applyTaxAfterDiscount,
  billEmail,
  billEmailBcc,
  billEmailCc,
  billingCity,
  billingLine1,
  billingLine2,
  billingPostalCode,
  billingState,
  connectionInput,
  customerId,
  customerMemo,
  customerName,
  customFields,
  docNumber,
  dueDate,
  dynamicValues as dynamicValuesInput,
  fieldValues as fieldValuesInput,
  invoiceDate,
  lineItems,
  privateNote,
  salesTermId,
  shippingCity,
  shippingLine1,
  shippingLine2,
  shippingPostalCode,
  shippingState,
} from "../../inputs";




const buildConditionalObject = (
  entries: [string, unknown][],
): Record<string, unknown> | undefined => {
  const obj: Record<string, unknown> = {};
  for (const [key, value] of entries) {
    if (value) obj[key] = value;
  }
  return Object.keys(obj).length > 0 ? obj : undefined;
};

export const createInvoiceV2 = action({
  display: {
    label: "Create Invoice",
    description: "Create a new invoice using individual field inputs.",
  },
  inputs: {
    
    quickbooksConnection: connectionInput,
    customerId: { ...customerId, required: true },
    lineItems,

    
    customerName,
    customFields,
    billEmail,
    billEmailCc,
    billEmailBcc,
    dueDate,
    invoiceDate,
    docNumber,
    customerMemo,
    privateNote,
    salesTermId,
    
    
    
    applyTaxAfterDiscount: { ...applyTaxAfterDiscount, required: false },

    
    billingLine1,
    billingLine2,
    billingCity,
    billingState,
    billingPostalCode,

    
    shippingLine1,
    shippingLine2,
    shippingCity,
    shippingState,
    shippingPostalCode,

    
    dynamicValues: dynamicValuesInput,
    fieldValues: fieldValuesInput,
  },
  perform: async (context, params) => {
    const client = createHttpClient(
      params.quickbooksConnection,
      context.debug.enabled,
    );

    
    const billAddr = buildConditionalObject([
      ["Line1", params.billingLine1],
      ["Line2", params.billingLine2],
      ["City", params.billingCity],
      ["CountrySubDivisionCode", params.billingState],
      ["PostalCode", params.billingPostalCode],
    ]);

    const shipAddr = buildConditionalObject([
      ["Line1", params.shippingLine1],
      ["Line2", params.shippingLine2],
      ["City", params.shippingCity],
      ["CountrySubDivisionCode", params.shippingState],
      ["PostalCode", params.shippingPostalCode],
    ]);

    
    
    const body = {
      ...util.types.keyValPairListToObject(
        (params.dynamicValues as KeyValuePair[]) || [],
      ),
      ...util.types.keyValPairListToObject(params.fieldValues || []),
      CustomerRef: {
        value: params.customerId,
        ...(params.customerName && { name: params.customerName }),
      },
      Line: params.lineItems,
      ApplyTaxAfterDiscount: params.applyTaxAfterDiscount,
      ...(params.customFields && { CustomField: params.customFields }),
      ...(params.billEmail && {
        BillEmail: { Address: params.billEmail },
      }),
      ...(params.billEmailCc && {
        BillEmailCc: { Address: params.billEmailCc },
      }),
      ...(params.billEmailBcc && {
        BillEmailBcc: { Address: params.billEmailBcc },
      }),
      ...(params.dueDate && { DueDate: params.dueDate }),
      ...(params.invoiceDate && { TxnDate: params.invoiceDate }),
      ...(params.docNumber && { DocNumber: params.docNumber }),
      ...(params.customerMemo && {
        CustomerMemo: { value: params.customerMemo },
      }),
      ...(params.privateNote && { PrivateNote: params.privateNote }),
      ...(params.salesTermId && {
        SalesTermRef: { value: params.salesTermId },
      }),
      ...(billAddr && { BillAddr: billAddr }),
      ...(shipAddr && { ShipAddr: shipAddr }),
    };

    const { data } = await client.post("/invoice", body, {
      headers: { "Content-Type": "application/json" },
    });

    return { data: data.Invoice };
  },
  examplePayload,
});
