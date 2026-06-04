import { LIMIT_MAX } from "../constants";
import type { CreateApiPaginationResponse, FetchAllWithPaginationProps } from "../types";

export const fetchAllWithPagination = async <
  TResponse extends CreateApiPaginationResponse<unknown>,
>({
  client,
  configVars,
  endpoint,
}: FetchAllWithPaginationProps) => {
  const paginatedData: TResponse["data"] = [];
  let cursor = null;
  let uri = endpoint;

  do {
    const { data }: { data: TResponse } = await client.get<TResponse>(
      endpoint,
      {
        params: {
          ...configVars,
          limit: LIMIT_MAX,
          cursor,
        },
        paramsSerializer: { indexes: null },
      },
    );

    cursor = data.meta.next_cursor;
    uri = data.uri;

    paginatedData.push(...data.data);
  } while (cursor);

  return {
    data: {
      data: paginatedData,
      object: "list",
      uri,
      meta: {
        prev_cursor: null,
        next_cursor: null,
      },
    },
  };
};
