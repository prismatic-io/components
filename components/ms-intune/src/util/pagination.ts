import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
export const paginateResults = async (
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  params: Record<string, unknown> | undefined = undefined,
) => {
  if (fetchAll) {
    const results = [];
    let nextLink = url;
    let lastResponse = null;
    let firstRequest = true;
    let paramsToSend = params;
    do {
      if (
        firstRequest &&
        paramsToSend &&
        Object.keys(paramsToSend || {})?.length > 0
      ) {
        const { $top, $skip, $skipToken, ...rest } = paramsToSend;
        paramsToSend = rest;
        firstRequest = false;
      } else {
        paramsToSend = undefined;
      }
      const { data } = await client.get(nextLink, {
        params: paramsToSend,
      });
      const { value, ...rest } = data;
      lastResponse = rest;
      results.push(...value);
      nextLink = data["@odata.nextLink"];
    } while (nextLink);
    return {
      value: results,
      ...lastResponse,
    };
  }
  const { data } = await client.get(url, {
    params,
  });
  return data;
};
