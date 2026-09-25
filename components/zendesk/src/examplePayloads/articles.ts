import { paginationAttributes } from "./general";
export const listArticlesRaw = {
  ...paginationAttributes,
  articles: [
    {
      id: 28523513715859,
      url: "https://sampleSubdomain.zendesk.com/api/v2/help_center/en-us/articles/28523513715859.json",
      html_url:
        "https://sampleSubdomain.zendesk.com/hc/en-us/articles/28523513715859-Acme-Testing",
      author_id: 28226296456851,
      comments_disabled: false,
      draft: true,
      promoted: false,
      position: 0,
      vote_sum: 0,
      vote_count: 0,
      section_id: 28523491991699,
      created_at: "2024-04-17T17:18:10Z",
      updated_at: "2024-04-17T17:18:10Z",
      title: "Acme Testing",
      source_locale: "en-us",
      locale: "en-us",
      outdated: false,
      outdated_locales: [],
      edited_at: "2024-04-17T17:18:10Z",
      user_segment_id: 28523370353171,
      permission_group_id: 28523398501139,
      content_tag_ids: [],
      label_names: [],
      body: "<p>testing knowledge base</p>",
    },
  ],
};
const getArticleRaw = { article: listArticlesRaw.articles[0] };
const createArticleRaw = {
  article: {
    author_id: 3465,
    comments_disabled: true,
    content_tag_ids: ["01GT23D51Y", "01GT23FWWN"],
    id: 37486578,
    locale: "en_us",
    permission_group_id: 123,
    position: 42,
    promoted: false,
    title: "Article title",
    user_segment_id: 12,
  },
};
const updateArticleRaw = {
  article: {
    author_id: 3465,
    comments_disabled: true,
    content_tag_ids: ["01GT23D51Y", "01GT23FWWN"],
    id: 37486578,
    locale: "en_us",
    permission_group_id: 123,
    position: 42,
    promoted: false,
    title: "Article title",
    user_segment_id: 12,
  },
};
const associateAttachmentsInBulkToArticleRaw = "";
export const associateAttachmentsInBulkToArticleExamplePayload = {
  data: associateAttachmentsInBulkToArticleRaw,
};
export const createArticleExamplePayload = { data: createArticleRaw };
export const listArticlesExamplePayload = { data: listArticlesRaw };
export const showArticleExamplePayload = { data: getArticleRaw };
export const updateArticleExamplePayload = { data: updateArticleRaw };
