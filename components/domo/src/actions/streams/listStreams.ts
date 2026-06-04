import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listStreamsInputs } from "../../inputs";
import type { ListStreamsQueryParams } from "../types/ListStreamsQueryParams";
import { listStreamsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../utils/pagination";

export const listStreams = action({
  display: {
    label: "List Streams",
    description:
      "Lists all streams the authenticated user has view permissions for.",
  },
  examplePayload: listStreamsExamplePayload,
  perform: async (context, { connection, fetchAll, limit, offset }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListStreamsQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;
    return paginateResults(client, "/streams", fetchAll, queryParams as Record<string, string>);
  },
  inputs: listStreamsInputs,
});

export default { listStreams };
