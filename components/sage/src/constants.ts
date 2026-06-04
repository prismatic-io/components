import type { PollResourceConfig } from "./types";

export const POLL_RESOURCE_CONFIG: Record<string, PollResourceConfig> = {
  contacts: { label: "Contacts", endpoint: "/contacts" },
  salesInvoices: { label: "Sales Invoices", endpoint: "/sales_invoices" },
  purchaseInvoices: { label: "Purchase Invoices", endpoint: "/purchase_invoices" },
  ledgerAccounts: { label: "Ledger Accounts", endpoint: "/ledger_accounts" },
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(([value, { label }]) => ({
  label,
  value,
}));
