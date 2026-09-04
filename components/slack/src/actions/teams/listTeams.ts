import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { listTeamsExamplePayload } from "../../examplePayloads";
import { listTeamsInputs } from "../../inputs";
import { debugLogger, paginateResults } from "../../util";
export const listTeams = action({
  display: {
    label: "List Teams",
    description:
      "List the workspaces in an Enterprise Grid organization along with their team IDs.",
  },
  inputs: listTeamsInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, fetchAll, pagination },
  ) => {
    const { cursor, limit } = pagination;
    debugLogger({ cursor, limit, debug });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const params = {
      cursor: cursor || undefined,
      limit,
    };
    if (fetchAll) {
      return await paginateResults(
        client,
        "admin.teams",
        "teams",
        "list",
        params,
      );
    }
    const data = await client.admin.teams.list(params);
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listTeamsExamplePayload,
  }),
  examplePayload: {
    data: listTeamsExamplePayload,
  },
});
