import { collectionLinksSchema, resourceLinksSchema } from "./shared";

const accountResourceObject = {
  type: "object" as const,
  properties: {
    type: { type: "string" },
    id: { type: "string" },
    attributes: {
      type: "object" as const,
      properties: {
        testAccount: { type: "boolean" },
        contactInformation: {
          type: "object" as const,
          properties: {
            defaultSenderName: { type: "string" },
            defaultSenderEmail: { type: "string" },
            websiteUrl: { type: ["string", "null"] },
            organizationName: { type: "string" },
            streetAddress: {
              type: "object" as const,
              properties: {
                address1: { type: ["string", "null"] },
                address2: { type: ["string", "null"] },
                city: { type: "string" },
                region: { type: ["string", "null"] },
                country: { type: ["string", "null"] },
                zip: { type: ["string", "null"] },
              },
            },
          },
        },
        industry: { type: ["string", "null"] },
        timezone: { type: "string" },
        preferredCurrency: { type: "string" },
        publicApiKey: { type: "string" },
        locale: { type: "string" },
      },
    },
    links: resourceLinksSchema,
  },
  required: ["type", "id", "attributes", "links"],
};

export const getAccountOutputSchema = {
  type: "object" as const,
  properties: {
    data: accountResourceObject,
    links: resourceLinksSchema,
  },
  required: ["data"],
};

export const listAccountsOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array" as const,
      items: accountResourceObject,
    },
    links: collectionLinksSchema,
  },
  required: ["data", "links"],
};
