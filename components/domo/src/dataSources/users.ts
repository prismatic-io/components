import { dataSource, input } from "@prismatic-io/spectral";
import type { ListUsersQueryParams } from "../actions/types/ListUsersQueryParams";
import { getDomoClient } from "../client";
import { connection, limit, offset } from "../inputs";

const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Selects a Domo user.",
  },
  dataSourceType: "picklist",
  perform: async (_context, { connection, limit, offset }) => {
    const client = await getDomoClient(connection, false);
    const queryParams: ListUsersQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;
    const { data } = await client.get(`/users`, {
      params: queryParams,
      headers: { Accept: "application/json" },
    });
    return {
      result: data
        .map((user: Record<string, string>) => ({
          label: user.name || user.email || user.id,
          key: user.id.toString(),
        }))
        .sort((a: { label: string }, b: { label: string }) =>
          a.label < b.label ? -1 : 1,
        ),
    };
  },
  inputs: {
    connection,
    limit: input({
      ...limit,
      required: false,
      comments:
        "The amount of users to return in the list. The default is 50 and the maximum is 500.",
    }),
    offset: input({
      ...offset,
      required: false,
      comments:
        "The offset of the user ID to begin list of users within the response.",
    }),
  },
  examplePayload: {
    result: [{ label: "Leonhard Euler", key: "27" }],
  },
});

export default { selectUser };
