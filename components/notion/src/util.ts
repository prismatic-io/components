import { type Element, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { HttpMethod } from "./constants";
import type { InlineDSPage } from "./types";

export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const toOptionalNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const cleanObject = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const getPaginatedData = async (
  client: HttpClient,
  method: HttpMethod,
  url: string,
  fetchAll: boolean,
  data?: Record<string, unknown>,
  params?: Record<string, unknown>,
) => {
  const config = {
    method,
    url,
    data,
    params,
  };
  let response = await client(config);

  if (!fetchAll) {
    return response;
  }

  const allResults = response.data.results;

  let nextCursor = response.data.next_cursor;

  while (nextCursor) {
    const nextPageConfig = { ...config };
    if (data) {
      nextPageConfig.data = {
        ...data,
        start_cursor: nextCursor,
      };
    }

    if (params) {
      nextPageConfig.params = {
        ...params,
        start_cursor: nextCursor,
      };
    }

    const nextPageResponse = await client(nextPageConfig);

    allResults.push(...nextPageResponse.data.results);
    nextCursor = nextPageResponse.data.next_cursor;
    response = {
      ...nextPageResponse,
      data: {
        ...nextPageResponse.data,
        results: allResults,
      },
    };
  }

  return response;
};

export const sortArray = (array: Element[]) => {
  return array.sort((a, b) => ((a.label || "") < (b.label || "") ? -1 : 1));
};

export const getPageTitle = (page: InlineDSPage): string => {
  if (!page.properties) return "Untitled";

  
  for (const prop of Object.values(page.properties)) {
    if (prop.type === "title" || prop.id === "title") {
      return prop.title?.[0]?.plain_text || "Untitled";
    }
  }

  return "Untitled";
};
