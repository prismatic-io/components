const invoiceEnvelope = {
  Id: "bd90b45c-7b92-4e10-84e8-efef27090697",
  Status: "OK",
  ProviderName: "Acme Corp",
  DateTimeUTC: "/Date(1637616068092)/",
};

const sampleInvoice = {
  Type: "ACCREC",
  InvoiceID: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  InvoiceNumber: "INV-1042",
  Reference: "PO-2025-Q2",
  Payments: [],
  CreditNotes: [],
  Prepayments: [],
  Overpayments: [],
  AmountDue: 1150.0,
  AmountPaid: 0,
  AmountCredited: 0,
  SentToContact: true,
  CurrencyRate: 1.0,
  IsDiscounted: false,
  HasAttachments: false,
  InvoiceAddresses: [],
  HasErrors: false,
  InvoicePaymentServices: [],
  Contact: {
    ContactID: "a4c2f1e8-3d56-4b91-9f07-2e8a1c6d5b34",
    Name: "Jane Smith",
    Addresses: [],
    Phones: [],
    ContactGroups: [],
    ContactPersons: [],
    HasValidationErrors: false,
  },
  DateString: "2025-07-01T00:00:00",
  Date: "/Date(1751328000000+0000)/",
  DueDateString: "2025-07-31T00:00:00",
  DueDate: "/Date(1753920000000+0000)/",
  BrandingThemeID: "d0e1f234-5678-90ab-cdef-1234567890ab",
  Status: "AUTHORISED",
  LineAmountTypes: "Exclusive",
  LineItems: [],
  SubTotal: 1000.0,
  TotalTax: 150.0,
  Total: 1150.0,
  UpdatedDateUTC: "/Date(1751404400000+0000)/",
  CurrencyCode: "USD",
};

export const listInvoicesExamplePayload = {
  data: {
    ...invoiceEnvelope,
    Invoices: [sampleInvoice],
  },
};

export const getInvoiceExamplePayload = {
  data: {
    ...invoiceEnvelope,
    Invoices: [sampleInvoice],
  },
};

export const createInvoiceExamplePayload = {
  data: {
    ...invoiceEnvelope,
    Invoices: [sampleInvoice],
  },
};

export const deleteInvoiceExamplePayload = {
  data: {
    ...invoiceEnvelope,
    Invoices: [
      {
        ...sampleInvoice,
        Status: "DELETED",
      },
    ],
  },
};

export const voidInvoiceExamplePayload = {
  data: {
    ...invoiceEnvelope,
    Invoices: [
      {
        ...sampleInvoice,
        Status: "VOIDED",
      },
    ],
  },
};

export const sendInvoiceExamplePayload = {
  data: null,
};

export const getInvoiceHistoryExamplePayload = {
  data: {
    ...invoiceEnvelope,
    HistoryRecords: [
      {
        Changes: "Edited",
        DateUTCString: "2025-07-02T14:22:10",
        DateUTC: "/Date(1751466130697+0000)/",
        User: "Jane Smith",
        Details: "Invoice emailed to customer",
      },
    ],
  },
};

export const addNoteToInvoiceExamplePayload = {
  data: {
    ...invoiceEnvelope,
    HistoryRecords: [
      {
        Changes: "Edited",
        DateUTCString: "2025-07-02T14:22:10",
        DateUTC: "/Date(1751466130697+0000)/",
        User: "System Generated",
        Details: "Payment reminder sent to customer",
      },
    ],
  },
};
