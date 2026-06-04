import { input, util } from "@prismatic-io/spectral";
import type { BodyType } from "@microsoft/microsoft-graph-types";
import { cleanAttachments, cleanFunctionForBccAndCcInputs, cleanStringInput } from "../util";
import { ATTACHMENTS_DATA_INPUT_EXAMPLE } from "../constants";
import {
  connectionInput,
  fetchAllInput,
  folderIdInput,
  pageLimitInput,
  pageSkipInput,
} from "./common";

export const messageIdInput = input({
  label: "Message ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectMessage",
  comments: "The unique identifier of the email message.",
  example: "AAMkAGUAAAwTW09AAA=",
  placeholder: "Enter Message ID",
});

export const dynamicAttachments = input({
  label: "Dynamic Attachments",
  type: "data",
  comments: `An array of objects with "key" and "value" properties, where "key" is the file name and "value" is the binary file data. Typically used as a reference from a previous step.`,
  placeholder: "Output data from previous step",
  example: JSON.stringify(ATTACHMENTS_DATA_INPUT_EXAMPLE, null, 2),
  clean: (value: unknown) => cleanAttachments(value, "Dynamic Attachments"),
});

export const attachments = input({
  label: "Attachments",
  type: "string",
  collection: "keyvaluelist",
  comments:
    "The file attachments as key-value pairs. Specify the file name as the key (e.g., my-file.pdf) and the file data as the value.",
  example: JSON.stringify(
    {
      "my-file.pdf": Buffer.from("file content"),
    },
    null,
    2,
  ),
  placeholder: "Enter file attachments",
  clean: (value: unknown) => cleanAttachments(value, "Attachments"),
});

export const searchInput = input({
  label: "Search",
  type: "string",
  required: false,
  comments:
    "The search query to filter messages. Cannot be used together with Filter. Refer to the [Microsoft Graph search parameter documentation](https://learn.microsoft.com/en-us/graph/search-query-parameter) for query syntax.",
  example: "subject:meeting",
  placeholder: "Enter search query",
  clean: cleanStringInput,
});

export const filterInput = input({
  label: "Filter",
  type: "string",
  required: false,
  comments:
    "The OData filter expression to apply to the messages. Cannot be used together with Search. Refer to the [Microsoft Graph filter parameter documentation](https://learn.microsoft.com/en-us/graph/filter-query-parameter) for filter syntax.",
  example: "from/emailAddress/address eq 'user@example.com'",
  placeholder: "Enter filter expression",
  clean: cleanStringInput,
});

const sendToInput = input({
  label: "To",
  type: "string",
  required: true,
  collection: "valuelist",
  clean: cleanFunctionForBccAndCcInputs,
  comments:
    "The recipient email addresses. Multiple addresses can be specified as a comma-separated list.",
  example: '["john.doe@example.com", "jane.smith@example.com"]',
  placeholder: "Enter recipient email addresses",
});

const sendCcInput = input({
  label: "CC",
  type: "string",
  required: false,
  collection: "valuelist",
  clean: cleanFunctionForBccAndCcInputs,
  comments:
    "The carbon copy email addresses. Multiple addresses can be specified as a comma-separated list.",
  example: '["cc.recipient@example.com"]',
  placeholder: "Enter CC email addresses",
});

const sendBccInput = input({
  label: "BCC",
  type: "string",
  required: false,
  collection: "valuelist",
  clean: cleanFunctionForBccAndCcInputs,
  comments:
    "The blind carbon copy email addresses. Multiple addresses can be specified as a comma-separated list.",
  example: '["bcc.recipient@example.com"]',
  placeholder: "Enter BCC email addresses",
});

const sendSubjectInput = input({
  label: "Subject",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The subject line of the email message.",
  example: "Quarterly Report",
  placeholder: "Enter message subject",
});

const sendBodyInput = input({
  label: "Message Body",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments: "The plain text or HTML body content of the email message.",
  example: "<p>Hello, this is the email body.</p>",
  placeholder: "Enter message body",
});

const sendBodyContentTypeInput = input({
  label: "Body Content Type",
  type: "string",
  required: true,
  default: "html",
  model: [
    { label: "HTML", value: "html" },
    { label: "Plain Text", value: "text" },
  ],
  comments: "The format of the message body content.",
  placeholder: "Select body content type",
  clean: (value) => {
    if (!["text", "html"].includes(util.types.toString(value))) {
      throw new Error("Invalid body content type. Must be 'text' or 'html'");
    }
    return util.types.toString(value) as BodyType;
  },
});

export const listMessagesInputs = {
  connection: connectionInput,
  fetchAll: fetchAllInput,
  pageLimit: pageLimitInput,
  pageSkip: pageSkipInput,
  folderId: folderIdInput,
  search: searchInput,
  filter: filterInput,
};

export const getMessageByIdInputs = {
  connection: connectionInput,
  messageId: messageIdInput,
};

export const deleteMessageInputs = {
  connection: connectionInput,
  messageId: messageIdInput,
};

export const sendMessageInputs = {
  connection: connectionInput,
  to: sendToInput,
  subject: sendSubjectInput,
  bodyContentType: sendBodyContentTypeInput,
  cc: sendCcInput,
  bcc: sendBccInput,
  body: sendBodyInput,
  attachments,
  dynamicAttachments,
};
