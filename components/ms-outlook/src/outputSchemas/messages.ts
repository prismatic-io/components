import {
  dateTimeTimeZoneSchema,
  itemBodySchema,
  nullableBoolean,
  nullableDateTime,
  nullableEnum,
  nullableString,
  recipientArray,
  recipientSchema,
  stringArray,
} from "./shared";

const messageSchema = {
  type: "object" as const,
  properties: {
    "@odata.etag": nullableString,
    bccRecipients: recipientArray,
    body: itemBodySchema,
    bodyPreview: nullableString,
    categories: stringArray,
    ccRecipients: recipientArray,
    changeKey: nullableString,
    conversationId: nullableString,
    conversationIndex: nullableString,
    createdDateTime: nullableDateTime,
    flag: {
      type: ["object", "null"],
      properties: {
        completedDateTime: dateTimeTimeZoneSchema,
        dueDateTime: dateTimeTimeZoneSchema,
        flagStatus: nullableEnum(["notFlagged", "complete", "flagged"]),
        startDateTime: dateTimeTimeZoneSchema,
      },
    },
    from: recipientSchema,
    hasAttachments: nullableBoolean,
    id: { type: "string" },
    importance: nullableEnum(["low", "normal", "high"]),
    inferenceClassification: nullableEnum(["focused", "other"]),
    internetMessageHeaders: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          name: nullableString,
          value: nullableString,
        },
      },
    },
    internetMessageId: nullableString,
    isDeliveryReceiptRequested: nullableBoolean,
    isDraft: nullableBoolean,
    isRead: nullableBoolean,
    isReadReceiptRequested: nullableBoolean,
    lastModifiedDateTime: nullableDateTime,
    parentFolderId: nullableString,
    receivedDateTime: nullableDateTime,
    replyTo: recipientArray,
    sender: recipientSchema,
    sentDateTime: nullableDateTime,
    subject: nullableString,
    toRecipients: recipientArray,
    uniqueBody: itemBodySchema,
    webLink: nullableString,
  },
  required: ["id"],
};

export const listMessagesOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": nullableString,
    value: { type: "array" as const, items: messageSchema },
    "@odata.nextLink": nullableString,
  },
  required: ["value"],
};

export const getMessageByIdOutputSchema = {
  type: "object" as const,
  properties: {
    message: {
      type: "object" as const,
      properties: {
        headers: { type: "object" as const, additionalProperties: true },
        attachments: {
          type: "array" as const,
          items: {
            type: "object" as const,
            properties: {
              filename: nullableString,
              contentType: { type: "string" },
              size: { type: "integer" },
              contentId: nullableString,
              related: nullableBoolean,
              data: { type: "object" },
            },
            required: ["contentType", "size", "data"],
          },
        },
        text: { type: "string" },
        html: { type: ["string", "boolean"] },
      },
      required: ["headers", "attachments"],
    },
    rawMessage: { type: "string" },
  },
  required: ["message", "rawMessage"],
};
