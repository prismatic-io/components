import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCommentsExamplePayload } from "../../examplePayloads";
import { listCommentsInputs } from "../../inputs";
import { paginateCursor } from "../../util";

export const listComments = action({
  display: {
    label: "List Comments",
    description:
      "Lists comments with optional filtering and cursor-based pagination.",
  },
  inputs: listCommentsInputs,
  perform: async (
    context,
    {
      connection,
      boardId,
      postIdOptional,
      authorId,
      companyId,
      fetchAll,
      cursor,
      limit,
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
        cursor,
        limit,
      },
      fetchAll,
    );
    return { data };
  },
  examplePayload: listCommentsExamplePayload,
});
