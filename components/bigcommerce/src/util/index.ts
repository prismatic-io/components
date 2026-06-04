import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { ENDPOINTS, ORDERS_DEFAULT_SORT, PAGE_SIZE } from "../constants";
import type { BigCommerceOrder } from "../types";











export const fetchAllOrdersModifiedSince = async (
  client: HttpClient,
  storeHash: string,
  since: string,
): Promise<BigCommerceOrder[]> => {
  const collected: BigCommerceOrder[] = [];
  let page = 1;
  while (true) {
    const { data } = await client.get(ENDPOINTS.ORDERS(storeHash), {
      params: {
        min_date_modified: since,
        page,
        limit: PAGE_SIZE,
        sort: ORDERS_DEFAULT_SORT,
      },
    });
    if (!Array.isArray(data) || data.length === 0) break;
    collected.push(...(data as BigCommerceOrder[]));
    if (data.length < PAGE_SIZE) break;
    page += 1;
  }
  return collected;
};








export const partitionOrdersByTimestamp = (
  orders: BigCommerceOrder[],
  since: Date,
): { created: BigCommerceOrder[]; updated: BigCommerceOrder[] } => {
  const created: BigCommerceOrder[] = [];
  const updated: BigCommerceOrder[] = [];
  for (const order of orders) {
    const createdValue = order.date_created;
    const createdDate =
      typeof createdValue === "string" ? new Date(createdValue) : null;
    const isNew =
      createdDate !== null &&
      !Number.isNaN(createdDate.getTime()) &&
      createdDate > since;
    if (isNew) created.push(order);
    else updated.push(order);
  }
  return { created, updated };
};
