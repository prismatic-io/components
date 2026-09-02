import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listStatusChangesExamplePayload } from "../../examplePayloads";
import { listStatusChangesInputs } from "../../inputs";
import { listStatusChangesOutputSchema } from "../../outputSchemas";
import type { StatusChange } from "../../types";
import { paginateCursor } from "../../util";
export const listStatusChanges = action({
  display: {
    label: "List Status Changes",
    description:
      "Lists post status changes with optional filtering and cursor-based pagination.",
  },
  inputs: listStatusChangesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listStatusChangesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, boardId, fetchAll, pagination }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateCursor<"items", StatusChange>(
      client.postV2,
      "/status_changes/list",
      "items",
      {
        boardID: boardId,
        cursor: pagination.cursor,
        limit: pagination.limit,
      },
      fetchAll,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listStatusChangesExamplePayload,
  examplePayload: listStatusChangesExamplePayload,
});
