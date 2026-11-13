import type { HttpClient } from "@prismatic-io/spectral/http";
import type { PaginatedResponse } from "../types";

export const fetchAllData = async <T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  params: Record<string, unknown> = {},
): Promise<PaginatedResponse<T>> => {
  const results: T[] = [];
  let nextLink: string | undefined;
  let firstResponse: PaginatedResponse<T> | undefined;

  do {
    const { data } = await client.get<PaginatedResponse<T>>(
      nextLink || url,
      nextLink
        ? undefined
        : {
            params: fetchAll
              ? Object.fromEntries(
                  Object.entries(params).filter(([key]) => !["$top", "$skip"].includes(key)),
                )
              : params,
          },
    );

    if (!firstResponse) {
      firstResponse = data;
    }

    results.push(...data.value);
    nextLink = data["@odata.nextLink"];

    if (!fetchAll) {
      break;
    }
  } while (nextLink);

  if (!firstResponse) {
    throw new Error("No response received from the API");
  }

  const response = {
    "@odata.context": firstResponse["@odata.context"],
    value: results,
  };

  if (fetchAll) {
    return response;
  }

  if (firstResponse["@odata.nextLink"]) {
    return {
      ...response,
      "@odata.nextLink": firstResponse["@odata.nextLink"],
    };
  }

  return response;
};
