import { input, util } from "@prismatic-io/spectral";
import {
  cursor,
  idempotencyKey,
  limit,
  locationId,
  squareConnection,
  validateJSON,
} from "./common";

const orderQuery = input({
  label: "Query",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      filter: {
        state_filter: {
          states: ["COMPLETED"],
        },
        date_time_filter: {
          closed_at: {
            start_at: "2024-01-01T00:00:00+00:00",
            end_at: "2024-12-31T23:59:59+00:00",
          },
        },
        customer_filter: {
          customer_ids: ["JDKYHBWT1D4F8MFH63DBMEN8Y4"],
        },
      },
      sort: {
        sort_field: "CLOSED_AT",
        sort_order: "DESC",
      },
    },
    null,
    2,
  ),
  required: true,
  comments:
    "The query to search for orders. See [Square Search Orders](https://developer.squareup.com/reference/square/orders-api/search-orders) for filter and sort options.",
  clean: (queryInput) => {
    if (!util.types.isJSON(util.types.toString(queryInput))) {
      throw new Error("Invalid JSON provided for Query.");
    }
    return JSON.parse(util.types.toString(queryInput));
  },
});

const locationIds = input({
  label: "Location IDs",
  type: "code",
  language: "json",
  default: JSON.stringify(["LH2G9VFHJRWKR", "LK3H8WGIKSMLA"], null, 2),
  required: true,
  comments: "An array of location IDs in JSON format used to filter results to specific locations.",
  clean: (locationIdsInput) => validateJSON(locationIdsInput),
});

const returnEntries = input({
  label: "Return Entries",
  type: "boolean",
  default: "true",
  required: true,
  comments: "When true, the entries associated with the orders are returned.",
  clean: util.types.toBool,
});

const orderId = input({
  label: "Order ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the order.",
  dataSource: "selectOrder",
  example: "CAISEHUwyPjyk5QFnMR1k5axW5YgAQ",
  placeholder: "Enter Order ID",
  clean: util.types.toString,
});

const orderIds = input({
  label: "Order IDs",
  type: "code",
  language: "json",
  default: JSON.stringify(
    ["CAISEHUwyPjyk5QFnMR1k5axW5YgAQ", "CAISEHUwyPjyk5QFnMR1k5axW5YgAB"],
    null,
    2,
  ),
  required: true,
  comments:
    "An array of order IDs to retrieve in JSON format. A maximum of 100 orders can be retrieved per request.",
  clean: (orderIdsInput) => {
    if (!util.types.isJSON(util.types.toString(orderIdsInput))) {
      throw new Error("Invalid JSON provided for Order IDs.");
    }
    return JSON.parse(util.types.toString(orderIdsInput));
  },
});

const orderObject = input({
  label: "Order Object",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      idempotency_key: "a7c8e4b1-3f5d-4e2a-9c1b-7d3e5f8a2c6b",
      order: {
        location_id: "LH2G9VFHJRWKR",
        line_items: [
          {
            name: "Coffee Mug",
            quantity: "1",
            base_price_money: {
              amount: 1500,
              currency: "USD",
            },
          },
        ],
      },
    },
    null,
    2,
  ),
  required: true,
  comments:
    "The complete order object in JSON format. See [Square Order Object](https://developer.squareup.com/reference/square/objects/Order) for field details.",
  clean: (orderInput) => {
    if (!util.types.isJSON(util.types.toString(orderInput))) {
      throw new Error("Invalid JSON provided for Order Object.");
    }
    return JSON.parse(util.types.toString(orderInput));
  },
});

const fieldsToClear = input({
  label: "Fields to Clear",
  type: "code",
  language: "json",
  default: JSON.stringify(["line_items[uid].note", "discounts[uid]"], null, 2),
  required: false,
  comments:
    "Array of dot notation paths for fields to clear in JSON format. For example: line_items[uid].note or discounts[uid].",
  clean: (fieldsToClearInput) => {
    if (!util.types.isJSON(util.types.toString(fieldsToClearInput))) {
      throw new Error("Invalid JSON provided for Fields to Clear.");
    }
    return JSON.parse(util.types.toString(fieldsToClearInput));
  },
});

export const searchOrdersInputs = {
  squareConnection,
  locationIds,
  orderQuery,
  returnEntries,
  cursor,
  limit,
};

export const retrieveOrderInputs = {
  squareConnection,
  orderId,
};

export const batchRetrieveOrdersInputs = {
  squareConnection,
  locationId,
  orderIds,
};

export const createOrderInputs = {
  squareConnection,
  locationId,
  orderObject,
};

export const updateOrderInputs = {
  squareConnection,
  orderId,
  orderObject,
  fieldsToClear,
  idempotencyKey,
};

export const cloneOrderInputs = {
  squareConnection,
  orderId,
  idempotencyKey,
};
