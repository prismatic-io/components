import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectChatMessageInputs } from "../inputs";
import { createZoomClient } from "../client";
import { getAllPaginationResults } from "../util";
import type { ChatMessage } from "../interfaces/ChatMessage";

export const selectChatMessage = dataSource({
  display: {
    label: "Select Chat Message",
    description: "A Picklist of chat messages from a specific user.",
  },
  dataSourceType: "picklist",
  inputs: selectChatMessageInputs,
  perform: async (
    _context,
    { connection, userId, toContact, toChannel, date, from, to },
  ) => {
    const client = createZoomClient({ connection });
    const data: { messages: ChatMessage[] } =
      await getAllPaginationResults<ChatMessage>(
        client,
        `/chat/users/${userId}/messages`,
        "messages",
        {
          to_contact: toContact,
          to_channel: toChannel,
          date,
          from,
          to,
        },
      );

    const result = data.messages.map(
      ({ id, message, sender_display_name }): Element => {
        const messagePreview =
          message.length > 50 ? `${message.substring(0, 50)}...` : message;
        const label = `${sender_display_name} - ${messagePreview}`;
        return {
          label,
          key: id,
        };
      },
    );

    return {
      result,
    };
  },
});
