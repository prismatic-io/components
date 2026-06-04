export const AUTHORIZE_URL = [
  { label: "Production", value: "https://api.ramp.com/v1/authorize" },
  { label: "Sandbox", value: "https://demo.ramp.com/v1/authorize" },
];

export const TOKEN_URL = [
  { label: "Production", value: "https://api.ramp.com/developer/v1/token" },
  { label: "Sandbox", value: "https://demo-api.ramp.com/developer/v1/token" },
];

export const DEFAULT_SCOPES =
  "accounting:read accounting:write bills:read business:read cards:read cards:write cashbacks:read departments:read departments:write entities:read leads:read leads:write limits:read limits:write locations:read locations:write memos:read merchants:read receipt_integrations:read receipt_integrations:write receipts:read reimbursements:read spend_programs:read spend_programs:write statements:read transactions:read transfers:read users:read users:write";

export const INVALID_CONNECTION = "Invalid connection provided";

export const GENERIC_DELETE_RESPONSE = "Deleted successfully";

export const BOOLEAN_VALUES = {
  True: "true",
  False: "false",
};

export const SYNC_TYPE_VALUES = {
  "BILL SYNC": "BILL_SYNC",
  "REIMBURSEMENT SYNC": "REIMBURSEMENT_SYNC",
  "STATEMENT CREDIT SYNC": "STATEMENT_CREDIT_SYNC",
  "TRANSACTION SYNC": "TRANSACTION_SYNC",
  "TRANSFER SYNC": "TRANSFER_SYNC",
  "WALLET TRANSFER SYNC": "WALLET_TRANSFER_SYNC",
};

export const INPUT_TYPE_VALUES = ["BOOLEAN", "FREE_FORM_TEXT", "SINGLE_CHOICE"];

import type { PollResourceConfig } from "./types";

export const POLL_RESOURCE_CONFIG: Record<string, PollResourceConfig> = {
  transactions: {
    label: "Transactions",
    endpoint: "transactions",
    createdAtField: "user_transaction_time",
    updatedAtField: null,
  },
  bills: {
    label: "Bills",
    endpoint: "bills",
    createdAtField: "created_at",
    updatedAtField: null,
  },
  reimbursements: {
    label: "Reimbursements",
    endpoint: "reimbursements",
    createdAtField: "created_at",
    updatedAtField: "updated_at",
  },
  vendors: {
    label: "Vendors",
    endpoint: "/accounting/vendors",
    createdAtField: "created_at",
    updatedAtField: "updated_at",
  },
  departments: {
    label: "Departments",
    endpoint: "departments",
    createdAtField: null,
    updatedAtField: null,
  },
  locations: {
    label: "Locations",
    endpoint: "locations",
    createdAtField: null,
    updatedAtField: null,
  },
  businessEntities: {
    label: "Business Entities",
    endpoint: "entities",
    createdAtField: null,
    updatedAtField: null,
  },
  generalLedgerAccounts: {
    label: "General Ledger Accounts",
    endpoint: "/accounting/accounts",
    createdAtField: "created_at",
    updatedAtField: "updated_at",
  },
  customAccountingFields: {
    label: "Custom Accounting Fields",
    endpoint: "/accounting/fields",
    createdAtField: "created_at",
    updatedAtField: "updated_at",
  },
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(([value, { label }]) => ({
  label,
  value,
}));
