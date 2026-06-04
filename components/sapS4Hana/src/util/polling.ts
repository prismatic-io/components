import type { getSapClient } from "../client";
import type { SapRecord } from "../types";

export const toSapDateTime = (isoString: string): string => {
  const d = new Date(isoString);
  return `datetime'${d.toISOString().replace("Z", "").split(".")[0]}'`;
};

export const fetchAllRecords = async (
  client: ReturnType<typeof getSapClient>,
  endpoint: string,
  filter: string,
): Promise<SapRecord[]> => {
  const allRecords: SapRecord[] = [];
  const pageSize = 500;
  let skip = 0;
  let hasMore = true;

  while (hasMore) {
    const url = `${endpoint}?$filter=${filter}&$top=${pageSize}&$skip=${skip}&$format=json`;
    const { data } = await client.get(url, {
      headers: { Accept: "application/json" },
    });

    const results = (data?.d?.results ?? []) as SapRecord[];
    allRecords.push(...results);

    hasMore = results.length >= pageSize;
    skip += pageSize;
  }

  return allRecords;
};
