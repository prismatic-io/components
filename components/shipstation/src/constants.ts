export const BASE_URL = "https://ssapi.shipstation.com";

export const INVALID_CONNECTION_ERROR = "Invalid ShipStation Connection.";

export const WEBHOOK_EVENTS = [
  { label: "Order Notify", value: "ORDER_NOTIFY" },
  { label: "Item Order Notify", value: "ITEM_ORDER_NOTIFY" },
  { label: "Ship Notify", value: "SHIP_NOTIFY" },
  { label: "Item Ship Notify", value: "ITEM_SHIP_NOTIFY" },
  { label: "Fulfillment Shipped", value: "FULFILLMENT_SHIPPED" },
  { label: "Fulfillment Rejected", value: "FULFILLMENT_REJECTED" },
];
