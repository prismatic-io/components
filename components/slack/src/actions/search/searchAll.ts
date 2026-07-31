import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { searchAllExamplePayload } from "../../examplePayloads";
import { searchAllInputs } from "../../inputs";
import { debugLogger } from "../../util";
export const searchAll = action({
  display: {
    label: "Search All",
    description: "Searches for messages and files matching a query.",
  },
  inputs: searchAllInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, query, sort, sort_dir, pagination, team_id, highlight },
  ) => {
    const { count, page } = pagination;
    debugLogger({
      debug,
      query,
      sort,
      sort_dir,
      count,
      team_id,
      highlight,
      page,
    });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.search.all({
      query,
      sort,
      sort_dir,
      count,
      team_id,
      highlight,
      page,
    });
    return { data };
  },
  examplePerformSafety: "safe",
  examplePerform: async (
    _context,
    { query },
  ): Promise<{
    data: unknown;
  }> => ({
    data: { ...searchAllExamplePayload, query },
  }),
  examplePayload: {
    data: searchAllExamplePayload as unknown,
  },
});
