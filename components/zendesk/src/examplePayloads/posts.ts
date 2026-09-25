import type { Post } from "../types";
import { paginationAttributes } from "./general";
const createPostRaw = {
  post: {
    author_id: 888887,
    content_tag_ids: [6776, 4545],
    featured: true,
    id: 35467,
    title: "Post title",
  },
};
const listPostsRaw = {
  ...paginationAttributes,
  posts: [
    {
      id: 35467,
      title: "How do I open the safe",
    },
  ],
};
export const createPostExamplePayload: {
  data: {
    post: Post;
  };
} = {
  data: createPostRaw,
};
export const deletePostExamplePayload = { data: "" };
export const getPostExamplePayload: {
  data: {
    post: Post;
  };
} = {
  data: createPostRaw,
};
export const listPostsExamplePayload = { data: listPostsRaw };
export const updatePostExamplePayload: {
  data: {
    post: Post;
  };
} = {
  data: createPostRaw,
};
