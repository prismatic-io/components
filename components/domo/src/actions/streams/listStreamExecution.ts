import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listStreamExecutionExamplePayload } from "../../examplePayloads";
import { listStreamExecutionInputs } from "../../inputs";
import { paginateResults } from "../../utils/pagination";
import type { ListStreamExecutionQueryParams } from "../types/ListStreamExecutionQueryParams";

export const listStreamExecution = action({
  display: {
    label: "List Stream Execution",
    description:
      "Lists all stream executions that match the specified criteria.",
  },
  examplePayload: listStreamExecutionExamplePayload,
  perform: async (context, { connection, streamId, pagination, fetchAll }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListStreamExecutionQueryParams = {};
    if (pagination.limit.length) queryParams.limit = pagination.limit;
    if (pagination.offset.length) queryParams.offset = pagination.offset;
    return await paginateResults(
      client,
      `/streams/${streamId}/executions`,
      fetchAll,
      queryParams as Record<string, string>,
    );
  },
  inputs: listStreamExecutionInputs,
});

export default { listStreamExecution };
