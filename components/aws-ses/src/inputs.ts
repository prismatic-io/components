import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { cleanStringList } from "./util";

export const identityType = input({
  label: "Identity Type",
  type: "string",
  required: true,
  model: [
    {
      label: "Email",
      value: "EmailAddress",
    },
    {
      label: "Domain",
      value: "Domain",
    },
  ],
  comments: "Provide the type of identity you want to list.",
  default: "EmailAddress",
  clean: util.types.toString,
});

export const to = input({
  label: "To Address",
  example: "example@example.com",
  type: "string",
  collection: "valuelist",
  required: true,
  comments:
    "The destination for this email. The recipients to place on the To: line of the message.",
  clean: cleanStringList,
});

export const cc = input({
  label: "Cc Address",
  example: "example@example.com",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The destination for this email. The recipients to place on the CC: line of the message.",
  clean: cleanStringList,
});

export const bcc = input({
  label: "Bcc Address",
  example: "example@example.com",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The destination for this email. The recipients to place on the BCC: line of the message.",
  clean: cleanStringList,
});

export const html = input({
  label: "Html",
  example: "<p>Hello World!</p>",
  type: "string",
  required: false,
  comments:
    "The content of the message, in HTML format. Use this for email clients that can process HTML. You can include clickable links, formatted text, and much more in an HTML message.",
  clean: util.types.toString,
});

export const subject = input({
  label: "Subject",
  example: "My Email Subject",
  type: "string",
  required: true,
  comments:
    "The subject of the message: A short summary of the content, which will appear in the recipient's inbox.",
  clean: util.types.toString,
});

export const text = input({
  label: "Text",
  type: "string",
  example: "Hello World!",
  required: true,
  comments:
    "The content of the message, in text format. Use this for text-based email clients, or clients on high-latency networks (such as mobile devices).",
  clean: util.types.toString,
});

export const sender = input({
  label: "Sender Email",
  type: "string",
  example: "example@example.com",
  required: true,
  comments:
    "The email address that is sending the email. This email address must be either individually verified with Amazon SES, or from a domain that has been verified with Amazon SES.",
  clean: util.types.toString,
});

export const replyTo = input({
  label: "Reply To",
  type: "string",
  collection: "valuelist",
  example: "example@example.com",
  required: false,
  comments:
    "The reply-to email address(es) for the message. If the recipient replies to the message, each reply-to address will receive the reply. This email address must be either individually verified with Amazon SES, or from a domain that has been verified with Amazon SES.",
  clean: cleanStringList,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When enabled, automatically fetches all pages of results. The Next Token input is ignored when this is enabled.",
  required: false,
  default: "false",
});

export const nextToken = input({
  label: "Next Token",
  type: "string",
  required: false,
  comments:
    "Specify the pagination token that's returned by a previous request to retrieve the next page of results",
  example: `lslTXFcbLQKkb0vP9Kgh5hy0Y0OnC7Z9ZPHPwPmMnxSk3eiDRMkct7D8E`,
  clean: util.types.toString,
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const attachments = input({
  label: "Attachments",
  type: "string",
  comments:
    "Specify a file name as the key (i.e. 'my-file.pdf'), and the file as the value",
  collection: "keyvaluelist",
  clean: (attachments) =>
    ((attachments as KeyValuePair[]) || []).map((attachment) => ({
      filename: attachment.key,
      content: util.types.toBufferDataPayload(attachment.value).data,
    })),
});
