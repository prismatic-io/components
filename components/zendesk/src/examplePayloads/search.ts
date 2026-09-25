import { listArticlesRaw } from "./articles";
const unifiedSearchRaw = {
  links: {
    first: "https://example.zendesk.com/api/v2/guide/search?page[size]=100",
    last: "https://example.zendesk.com/api/v2/guide/search?page[size]=100&page[after]=lastPageCursorExample",
    prev: "https://example.zendesk.com/api/v2/guide/search?page[size]=100&page[before]=prevPageCursorExample",
    next: "https://example.zendesk.com/api/v2/guide/search?page[size]=100&page[after]=nextPageCursorExample",
  },
  meta: {
    after_cursor: "WzEuMCwxNjld",
    before_cursor: "WzEuMCwxNjhd",
    has_more: true,
  },
  results: [
    {
      title: "How to make fish stew",
      type: "ARTICLE",
      updated_at: "2021-10-11T15:02:22Z",
      url: "http://example.zendesk.com/hc/en-us/articles/38393937-How-to-make-fish-stew",
    },
    {
      title: "Latest updates on fish stew",
      type: "EXTERNAL_RECORD",
      updated_at: "2021-11-12T15:02:22Z",
      url: "http://example.com/blog/fish-stew-latest",
    },
  ],
};
const searchArticlesRaw = {
  results: [listArticlesRaw.articles[0]],
  count: 1,
  page: 1,
  page_count: 1,
  per_page: 25,
};
const searchPostsRaw = {
  results: [
    {
      id: 35467,
      title: "How do I open the safe",
      details: "I need to access the safe in the lobby.",
      author_id: 888887,
      topic_id: 10,
      pinned: false,
      featured: false,
      closed: false,
      status: "none",
      created_at: "2024-04-17T17:18:10Z",
      updated_at: "2024-04-17T17:18:10Z",
      url: "https://example.zendesk.com/api/v2/community/posts/35467.json",
      html_url: "https://example.zendesk.com/hc/en-us/community/posts/35467",
      vote_sum: 4,
      vote_count: 5,
      comment_count: 2,
      follower_count: 3,
    },
  ],
  count: 1,
};
export const searchArticlesExamplePayload = {
  data: searchArticlesRaw as unknown,
};
export const searchPostsExamplePayload = { data: searchPostsRaw as unknown };
export const unifiedSearchExamplePayload = {
  data: unifiedSearchRaw as unknown,
};
