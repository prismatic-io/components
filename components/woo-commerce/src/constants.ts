export const POLL_PAGE_SIZE = 100;
export const MAX_POLL_PAGES = 10;
export const WATERMARK_SKEW_MARGIN_MS = 60000;
export const MAX_EXCLUDE_IDS = 200;
export const WATERMARK_RESOURCES: readonly string[] = [
  "orders",
  "products",
  "coupons",
];
export const RESOURCE_ENDPOINT_MAP: Record<string, string> = {
  orders: "/orders",
  customers: "/customers",
  products: "/products",
  coupons: "/coupons",
};
export const DEFAULT_BATCH_SIZE = 50;
