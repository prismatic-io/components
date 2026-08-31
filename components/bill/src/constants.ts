export const PAGE_SIZE = 999;
export const RESOURCE_CONFIG: Record<
  string,
  {
    endpoint: string;
  }
> = {
  bills: { endpoint: "/List/Bill.json" },
  customers: { endpoint: "/List/Customer.json" },
  invoices: { endpoint: "/List/Invoice.json" },
  vendors: { endpoint: "/List/Vendor.json" },
};
export const BANK_ACCOUNT_LIST_ENDPOINTS = {
  customerBankAccount: "/List/CustomerBankAccount.json",
  vendorBankAccount: "/List/VendorBankAccount.json",
} as const;
