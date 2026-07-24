type PicklistExamplePayload = {
  result: {
    label: string;
    key: string;
  }[];
};
export const selectAccountExamplePayload: PicklistExamplePayload = {
  result: [
    { label: "Main Store Account", key: "123456789" },
    { label: "Sub-Account Store", key: "987654321" },
  ],
};
export const selectProductExamplePayload: PicklistExamplePayload = {
  result: [
    { label: "Google Hoodie Sweatshirt", key: "online:en:US:2222222222" },
    { label: "Google Organic Cotton T-Shirt", key: "online:en:US:1111111111" },
  ],
};
