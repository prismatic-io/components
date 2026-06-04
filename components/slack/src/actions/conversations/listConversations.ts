import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { listConversationsExamplePayload } from "../../examplePayloads";
import { listConversationsInputs } from "../../inputs";
import { debugLogger, getChannels } from "../../util";

export const listConversations = action({
  display: {
    label: "List Conversations",
    description: "List all conversations.",
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    debugLogger({ ...params, debug });
    const client = await createOauthClient({
      slackConnection: params.connection,
    });

    const parameters = {
      cursor: params.cursor || undefined,
      exclude_archived: params.excludeArchived || undefined,
      limit: params.limit || undefined,
      team_id: params.teamId || undefined,
      includePublicChannels: params.includePublicChannels || undefined,
      includePrivateChannels: params.includePrivateChannels || undefined,
      includeMultiPartyImchannels:
        params.includeMultiPartyImchannels || undefined,
      includeImChannels: params.includeImChannels || undefined,
    };

    const data = await getChannels(client, parameters, params.fetchAll);
    return { data };
  },
  inputs: listConversationsInputs,
  examplePayload: {
    data: listConversationsExamplePayload,
  },
});
