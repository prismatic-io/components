import { dataSource, input } from "@prismatic-io/spectral";
import type { ListGroupsQueryParams } from "../actions/types/ListGroupsQueryParams";
import { getDomoClient } from "../client";
import { connection, limit, offset } from "../inputs";

const groups = dataSource({
  display: {
    label: "Select Group",
    description: "Selects a Domo group.",
  },
  dataSourceType: "picklist",
  perform: async (_context, { connection, limit, offset }) => {
    const client = await getDomoClient(connection, false);
    const queryParams: ListGroupsQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;

    const { data } = await client.get(`/groups`, {
      params: queryParams,
      headers: { Accept: "application/json" },
    });
    return {
      result: data.map((group: Record<string, string>) => ({
        label: group.name,
        key: String(group.id),
      })),
    };
  },
  inputs: {
    connection,
    limit: input({
      ...limit,
      required: false,
      comments:
        "The amount of groups to return in the list. The default is 50 and the maximum is 500.",
    }),
    offset: input({
      ...offset,
      required: false,
      comments:
        "The offset of the group ID to begin list of groups within the response.",
    }),
  },
});

export default { groups };
