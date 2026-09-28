import type { Connection } from "@prismatic-io/spectral";
import { getClient } from "../client";
import {
  MAX_POLL_PAGES,
  POLL_PAGE_SIZE,
  POLL_RESOURCE_CONFIG,
  type PollResourceType,
} from "../constants";
import type { MagentoRecord } from "../types";
import { toMagentoDateTime } from "./dates";
export const fetchMagentoRecordsSince = async (
  connection: Connection,
  resourceType: string,
  lastPolledAt: string,
  debug: boolean,
): Promise<{
  records: MagentoRecord[];
  truncated: boolean;
}> => {
  const config = POLL_RESOURCE_CONFIG[resourceType as PollResourceType];
  if (!config) {
    throw new Error(`Unsupported resource type: ${resourceType}`);
  }
  const client = await getClient(connection, debug);
  const magentoDateTime = toMagentoDateTime(lastPolledAt);
  const records: MagentoRecord[] = [];
  for (let page = 1; page <= MAX_POLL_PAGES; page++) {
    const params = {
      "searchCriteria[filterGroups][0][filters][0][field]": "updated_at",
      "searchCriteria[filterGroups][0][filters][0][conditionType]": "gteq",
      "searchCriteria[filterGroups][0][filters][0][value]": magentoDateTime,
      "searchCriteria[sortOrders][0][field]": "updated_at",
      "searchCriteria[sortOrders][0][direction]": "ASC",
      "searchCriteria[pageSize]": String(POLL_PAGE_SIZE),
      "searchCriteria[currentPage]": String(page),
    };
    const { data } = await client.get(config.endpoint, { params });
    const items: MagentoRecord[] = Array.isArray(data?.items) ? data.items : [];
    records.push(...items);
    if (items.length < POLL_PAGE_SIZE) {
      return { records, truncated: false };
    }
  }
  return { records, truncated: true };
};
