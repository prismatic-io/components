import { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { TResponse } from "./interfaces/TResponse";

export const paginateResults = async <T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean = false,
  params: Record<string, unknown> | undefined = undefined
): Promise<{
  value: T[];
  "@odata.context"?: string;
  "@odata.nextLink"?: string;
}> => {
  let firstResponse: TResponse<T> | undefined;
  if (!fetchAll) {
    const {
      data: { value },
    } = await client.get<TResponse<T>>(url, {
      params,
    });

    return { value };
  }

  const results: T[] = [];
  let nextLink = url;
  do {
    const { data } = await client.get<TResponse<T>>(nextLink, {
      params,
    });
    results.push(...data.value);
    nextLink = data["@odata.nextLink"];

    if (!firstResponse) {
      firstResponse = data;
    }
  } while (nextLink);

  if (firstResponse["odata.context"]) {
    return {
      "@odata.nextLink": firstResponse["@odata.nextLink"] || undefined,
      "@odata.context": firstResponse["@odata.context"],
      value: results,
    };
  }

  return { value: results };
};
