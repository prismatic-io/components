import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTagsExamplePayload } from "../../examplePayloads";
import { listTagsInputs } from "../../inputs";
import { listTagsOutputSchema } from "../../outputSchemas";
import { paginateOffset } from "../../util";
export const listTags = action({
  display: {
    label: "List Tags",
    description: "Lists tags with optional board filter and pagination.",
  },
  inputs: listTagsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTagsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, boardId, fetchAll, pagination }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateOffset(
      client.post,
      "/tags/list",
      "tags",
      { boardID: boardId, limit: pagination.limit, skip: pagination.skip },
      fetchAll,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listTagsExamplePayload,
  examplePayload: listTagsExamplePayload,
});
