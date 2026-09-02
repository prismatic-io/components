import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listVotesExamplePayload } from "../../examplePayloads";
import { listVotesInputs } from "../../inputs";
import { listVotesOutputSchema } from "../../outputSchemas";
import { paginateCursor } from "../../util";
export const listVotes = action({
  display: {
    label: "List Votes",
    description:
      "Lists votes with optional filtering and cursor-based pagination (v2).",
  },
  inputs: listVotesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listVotesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      boardId,
      postIdOptional,
      companyId,
      userIdOptional,
      fetchAll,
      pagination,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateCursor(
      client.postV2,
      "/votes/list",
      "items",
      {
        boardID: boardId,
        postID: postIdOptional,
        companyID: companyId,
        userID: userIdOptional,
        cursor: pagination.cursor,
        limit: pagination.limit,
      },
      fetchAll,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listVotesExamplePayload,
  examplePayload: listVotesExamplePayload,
});
