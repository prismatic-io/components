import type { Client } from "@sendgrid/client";
import { extractMetadata } from "../../util";
import { MAX_PAGE_SIZE } from "../../constants";
import { util } from "@prismatic-io/spectral";
import type { FetchPaginatedDataQueryParams } from "../../types";

export const fetchPaginatedData = async (
  client: Client,
  url: string,
  fetchAll: boolean,
  queryParams: FetchPaginatedDataQueryParams,
) => {
  if (fetchAll) {
    queryParams.page_size = util.types.toString(MAX_PAGE_SIZE);
    queryParams.page_token = undefined;
  }
  const [_response, body] = await client.request({
    method: "GET",
    url,
    qs: queryParams,
  });

  let pagination = extractMetadata(body._metadata);

  if (fetchAll) {
    const arrayKeys = Object.keys(body).filter(
      (key) =>
        key !== "_metadata" && key !== "pagination" && Array.isArray(body[key]),
    );

    while (pagination.nextPageToken) {
      const [_response, nextPageBody] = await client.request({
        method: "GET",
        url,
        qs: {
          page_token: pagination.nextPageToken,
          page_size: util.types.toString(MAX_PAGE_SIZE),
        },
      });

      arrayKeys.forEach((key) => {
        if (nextPageBody[key] && Array.isArray(nextPageBody[key])) {
          body[key].push(...nextPageBody[key]);
        }
      });

      pagination = extractMetadata(nextPageBody._metadata);
    }
  }

  return {
    ...body,
    pagination: {
      nextPageToken: pagination.nextPageToken,
      previousPageToken: pagination.previousPageToken,
      totalCount: pagination.totalCount,
    },
  };
};
