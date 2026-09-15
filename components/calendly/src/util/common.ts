import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
export const paginator = async (
  client: HttpClient,
  url: string,
  params: Record<string, unknown>,
) => {
  const allData = [];
  do {
    const { data } = await client.get(url, { params });
    if (data.pagination.next_page_token) {
      params.page_token = data.pagination.next_page_token;
    } else {
      params.page_token = undefined;
    }
    if (data.collection) {
      allData.push(...data.collection);
    }
  } while (params.page_token);
  return allData;
};
export const extractUuidFromUri = (uri: string): string => {
  const parts = uri.split("/");
  return parts[parts.length - 1];
};
