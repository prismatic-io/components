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
  perform: async (
    { debug: { enabled: debug } },
    { connection, count, highlight, page, query, sort, sort_dir, team_id }
  ) => {
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
  inputs: searchMessagesInputs,
  examplePayload: {
    data: searchMessagesExamplePayload,
  },
});
