import { action } from "@prismatic-io/spectral";
import { assertTeamIdForOrgToken, createOauthClient } from "../../client";
import { listConversationsExamplePayload } from "../../examplePayloads";
import { listConversationsInputs } from "../../inputs";
import { debugLogger, getChannels } from "../../util";
export const listConversations = action({
  display: {
    label: "List Conversations",
    description: "List all conversations.",
  },
  inputs: listConversationsInputs,
  performSafety: "notAllowed",
  perform: async ({ debug: { enabled: debug } }, params) => {
    const { pagination, ...rest } = params;
    const { cursor, limit } = pagination;
    debugLogger({ ...rest, cursor, limit, debug });
    assertTeamIdForOrgToken(
      params.connection,
      params.teamId,
      "conversations.list",
    );
    const client = await createOauthClient({
      slackConnection: params.connection,
    });
    const parameters = {
      cursor: cursor || undefined,
      exclude_archived: params.excludeArchived || undefined,
      limit,
      team_id: params.teamId || undefined,
      includePublicChannels:
        params.channelTypes.includePublicChannels || undefined,
      includePrivateChannels:
        params.channelTypes.includePrivateChannels || undefined,
      includeMultiPartyImchannels:
        params.channelTypes.includeMultiPartyImchannels || undefined,
      includeImChannels: params.channelTypes.includeImChannels || undefined,
    };
    const data = await getChannels(client, parameters, params.fetchAll);
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listConversationsExamplePayload,
  }),
  examplePayload: {
    data: listConversationsExamplePayload,
  },
});
