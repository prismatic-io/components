import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import {
  connection,
  organization,
  action as actionInput,
  actor,
  maxOccurredAt,
  minOccurredAt,
  namespace,
  searchTerm,
  sortList,
} from "../../inputs";
import { listActivityLogEntriesExamplePayload } from "../../examplePayloads";
import { paginator } from "../../util";

export const listActivityLogEntries = action({
  display: {
    label: "List Activity Log Entries",
    description: "Returns a list of activity log entries.",
  },
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
      max_occurred_at: maxOccurredAt || undefined,
      min_occurred_at: minOccurredAt || undefined,
      namespace: namespace.length ? namespace : undefined,
      search_term: searchTerm || undefined,
      sort: sortList.length ? sortList : undefined,
    });

    return { data };
  },
  inputs: {
    connection,
    organization: {
      ...organization,
      required: true,
      dataSource: "organizations",
      comments:
        "Return activity log entries from the organization associated with this URI",
    },
    actionInput,
    actor,
    maxOccurredAt,
    minOccurredAt,
    namespace,
    searchTerm,
    sortList,
  },
  examplePayload: listActivityLogEntriesExamplePayload,
});
