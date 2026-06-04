








const inventoryItemData = {
  id: 78234,
  name: "Medium Blue T-Shirt",
  is_digital: false,
  is_case_pick: false,
  is_lot: true,
  is_active: true,
  packaging_attribute: "None",
  dimensions: {
    weight: 8.5,
    length: 12.0,
    width: 10.0,
    depth: 2.5,
  },
  total_fulfillable_quantity: 480,
  total_onhand_quantity: 500,
  total_committed_quantity: 20,
  total_sellable_quantity: 480,
  total_awaiting_quantity: 50,
  total_exception_quantity: 0,
  total_internal_transfer_quantity: 0,
  total_backordered_quantity: 0,
  fulfillable_quantity_by_fulfillment_center: [
    {
      id: 5,
      name: "Cicero (IL)",
      fulfillable_quantity: 280,
      onhand_quantity: 300,
      committed_quantity: 20,
      awaiting_quantity: 25,
      internal_transfer_quantity: 0,
    },
  ],
  fulfillable_quantity_by_lot: [
    {
      lot_number: "LOT-2024-0618",
      expiration_date: "2025-12-31T00:00:00Z",
      fulfillable_quantity: 280,
      onhand_quantity: 300,
      committed_quantity: 20,
      awaiting_quantity: 25,
      internal_transfer_quantity: 0,
      fulfillable_quantity_by_fulfillment_center: [
        {
          id: 5,
          name: "Cicero (IL)",
          fulfillable_quantity: 280,
          onhand_quantity: 300,
          committed_quantity: 20,
          awaiting_quantity: 25,
          internal_transfer_quantity: 0,
        },
      ],
    },
  ],
};

export const getInventoryItemExamplePayload = {
  data: inventoryItemData,
};

export const listInventoryItemsExamplePayload = {
  data: [inventoryItemData],
};

export const listByProductIdExamplePayload = {
  data: [inventoryItemData],
};
