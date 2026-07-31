import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { searchFilesExamplePayload } from "../../examplePayloads";
import { searchFilesInputs } from "../../inputs";
import { debugLogger } from "../../util";
export const searchFiles = action({
  display: {
    label: "Search Files",
    description: "Searches for files matching a query.",
  },
  inputs: searchFilesInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, query, sort, sort_dir, pagination, highlight, team_id },
  ) => {
    const { count, page } = pagination;
    debugLogger({
      debug,
      query,
      sort,
      sort_dir,
      count,
      highlight,
      page,
      team_id,
    });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.search.files({
      query,
      sort,
      sort_dir,
      count,
      highlight,
      page,
      team_id,
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
    data: { ...searchFilesExamplePayload, query },
  }),
  examplePayload: {
    data: searchFilesExamplePayload as unknown,
  },
});
