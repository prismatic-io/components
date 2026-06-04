import { input, util } from "@prismatic-io/spectral";

export const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};





export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Slack connection to use.",
});





export const cursor = input({
  label: "Cursor",
  placeholder: "Enter cursor value",
  type: "string",
  required: false,
  comments: "The pagination cursor from a previous request.",
  example: "3",
  clean: cleanString,
});

export const limit = input({
  label: "Limit",
  placeholder: "Enter limit",
  type: "string",
  required: false,
  example: "80",
  comments: "The maximum number of results to return.",
  clean: (value: unknown) => util.types.toNumber(value, 80),
});

export const page = input({
  label: "Page",
  placeholder: "Enter page number",
  type: "string",
  required: false,
  comments: "The page number of results to return (1-based).",
  example: "1",
  default: "1",
  clean: (value: unknown) => util.types.toNumber(value, 1),
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments: "When true, fetches all pages of results.",
  clean: util.types.toBool,
});






export const channelName = input({
  label: "Channel Name or ID",
  placeholder: "Enter channel name or ID",
  type: "string",
  required: true,
  comments: "The name or static ID of the Slack channel.",
  example: "general",
  dataSource: "selectChannels",
  clean: util.types.toString,
});


export const channelId = input({
  label: "Channel ID",
  placeholder: "Enter channel ID",
  type: "string",
  required: true,
  comments: "The static ID of the Slack channel.",
  example: "C02MS7HV6KB",
  dataSource: "selectChannels",
  clean: util.types.toString,
});

export const userId = input({
  label: "User ID",
  placeholder: "Enter user ID",
  type: "string",
  required: true,
  example: "U1234567890",
  comments: "The unique identifier for the Slack user.",
  dataSource: "selectUsers",
  clean: util.types.toString,
});

export const teamId = input({
  label: "Team ID",
  placeholder: "Enter team ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the Slack team.",
  example: "T1234567890",
  clean: cleanString,
});

export const team_id = input({
  label: "Team ID",
  placeholder: "Enter team ID",
  type: "string",
  required: false,
  comments:
    "The encoded team ID to search in. Required when an org-level token is used.",
  example: "T1234567890",
  clean: cleanString,
});





export const includePublicChannels = input({
  label: "Include Public Channels",
  type: "boolean",
  default: "true",
  comments: "When true, includes public channels in results.",
  clean: util.types.toBool,
});

export const includePrivateChannels = input({
  label: "Include Private Channels",
  type: "boolean",
  default: "false",
  comments: "When true, includes private channels in results.",
  clean: util.types.toBool,
});

export const includeMultiPartyImchannels = input({
  label: "Include Multi-Party IM Channels",
  type: "boolean",
  default: "false",
  comments: "When true, includes multi-party IM (mpim) channels in results.",
  clean: util.types.toBool,
});

export const includeImChannels = input({
  label: "Include IM Channels",
  type: "boolean",
  default: "false",
  comments: "When true, includes direct message (IM) channels in results.",
  clean: util.types.toBool,
});





export const query = input({
  label: "Query",
  placeholder: "Enter search query",
  type: "string",
  required: true,
  comments:
    "The search query. May contain boolean operators (AND, OR, NOT) and modifiers.",
  example: "pickleface",
  clean: util.types.toString,
});

export const highlight = input({
  label: "Highlight",
  type: "boolean",
  required: false,
  comments: "When true, enables query highlight markers in results.",
  example: "false",
  clean: util.types.toBool,
});

export const sort_dir = input({
  label: "Sort Direction",
  placeholder: "Select sort direction",
  type: "string",
  model: ["desc", "asc"].map((value) => ({
    value,
    label: value,
  })),
  default: "desc",
  required: false,
  comments:
    "The direction to sort the results. For example, desc will sort the results in descending order.",
  clean: (value: unknown) =>
    util.types.toString(value, "desc") as import("../types").SortDir,
});

export const sortSearch = input({
  label: "Sort",
  placeholder: "Select sort method",
  type: "string",
  model: ["score", "timestamp"].map((value) => ({
    value,
    label: value,
  })),
  default: "score",
  required: false,
  comments:
    "The method to sort the results. For example, member_count will sort by the number of members in the channel.",
  clean: (value: unknown) =>
    util.types.toString(value, "score") as import("../types").SearchAllSort,
});








export const fileType = input({
  label: "File Type",
  placeholder: "Enter file type",
  type: "string",
  required: true,
  example: "csv",
  comments:
    "The file type identifier. See Slack's [supported file types](https://api.slack.com/types/file#file_types) for the full list.",
  clean: util.types.toString,
});
