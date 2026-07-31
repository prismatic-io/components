import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { searchMessagesExamplePayload } from "../../examplePayloads";
import { searchMessagesInputs } from "../../inputs";
import { debugLogger } from "../../util";
export const searchMessages = action({
  display: {
    label: "Search Messages",
    description: "Searches for messages matching a query.",
  },
  inputs: searchMessagesInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, pagination, highlight, query, sort, sort_dir, team_id },
  ) => {
    const { count, page } = pagination;
    debugLogger({
      debug,
      count,
      highlight,
      page,
      query,
      sort,
      sort_dir,
      team_id,
    });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.search.messages({
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
    data: {
      ...searchMessagesExamplePayload,
      query,
    },
  }),
  examplePayload: {
    data: searchMessagesExamplePayload,
  },
});
