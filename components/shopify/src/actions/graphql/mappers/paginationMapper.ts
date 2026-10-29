import type { PageInfo } from "../../../types";

export const paginationMapper = (pageInfo: PageInfo) => {
  return {
    pagination: pageInfo.hasNextPage
      ? {
          next: {
            page_info: pageInfo.endCursor,
            rel: "next",
          },
        }
      : null,

    pageInfo: pageInfo.hasNextPage ? pageInfo.endCursor : null,
    rel: pageInfo.hasNextPage ? 'rel="next"' : null,
  };
};
