import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { ARENA_MAX_PAGE_SIZE } from "../constants";
import type { ArenaListResponse } from "../types";
export const fetchArenaList = async <T>(
  client: HttpClient,
  endpoint: string,
  params: Record<string, unknown>,
  fetchAll = false,
): Promise<ArenaListResponse<T>> => {
  if (!fetchAll) {
    const { data } = await client.get<ArenaListResponse<T>>(endpoint, {
      params,
    });
    return data;
  }
  const results: T[] = [];
  let offset = Number(params.offset) || 0;
  while (true) {
    const { data } = await client.get<ArenaListResponse<T>>(endpoint, {
      params: { ...params, limit: ARENA_MAX_PAGE_SIZE, offset },
    });
    const page = data?.results ?? [];
    results.push(...page);
    if (page.length < ARENA_MAX_PAGE_SIZE) {
      break;
    }
    offset += ARENA_MAX_PAGE_SIZE;
  }
  return { results, count: results.length };
};
