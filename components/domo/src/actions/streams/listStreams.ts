import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listStreamsExamplePayload } from "../../examplePayloads";
import { listStreamsInputs } from "../../inputs";
import { paginateResults } from "../../utils/pagination";
import type { ListStreamsQueryParams } from "../types/ListStreamsQueryParams";

export const listStreams = action({
  display: {
    label: "List Streams",
    description:
      "Lists all streams the authenticated user has view permissions for.",
  },
  examplePayload: listStreamsExamplePayload,
  perform: async (context, { connection, fetchAll, pagination }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListStreamsQueryParams = {};
    if (pagination.limit.length) queryParams.limit = pagination.limit;
    if (pagination.offset.length) queryParams.offset = pagination.offset;
    return await paginateResults(
      client,
      "/streams",
      fetchAll,
      queryParams as Record<string, string>,
    );
  },
  inputs: listStreamsInputs,
});

export default { listStreams };
