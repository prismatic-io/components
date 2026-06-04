import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listEntriesExamplePayload } from "../../examplePayloads";
import { listEntriesInputs } from "../../inputs";
import { paginateOffset } from "../../util";

export const listEntries = action({
  display: {
    label: "List Changelog Entries",
    description: "Lists changelog entries with optional filtering.",
  },
  inputs: listEntriesInputs,
  perform: async (
    context,
    { connection, entryType, entrySort, fetchAll, limit, skip },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateOffset(
      client.post,
      "/entries/list",
      "entries",
      { type: entryType, sort: entrySort, limit, skip },
      fetchAll,
    );
    return { data };
  },
  examplePayload: listEntriesExamplePayload,
});
