import { input, util } from "@prismatic-io/spectral";
import type { Sort } from "../types";
import { valueListInputClean } from "../util";
import {
  channelName,
  cleanString,
  connectionInput,
  cursor,
  fetchAll,
  includeImChannels,
  includeMultiPartyImchannels,
  includePrivateChannels,
  includePublicChannels,
  limit,
  sort_dir,
  teamId,
  userId,
} from "./common";





export const isPrivate = input({
  label: "Is Private",
  type: "boolean",
  required: true,
  comments: "When true, the Slack conversation will be private.",
  clean: util.types.toBool,
});

export const conversationName = input({
  label: "Conversation Name",
  placeholder: "Enter conversation name",
  type: "string",
  required: true,
  comments: "The display name for the Slack conversation.",
  example: "Book Club",
  clean: util.types.toString,
});

export const excludeArchived = input({
  label: "Exclude Archived",
  type: "boolean",
  required: false,
  comments: "When true, archived results will be excluded from the result set.",
  clean: util.types.toBool,
});

export const includeAllMetadata = input({
  label: "Include All Metadata",
  type: "boolean",
  comments: "When true, includes all metadata in results.",
  clean: util.types.toBool,
});

export const inclusive = input({
  label: "Inclusive",
  comments:
    "When true, includes messages with oldest or latest timestamps in results. Ignored unless either timestamp is specified.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const latest = input({
  label: "Latest",
  placeholder: "Enter Unix timestamp",
  type: "string",
  required: false,
  comments:
    "Only messages before this Unix timestamp will be included in results. Default is current time.",
  clean: cleanString,
});

export const oldest = input({
  label: "Oldest",
  placeholder: "Enter Unix timestamp",
  type: "string",
  required: false,
  comments:
    "Only messages after this Unix timestamp will be included in results.",
  clean: cleanString,
});

export const conversationPurpose = input({
  label: "Conversation Purpose",
  placeholder: "Enter conversation purpose",
  type: "string",
  required: true,
  comments: "The purpose statement describing the conversation's intent.",
  example: "Engineering",
  clean: util.types.toString,
});

export const conversationTopic = input({
  label: "Conversation Topic",
  placeholder: "Enter conversation topic",
  type: "string",
  required: true,
  comments: "The topic shown at the top of the conversation.",
  example: "Engineering",
  clean: util.types.toString,
});

export const connected_team_ids = input({
  label: "Connected Team IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An array of encoded team IDs identifying external orgs to search through.",
  example: "T00000000",
  clean: valueListInputClean,
});

export const team_ids = input({
  label: "Team IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An array of team IDs identifying internal workspaces to search through.",
  example: "T00000000",
  clean: valueListInputClean,
});

export const search_channel_types = input({
  label: "Search Channel Types",
  type: "string",
  collection: "valuelist",
  model: [
    "private",
    "private_exclude",
    "archived",
    "exclude_archived",
    "private_exclude_archived",
    "multi_workspace",
    "org_wide",
    "external_shared_exclude",
    "external_shared",
    "external_shared_private",
    "external_shared_archived",
    "exclude_org_shared",
  ].map((value) => ({ value, label: value })),
  required: false,
  comments:
    "The type of channel to include or exclude in the search. For example, private will search private channels, while private_exclude will exclude them.",
  clean: valueListInputClean,
});

export const sort = input({
  label: "Sort",
  placeholder: "Select sort method",
  type: "string",
  model: ["relevant", "name", "member_count", "created"].map((value) => ({
    value,
    label: value,
  })),
  default: "member_count",
  required: false,
  comments:
    "The method to sort the results. For example, member_count will sort by the number of members in the channel.",
  clean: (value: unknown) => util.types.toString(value, "member_count") as Sort,
});

export const total_count_only = input({
  label: "Total Count Only",
  type: "boolean",
  required: false,
  comments:
    "When true, returns only the total_count of channels. Omits channel data and allows access for admins without channel manager permissions.",
  clean: util.types.toBool,
});





export const createConversationInputs = {
  connection: connectionInput,
  conversationName,
  isPrivate,
  teamId,
};

export const closeConversationInputs = {
  connection: connectionInput,
  conversationName,
};

export const renameConversationInputs = {
  connection: connectionInput,
  conversationName,
  newConversationName: {
    ...conversationName,
    label: "New Conversation Name",
  },
};

export const getConversationsHistoryInputs = {
  connection: connectionInput,
  channelName,
  fetchAll,
  limit,
  cursor,
  includeAllMetadata,
  inclusive,
  latest,
  oldest,
};

export const listConversationsInputs = {
  connection: connectionInput,
  fetchAll,
  limit,
  cursor,
  teamId,
  excludeArchived,
  includePublicChannels,
  includePrivateChannels,
  includeMultiPartyImchannels,
  includeImChannels,
};

export const leaveConversationInputs = {
  connection: connectionInput,
  channelName,
};

export const listConversationMembersInputs = {
  connection: connectionInput,
  channelName,
  fetchAll,
  limit,
  cursor,
};

export const archiveConversationInputs = {
  connection: connectionInput,
  channelName,
};

export const conversationExistsInputs = {
  connection: connectionInput,
  channelName,
};

export const inviteUserToConversationInputs = {
  connection: connectionInput,
  channelName,
  userId,
};

export const setConversationPurposeInputs = {
  connection: connectionInput,
  channelName,
  purpose: conversationPurpose,
};

export const setConversationTopicInputs = {
  connection: connectionInput,
  channelName,
  userId,
  topic: conversationTopic,
};

export const searchConversationInputs = {
  connection: connectionInput,
  query: channelName,
  cursor,
  limit,
  connected_team_ids,
  search_channel_types,
  sort,
  sort_dir,
  team_ids,
  total_count_only,
};
