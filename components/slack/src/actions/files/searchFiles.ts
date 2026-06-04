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
  perform: async (
    { debug: { enabled: debug } },
    { connection, query, sort, sort_dir, count, highlight, page, team_id }
  ) => {
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
  inputs: searchFilesInputs,
  examplePayload: {
    data: searchFilesExamplePayload as unknown,
  },
});
