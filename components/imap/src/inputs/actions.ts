import { input, util } from "@prismatic-io/spectral";
import {
  connection,
  content,
  flags,
  mailbox,
  messageIndex,
  path,
  range,
} from "./general";

export const from = input({
  label: "From",
  type: "string",
  required: false,
  comments: "Filter email messages by sender.",
  example: "someone@example.com",
  placeholder: "Enter sender email address",
  clean: util.types.toString,
});

export const to = input({
  label: "To",
  type: "string",
  required: false,
  comments: "Filter email messages by recipient.",
  example: "someone@example.com",
  placeholder: "Enter recipient email address",
  clean: util.types.toString,
});

export const readUnread = input({
  label: "Read / Unread Filter",
  type: "string",
  required: true,
  default: "all",
  comments: "Filter messages by read or unread status.",
  model: [
    { label: "Show all messages", value: "all" },
    { label: "Show only unread messages", value: "unread" },
    { label: "Show only read messages", value: "read" },
  ],
  clean: util.types.toString,
});

export const filterOptions = input({
  label: "Filter Options",
  type: "code",
  language: "json",
  required: false,
  comments: "Extra parameters to filter the search results.",
  placeholder: "Enter filter options as JSON",
  example: JSON.stringify(
    {
      recent: true,
      subject: "example",
      from: "someone@example.com",
      to: "someone@example.com",
      since: "2025-01-01",
      before: "2025-01-01",
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});

export const addFlagsInputs = {
  connection,
  mailbox,
  range,
  flags,
};

export const appendMessageInputs = {
  connection,
  mailbox,
  path,
  content,
};

export const copyMessageInputs = {
  connection,
  mailbox,
  range,
  path: { ...path, label: "New Path" },
};

export const createMailboxInputs = {
  connection,
  path,
};

export const deleteMessageInputs = {
  connection,
  mailbox,
  messageIndex,
};

export const downloadMessageInputs = {
  connection,
  mailbox,
  messageIndex: {
    ...messageIndex,
    label: "Message Index or ID",
    comments:
      "The index of the message you would like to download (1 for the oldest message, 2 for second oldest, etc), or the ID of the message.",
  },
};

export const getStatusInputs = {
  connection,
  mailbox,
};

export const listMailboxesInputs = {
  connection,
};

export const removeFlagsInputs = {
  connection,
  mailbox,
  range,
  flags,
};

export const renameMailboxInputs = {
  connection,
  path,
  newPath: { ...path, label: "New Path" },
};

export const searchMailboxInputs = {
  connection,
  mailbox,
  from,
  to,
  readUnread,
  filterOptions,
};

export const setFlagsInputs = {
  connection,
  mailbox,
  range,
  flags,
};
