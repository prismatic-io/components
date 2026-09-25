import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { rawHttpClient } from "../auth";
import { selectPostExamplePayload } from "../examplePayloads";
import { selectPostInputs } from "../inputs";
import type { Post } from "../types";
import { byElementLabel, paginateResults } from "../util";
export const selectPost = dataSource({
  display: {
    label: "Select Post",
    description: "Select a post from the Zendesk Help Center.",
  },
  perform: async (_context, { zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as Post[];
    const paginatedResults = await paginateResults<Post>(
      client,
      "/community/posts",
      results,
      "posts",
    );
    return {
      result: paginatedResults
        .map<Element>((post) => ({
          label: post.title,
          key: util.types.toString(post.id),
        }))
        .sort(byElementLabel),
    };
  },
  inputs: selectPostInputs,
  dataSourceType: "picklist",
  examplePayload: selectPostExamplePayload,
});
