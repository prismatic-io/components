export const API_URLS: Record<string, string> = {
  professional: "https://api.columbus.sage.com/uk/sage200extra/accounts/v1",
  standard: "https://api.columbus.sage.com/uk/sage200/accounts/v1",
};


export const POLL_RESOURCE_CONFIG: Record<string, { endpoint: string; label: string }> = {
  
  customers: { endpoint: "/customers", label: "Customers" },
  customerContacts: { endpoint: "/customer_contacts", label: "Customer Contacts" },
  customerDeliveryAddresses: {
    endpoint: "/customer_delivery_addresses",
    label: "Customer Delivery Addresses",
  },
  customerPriceBands: {
    endpoint: "/customer_price_bands",
    label: "Customer Price Bands",
  },
  priceBands: { endpoint: "/price_bands", label: "Price Bands" },
  products: { endpoint: "/products", label: "Products" },
  productGroups: { endpoint: "/product_groups", label: "Product Groups" },
  salesOrders: { endpoint: "/sop_orders", label: "Sales Orders" },
  taxCodes: { endpoint: "/tax_codes", label: "Tax Codes" },
};

