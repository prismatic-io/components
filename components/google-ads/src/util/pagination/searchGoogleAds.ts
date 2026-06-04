import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type {
  GoogleAdsSearchResponse,
  SearchGoogleAdsOptions,
} from "../../types";




export async function searchGoogleAds<T>(
  client: HttpClient,
  options: SearchGoogleAdsOptions,
): Promise<GoogleAdsSearchResponse<T>> {
  const { customerId, params, fetchAll = false } = options;
  const url = `/customers/${customerId}/googleAds:search`;

  if (fetchAll) {
    options.params.pageToken = undefined;
  }

  const firstRes = await client.post<GoogleAdsSearchResponse<T>>(url, params);

  const firstData = firstRes.data;

  if (!fetchAll || !firstData.nextPageToken) {
    return firstData;
  }

  const accumulated: T[] = [...(firstData.results ?? [])];
  let nextPageToken = firstData.nextPageToken;

  while (nextPageToken) {
    const { data } = await client.post<GoogleAdsSearchResponse<T>>(url, {
      ...options.params,
      pageToken: nextPageToken,
    });

    if (data.results) accumulated.push(...data.results);

    nextPageToken = data.nextPageToken || "";
  }

  return {
    ...firstData,
    results: accumulated,
    nextPageToken: undefined,
  };
}
