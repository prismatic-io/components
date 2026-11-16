import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { DELTA_PREFER_HEADER } from "../../constants";
import { listChangesExamplePayload } from "../../examplePayloads";
import { listChangesInputs } from "../../inputs";
import { paginateResults, resolveQueryParameters } from "../../util";
import { listChangesOutputSchema } from "../../outputSchemas";

export const listChanges = action({
  display: {
    label: "List Changes",
    description: "Track changes in a driveItem and its children over time.",
  },
  inputs: listChangesInputs,
  performSafety: "notAllowed",
  perform: async ({ debug: { enabled: debug } }, { connection, deltaURL, fetchAll, ...query }) => {
    const client = await createClient(connection, debug);

    if (fetchAll) {
      const results = await paginateResults(client, deltaURL, {
        returnFullData: true,
        useTop: false,
        excludeParents: true,
      });

      return { data: results };
    }

    const { $expand, $select, $top } = resolveQueryParameters(query);
    const { data } = await client.get(deltaURL, {
      params: {
        $expand: $expand || undefined,
        $select: $select || undefined,
        $top: $top || undefined,
      },
      headers: {
        Prefer: DELTA_PREFER_HEADER,
      },
    });
    return { data };
  },
  examplePerform: async () => listChangesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listChangesOutputSchema,
  }),
  examplePayload: listChangesExamplePayload,
});
