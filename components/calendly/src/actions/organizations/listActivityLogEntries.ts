import { action, outputSchema } from "@prismatic-io/spectral";
import { listActivityLogEntriesOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { listActivityLogEntriesInputs } from "../../inputs";
import { listActivityLogEntriesExamplePayload } from "../../examplePayloads";
import { paginator } from "../../util";
export const listActivityLogEntries = action({
  display: {
    label: "List Activity Log Entries",
    description: "Returns a list of activity log entries.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      organization,
      actionInput,
      actor,
      maxOccurredAt,
      minOccurredAt,
      namespace,
      searchTerm,
      sortList,
    },
  ) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const data = await paginator(client, "/activity_log_entries", {
      organization,
      action: actionInput.length ? actionInput : undefined,
      actor: actor.length ? actor : undefined,
      max_occurred_at: maxOccurredAt,
      min_occurred_at: minOccurredAt,
      namespace: namespace.length ? namespace : undefined,
      search_term: searchTerm,
      sort: sortList.length ? sortList : undefined,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listActivityLogEntriesExamplePayload.data,
  }),
  inputs: listActivityLogEntriesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listActivityLogEntriesOutputSchema,
  }),
  examplePayload: listActivityLogEntriesExamplePayload,
});
