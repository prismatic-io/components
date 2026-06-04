import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listStatusChangesExamplePayload } from "../../examplePayloads";
import { listStatusChangesInputs } from "../../inputs";
import { paginateCursor } from "../../util";

export const listStatusChanges = action({
  display: {
    label: "List Status Changes",
    description:
      "Lists post status changes with optional filtering and cursor-based pagination.",
  },
  inputs: listStatusChangesInputs,
  perform: async (
    context,
    { connection, boardId, fetchAll, cursor, limit },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateCursor(
      client.postV2,
      "/status_changes/list",
      "items",
      { boardID: boardId, cursor, limit },
      fetchAll,
    );
    return { data };
  },
  examplePayload: listStatusChangesExamplePayload,
});
