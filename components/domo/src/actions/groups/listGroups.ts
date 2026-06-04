import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listGroupsInputs } from "../../inputs";
import type { ListGroupsQueryParams } from "../types/ListGroupsQueryParams";
import { listGroupsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../utils/pagination";

export const listGroups = action({
  display: {
    label: "List Groups",
    description: "Lists all groups in a Domo instance.",
  },
  examplePayload: listGroupsExamplePayload,
  perform: async (context, { connection, fetchAll, limit, offset }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListGroupsQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;
    return paginateResults(client, "/groups", fetchAll, queryParams as Record<string, string>);
  },
  inputs: listGroupsInputs,
});

export default { listGroups };
