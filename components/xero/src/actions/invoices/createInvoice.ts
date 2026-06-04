import { action, input, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import {
  invoiceType,
  contactId,
  date,
  dueDate,
  dateString,
  dueDateString,
  lineAmountTypes,
  lineItems,
  invoiceStatus,
  connectionInput,
  invoiceNumber,
  additionalFields,
  currencyCode,
  reference,
  sentToContact,
  url,
} from "../../inputs";
import { createInvoiceAdditionalFields } from "../../constants";
import { createInvoiceExamplePayload } from "../../examplePayloads";

export const createInvoice = action({
  display: {
    label: "Create Invoice",
    description: "Create a new invoice",
  },
  perform: async (
    context,
    {
      xeroConnection,
      invoiceType,
      contactId,
      date,
      dueDate,
      dateString,
      dueDateString,
      lineAmountTypes,
      lineItems,
      invoiceStatus,
      invoiceNumber,
      reference,
      url,
      currencyCode,
      sentToContact,
      additionalFields,
    },
  ) => {
    const client = await getXeroClient(xeroConnection, context.debug.enabled);

    const invoiceValues = {
      Type: invoiceType,
      Contact: {
        ContactID: contactId,
      },
      Date: date,
      DueDate: dueDate,
      DateString: dateString,
      DueDateString: dueDateString,
      LineAmountTypes: lineAmountTypes,
      LineItems: lineItems || [],
      Status: invoiceStatus,
      InvoiceNumber: invoiceNumber,
      Reference: reference,
      Url: url,
      CurrencyCode: currencyCode,
      SentToContact: sentToContact,
      ...(additionalFields || {}),
    };
    const { data } = await client.post(`/invoices`, invoiceValues);
    return { data };
  },
  inputs: {
    invoiceType,
    contactId,
    invoiceStatus,
    lineItems,
    lineAmountTypes,
    date,
    dueDate,
    dateString,
    dueDateString,
    invoiceNumber,
    reference,
    url,
    currencyCode,
    sentToContact,
    additionalFields: input({
      ...additionalFields,
      example: JSON.stringify(createInvoiceAdditionalFields, null, 2),
      comments:
        additionalFields.comments +
        " See [Xero API documentation](https://developer.xero.com/documentation/api/accounting/invoices#post-invoices) for additional fields.",
    }),
    xeroConnection: connectionInput,
  },
  examplePayload: createInvoiceExamplePayload,
});
