import type { getSageClient } from "./client";
import type { SageRecord } from "./types";

export const fetchAllSince = async (
  client: ReturnType<typeof getSageClient>,
  endpoint: string,
  updatedSince: string,
): Promise<SageRecord[]> => {
  const allRecords: SageRecord[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { data } = await client.get(endpoint, {
      params: {
        updated_or_created_since: updatedSince,
        items_per_page: 200,
        page,
      },
    });
    const items = (data?.$items ?? data ?? []) as SageRecord[];
    if (Array.isArray(items)) {
      allRecords.push(...items);
      hasMore = items.length >= 200;
    } else {
      hasMore = false;
    }
    page++;
  }

  return allRecords;
};
