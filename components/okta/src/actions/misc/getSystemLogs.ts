import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getSystemLogsExamplePayload } from "../../examplePayloads/general";
import { getSystemLogInputs } from "../../inputs/general";
import { paginateRecordsWithLink } from "../../util/util";
export const getSystemLogs = action({
  display: {
    label: "Get System Logs",
    description:
      "Retrieves system log events for security monitoring and compliance auditing, up to a maximum of 10000 records per request.",
  },
  inputs: getSystemLogInputs,
  perform: async (
    context,
    { connection, filters = {}, sortOrder, fetchAll, pagination = {} },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const data = await paginateRecordsWithLink(client, "/logs", fetchAll, {
      after: pagination.after,
      filter: filters.filter,
      limit: pagination.limit || 1000,
      q: filters.q,
      since: filters.since,
      sortOrder: sortOrder || "ASCENDING",
      until: filters.until,
    });
    return { data };
  },
  examplePayload: getSystemLogsExamplePayload,
});
