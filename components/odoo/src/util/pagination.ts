import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { OdooRecord, Pagination } from "../types";
import { MAX_POLL_PAGES, POLL_PAGE_SIZE } from "../constants";

export const getFilters = (params: Record<string, unknown>) => {
  const filters = [];
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
}: Pagination) => {
  const limit = util.types.toNumber(params.limit) || 100;
  const records: T[] = [];
  let offset = util.types.toNumber(params.offset) || 0;
  let keepFetching = true;
  if (fetchAll) {
    do {
      const { data } = await client.post<T[]>(`/json/2/${model}/search_read`, {
        domain: filter ?? [],
        fields: fields ?? null,
        limit: 1000,
        offset,
      });
      offset += 1000;
      if (data.length < 1000) {
        keepFetching = false;
      }
      records.push(...data);
    } while (keepFetching);
  } else {
    const { data } = await client.post<T[]>(`/json/2/${model}/search_read`, {
      domain: filter ?? [],
      fields: fields ?? null,
      limit,
      offset,
    });
    records.push(...data);
  }
  return records;
};











export const toOdooDate = (iso: string): string =>
  iso
    .replace("T", " ")
    .replace(/\.\d+Z$/, "")
    .replace(/Z$/, "");










export const fetchOdooRecordsSince = async (
  client: HttpClient,
  model: string,
  lastPolledAt: string,
): Promise<{ records: OdooRecord[]; truncated: boolean }> => {
  const domain = [["write_date", ">=", toOdooDate(lastPolledAt)]];
  const records: OdooRecord[] = [];
  for (let page = 0; page < MAX_POLL_PAGES; page++) {
    const { data: batch } = await client.post<OdooRecord[]>(
      `/json/2/${model}/search_read`,
      {
        domain,
        fields: [],
        limit: POLL_PAGE_SIZE,
        offset: page * POLL_PAGE_SIZE,
        order: "write_date desc",
      },
    );
    records.push(...batch);
    if (batch.length < POLL_PAGE_SIZE) {
      return { records, truncated: false };
    }
  }
  return { records, truncated: true };
};
