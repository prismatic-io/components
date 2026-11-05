import type { WebClient } from "@slack/web-api";
import type {
  Channel,
  ConversationsListResponse,
} from "@slack/web-api/dist/types/response/ConversationsListResponse";
import { ChannelType } from "../constants";
import { paginateResults } from "./paginateResults";

interface GenerateChannelTypesParams {
  includePublicChannels: boolean;
  includePrivateChannels: boolean;
  includeMultiPartyImchannels: boolean;
  includeImChannels: boolean;
}

export const generateChannelTypesString = ({
  includePublicChannels,
  includePrivateChannels,
  includeMultiPartyImchannels,
  includeImChannels,
}: GenerateChannelTypesParams) => {
  const types = [];
  if (includePublicChannels) {
    types.push("public_channel");
  }
  if (includePrivateChannels) {
    types.push("private_channel");
  }
  if (includeMultiPartyImchannels) {
    types.push("mpim");
  }
  if (includeImChannels) {
    types.push("im");
  }
  return types.join(",");
};

export const getChannels = async (
  client: WebClient,
  params: Record<string, unknown>,
  fetchAll: boolean
) => {
  const promiseArray: Promise<Channel[]>[] = [];
  const channelsMapper = [
    { type: ChannelType.PUBLIC_CHANNEL, include: params.includePublicChannels },
    { type: ChannelType.IM_CHANNEL, include: params.includeImChannels },
    {
      type: ChannelType.PRIVATE_CHANNEL,
      include: params.includePrivateChannels,
    },
    {
      type: ChannelType.MULTI_PARTY_IM_CHANNEL,
      include: params.includeMultiPartyImchannels,
    },
  ];

  for (const channel of channelsMapper) {
    if (channel.include) {
      promiseArray.push(listChannels(client, params, fetchAll, channel.type));
    }
  }

  const channels = await Promise.all(promiseArray).then((channels) =>
    channels.flat()
  );

  return { ok: channels?.length > 0, channels: channels };
};

export const listChannels = async (
  client: WebClient,
  params: Record<string, unknown>,
  fetchAll: boolean,
  types: string
) => {
  if (fetchAll) {
    const response = await paginateResults(
      client,
      "conversations",
      "channels",
      "list",
      { ...params, types, limit: params.limit || 200 }
    );
    const { channels } = response.data as ConversationsListResponse;

    return channels;
  }

  const { channels } = await client.conversations.list({ ...params, types });
  return channels;
};
