import type { content_v2_1 } from "googleapis";
import type { FetchAllProductsOptions } from "../interfaces";

export const fetchAllProducts = async ({
  client,
  fetchAll,
  params,
}: FetchAllProductsOptions) => {
  let nextPageToken: string | null | undefined;
  let responseStructure: content_v2_1.Schema$ProductsListResponse = {};

  if (params && Object.keys(params).length > 0 && fetchAll) {
    delete params.pageToken;
    delete params.maxResults;
  }

  do {
    const { data } = await client.products.list(params);
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
