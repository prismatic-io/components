import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { Pages } from "./interfaces";
import type { IntercomRecord } from "./types";

export const cleanTimestamp = (value: unknown): string => {
  
  return util.types.toString(value);
};

export const cleanObject = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const cleanString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

const fetchData = async <T>(
  client: HttpClient,
  url: string,
  params: Record<string, unknown> | undefined = undefined,
): Promise<{
  data: T[];
  pages: Pages;
}> => {
  const {
    data: { data, pages },
  } = await client.get<{
    data: T[];
    pages: Pages;
  }>(url, { params });
  return {
    data,
    pages,
  };
};

export const paginateRecords = async <T>(
  client: HttpClient,
  params: Record<string, unknown> | undefined = undefined,
  fetchAll = false,
  url: string,
): Promise<{
  data: T[];
  pages: Pages | null;
}> => {
  if (!fetchAll) {
    const { data, pages } = await fetchData<T>(client, url, params);
    return {
      data,
      pages,
    };
  }

  let records: T[] = [];
  const per_page = 50;
  const keepFetching = true;
  let starting_after: string | undefined;
  let pagesObject: Pages | null = null;

  while (keepFetching) {
    const {
      data,
      pages,
    }: {
      data: T[];
      pages: Pages;
    } = await fetchData<T>(client, url, {
      per_page,
      starting_after: starting_after,
    });

    records = records.concat(data);
    starting_after = pages.next?.starting_after;
    if (!starting_after) {
      pagesObject = pages;
      break;
    }
  }

  return {
    data: records,
    pages: pagesObject,
  };
};

export const searchContactsSince = async (
  client: HttpClient,
  lastPolledUnix: number,
): Promise<IntercomRecord[]> => {
  const query = {
    operator: "AND",
    value: [{ field: "updated_at", operator: ">", value: lastPolledUnix }],
  };

  const allContacts: IntercomRecord[] = [];
  let startingAfter: string | undefined;
  let hasMore = true;

  while (hasMore) {
    const { data } = await client.post<{
      data: IntercomRecord[];
      pages: Pages;
    }>("/contacts/search", {
      query,
      pagination: {
        per_page: 50,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      },
    });
    allContacts.push(...(data.data ?? []));
    startingAfter = data.pages?.next?.starting_after;
    hasMore = !!startingAfter;
  }

  return allContacts;
};

export const fetchAllCompanies = async (
  client: HttpClient,
): Promise<IntercomRecord[]> => {
  const { data } = await paginateRecords<IntercomRecord>(
    client,
    undefined,
    true,
    "/companies",
  );
  return data;
};

export const filterByUnixTimestamp = (
  records: IntercomRecord[],
  lastPolledUnix: number,
): { created: IntercomRecord[]; updated: IntercomRecord[] } => {
  const created: IntercomRecord[] = [];
  const updated: IntercomRecord[] = [];

  for (const record of records) {
    if (record.created_at > lastPolledUnix) {
      created.push(record);
    } else if (record.updated_at > lastPolledUnix) {
      updated.push(record);
    }
  }

  return { created, updated };
};
