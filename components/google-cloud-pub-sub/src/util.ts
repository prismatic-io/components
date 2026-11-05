import type { GenericListMethod, GoogleListMethod, PaginateResult, SortableByName } from "./types";

export const jsonInputClean = (value: unknown) => {
  if (typeof value === "string") {
    if (value !== null && value.trim() !== "") {
      return JSON.parse(value);
    }
  }
  return undefined;
};

export const valueListInputClean = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value as string[];
  }
  return undefined;
};

export async function paginateAll<
  T,
  TParams extends Record<string, unknown> = Record<string, unknown>,
>(
  listMethod: GenericListMethod<TParams>,
  params: TParams,
  dataKey: string,
  fetchAll: boolean,
): Promise<PaginateResult<T>> {
  const results: T[] = [];
  let pageToken: string | undefined;

  do {
    const requestParams = pageToken ? { ...params, pageToken } : params;
    const response = (await listMethod(requestParams)) as GoogleListMethod;
    const items = response.data[dataKey];

    if (items && Array.isArray(items)) {
      results.push(...items);
    }

    const nextToken = response.data.nextPageToken;
    pageToken = nextToken || undefined;

    if (!fetchAll) {
      break;
    }
  } while (pageToken);

  return {
    nextPageToken: fetchAll ? undefined : pageToken,
    [dataKey]: results,
  };
}

export const sortByName = (a: SortableByName, b: SortableByName): number => {
  if (a.name && b.name) {
    return a.name.localeCompare(b.name);
  }
  return 0;
};
