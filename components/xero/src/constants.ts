export const createInvoiceAdditionalFields = { CurrencyRate: 1.5 };

export const createContactAdditionalFields = {
  ContactNumber: "200",
};

export const MAX_PAGE_SIZE = 1000;

import type { PollResourceConfig } from "./types";

export const POLL_RESOURCE_CONFIG: Record<string, PollResourceConfig> = {
  accounts: {
    label: "Accounts",
    endpoint: "/accounts",
    responseKey: "Accounts",
    idField: "AccountID",
    paginated: false,
  },
  bankTransactions: {
    label: "Bank Transactions",
    endpoint: "/banktransactions",
    responseKey: "BankTransactions",
    idField: "BankTransactionID",
    paginated: true,
  },
  contacts: {
    label: "Contacts",
    endpoint: "/contacts",
    responseKey: "Contacts",
    idField: "ContactID",
    paginated: true,
  },
  creditNotes: {
    label: "Credit Notes",
    endpoint: "/creditnotes",
    responseKey: "CreditNotes",
    idField: "CreditNoteID",
    paginated: true,
  },
  invoices: {
    label: "Invoices",
    endpoint: "/invoices",
    responseKey: "Invoices",
    idField: "InvoiceID",
    paginated: true,
  },
  items: {
    label: "Items",
    endpoint: "/items",
    responseKey: "Items",
    idField: "ItemID",
    paginated: false,
  },
  manualJournals: {
    label: "Manual Journals",
    endpoint: "/manualjournals",
    responseKey: "ManualJournals",
    idField: "JournalID",
    paginated: true,
  },
  payments: {
    label: "Payments",
    endpoint: "/payments",
    responseKey: "Payments",
    idField: "PaymentID",
    paginated: true,
  },
  purchaseOrders: {
    label: "Purchase Orders",
    endpoint: "/purchaseorders",
    responseKey: "PurchaseOrders",
    idField: "PurchaseOrderID",
    paginated: true,
  },
  quotes: {
    label: "Quotes",
    endpoint: "/quotes",
    responseKey: "Quotes",
    idField: "QuoteID",
    paginated: true,
  },
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ label, value }),
);
