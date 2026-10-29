export const DEFAULT_BATCH_SIZE = 50;

export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const PAGE_SIZE = 100;

export const ORDERS_DEFAULT_SORT = "date_modified:asc";

export const ENDPOINTS = {
  ORDERS: (storeHash: string): string => `/stores/${storeHash}/v2/orders`,
};
