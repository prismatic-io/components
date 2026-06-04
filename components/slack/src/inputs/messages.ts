import { input, util } from "@prismatic-io/spectral";
import {
  channelId,
  channelName,
  cleanString,
  connectionInput,
  highlight,
  limit,
  page,
  query,
  sort_dir,
  sortSearch,
  team_id,
  userId,
} from "./common";





export const message = input({
  label: "Message",
  placeholder: "Enter message",
  type: "text",
  required: true,
  comments: "The message to send the Slack channel.",
  example: "Hello from Acme!",
  clean: util.types.toString,
});

export const messageId = input({
  label: "Message ID",
  placeholder: "Enter message ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of a message or thread to reply to (thread_ts).",
  example: "1503435956.000247",
  clean: util.types.toString,
});

export const username = input({
  label: "Bot Username",
  placeholder: "Enter bot username",
  type: "string",
  required: false,
  comments:
    "The username of the bot the message will be sent from. This requires the 'chat:write.customize' scope.",
  example: "exampleUser",
  clean: cleanString,
});

export const blocks = input({
  label: "Blocks",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify(
    {
      blocks: [
        {
          type: "section",
          text: {
            type: "plain_text",
            text: "Hello world",
          },
        },
      ],
    },
    null,
    2
  ),
  comments:
    "A JSON array containing blocks (objects) that make up the desired message. Use Slack's [Block Kit Builder](https://app.slack.com/block-kit-builder/) to build block messages.",
  clean: (block) => {
    const value = util.types.isJSON(util.types.toString(block))
      ? JSON.parse(util.types.toString(block))
      : block;

    return "blocks" in value ? value : { blocks: value };
  },
});





export const postMessageInputs = {
  connection: connectionInput,
  channelName,
  message,
  username,
  messageId: { ...messageId, required: false },
};

export const updateMessageInputs = {
  connection: connectionInput,
  channelId,
  messageId,
  message,
};

export const deletePendingMessageInputs = {
  connection: connectionInput,
  channelId,
  messageId,
};

export const deleteMessageInputs = {
  connection: connectionInput,
  channelId,
  messageId,
};

export const postEphemeralMessageInputs = {
  connection: connectionInput,
  channelName,
  userId,
  message,
  username,
};

export const postSlackMessageInputs = {
  connection: connectionInput,
  message,
};

export const postWebhookBlockMessageInputs = {
  connection: connectionInput,
  message: {
    ...message,
    label: "Alt Message",
    required: true,
    comments:
      "The fallback message used when the block message cannot be rendered.",
  },
  blocks,
};

export const postBlockMessageInputs = {
  connection: connectionInput,
  channelName,
  blocks,
  message: {
    ...message,
    label: "Alt Message",
    comments:
      "The fallback message used when the block message cannot be rendered.",
  },
  username,
  messageId: { ...messageId, required: false },
};

export const listScheduledMessagesInputs = {
  connection: connectionInput,
};

export const searchMessagesInputs = {
  connection: connectionInput,
  query,
  count: {
    ...limit,
    label: "Count",
    comments: "The number of items to return per page.",
  },
  page,
  highlight,
  sort: sortSearch,
  sort_dir,
  team_id,
};
