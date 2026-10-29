import { dataSource, input } from "@prismatic-io/spectral";
import type { ListStreamExecutionQueryParams } from "../actions/types/ListStreamExecutionQueryParams";
import type { ListStreamsQueryParams } from "../actions/types/ListStreamsQueryParams";
import { getDomoClient } from "../client";
import { connection, limit, offset, streamId } from "../inputs";

const streams = dataSource({
  display: {
    label: "Select Stream",
    description: "Selects a Domo stream.",
  },
  dataSourceType: "picklist",
  perform: async (_context, { connection, limit, offset }) => {
    const client = await getDomoClient(connection, false);
    const queryParams: ListStreamsQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;
    const { data } = await client.get(`/streams`, {
      params: queryParams,
      headers: { Accept: "application/json" },
    });
    return {
      result: data.map((stream: Record<string, string>) => ({
        label: `Stream ${stream.id} (${stream.updateMethod})`,
        key: String(stream.id),
      })),
    };
  },
  inputs: {
    connection,
    limit: input({
      ...limit,
      required: false,
      comments:
        "The amount of Stream to return in the list. The default is 50 and the maximum is 500.",
    }),
    offset: input({
      ...offset,
      required: false,
      comments:
        "The offset of the Stream ID to begin list of users within the response.",
    }),
  },
});

const selectStreamExecution = dataSource({
  display: {
    label: "Select Stream Execution",
    description: "Selects a Domo stream execution.",
  },
  dataSourceType: "picklist",
  perform: async (_context, { connection, streamId, limit, offset }) => {
    const client = await getDomoClient(connection, false);
    const queryParams: ListStreamExecutionQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;
    const { data } = await client.get(`/streams/${streamId}/executions`, {
      params: queryParams,
      headers: { Accept: "application/json" },
    });
    return {
      result: data.map((execution: Record<string, string | number>) => ({
        label: `${execution.id} (${execution.currentState})`,
        key: String(execution.id),
      })),
    };
  },
  inputs: {
    connection,
    streamId: {
      ...streamId,
      dataSource: undefined,
    },
    limit: input({
      ...limit,
      required: false,
      comments:
        "The number of Stream Executions to return in the list. The default is 50 and the maximum is 500.",
    }),
    offset: input({
      ...offset,
      required: false,
      comments:
        "The offset of the Stream Execution to begin list within the response.",
    }),
  },
});

export default { streams, selectStreamExecution };
