import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import {
  connection,
  date,
  from,
  toChannel,
  toContact,
  userId,
  to,
  includeDeletedAndEditedMessage,
  searchType,
  searchKey,
  excludeChildMessage,
  downloadFileFormats,
} from "../../inputs";
import { getAllPaginationResults } from "../../util";
import type { ChatMessage } from "../../interfaces/ChatMessage";
import { listChatMessagesExamplePayload } from "../../examplePayloads";

export const listUsersChatMessages = action({
  display: {
    label: "List User's Chat Messages",
    description: "List all chat messages of a given user",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      userId,
      toContact,
      toChannel,
      date,
      to,
      from,
      includeDeletedAndEditedMessage,
      searchType,
      searchKey,
      excludeChildMessage,
      downloadFileFormats,
    },
  ) => {
    const client = createZoomClient({ connection, debug });

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
          include_deleted_and_edited_message: includeDeletedAndEditedMessage,
          search_type: searchType,
          search_key: searchKey,
          exclude_child_message: excludeChildMessage,
          download_file_formats: downloadFileFormats,
        },
      );

    return {
      data,
    };
  },
  inputs: {
    connection,
    userId,
    toContact,
    toChannel,
    date,
    from: {
      ...from,
      comments:
        "The query start date in yyyy-MM-dd'T'HH:mm:ss'Z' format. If you provide both the 'Date' and 'from' inputs, the API uses the 'Date' input value to query.",
      example: "2021-01-01T00:00:00Z",
    },
    to: {
      ...to,
      comments:
        "The query end date in yyyy-MM-dd'T'HH:mm:ss'Z' format. This value defaults to the current date.",
      example: "2021-01-01T00:00:00Z",
    },
    includeDeletedAndEditedMessage,
    searchType,
    searchKey,
    excludeChildMessage,
    downloadFileFormats,
  },
  examplePayload: listChatMessagesExamplePayload,
});
