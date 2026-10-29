import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listGroupsExamplePayload } from "../../examplePayloads";
import { listGroupsInputs } from "../../inputs";
import { paginateResults } from "../../utils/pagination";
import type { ListGroupsQueryParams } from "../types/ListGroupsQueryParams";

export const listGroups = action({
  display: {
    label: "List Groups",
    description: "Lists all groups in a Domo instance.",
  },
  examplePayload: listGroupsExamplePayload,
  perform: async (context, { connection, fetchAll, pagination }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListGroupsQueryParams = {};
    if (pagination.limit.length) queryParams.limit = pagination.limit;
    if (pagination.offset.length) queryParams.offset = pagination.offset;
    return await paginateResults(
      client,
      "/groups",
      fetchAll,
      queryParams as Record<string, string>,
    );
  },
  inputs: listGroupsInputs,
});

export default { listGroups };
