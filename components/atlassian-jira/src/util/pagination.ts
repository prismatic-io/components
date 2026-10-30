import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { PaginatedResponse } from "../types";

export const getPaginatedData = async <T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  isBasicAuth = false,
) => {
  const response: { data: PaginatedResponse<T> } = await client.get(url);

  if (!fetchAll || isBasicAuth) return response;

  let isLast = response.data.isLast;
  let startAt = response.data.startAt;
  const total = response.data.total;
  const allData = [...response.data.values];
  const maxResults = response.data.maxResults;
  const totalPages = Math.ceil(total / maxResults);
  let currentPage = 1;

  while (!isLast && currentPage < totalPages) {
    startAt += maxResults;
    currentPage += 1;

    const { data: newData } = await client.get(url, {
      params: { maxResults, startAt },
    });

    allData.push(...newData.values);
    isLast = newData.isLast;
  }

  return {
    data: {
      ...response.data,
      values: allData,
    },
  };
};
