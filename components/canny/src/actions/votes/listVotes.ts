import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listVotesExamplePayload } from "../../examplePayloads";
import { listVotesInputs } from "../../inputs";
import { paginateCursor } from "../../util";

export const listVotes = action({
  display: {
    label: "List Votes",
    description:
      "Lists votes with optional filtering and cursor-based pagination (v2).",
  },
  inputs: listVotesInputs,
  perform: async (
    context,
    {
      connection,
      boardId,
      postIdOptional,
      companyId,
      userIdOptional,
      fetchAll,
      cursor,
      limit,
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
        cursor,
        limit,
      },
      fetchAll,
    );
    return { data };
  },
  examplePayload: listVotesExamplePayload,
});
