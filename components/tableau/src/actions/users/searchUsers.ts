import { action, util } from "@prismatic-io/spectral";
import { searchUsersExamplePayload } from "../../examplePayloads";
import { searchUsersInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const searchUsers = action({
  display: {
    label: "Search Users",
    description: "Search for a specific user by a string of text.",
  },
  examplePayload: searchUsersExamplePayload,
  perform: async (context, params) => {
    const searchString = util.types.toString(params.searchString);
    const searchField = util.types.toString(params.searchField);
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get(
      `/users?filter=${searchField}:eq:${searchString}`,
      {
        params: {
          pageSize:
            util.types.toNumber(params.pagination?.pageSize) || undefined,
          pageNumber:
            util.types.toNumber(params.pagination?.pageNumber) || undefined,
        },
      },
    );
    return {
      data: response.data,
    };
  },
  inputs: searchUsersInputs,
});
