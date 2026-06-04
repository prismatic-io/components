import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listStreamExecutionInputs } from "../../inputs";
import type { ListStreamExecutionQueryParams } from "../types/ListStreamExecutionQueryParams";
import { listStreamExecutionExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../utils/pagination";

export const listStreamExecution = action({
  display: {
    label: "List Stream Execution",
    description:
      "Lists all stream executions that match the specified criteria.",
  },
  examplePayload: listStreamExecutionExamplePayload,
  perform: async (
    context,
    { connection, streamId, limit, offset, fetchAll },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListStreamExecutionQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;
    return paginateResults(
      client,
      `/streams/${streamId}/executions`,
      fetchAll,
      queryParams as Record<string, string>,
    );
  },
  inputs: listStreamExecutionInputs,
});

export default { listStreamExecution };
