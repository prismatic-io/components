export const BOOLEAN_INPUT_MODEL = ["True", "False"].map((value) => ({
  value: value.toLowerCase(),
  label: value,
}));

export const ATTACHMENT_PARENT_TYPES = [
  "Journal",
  "Sales Order",
  "Sales Quote",
  "Sales Credit",
  "Sales Credit Memo",
  "Sales Invoice",
  "Purchase Invoice",
] as const;

export const NO_CONTENT_RESPONSE = "ACTION SUCCEEDED";

export const MAX_EXPIRATION_MINUTES = 10070;
export const MAX_EXPIRATION_DAYS = MAX_EXPIRATION_MINUTES / 60 / 24;



export const POLL_RESOURCE_CONFIG: Record<string, { endpoint: string; label: string }> = {
  items: { endpoint: "items", label: "Items" },
  customers: { endpoint: "customers", label: "Customers" },
  vendors: { endpoint: "vendors", label: "Vendors" },
  salesOrders: { endpoint: "salesOrders", label: "Sales Orders" },
  salesInvoices: { endpoint: "salesInvoices", label: "Sales Invoices" },
  salesShipments: { endpoint: "salesShipments", label: "Sales Shipments" },
  purchaseOrders: { endpoint: "purchaseOrders", label: "Purchase Orders" },
  purchaseInvoices: { endpoint: "purchaseInvoices", label: "Purchase Invoices" },
  purchaseReceipts: { endpoint: "purchaseReceipts", label: "Purchase Receipts" },
  accounts: { endpoint: "accounts", label: "Accounts" },
};
