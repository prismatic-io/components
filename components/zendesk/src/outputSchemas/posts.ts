import {
  cursorLinksSchema,
  cursorMetaSchema,
  offsetPaginationProperties,
} from "./pagination";
export const postSchema = {
  type: "object" as const,
  properties: {
    author_id: { type: "integer" },
    closed: { type: "boolean" },
    comment_count: { type: "integer" },
    content_tag_ids: { type: "array", items: { type: "integer" } },
    created_at: { type: "string", format: "date-time" },
    details: { type: "string" },
    featured: { type: "boolean" },
    follower_count: { type: "integer" },
    html_url: { type: "string" },
    id: { type: "integer" },
    non_author_editor_id: { type: "integer" },
    non_author_updated_at: { type: "string", format: "date-time" },
    pinned: { type: "boolean" },
    status: { type: "string" },
    title: { type: "string" },
    topic_id: { type: "integer" },
    updated_at: { type: "string", format: "date-time" },
    url: { type: "string" },
    vote_count: { type: "integer" },
    vote_sum: { type: "integer" },
  },
  required: ["title"],
};
export const createPostOutputSchema = {
  type: "object" as const,
  properties: { post: postSchema },
  required: ["post"],
};
export const deletePostOutputSchema = { type: "string" as const };
export const getPostOutputSchema = {
  type: "object" as const,
  properties: { post: postSchema },
  required: ["post"],
};
export const listPostsOutputSchema = {
  type: "object" as const,
  properties: {
    posts: { type: "array", items: postSchema },
    meta: cursorMetaSchema,
    links: cursorLinksSchema,
    ...offsetPaginationProperties,
  },
  required: ["posts"],
};
export const updatePostOutputSchema = {
  type: "object" as const,
  properties: { post: postSchema },
  required: ["post"],
};
