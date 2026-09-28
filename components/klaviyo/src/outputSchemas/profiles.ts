import {
  collectionLinksSchema,
  includedItemSchema,
  resourceLinksSchema,
} from "./shared";
const profileResourceObject = {
  type: "object" as const,
  properties: {
    type: { type: "string" },
    id: { type: "string" },
    attributes: {
      type: "object" as const,
      properties: {
        email: { type: ["string", "null"] },
        phoneNumber: { type: ["string", "null"] },
        externalId: { type: ["string", "null"] },
        firstName: { type: ["string", "null"] },
        lastName: { type: ["string", "null"] },
        organization: { type: ["string", "null"] },
        locale: { type: ["string", "null"] },
        title: { type: ["string", "null"] },
        image: { type: ["string", "null"] },
        created: { type: ["string", "null"], format: "date-time" },
        updated: { type: ["string", "null"], format: "date-time" },
        lastEventDate: { type: ["string", "null"], format: "date-time" },
        location: {
          type: ["object", "null"],
          properties: {
            address1: { type: ["string", "null"] },
            address2: { type: ["string", "null"] },
            city: { type: ["string", "null"] },
            country: { type: ["string", "null"] },
            latitude: { type: ["string", "null"] },
            longitude: { type: ["string", "null"] },
            region: { type: ["string", "null"] },
            zip: { type: ["string", "null"] },
            timezone: { type: ["string", "null"] },
            ip: { type: ["string", "null"] },
          },
        },
        properties: { type: ["object", "null"] },
      },
    },
    links: resourceLinksSchema,
  },
  required: ["type", "id", "attributes", "links"],
};
export const createProfileOutputSchema = {
  type: "object" as const,
  properties: {
    data: profileResourceObject,
  },
  required: ["data"],
};
export const getProfileOutputSchema = {
  type: "object" as const,
  properties: {
    data: profileResourceObject,
    included: {
      type: "array" as const,
      items: includedItemSchema,
    },
  },
  required: ["data"],
};
export const listProfileOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array" as const,
      items: profileResourceObject,
    },
    links: collectionLinksSchema,
    included: {
      type: "array" as const,
      items: includedItemSchema,
    },
  },
  required: ["data", "links"],
};
export const listListProfilesOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array" as const,
      items: profileResourceObject,
    },
    links: collectionLinksSchema,
  },
  required: ["data", "links"],
};
export const updateProfileOutputSchema = createProfileOutputSchema;
export const subscribeProfilesOutputSchema = {
  type: "string" as const,
};
export const unsubscribeProfilesOutputSchema = {
  type: "string" as const,
};
