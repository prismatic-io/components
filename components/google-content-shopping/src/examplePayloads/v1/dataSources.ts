type PicklistExamplePayload = {
  result: {
    label: string;
    key: string;
  }[];
};
export const selectAccountMerchantExamplePayload: PicklistExamplePayload = {
  result: [
    { label: "Example Merchant Store", key: "123456789" },
    { label: "Sub-Account Store", key: "987654321" },
  ],
};
export const selectProductMerchantExamplePayload: PicklistExamplePayload = {
  result: [
    { label: "Men's Organic Cotton T-Shirt - Blue", key: "SKU-12345" },
    { label: "Google Hoodie Sweatshirt", key: "SKU-67890" },
  ],
};
