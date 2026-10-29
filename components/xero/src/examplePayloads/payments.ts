const paymentEnvelope = {
  Id: "bd90b45c-7b92-4e10-84e8-efef27090697",
  Status: "OK",
  ProviderName: "Acme Corp",
  DateTimeUTC: "/Date(1637616068092)/",
};

const samplePayment = {
  PaymentID: "3f2504e0-4f89-11d3-9a0c-0305e82c3301",
  Date: "/Date(1638144000000+0000)/",
  BankAmount: 575.0,
  Amount: 575.0,
  CurrencyRate: 1.0,
  PaymentType: "ACCRECPAYMENT",
  Status: "AUTHORISED",
  UpdatedDateUTC: "/Date(1638200000000+0000)/",
  HasAccount: true,
  IsReconciled: false,
  Account: {
    AccountID: "c81e728d-9d4c-3f63-af06-7f89cc14862c",
    Code: "090",
  },
  Invoice: {
    Type: "ACCREC",
    InvoiceID: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    InvoiceNumber: "INV-1042",
    Payments: [],
    CreditNotes: [],
    Prepayments: [],
    Overpayments: [],
    IsDiscounted: false,
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
    LineItems: [],
    CurrencyCode: "USD",
  },
  HasValidationErrors: false,
};

export const listPaymentsExamplePayload = {
  data: {
    ...paymentEnvelope,
    Payments: [samplePayment],
  },
};

export const getPaymentExamplePayload = {
  data: {
    ...paymentEnvelope,
    Payments: [samplePayment],
  },
};

export const payInvoiceExamplePayload = {
  data: {
    ...paymentEnvelope,
    Payments: [samplePayment],
  },
};

export const reversePaymentExamplePayload = {
  data: {
    ...paymentEnvelope,
    Payments: [
      {
        ...samplePayment,
        Status: "DELETED",
      },
    ],
  },
};

export const getPaymentHistoryExamplePayload = {
  data: {
    ...paymentEnvelope,
    HistoryRecords: [
      {
        Changes: "Edited",
        DateUTCString: "2021-11-29T10:15:30",
        DateUTC: "/Date(1638180930000+0000)/",
        User: "Jane Smith",
        Details: "Payment applied to invoice INV-1042",
      },
    ],
  },
};
