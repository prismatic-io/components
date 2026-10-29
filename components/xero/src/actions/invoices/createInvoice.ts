import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { createInvoiceInputs } from "../../inputs";
import { createInvoiceExamplePayload } from "../../examplePayloads";

export const createInvoice = action({
  display: {
    label: "Create Invoice",
    description: "Create a new invoice.",
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
    const { data } = await client.post("/invoices", invoiceValues);
    return { data };
  },
  inputs: createInvoiceInputs,
  examplePayload: createInvoiceExamplePayload,
});
