import { input, util } from "@prismatic-io/spectral";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The connection to use for authenticating requests to Microsoft Bot Framework.",
});

export const serviceUrl = input({
  label: "Service URL",
  type: "string",
  required: true,
  clean: util.types.toString,
  example: "https://smba.trafficmanager.net/teams/",
  placeholder: "Enter service URL",
  comments:
    "The Service URL (also referred to as Base URI) to send requests to the Bot Framework. Varies per bot channel and region. Use https://directline.botframework.com/ for Direct Line connections.",
});

export const apiVersion = input({
  label: "API Version",
  type: "string",
  required: true,
  default: "3",
  clean: (rawValue) => `v${util.types.toString(rawValue)}`,
  example: "3",
  placeholder: "Enter API version",
  comments: "The version of the Bot Framework API to call.",
});

export const botId = input({
  label: "Bot ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  example: "29:467105c0-7417-53fb-a409-4bf400037d17",
  placeholder: "Enter Bot ID",
  comments: "The unique identifier of the bot receiving requests.",
});

export const conversationId = input({
  label: "Conversation ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  example: "20:Tc8kzfj3VF7CX9grVLyNeuH-kt2HkTldtNQm_U_dgSE3@thread.tacv2",
  placeholder: "Enter Conversation ID",
  comments:
    "The unique identifier of the conversation (refers to a channel, team, or direct message).",
});

export const channelAccountId = input({
  label: "Channel Account ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  example:
    "27:2iLsjhoGUI4x7idscaXgy4DVI2-NzYvXkz6izkpBtdZT7Ew3CCut_kgYaJMZnHdON_BmKfio3HwhFAPhPZS_83Q",
  placeholder: "Enter Channel Account ID",
  comments:
    "The unique identifier of the channel account (refers to conversation members such as bots and users).",
});

export const tenantId = input({
  label: "Tenant ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  example: "133e1a5c-01bb-4b41-b635-e11224d13d45",
  placeholder: "Enter Tenant ID",
  comments: "The tenant ID associated with the channel account.",
});

export const fromId = input({
  label: "From ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  example: "user1",
  placeholder: "Enter user ID",
  comments: "The unique identifier of the user sending the message.",
});

export const fromName = input({
  label: "From Name",
  type: "string",
  required: true,
  clean: util.types.toString,
  example: "Local Tester",
  placeholder: "Enter user name",
  comments: "The name of the user sending the message.",
});

export const cardPayload = input({
  label: "Card Payload",
  type: "code",
  language: "json",
  required: true,
  placeholder: "Adaptive Card Payload",
  comments: "Adaptive Card payload to send",
  example: JSON.stringify(
    {
      type: "AdaptiveCard",
      version: "1.4",
      body: [{ type: "TextBlock", text: "Hello dynamic card!" }],
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});

export const text = input({
  label: "Text",
  type: "string",
  required: true,
  clean: util.types.toString,
  example: "Hello, this is a message from the bot.",
  placeholder: "Enter message text",
  comments: "The text content of the message to send.",
});

export const textFormat = input({
  label: "Text Format",
  type: "string",
  required: true,
  clean: (rawValue) => {
    const value = util.types.toString(rawValue);
    if (!["plain", "markdown", "xml"].includes(value)) {
      throw new Error(`Invalid Text Format specified: '${value}'`);
    }
    return value;
  },
  model: [
    { label: "Plain", value: "plain" },
    { label: "Markdown", value: "markdown" },
    { label: "XML", value: "xml" },
  ],
  default: "markdown",
  example: "markdown",
  comments: "Text Format of the message to send",
});

export const selectConversationMemberInputs = {
  connection,
};
