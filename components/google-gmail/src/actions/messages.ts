import { action, input, util } from "@prismatic-io/spectral";
import { simpleParser } from "mailparser";
import MailComposer from "nodemailer/lib/mail-composer";
import { createClient } from "../client";
import {
  addMetadata,
  connectionInput,
  fetchAll,
  from,
  labelIds,
  maxResults,
  messageIdInput,
  pageToken,
  query,
  userIdInput,
} from "../inputs";
import { ATTACHMENTS_DATA_INPUT_EXAMPLE } from "../constants";
import { cleanAttachmentsData, listAllMessages } from "../utils";
import {
  sendMessageExamplePayload,
  trashMessageByIdExamplePayload,
  unTrashMessageByIdExamplePayload,
  updateLabelsExamplePayload,
} from "../examplePayloads";

const listMessages = action({
  display: {
    label: "List Messages",
    description: "Get a list of messages",
  },
  inputs: {
    connection: connectionInput,
    userId: userIdInput,
    pageToken,
    fetchAll,
    query,
    maxResults,
    labelIds,
    addMetadata,
  },
  perform: async (
    context,
    { connection, query: q, pageToken, userId, labelIds, maxResults, fetchAll, addMetadata },
  ) => {
    const client = await createClient(connection);

    const data = await listAllMessages(
      client,
      {
        q,
        pageToken,
        userId,
        labelIds,
        maxResults,
      },
      fetchAll,
      addMetadata,
    );
    return { data };
  },
  examplePayload: {
    data: {
      messages: [
        {
          id: "abcd1234",
          threadId: "efgh5678",
        },
      ],
    },
  },
});

const getMessageById = action({
  display: {
    label: "Get Message",
    description: "Get a message by ID",
  },
  inputs: {
    connection: connectionInput,
    messageId: messageIdInput,
    userId: userIdInput,
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection);
    const {
      data: { id, threadId, labelIds, snippet, raw },
    } = await client.users.messages.get({
      userId: params.userId,
      id: params.messageId,
      format: "raw",
    });

    
    const parsed = await simpleParser(Buffer.from(raw, "base64"), {
      writableObjectMode: true,
      autoDestroy: true,
    });
    const message = {
      headers: Object.fromEntries(parsed.headers),
      attachments: parsed.attachments.map((attachment) => ({
        contentType: attachment.contentType,
        data: attachment.content,
      })),
      text: parsed.text,
      html: parsed.html,
    };

    const ret = {
      id,
      threadId,
      labelIds,
      message,
    };

    return { data: ret };
  },
  examplePayload: {
    data: {
      id: "1234abcd",
      threadId: "5678efgh",
      labelIds: ["IMPORTANT", "SENT", "INBOX"],
      message: {
        headers: {
          "mime-version": "1.0",
          date: "2022-09-19T20:09:01.000Z",
          "message-id": "<Test-message-id@mail.gmail.com>",
          subject: "Test Message",
          from: {
            value: [{ address: "example@gmail.com", name: "Example Example" }],
            html: '<span class="mp_address_group"><span class="mp_address_name">Example Example</span> &lt;<a href="mailto:example@gmail.com" class="mp_address_email">example@gmail.com</a>&gt;</span>',
            text: "Example Example <example@gmail.com>",
          },
          to: {
            value: [{ address: "example@gmail.com", name: "Example Example" }],
            html: '<span class="mp_address_group"><span class="mp_address_name">Example Example</span> &lt;<a href="mailto:example@gmail.com" class="mp_address_email">example@gmail.com</a>&gt;</span>',
            text: "Example Example <example@gmail.com>",
          },
          "content-type": {
            value: "multipart/mixed",
            params: { boundary: "000000000000680fa005e90d488f" },
          },
        },
        attachments: [],
        text: "Example email body",
        html: '<div dir="ltr">Example email body<div><br></div></div>\n',
      },
    },
  },
});

const trashMessageById = action({
  display: {
    label: "Trash Message",
    description: "Send a message to the trash",
  },
  inputs: {
    connection: connectionInput,
    messageId: messageIdInput,
    userId: userIdInput,
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection);
    const { data } = await client.users.messages.trash({
      userId: params.userId,
      id: params.messageId,
    });
    return { data };
  },
  examplePayload: trashMessageByIdExamplePayload,
});

const unTrashMessageById = action({
  display: {
    label: "Untrash Message",
    description: "Remove a message from the trash",
  },
  inputs: {
    connection: connectionInput,
    messageId: messageIdInput,
    userId: userIdInput,
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection);
    const { data } = await client.users.messages.untrash({
      userId: params.userId,
      id: params.messageId,
    });
    return { data };
  },
  examplePayload: unTrashMessageByIdExamplePayload,
});

const updateLabels = action({
  display: {
    label: "Update Message Labels",
    description: "Add or remove labels from a message",
  },
  inputs: {
    connection: connectionInput,
    messageId: messageIdInput,
    userId: userIdInput,
    addLabels: input({
      label: "Labels to Add",
      type: "string",
      collection: "valuelist",
      placeholder: "Select labels to add",
      example: '["INBOX", "IMPORTANT"]',
      comments: "Gmail labels to add to the message.",
      clean: (values) =>
        ((values as unknown[]) || []).map((value: unknown) => util.types.toString(value)),
    }),
    removeLabels: input({
      label: "Labels to Remove",
      type: "string",
      collection: "valuelist",
      placeholder: "Select labels to remove",
      example: '["SPAM", "UNREAD"]',
      comments: "Gmail labels to remove from the message.",
      clean: (values) =>
        ((values as unknown[]) || []).map((value: unknown) => util.types.toString(value)),
    }),
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection);
    const { data } = await client.users.messages.modify({
      userId: params.userId,
      id: params.messageId,
      requestBody: {
        addLabelIds: params.addLabels,
        removeLabelIds: params.removeLabels,
      },
    });
    return { data };
  },
  examplePayload: updateLabelsExamplePayload,
});

const sendMessage = action({
  display: {
    label: "Send Message",
    description: "Send a new message",
  },
  inputs: {
    connection: connectionInput,
    to: input({
      label: "To",
      type: "string",
      required: true,
      placeholder: "Enter recipient email addresses",
      example: '["recipient@example.com"]',
      comments: "Recipient email addresses.",
      clean: (values) =>
        ((values as string[]) || []).map((value) => util.types.toString(value)).join(", "),
      collection: "valuelist",
    }),
    from,
    cc: input({
      label: "CC",
      type: "string",
      required: false,
      placeholder: "Enter CC email addresses",
      example: '["cc@example.com"]',
      comments: "Carbon copy (CC) email addresses.",
      clean: (values) =>
        ((values as string[]) || []).map((value) => util.types.toString(value)).join(", "),
      collection: "valuelist",
    }),
    bcc: input({
      label: "BCC",
      type: "string",
      required: false,
      placeholder: "Enter BCC email addresses",
      example: '["bcc@example.com"]',
      comments: "Blind carbon copy (BCC) email addresses.",
      clean: (values) =>
        ((values as string[]) || []).map((value) => util.types.toString(value)).join(", "),
      collection: "valuelist",
    }),
    subject: input({
      label: "Subject",
      type: "string",
      required: true,
      placeholder: "Enter email subject",
      example: "Meeting Reminder - Project Review",
      comments: "The subject line of the email.",
      clean: util.types.toString,
    }),
    text: input({
      label: "Plain Text Body",
      type: "text",
      placeholder: "Enter plain text email body",
      example: "Hello,\n\nThis is a reminder about our meeting tomorrow at 2 PM.\n\nBest regards",
      comments:
        "Plain text version of the email body. Used as fallback for email clients that do not support HTML.",
      clean: util.types.toString,
    }),
    html: input({
      label: "HTML Body",
      type: "text",
      placeholder: "Enter HTML email body",
      example:
        "<html><body><h1>Hello</h1><p>This is a reminder about our meeting tomorrow at 2 PM.</p></body></html>",
      comments: "HTML version of the email body. For email clients that support HTML.",
      clean: util.types.toString,
    }),
    attachments: input({
      label: "Attachments",
      type: "string",
      placeholder: "Enter attachments as key-value pairs",
      example: '{ "report.pdf": "<file data>", "chart.png": "<image data>" }',
      comments:
        "Email attachments as key-value pairs. The key is the file name (e.g., 'document.pdf') and the value is the file data.",
      collection: "keyvaluelist",
      clean: cleanAttachmentsData,
    }),
    dynamicAttachments: input({
      label: "Dynamic Attachments",
      type: "data",
      placeholder: "File data from previous step",
      comments: `An array of objects with 'key' and 'value' properties, where 'key' is the file name and 'value' is the binary file data. Typically used as a reference from a previous step. Ex. ${ATTACHMENTS_DATA_INPUT_EXAMPLE}`,
      example: ATTACHMENTS_DATA_INPUT_EXAMPLE,
      required: false,
      clean: cleanAttachmentsData,
    }),
    userId: userIdInput,
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection);
    const options = {
      to: params.to,
      from: params.from,
      cc: params.cc,
      bcc: params.bcc,
      subject: params.subject,
      text: params.text,
      html: params.html,
      attachments: [...params.attachments, ...params.dynamicAttachments],
      textEncoding: "base64",
    };
    const mailComposer = new MailComposer(options).compile();
    mailComposer.keepBcc = true;

    const message = await mailComposer.build();
    const rawMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    const { data } = await client.users.messages.send({
      userId: params.userId,
      requestBody: { raw: rawMessage },
    });
    return { data };
  },
  examplePayload: sendMessageExamplePayload,
});

export default {
  getMessageById,
  listMessages,
  sendMessage,
  trashMessageById,
  unTrashMessageById,
  updateLabels,
};
