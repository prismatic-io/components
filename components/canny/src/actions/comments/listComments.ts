import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCommentsExamplePayload } from "../../examplePayloads";
import { listCommentsInputs } from "../../inputs";
import { listCommentsOutputSchema } from "../../outputSchemas";
import { paginateCursor } from "../../util";
export const listComments = action({
  display: {
    label: "List Comments",
    description:
      "Lists comments with optional filtering and cursor-based pagination.",
  },
  inputs: listCommentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCommentsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      boardId,
      postIdOptional,
      authorId,
      companyId,
      fetchAll,
      pagination,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateCursor(
      client.postV2,
      "/comments/list",
      "items",
      {
        boardID: boardId,
        postID: postIdOptional,
        authorID: authorId,
        companyID: companyId,
        cursor: pagination.cursor,
        limit: pagination.limit,
      },
      fetchAll,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listCommentsExamplePayload,
  examplePayload: listCommentsExamplePayload,
});
