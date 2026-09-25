import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { listPostsExamplePayload } from "../../examplePayloads";
import { listPostsInputs } from "../../inputs";
import { listPostsOutputSchema } from "../../outputSchemas";
import type { PaginatedResponse, Post } from "../../types";
import { paginateResults } from "../../util";
export const listPosts = action({
  display: {
    label: "List Posts",
    description: "List all posts in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { zendeskConnection, topicId, sortBy, filterBy, pagination, fetchAll },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const url = topicId
      ? `/community/topics/${topicId}/posts`
      : "/community/posts";
    if (fetchAll) {
      const posts: Post[] = [];
      return {
        data: {
          posts: await paginateResults<Post>(
            client,
            url,
            posts,
            "posts",
            pagination.pageLimit,
          ),
        },
      };
    }
    const params = {
      "page[size]": pagination.pageLimit,
      "page[after]": pagination.cursor,
      sort_by: sortBy,
      filter_by: filterBy,
    };
    const { data } = await client.get<
      | PaginatedResponse<{
          posts: Post[];
        }>
      | {
          posts: Post[];
        }
    >(url, {
      params,
    });
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { fetchAll },
  ): Promise<{
    data: unknown;
  }> =>
    fetchAll
      ? { data: { posts: listPostsExamplePayload.data.posts } }
      : { data: listPostsExamplePayload.data },
  inputs: listPostsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPostsOutputSchema,
  }),
  examplePayload: listPostsExamplePayload,
});
