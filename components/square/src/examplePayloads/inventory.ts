










export const batchChangeInventoryExamplePayload = {
  data: {
    counts: [
      {
        catalog_object_id: "W62UWFY35CWMYGVWK6TWJDNI",
        catalog_object_type: "ITEM_VARIATION",
        state: "IN_STOCK",
        location_id: "L88917AVBK2S5",
        quantity: "100",
        calculated_at: "2023-05-18T14:30:00.000Z",
      },
    ],
    changes: [
      {
        type: "PHYSICAL_COUNT",
        physical_count: {
          id: "M78TNM4H6KPC3A9WR3RWT",
          reference_id: "inventory-count-001",
          catalog_object_id: "W62UWFY35CWMYGVWK6TWJDNI",
          catalog_object_type: "ITEM_VARIATION",
          state: "IN_STOCK",
          location_id: "L88917AVBK2S5",
          quantity: "100",
          employee_id: "1yJlHapkseYnNPETIU1B",
          occurred_at: "2023-05-18T14:30:00.000Z",
          created_at: "2023-05-18T14:30:15.000Z",
        },
      },
    ],
  },
};






export const batchRetrieveInventoryCountsExamplePayload = {
  data: {
    counts: [
      {
        catalog_object_id: "W62UWFY35CWMYGVWK6TWJDNI",
        catalog_object_type: "ITEM_VARIATION",
        state: "IN_STOCK",
        location_id: "L88917AVBK2S5",
        quantity: "100",
        calculated_at: "2023-05-18T14:30:00.000Z",
      },
      {
        catalog_object_id: "X6NH6N2H6TK4W8AD4VFKZL8J",
        catalog_object_type: "ITEM_VARIATION",
        state: "IN_STOCK",
        location_id: "L88917AVBK2S5",
        quantity: "50",
        calculated_at: "2023-05-18T14:30:00.000Z",
      },
    ],
    cursor: "MTY1Njk2OTU5NjEzMjAwMDAwMA==",
  },
};
