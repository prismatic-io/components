import { util } from "@prismatic-io/spectral";
import { DEFAULT_PAGE_SIZE, FETCH_ALL_PAGE_SIZE } from "../constants";
import type { Pagination } from "../types";
import { json2Path } from "./paths";
export const getFilters = (
  params: Record<string, unknown>,
): Array<Array<unknown>> => {
  const filters: Array<Array<unknown>> = [];
  if (params.nameSearch) {
    filters.push(["name", "ilike", params.nameSearch]);
  }
  if (params.modelSearch) {
    filters.push(["model", "ilike", params.modelSearch]);
  }
  return filters;
};
export const paginateSearch = async <T>({
  client,
  model,
  params,
  fetchAll,
  filter,
  fields,
}: Pagination): Promise<T[]> => {
  const limit = util.types.toNumber(params.limit) || DEFAULT_PAGE_SIZE;
  const records: T[] = [];
  let offset = util.types.toNumber(params.offset) || 0;
  let keepFetching = true;
  if (fetchAll) {
    do {
      const { data } = await client.post<T[]>(json2Path(model, "search_read"), {
        domain: filter ?? [],
        fields: fields ?? null,
        limit: FETCH_ALL_PAGE_SIZE,
        offset,
      });
      offset += FETCH_ALL_PAGE_SIZE;
      if (data.length < FETCH_ALL_PAGE_SIZE) {
        keepFetching = false;
      }
      records.push(...data);
    } while (keepFetching);
  } else {
    const { data } = await client.post<T[]>(json2Path(model, "search_read"), {
      domain: filter ?? [],
      fields: fields ?? null,
      limit,
      offset,
    });
    records.push(...data);
  }
  return records;
};
