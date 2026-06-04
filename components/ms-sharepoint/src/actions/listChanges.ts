import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, $select, $expand, $top, deltaURL, fetchAll } from "../inputs";
import { paginateResults } from "../utils";
import { listChangesExamplePayload } from "../examplePayloads/actions";

export const listChanges = action({
  display: {
    label: "List Changes",
    description: "Track changes in a driveItem and its children over time.",
  },
  inputs: {
    connection,
    deltaURL,
    $select,
    $expand,
    $top,
    fetchAll,
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, deltaURL, $expand, $select, $top, fetchAll },
  ) => {
    const client = await createClient(connection, debug);

    if (fetchAll) {
      const results = await paginateResults(client, deltaURL, true, false, true);

      return { data: results };
    }

    const { data } = await client.get(deltaURL, {
      params: {
        $expand: $expand || undefined,
        $select: $select || undefined,
        $top: $top || undefined,
      },
      headers: {
        Prefer: "deltaExcludeParent",
      },
    });
    return { data };
  },
  examplePayload: listChangesExamplePayload,
});
