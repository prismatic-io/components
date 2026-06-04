import { PAGINATION_MAX_OFFSET, PAGINATION_MAX_PAGE_SIZE } from "../constants";
import type { FetchAllWithPaginationProps, PaginatedParams } from "../types";



export const fetchAllWithPagination = async ({
  client,
  configVars,
  endpoint,
  objectKey,
}: FetchAllWithPaginationProps) => {
  
  delete configVars.limit;
  delete configVars.offset;

  let collectedData: unknown[] = [];
  let currentOffset = 0;
  let more = false;
  let pageParams: PaginatedParams = {
    limit: PAGINATION_MAX_PAGE_SIZE,
    offset: currentOffset,
    ...configVars,
  };

  do {
    const { data } = await client.get(endpoint, { params: pageParams });
    collectedData = collectedData.concat(data[objectKey]);
    more = data?.more || false;
    currentOffset = currentOffset + PAGINATION_MAX_PAGE_SIZE;
    pageParams = {
      limit: PAGINATION_MAX_PAGE_SIZE,
      offset: currentOffset,
      ...configVars,
    };

    
    
  } while (more && currentOffset <= PAGINATION_MAX_OFFSET);

  return {
    [objectKey]: collectedData,
  };
};
