import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { DomoRecord, ResourceConfig } from "../types";

export const fetchAllRecords = async (
  client: HttpClient,
  config: ResourceConfig,
): Promise<DomoRecord[]> => {
  const allRecords: DomoRecord[] = [];
  let offset = 0;

  // biome-ignore lint/correctness/noConstantCondition: pagination loop
  while (true) {
    const { data } = await client.get<DomoRecord[]>(config.endpoint, {
      params: { limit: config.maxPerPage, offset },
      headers: { Accept: "application/json" },
    });

    if (!Array.isArray(data) || data.length === 0) break;

    allRecords.push(...data);

    if (data.length < config.maxPerPage) break;
    offset += data.length;
  }

  return allRecords;
};
