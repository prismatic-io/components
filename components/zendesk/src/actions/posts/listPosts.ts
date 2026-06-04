import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  postFilterBy,
  sortBy,
  topicId,
  cursor,
  pageLimit,
  fetchAll,
} from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { PaginatedResponse, Post } from "../../types";
import { postSortByOptions } from "../../constants";
import { listPostsPayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listPosts = action({
  display: {
    label: "List Posts",
    description: "List all posts in the Help Center.",
  },
  perform: async (
    context,
    {
      zendeskConnection,
      topicId,
      sortBy,
      filterBy,
      cursor,
      pageLimit,
      fetchAll,
    },
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
            pageLimit || undefined,
          ),
        },
      };
    }

    const params = {
      "page[size]": pageLimit || undefined,
      "page[after]": cursor || undefined,
      sort_by: sortBy,
      filter_by: filterBy,
    };

    const { data } = await client.get<
      PaginatedResponse<{ posts: Post[] }> | { posts: Post[] }
    >(url, {
      params,
    });

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    filterBy: postFilterBy,
    cursor,
    pageLimit,
    topicId: {
      ...topicId,
      required: false,
    },
    sortBy: {
      ...sortBy,
      model: postSortByOptions,
    },
    fetchAll,
  },
  examplePayload: {
    data: listPostsPayload,
  },
});
