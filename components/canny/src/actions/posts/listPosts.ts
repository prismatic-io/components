import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listPostsExamplePayload } from "../../examplePayloads";
import { listPostsInputs } from "../../inputs";
import { listPostsOutputSchema } from "../../outputSchemas";
import { paginateOffset } from "../../util";
export const listPosts = action({
  display: {
    label: "List Posts",
    description: "Lists posts with optional filtering and pagination.",
  },
  inputs: listPostsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPostsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      boardId,
      authorId,
      companyId,
      tagIDs,
      fetchAll,
      pagination,
      listControls,
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
        limit: pagination.limit,
        skip: pagination.skip,
        search: listControls.search,
        sort: listControls.sort,
        status: listControls.status,
      },
      fetchAll,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listPostsExamplePayload,
  examplePayload: listPostsExamplePayload,
});
