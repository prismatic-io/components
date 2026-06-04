










export const listCatalogExamplePayload = {
  data: {
    objects: [
      {
        type: "ITEM",
        id: "W62UWFY35CWMYGVWK6TWJDNI",
        updated_at: "2016-11-16T22:25:24.878Z",
        version: 1479335124878,
        is_deleted: false,
        present_at_all_locations: true,
        item_data: {
          name: "Tea",
          description: "Hot Leaf Juice",
          category_id: "BJNQCF2FJ6S6BYQYPG3BMA2C",
          tax_ids: ["ZDHQCF2FJ6S6BYQYPG3BMA3E"],
          variations: [
            {
              type: "ITEM_VARIATION",
              id: "2TZFAOHWGG7PAK2QEXWYPZSP",
              updated_at: "2016-11-16T22:25:24.878Z",
              version: 1479335124878,
              is_deleted: false,
              present_at_all_locations: true,
              item_variation_data: {
                item_id: "W62UWFY35CWMYGVWK6TWJDNI",
                name: "Large",
                ordinal: 1,
                pricing_type: "FIXED_PRICING",
                price_money: {
                  amount: 150,
                  currency: "USD",
                },
              },
            },
          ],
        },
      },
    ],
    cursor: "BwUbDYr9HXzXVmkLu7j5S8fVEoJYo5EZxqBq3Pc2kBa...",
  },
};






export const searchCatalogItemsExamplePayload = {
  data: {
    items: [
      {
        type: "ITEM",
        id: "W62UWFY35CWMYGVWK6TWJDNI",
        updated_at: "2016-11-16T22:25:24.878Z",
        version: 1479335124878,
        is_deleted: false,
        present_at_all_locations: true,
        item_data: {
          name: "Tea",
          description: "Hot Leaf Juice",
          category_id: "BJNQCF2FJ6S6BYQYPG3BMA2C",
          variations: [
            {
              type: "ITEM_VARIATION",
              id: "2TZFAOHWGG7PAK2QEXWYPZSP",
              updated_at: "2016-11-16T22:25:24.878Z",
              version: 1479335124878,
              is_deleted: false,
              present_at_all_locations: true,
              item_variation_data: {
                item_id: "W62UWFY35CWMYGVWK6TWJDNI",
                name: "Large",
                ordinal: 1,
                pricing_type: "FIXED_PRICING",
                price_money: {
                  amount: 150,
                  currency: "USD",
                },
              },
            },
          ],
        },
      },
    ],
    cursor: "BwUbDYr9HXzXVmkLu7j5S8fVEoJYo5EZxqBq3Pc2kBa...",
  },
};






export const searchCatalogObjectsExamplePayload = {
  data: {
    objects: [
      {
        type: "ITEM",
        id: "W62UWFY35CWMYGVWK6TWJDNI",
        updated_at: "2016-11-16T22:25:24.878Z",
        version: 1479335124878,
        is_deleted: false,
        present_at_all_locations: true,
        item_data: {
          name: "Tea",
          description: "Hot Leaf Juice",
          category_id: "BJNQCF2FJ6S6BYQYPG3BMA2C",
        },
      },
    ],
    cursor: "BwUbDYr9HXzXVmkLu7j5S8fVEoJYo5EZxqBq3Pc2kBa...",
  },
};






export const batchRetrieveCatalogObjectsExamplePayload = {
  data: {
    objects: [
      {
        type: "ITEM",
        id: "W62UWFY35CWMYGVWK6TWJDNI",
        updated_at: "2016-11-16T22:25:24.878Z",
        version: 1479335124878,
        is_deleted: false,
        present_at_all_locations: true,
        item_data: {
          name: "Tea",
          description: "Hot Leaf Juice",
          category_id: "BJNQCF2FJ6S6BYQYPG3BMA2C",
        },
      },
    ],
  },
};






export const upsertCatalogObjectExamplePayload = {
  data: {
    catalog_object: {
      type: "ITEM",
      id: "X6NH6N2H6TK4W8AD4VFKZL8J",
      updated_at: "2023-05-20T15:30:00.000Z",
      version: 1684596600000,
      is_deleted: false,
      present_at_all_locations: true,
      item_data: {
        name: "Coffee",
        description: "Fresh brewed coffee",
        category_id: "BJNQCF2FJ6S6BYQYPG3BMA2C",
        variations: [
          {
            type: "ITEM_VARIATION",
            id: "3TZFAOHWGG7PAK2QEXWYPZTP",
            updated_at: "2023-05-20T15:30:00.000Z",
            version: 1684596600000,
            is_deleted: false,
            present_at_all_locations: true,
            item_variation_data: {
              item_id: "X6NH6N2H6TK4W8AD4VFKZL8J",
              name: "Regular",
              ordinal: 1,
              pricing_type: "FIXED_PRICING",
              price_money: {
                amount: 250,
                currency: "USD",
              },
            },
          },
        ],
      },
    },
    id_mappings: [
      {
        client_object_id: "#Coffee",
        object_id: "X6NH6N2H6TK4W8AD4VFKZL8J",
      },
    ],
  },
};






export const batchUpsertCatalogObjectsExamplePayload = {
  data: {
    objects: [
      {
        type: "ITEM",
        id: "X6NH6N2H6TK4W8AD4VFKZL8J",
        updated_at: "2023-05-20T15:30:00.000Z",
        version: 1684596600000,
        is_deleted: false,
        present_at_all_locations: true,
        item_data: {
          name: "Coffee",
        },
      },
    ],
    id_mappings: [
      {
        client_object_id: "#Coffee",
        object_id: "X6NH6N2H6TK4W8AD4VFKZL8J",
      },
    ],
  },
};






export const retrieveCatalogObjectExamplePayload = {
  data: {
    object: {
      type: "ITEM",
      id: "W62UWFY35CWMYGVWK6TWJDNI",
      updated_at: "2016-11-16T22:25:24.878Z",
      version: 1479335124878,
      is_deleted: false,
      present_at_all_locations: true,
      item_data: {
        name: "Tea",
        description: "Hot Leaf Juice",
        category_id: "BJNQCF2FJ6S6BYQYPG3BMA2C",
        variations: [
          {
            type: "ITEM_VARIATION",
            id: "2TZFAOHWGG7PAK2QEXWYPZSP",
            updated_at: "2016-11-16T22:25:24.878Z",
            version: 1479335124878,
            is_deleted: false,
            present_at_all_locations: true,
            item_variation_data: {
              item_id: "W62UWFY35CWMYGVWK6TWJDNI",
              name: "Large",
              ordinal: 1,
              pricing_type: "FIXED_PRICING",
              price_money: {
                amount: 150,
                currency: "USD",
              },
            },
          },
        ],
      },
    },
  },
};






export const deleteCatalogObjectExamplePayload = {
  data: {
    deleted_object_ids: ["W62UWFY35CWMYGVWK6TWJDNI"],
    deleted_at: "2023-05-21T10:30:00.000Z",
  },
};






export const batchDeleteCatalogObjectsExamplePayload = {
  data: {
    deleted_object_ids: ["W62UWFY35CWMYGVWK6TWJDNI", "X6NH6N2H6TK4W8AD4VFKZL8J"],
    deleted_at: "2023-05-21T10:30:00.000Z",
  },
};
