import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";



import { closeConversationExamplePayload } from "../../examplePayloads";
import { searchConversationInputs } from "../../inputs";
import { debugLogger } from "../../util";





export const searchConversation = action({
  display: {
    label: "Search Conversation",
    description:
      "Search for public or private channels in an Enterprise organization.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      connected_team_ids,
      cursor,
      limit,
      query,
      search_channel_types,
      sort,
      sort_dir,
      team_ids,
      total_count_only,
    }
  ) => {
    debugLogger({
      debug,
      connected_team_ids,
      cursor,
      limit,
      query,
      search_channel_types,
      sort,
      sort_dir,
      team_ids,
      total_count_only,
    });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.admin.conversations.search({
      connected_team_ids,
      cursor,
      limit,
      query,
      search_channel_types,
      sort,
      sort_dir,
      team_ids: team_ids as [string, ...string[]],
      total_count_only,
    });
    return { data };
  },
  inputs: searchConversationInputs,
  examplePayload: {
    data: closeConversationExamplePayload,
  },
});
