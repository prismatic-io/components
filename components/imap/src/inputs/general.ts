import { input, util } from "@prismatic-io/spectral";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The IMAP connection to use.",
});

export const mailbox = input({
  label: "Mailbox",
  type: "string",
  required: true,
  comments: "Provide a string value for the name of the mailbox.",
  example: "INBOX",
  placeholder: "Enter mailbox name",
  clean: util.types.toString,
});

export const path = input({
  label: "Path",
  type: "string",
  required: true,
  comments: "Mailbox path to upload the message to.",
  example: "INBOX",
  placeholder: "Enter mailbox path",
  clean: util.types.toString,
});

export const range = input({
  label: "Range",
  type: "string",
  required: true,
  comments:
    "Provide a range of messages. Alternatively you can specify * to get the latest message.",
  example: "1,2,4:6",
  placeholder: "Enter message range",
  clean: util.types.toString,
});

export const flags = input({
  label: "Flags",
  type: "string",
  required: true,
  collection: "valuelist",
  comments:
    "For each item, provide a string value to be added to an existing message.",
  example: "exampleFlag",
  placeholder: "Enter flag value",
  clean: (value: unknown) => value as string[],
});

export const content = input({
  label: "Message Content",
  type: "string",
  required: true,
  comments: "The raw RFC 822 formatted message content to append.",
  example: `
  From: someone@<yourcompany>.com
  Subject: A basic RFC 850 formatted message
  Newsgroups: comp.<yourcompany>.test

  The body of this message is plain text. Note the blank line
  between the header information and the body of the message.
  `,
  placeholder: "Enter message content",
  clean: util.types.toString,
});

export const messageIndex = input({
  label: "Message UID",
  type: "string",
  required: true,
  example: "5",
  comments: "The UID of the message.",
  placeholder: "Enter message UID",
  clean: util.types.toString,
});
