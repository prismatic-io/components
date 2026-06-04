import { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { TResponse } from "./interfaces/TResponse";
import { util } from "@prismatic-io/spectral";

export const paginateResults = async <T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  params?: Record<string, any>
): Promise<T[]> => {
  const results: T[] = [];
  if (!fetchAll) {
    const { data } = await client.get<TResponse<T>>(url, {
      params,
    });
    results.push(...(data as unknown as T[]));
    return results;
  }

  let page = 1;
  let per_page = 100;
  let link = "";

  do {
    const { data, headers } = await client.get<TResponse<T>>(url, {
      params: { per_page, page, ...params },
    });
    results.push(...(data as unknown as T[]));
    link = headers["link"];
    page += 1;
  } while (link && link.includes('rel="next"'));

  return results;
};

export const sortBy =
  <T>(key: keyof T) =>
  (a: T, b: T) => {
    return a[key] < b[key] ? -1 : 1;
  };

export const cleanString = (value: unknown) =>
  util.types.toString(value) || undefined;
