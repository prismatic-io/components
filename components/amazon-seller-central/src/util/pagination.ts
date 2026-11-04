import type { createClient as createHttpClient } from "@prismatic-io/spectral/http";

export const paginateResults = async <T>(
  client: ReturnType<typeof createHttpClient>,
  url: string,
  params: Record<string, unknown>,
  resultArrayKey: string,
  fetchAll = false,
): Promise<T[]> => {
  const results: T[] = [];
  let nextToken: string | undefined;

  do {
    type Page = { NextToken?: string; [key: string]: unknown };
    const { data } = await client.get<Page & { payload?: Page }>(url, {
      params: {
        ...params,
        NextToken: nextToken,
      },
    });

    const body = data.payload ?? data;

    const pageResults = body[resultArrayKey] as T[] | undefined;
    if (pageResults && Array.isArray(pageResults)) {
      results.push(...pageResults);
    }

    nextToken = body.NextToken;

    if (!fetchAll) {
      break;
    }
  } while (nextToken);

  return results;
};
