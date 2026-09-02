import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listEntriesExamplePayload } from "../../examplePayloads";
import { listEntriesInputs } from "../../inputs";
import { listEntriesOutputSchema } from "../../outputSchemas";
import { paginateOffset } from "../../util";
export const listEntries = action({
  display: {
    label: "List Changelog Entries",
    description: "Lists changelog entries with optional filtering.",
  },
  inputs: listEntriesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listEntriesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, entryType, entrySort, fetchAll, pagination },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateOffset(
      client.post,
      "/entries/list",
      "entries",
      {
        type: entryType,
        sort: entrySort,
        limit: pagination.limit,
        skip: pagination.skip,
      },
      fetchAll,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listEntriesExamplePayload,
  examplePayload: listEntriesExamplePayload,
});
