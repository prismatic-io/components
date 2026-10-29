import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { getActivityLogEntriesExamplePayload } from "../../examplePayloads";
import { getActivityLogEntriesInputs } from "../../inputs";
import { paginateResults } from "../../utils/pagination";
import type { GetActivityLogEntriesQueryParams } from "../types/GetActivityLogEntriesQueryParams";

export const getActivityLogEntries = action({
  display: {
    label: "Get Activity Log Entries",
    description: "Retrieves activity log entries.",
  },
  examplePayload: getActivityLogEntriesExamplePayload,
  perform: async (
    context,
    { connection, start, end, user, fetchAll, pagination },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: GetActivityLogEntriesQueryParams = {
      start,
    };
    if (end.length) queryParams.end = end;
    if (pagination.limit.length) queryParams.limit = pagination.limit;
    if (pagination.offset.length) queryParams.offset = pagination.offset;
    if (user.length) queryParams.user = user;
    return await paginateResults(
      client,
      `/audit`,
      fetchAll,
      queryParams as Record<string, string>,
    );
  },
  inputs: getActivityLogEntriesInputs,
});

export default { getActivityLogEntries };
