import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listPostsExamplePayload } from "../../examplePayloads";
import { listPostsInputs } from "../../inputs";
import { paginateOffset } from "../../util";

export const listPosts = action({
  display: {
    label: "List Posts",
    description: "Lists posts with optional filtering and pagination.",
  },
  inputs: listPostsInputs,
  perform: async (
    context,
    {
      connection,
      boardId,
      authorId,
      companyId,
      tagIDs,
      fetchAll,
      limit,
      skip,
      search,
      sort,
      status,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateOffset(
      client.post,
      "/posts/list",
      "posts",
      {
        boardID: boardId,
        authorID: authorId,
        companyID: companyId,
        tagIDs,
        limit,
        skip,
        search,
        sort,
        status,
      },
      fetchAll,
    );
    return { data };
  },
  examplePayload: listPostsExamplePayload,
});
