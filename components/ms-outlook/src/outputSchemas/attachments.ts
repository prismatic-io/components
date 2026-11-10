import {
  nullableBoolean,
  nullableDateTime,
  nullableEnum,
  nullableInteger,
  nullableString,
} from "./shared";

const attachmentMetadataSchema = {
  type: "object" as const,
  properties: {
    "@odata.type": nullableEnum([
      "#microsoft.graph.fileAttachment",
      "#microsoft.graph.itemAttachment",
      "#microsoft.graph.referenceAttachment",
    ]),
    contentType: nullableString,
    id: { type: "string" },
    isInline: nullableBoolean,
    lastModifiedDateTime: nullableDateTime,
    name: nullableString,
    size: nullableInteger,
  },
  required: ["id"],
};

const attachmentListSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": nullableString,
    value: { type: "array" as const, items: attachmentMetadataSchema },
  },
  required: ["value"],
};

export const listMessageAttachmentsOutputSchema = attachmentListSchema;

export const listEventAttachmentsOutputSchema = attachmentListSchema;
