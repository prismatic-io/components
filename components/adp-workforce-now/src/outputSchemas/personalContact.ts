import {
  addressSchema,
  codeTypeSchema,
  communicationSchema,
  confirmMessageSchema,
  eventItemBaseSchema,
  eventTransformBaseProperties,
  idTypeSchema,
  linksSchema,
  metaSchema,
  openObjectArraySchema,
  personNameSchema,
  resourceMetaResponseSchema,
} from "./common";

const personalContactSchema = {
  type: "object" as const,
  properties: {
    itemID: { type: "string" },
    personName: personNameSchema,
    address: addressSchema,
    communication: communicationSchema,
    contactTypeCode: codeTypeSchema,
    relationshipTypeCode: codeTypeSchema,
    precedenceCode: codeTypeSchema,
    personalContactComments: openObjectArraySchema,
    links: linksSchema,
  },
};

const personalContactsResponseSchema = {
  type: "object" as const,
  properties: {
    personalContacts: { type: "array", items: personalContactSchema },
    meta: metaSchema,
    confirmMessage: confirmMessageSchema,
  },
};

const personalContactEventContextSchema = {
  type: "object" as const,
  properties: {
    contextExpressionID: { type: "string" },
    worker: {
      type: "object" as const,
      properties: {
        associateOID: { type: "string" },
        workerID: idTypeSchema,
      },
    },
    personalContact: {
      type: "object" as const,
      properties: { itemID: { type: "string" } },
    },
  },
};

const personalContactOutputRegion = {
  type: "object" as const,
  properties: { personalContact: personalContactSchema },
};

const personalContactWriteEventSchema = {
  type: "object" as const,
  properties: {
    ...eventItemBaseSchema.properties,
    data: {
      type: "object" as const,
      properties: {
        eventContext: personalContactEventContextSchema,
        transform: {
          type: "object" as const,
          properties: {
            ...eventTransformBaseProperties,
            personalContact: personalContactSchema,
          },
        },
        output: personalContactOutputRegion,
      },
    },
  },
};

const personalContactWriteResponseSchema = {
  type: "object" as const,
  properties: {
    events: { type: "array", items: personalContactWriteEventSchema },
    meta: metaSchema,
    confirmMessage: confirmMessageSchema,
  },
};

export const addPersonalContactOutputSchema = {
  type: "object" as const,
  properties: { ...personalContactWriteResponseSchema.properties },
};

export const updatePersonalContactOutputSchema = {
  type: "object" as const,
  properties: { ...personalContactWriteResponseSchema.properties },
};

const personalContactRemoveEventSchema = {
  type: "object" as const,
  properties: {
    ...eventItemBaseSchema.properties,
    data: {
      type: "object" as const,
      properties: {
        eventContext: personalContactEventContextSchema,
        transform: {
          type: "object" as const,
          properties: { ...eventTransformBaseProperties },
        },
        output: personalContactOutputRegion,
      },
    },
  },
};

export const deletePersonalContactOutputSchema = {
  type: "object" as const,
  properties: {
    events: { type: "array", items: personalContactRemoveEventSchema },
    meta: metaSchema,
    confirmMessage: confirmMessageSchema,
  },
};

export const getPersonalContactOutputSchema = {
  type: "object" as const,
  properties: { ...personalContactsResponseSchema.properties },
};

export const listPersonalContactsOutputSchema = {
  type: "object" as const,
  properties: { ...personalContactsResponseSchema.properties },
};

export const getPersonalContactMetaOutputSchema = {
  type: "object" as const,
  properties: { ...resourceMetaResponseSchema.properties },
};
