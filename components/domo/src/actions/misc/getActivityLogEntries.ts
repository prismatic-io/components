import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { getActivityLogEntriesInputs } from "../../inputs";
import type { GetActivityLogEntriesQueryParams } from "../types/GetActivityLogEntriesQueryParams";
import { getActivityLogEntriesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../utils/pagination";

export const getActivityLogEntries = action({
  display: {
    label: "Get Activity Log Entries",
    description: "Retrieves activity log entries.",
  },
  examplePayload: getActivityLogEntriesExamplePayload,
  perform: async (
    context,
    { connection, start, end, limit, offset, user, fetchAll },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: GetActivityLogEntriesQueryParams = {
      start,
    };
    if (end.length) queryParams.end = end;
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;
    if (user.length) queryParams.user = user;
    return paginateResults(client, `/audit`, fetchAll, queryParams as Record<string, string>);
  },
  inputs: getActivityLogEntriesInputs,
});

export default { getActivityLogEntries };
