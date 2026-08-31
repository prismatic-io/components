import { DEFAULT_PAGINATION_LIMIT } from "../constants";
import type {
  ClassResource,
  ExtendedResponse,
  PaginatedRecord,
  StripeResource,
} from "../types";
export const paginateStripeRecords = async (
  client: ClassResource,
  fetchAll: boolean,
  params: Record<string, unknown>,
): Promise<PaginatedRecord> => {
  if (fetchAll) {
    params.limit = DEFAULT_PAGINATION_LIMIT;
    let records: StripeResource[] = [];
    let keepFetching = true;
    let lastResponse: ExtendedResponse;
    do {
      const { data, has_more, ...rest } = await client.list(params);
      records = [...records, ...data];
      keepFetching = has_more && data.length > 0;
      if (keepFetching) {
        params.starting_after = data[data.length - 1].id;
      }
      lastResponse = rest;
    } while (keepFetching);
    return {
      data: records,
      has_more: false,
      ...lastResponse,
    };
  }
  const response = await client.list(params);
  return response;
};
