export const updateLocalInventoryExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: {
    name: "accounts/123456789/products/en~US~1111111111/localInventories/STORE-NYC-001",
    storeCode: "STORE-NYC-001",
    availability: "in_stock",
    quantity: "50",
    price: {
      amountMicros: "29990000",
      currencyCode: "USD",
    },
    salePrice: {
      amountMicros: "24990000",
      currencyCode: "USD",
    },
    salePriceEffectiveDate: {
      startTime: "2025-01-15T00:00:00Z",
      endTime: "2025-02-15T23:59:59Z",
    },
    pickupMethod: "buy",
    pickupSla: "same_day",
    instoreProductLocation: "Aisle 5, Shelf 3",
  },
};
export const batchLocalInventoryExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: {
    results: [
      {
        success: true,
        result: {
          name: "accounts/123456789/products/en~US~1111111111/localInventories/STORE-NYC-001",
          storeCode: "STORE-NYC-001",
          availability: "in_stock",
          quantity: "50",
          price: { amountMicros: "29990000", currencyCode: "USD" },
        },
      },
      {
        success: false,
        error: "INVALID_ARGUMENT: storeCode is required.",
      },
    ],
  },
};
export const updateRegionalInventoryExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: {
    name: "accounts/123456789/products/en~US~1111111111/regionalInventories/12345",
    region: "12345",
    availability: "in_stock",
    price: {
      amountMicros: "29990000",
      currencyCode: "USD",
    },
    salePrice: {
      amountMicros: "24990000",
      currencyCode: "USD",
    },
    salePriceEffectiveDate: {
      startTime: "2025-01-15T00:00:00Z",
      endTime: "2025-02-15T23:59:59Z",
    },
  },
};
export const batchRegionalInventoryExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: {
    results: [
      {
        success: true,
        result: {
          name: "accounts/123456789/products/en~US~1111111111/regionalInventories/12345",
          region: "12345",
          availability: "in_stock",
          price: { amountMicros: "29990000", currencyCode: "USD" },
        },
      },
      {
        success: false,
        error: "INVALID_ARGUMENT: region is required.",
      },
    ],
  },
};
