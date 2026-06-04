import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getSystemLogsExamplePayload } from "../../examplePayloads/general";
import { getSystemLogInputs } from "../../inputs/general";
import { paginateRecordsWithLink } from "../../util/util";

export const getSystemLogs = action({
  display: {
    label: "Get System Logs",
    description:
      "Retrieves system log events for security monitoring and compliance auditing. Max 10000 records can be fetched at once.",
  },
  inputs: getSystemLogInputs,
  perform: async (
    context,
    { connection, after, filter, limit, q, since, sortOrder, until, fetchAll },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const data = await paginateRecordsWithLink(client, "/logs", fetchAll, {
      after,
      filter,
      limit: limit || 1000,
      q,
      since,
      sortOrder: sortOrder || "ASCENDING",
      until,
    });

    return { data };
  },
  examplePayload: getSystemLogsExamplePayload,
});
