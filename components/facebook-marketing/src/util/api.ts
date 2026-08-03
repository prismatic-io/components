import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
export const getPaginatedData = async (
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  params: Record<string, unknown>,
) => {
  if (fetchAll) {
    params.limit = undefined;
    params.before = undefined;
    params.after = undefined;
  }
  const response = await client.get(url, {
    params,
  });
  if (!fetchAll) {
    return response;
  }
  const allData: Record<string, unknown>[] = response.data.data;
  let next = response.data.paging?.next;
  while (next) {
    const { data } = await client.get(next);
    allData.push(...data.data);
    next = data.paging?.next;
  }
  return {
    data: {
      data: allData,
      paging: {},
    },
  };
};
