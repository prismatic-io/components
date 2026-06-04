

export const PAGE_SIZE = 100;


export const ORDERS_DEFAULT_SORT = "date_modified:asc";

export const ENDPOINTS = {
  ORDERS: (storeHash: string): string => `/stores/${storeHash}/v2/orders`,
};
