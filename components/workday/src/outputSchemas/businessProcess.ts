import {
  eventAttachmentsViewSchema,
  idDescriptorReferenceSchema,
  instanceReferenceSchema,
} from "./shared";
export const eventDetailsSchema = {
  type: "object" as const,
  properties: {
    creationDate: {
      type: "string",
      format: "date",
    },
    completedDate: {
      type: "string",
      format: "date",
    },
    status: instanceReferenceSchema,
    effectiveDate: {
      type: "string",
      format: "date",
    },
    dueDate: {
      type: "string",
      format: "date",
    },
    initiator: instanceReferenceSchema,
    subBusinessProcesses: {
      type: "array",
      items: idDescriptorReferenceSchema,
    },
    overallBusinessProcess: instanceReferenceSchema,
    for: instanceReferenceSchema,
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
};
export const getEventAttachmentsOutputSchema = {
  type: ["object", "array"],
  properties: {
    total: {
      type: "integer",
      format: "int64",
    },
    data: {
      type: "array",
      items: eventAttachmentsViewSchema,
    },
  },
  items: eventAttachmentsViewSchema,
  required: [],
  additionalProperties: true,
};
export const getEventByIdOutputSchema = eventDetailsSchema;
export const listEventsOutputSchema = {
  type: ["object", "array"],
  properties: {
    total: {
      type: "integer",
      format: "int64",
    },
    data: {
      type: "array",
      items: eventDetailsSchema,
    },
  },
  items: eventDetailsSchema,
  required: [],
  additionalProperties: true,
};
