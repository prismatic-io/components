import type { Channel } from "@slack/web-api/dist/types/response/ConversationsListResponse";

export const getChannelDisplayName = (
  showIdInDropdown: boolean,
  channel: Channel
): string => {
  let channelName: string;
  const isImChannel = channel.is_im || channel.is_mpim;

  if (channel.name) {
    channelName = channel.name;
  } else if (isImChannel) {
    channelName = "IM Channel";
  } else {
    channelName = "Unnamed";
  }

  if (showIdInDropdown) {
    return `#${channelName} (ID: ${channel.id})`;
  }
  return `#${channelName}`;
};
