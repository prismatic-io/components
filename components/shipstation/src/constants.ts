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
export const POLL_PAGE_SIZE = 500;
export const MAX_POLL_PAGES = 20;
export const WATERMARK_SKEW_MARGIN_MS = 60000;
export const WATERMARK_SEED_MARGIN_MS = 24 * 60 * 60 * 1000;
export const DEFAULT_BATCH_SIZE = 50;
