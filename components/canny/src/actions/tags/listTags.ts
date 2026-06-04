import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTagsExamplePayload } from "../../examplePayloads";
import { listTagsInputs } from "../../inputs";
import { paginateOffset } from "../../util";

export const listTags = action({
  display: {
    label: "List Tags",
    description: "Lists tags with optional board filter and pagination.",
  },
  inputs: listTagsInputs,
  perform: async (context, { connection, boardId, fetchAll, limit, skip }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateOffset(
      client.post,
      "/tags/list",
      "tags",
      { boardID: boardId, limit, skip },
      fetchAll,
    );
    return { data };
  },
  examplePayload: listTagsExamplePayload,
});
