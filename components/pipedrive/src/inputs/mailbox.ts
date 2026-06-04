import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  mailThreadIdInput,
  paginationLimitInput,
  paginationStartInput,
} from "./common";
import { cleanNumber } from "../util";

const mailMessageId = input({
  label: "Mail Message ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The unique identifier of the mail message to retrieve.",
  example: "123",
  placeholder: "Enter Mail Message ID",
});

const includeBody = input({
  label: "Include Body",
  type: "string",
  default: "1",
  model: [
    { label: "0", value: "0" },
    { label: "1", value: "1" },
  ],
  clean: cleanNumber,
  comments: "When set to 1, the full message body is included in the response.",
  example: "1",
  placeholder: "Select option",
});

const folder = input({
  label: "Folder",
  type: "string",
  required: true,
  default: "inbox",
  model: [
    { label: "Inbox", value: "inbox" },
    { label: "Drafts", value: "drafts" },
    { label: "Sent", value: "sent" },
    { label: "Archive", value: "archive" },
  ],
  clean: util.types.toString,
  comments: "The mailbox folder whose threads should be returned.",
  example: "inbox",
  placeholder: "Select folder",
});

export const getMailMessageInputs = {
  connection: connectionInput,
  id: mailMessageId,
  includeBody,
};

export const getMailThreadsInputs = {
  connection: connectionInput,
  folder,
  start: paginationStartInput,
  limit: paginationLimitInput,
};

export const deleteMailThreadInputs = {
  connection: connectionInput,
  id: mailThreadIdInput,
};

export const getMailThreadInputs = {
  connection: connectionInput,
  id: mailThreadIdInput,
};

export const getMailThreadMessagesInputs = {
  connection: connectionInput,
  id: mailThreadIdInput,
};
