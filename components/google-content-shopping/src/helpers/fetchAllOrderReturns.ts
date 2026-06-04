import type { content_v2_1 } from "googleapis";
import type { FetchAllOrderReturnsOptions } from "../interfaces";

export const fetchAllOrderReturns = async ({
  client,
  fetchAll,
  params,
}: FetchAllOrderReturnsOptions) => {
  let nextPageToken: string | null | undefined;
  let responseStructure: content_v2_1.Schema$OrderreturnsListResponse = {};

  if (params && Object.keys(params).length > 0 && fetchAll) {
    delete params.pageToken;
    delete params.maxResults;
  }

  do {
    const { data } = await client.orderreturns.list(params);
    responseStructure = {
      ...data,
      resources: [
        ...(responseStructure.resources || []),
        ...(data.resources || []),
      ],
    };
    nextPageToken = data.nextPageToken;
  } while (nextPageToken && fetchAll);

  delete responseStructure.nextPageToken;

  return {
    data: responseStructure,
  };
};
