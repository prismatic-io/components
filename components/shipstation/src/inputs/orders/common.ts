import { input, util } from "@prismatic-io/spectral";
import {
  cleanKeyValueListInput,
  cleanStringInput,
  validateJSON,
  validateJSONArray,
} from "../../util";

export const orderId = input({
  label: "Order ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the order.",
  example: "18324102",
  placeholder: "Enter order ID",
  dataSource: "selectOrders",
  clean: cleanStringInput,
});

export const orderNumber = input({
  label: "Order Number",
  type: "string",
  required: true,
  comments: "The user-defined order number to identify the order.",
  example: "TEST-ORDER-API-DOCS",
  placeholder: "Enter order number",
  clean: util.types.toString,
});

export const orderDate = input({
  label: "Order Date",
  type: "string",
  required: true,
  default: "2023-09-08T12:34:56.000Z",
  comments:
    "The date the order was placed. Format: ISO 8601 (e.g., 2023-09-08T12:34:56.000Z).",
  example: "2023-09-08T12:34:56.000Z",
  placeholder: "Enter order date (ISO 8601)",
  clean: util.types.toString,
});

export const orderStatus = input({
  label: "Order Status",
  type: "string",
  required: true,
  comments:
    "The order status to filter results (e.g., awaiting_payment, awaiting_shipment, shipped).",
  example: "awaiting_shipment",
  placeholder: "Enter order status",
  clean: util.types.toString,
});

export const orderKey = input({
  label: "Order Key",
  type: "string",
  required: false,
  comments:
    "The unique order key. If provided, the create order method will either create a new order if the key is not found, or update the existing order if found.",
  example: "0f6bec18-3e89-4881-83aa-f392d84f4c74",
  placeholder: "Enter order key",
  clean: cleanStringInput,
});

export const billTo = input({
  label: "Billing Address",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      name: "John Doe",
      company: "JD Company",
      street1: "123 Main St",
      city: "Austin",
      state: "TX",
      postalCode: "78701",
      country: "US",
      phone: "123-456-7890",
      residential: true,
    },
    null,
    2,
  ),
  comments: "Provide the billing address in JSON format.",
  clean: validateJSON,
});

export const ordersArray = input({
  label: "Orders Array",
  type: "code",
  language: "json",
  default: JSON.stringify(
    [
      {
        orderNumber: "TEST-ORDER-001",
        orderDate: "2023-09-08T12:34:56.000Z",
        orderStatus: "awaiting_shipment",
        billTo: {
          name: "John Doe",
          street1: "123 Main St",
          city: "Anytown",
          state: "CA",
          postalCode: "12345",
          country: "US",
        },
        shipTo: {
          name: "John Doe",
          street1: "123 Main St",
          city: "Anytown",
          state: "CA",
          postalCode: "12345",
          country: "US",
        },
      },
      {
        orderNumber: "TEST-ORDER-002",
        orderDate: "2023-09-09T12:34:56.000Z",
        orderStatus: "awaiting_payment",
        billTo: {
          name: "Jane Doe",
          street1: "456 Another St",
          city: "Othertown",
          state: "NY",
          postalCode: "67890",
          country: "US",
        },
        shipTo: {
          name: "Jane Doe",
          street1: "456 Another St",
          city: "Othertown",
          state: "NY",
          postalCode: "67890",
          country: "US",
        },
      },
    ],
    null,
    2,
  ),
  comments:
    "Provide an array of order objects to create or update multiple orders.",
  clean: (input) => validateJSONArray(input),
});

export const fulfillmentId = input({
  label: "Fulfillment ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the fulfillment.",
  placeholder: "Enter fulfillment ID",
  dataSource: "selectFulfillments",
  clean: cleanStringInput,
});

export const pageFulfillments = input({
  label: "Page",
  type: "string",
  required: true,
  comments: "The page number to retrieve (starts at 1).",
  example: "1",
  placeholder: "Enter page number",
  clean: util.types.toNumber,
});

export const pageFullorders = input({
  label: "Page",
  type: "string",
  required: true,
  comments: "The page number to retrieve (starts at 1).",
  example: "1",
  placeholder: "Enter page number",
  clean: util.types.toNumber,
});

export const pageSizeFulfillments = input({
  label: "Page Size",
  type: "string",
  required: true,
  comments: "The maximum number of results to return per page. Maximum: 500.",
  example: "100",
  placeholder: "Enter page size",
  clean: util.types.toNumber,
});

export const pageSizeFulfillorders = input({
  label: "Page Size",
  type: "string",
  required: true,
  comments: "The maximum number of results to return per page. Maximum: 500.",
  example: "100",
  placeholder: "Enter page size",
  clean: util.types.toNumber,
});

export const orderAdditionalFieldsInput = input({
  label: "Additional Fields",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "A list of additional fields to include in the order.",
  example: "paymentMethod: Credit Card",
  clean: cleanKeyValueListInput,
});

export const orderIdInput = input({
  label: "Order ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the order.",
  example: "18324102",
  placeholder: "Enter order ID",
  dataSource: "selectOrders",
  clean: util.types.toString,
});

export const orderStatusList = orderStatus;
