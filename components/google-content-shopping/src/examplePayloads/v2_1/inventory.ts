import type { content_v2_1 } from "googleapis";
export const updateLocalInventoryExamplePayload: {
  data: content_v2_1.Schema$LocalInventory;
} = {
  data: {
    storeCode: "STORE_001",
    price: {
      value: "29.99",
      currency: "USD",
    },
    salePrice: {
      value: "24.99",
      currency: "USD",
    },
    salePriceEffectiveDate: "2025-01-15T00:00:00Z/2025-02-15T23:59:59Z",
    availability: "in stock",
    quantity: 50,
    pickupMethod: "buy",
    pickupSla: "same day",
    instoreProductLocation: "Aisle 5, Shelf 3",
  },
};
export const batchLocalInventoryExamplePayload: {
  data: unknown;
} = {
  data: {
    entries: [
      {
        batchId: 1,
        localinventory: {
          storeCode: "STORE_001",
          price: {
            value: "29.99",
            currency: "USD",
          },
          availability: "in stock",
          quantity: 50,
        },
      },
      {
        batchId: 2,
        localinventory: {
          storeCode: "STORE_002",
          availability: "out of stock",
        },
      },
    ],
  },
};
export const updateRegionalInventoryExamplePayload: {
  data: content_v2_1.Schema$RegionalInventory;
} = {
  data: {
    regionId: "123456",
    price: {
      value: "29.99",
      currency: "USD",
    },
    salePrice: {
      value: "24.99",
      currency: "USD",
    },
    salePriceEffectiveDate: "2025-01-15T00:00:00Z/2025-02-15T23:59:59Z",
    availability: "in stock",
  },
};
export const batchRegionalInventoryExamplePayload: {
  data: unknown;
} = {
  data: {
    entries: [
      {
        batchId: 1,
        regionalInventory: {
          regionId: "123456",
          price: {
            value: "29.99",
            currency: "USD",
          },
          availability: "in stock",
        },
      },
      {
        batchId: 2,
        regionalInventory: {
          regionId: "654321",
          availability: "out of stock",
        },
      },
    ],
  },
};
