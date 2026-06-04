








export const sendMessageExamplePayload = {
  ok: true,
  channel: "C011B7U3R9U",
  ts: "1646951430.367539",
  message: {
    type: "message",
    subtype: "bot_message",
    text: "The message I sent",
    ts: "1646951430.367539",
    username: "My Slack App",
    bot_id: "B036D2DCT54",
  },
  response_metadata: {
    scopes: [
      "identify",
      "chat:write",
      "chat:write.public",
      "chat.write.customize",
    ],
    acceptedScopes: ["chat:write"],
  },
};

export const updateMessageExamplePayload = {
  ok: true,
  channel: "C123ABC456",
  ts: "1401383885.000061",
  text: "Updated text you carefully authored",
  message: {
    text: "Updated text you carefully authored",
    user: "U34567890",
  },
};

export const deletePendingMessageExamplePayload = {
  ok: true,
};

export const deleteMessageExamplePayload = {
  ok: true,
  channel: "C123ABC456",
  ts: "1401383885.000061",
};

export const postEphemeralMessageExamplePayload = {
  ok: true,
  message_ts: "1502210682.580145",
};

export const webhookDefaultExamplePayload = { text: "ok" };

export const postBlockMessageExamplePayload = {
  ok: true,
  channel: "C011B7U3R9U",
  ts: "1646951430.367539",
  message: {
    type: "message",
    subtype: "bot_message",
    text: "The message I sent",
    ts: "1646951430.367539",
    username: "My Slack App",
    bot_id: "B036D2DCT54",
  },
  response_metadata: {
    scopes: [
      "identify",
      "chat:write",
      "chat:write.public",
      "chat:write.customize",
    ],
    acceptedScopes: ["chat:write"],
  },
};

export const listScheduledMessagesExamplePayload = {
  ok: true,
  scheduled_messages: [
    {
      id: 1298393284,
      channel_id: "C1H9RESGL",
      post_at: 1551991428,
      date_created: 1551891734,
      text: "Here's a message for you in the future",
    },
  ],
  response_metadata: {
    next_cursor: "",
  },
};
