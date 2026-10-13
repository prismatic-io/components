import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  ENDPOINTS,
  LOOK_BACK_DATE_PATTERN,
  ORDERS_DEFAULT_SORT,
  PAGE_SIZE,
} from "../constants";
import type {
  BigCommerceChangesObject,
  BigCommerceOrder,
  BigCommerceRecordChange,
} from "../types";
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
): {
  created: BigCommerceOrder[];
  updated: BigCommerceOrder[];
} => {
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
export const resolvePollingRecordChanges = (
  data: BigCommerceChangesObject | undefined,
): BigCommerceRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): BigCommerceRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): BigCommerceRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
export const lookBackDateClean = (value: unknown): string => {
  const str = util.types.toString(value).trim();
  if (!str) return "";
  if (!LOOK_BACK_DATE_PATTERN.test(str)) {
    throw new Error("Look-back Date must be in YYYY-MM-DD format.");
  }
  const parts = str.split("-");
  const year = util.types.toNumber(parts[0]);
  const month = util.types.toNumber(parts[1]);
  const day = util.types.toNumber(parts[2]);
  const parsed = new Date(year, month - 1, day);
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    throw new Error(`Look-back Date "${str}" is not a valid calendar date.`);
  }
  if (parsed > new Date()) {
    throw new Error("Look-back Date cannot be a future date.");
  }
  return str;
};
