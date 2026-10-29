import {
  collectionLinksSchema,
  includedItemSchema,
  resourceLinksSchema,
  toManyRelationshipSchema,
} from "./shared";
const nullableDateTime = { type: ["string", "null"], format: "date-time" };
const consentChannelSchema = {
  type: "object" as const,
  properties: {
    consent: { type: "string" },
    consentTimestamp: nullableDateTime,
    lastUpdated: nullableDateTime,
    createdTimestamp: nullableDateTime,
    metadata: { type: ["object", "null"] },
    canReceive: { type: "boolean" },
    validUntil: nullableDateTime,
  },
  required: ["consent", "canReceive"],
};
const whatsAppChannelSchema = {
  type: "object" as const,
  properties: {
    ...consentChannelSchema.properties,
    phoneNumber: { type: ["string", "null"] },
  },
  required: ["consent", "canReceive"],
};
const smsConsentSchema = (canReceiveKey: string) => ({
  type: "object" as const,
  properties: {
    [canReceiveKey]: { type: "boolean" },
    consent: { type: "string" },
    consentTimestamp: nullableDateTime,
    method: { type: ["string", "null"] },
    methodDetail: { type: ["string", "null"] },
    lastUpdated: nullableDateTime,
  },
  required: [canReceiveKey, "consent"],
});
const subscriptionsSchema = {
  type: "object" as const,
  properties: {
    email: {
      type: "object" as const,
      properties: {
        marketing: {
          type: "object" as const,
          properties: {
            canReceiveEmailMarketing: { type: "boolean" },
            consent: { type: "string" },
            consentTimestamp: nullableDateTime,
            lastUpdated: nullableDateTime,
            method: { type: ["string", "null"] },
            methodDetail: { type: ["string", "null"] },
            customMethodDetail: { type: ["string", "null"] },
            doubleOptin: { type: ["boolean", "null"] },
            suppression: {
              type: ["array", "null"],
              items: {
                type: "object" as const,
                properties: {
                  reason: {
                    type: "string",
                    enum: [
                      "HARD_BOUNCE",
                      "INVALID_EMAIL",
                      "SPAM_COMPLAINT",
                      "UNSUBSCRIBE",
                      "USER_SUPPRESSED",
                    ],
                  },
                  timestamp: { type: "string", format: "date-time" },
                },
                required: ["reason", "timestamp"],
              },
            },
            listSuppressions: {
              type: ["array", "null"],
              items: {
                type: "object" as const,
                properties: {
                  listId: { type: "string" },
                  reason: { type: "string" },
                  timestamp: { type: "string", format: "date-time" },
                },
                required: ["listId", "reason", "timestamp"],
              },
            },
          },
          required: ["canReceiveEmailMarketing", "consent"],
        },
        openTracking: consentChannelSchema,
      },
    },
    sms: {
      type: "object" as const,
      properties: {
        marketing: smsConsentSchema("canReceiveSmsMarketing"),
        transactional: smsConsentSchema("canReceiveSmsTransactional"),
      },
    },
    mobilePush: {
      type: "object" as const,
      properties: {
        marketing: {
          type: "object" as const,
          properties: {
            canReceivePushMarketing: { type: "boolean" },
            consent: { type: "string" },
            consentTimestamp: nullableDateTime,
          },
          required: ["canReceivePushMarketing", "consent"],
        },
      },
    },
    whatsapp: {
      type: "object" as const,
      properties: {
        marketing: whatsAppChannelSchema,
        transactional: whatsAppChannelSchema,
        conversational: whatsAppChannelSchema,
      },
    },
  },
};
const predictiveAnalyticsSchema = {
  type: "object" as const,
  properties: {
    historicClv: { type: ["number", "null"] },
    predictedClv: { type: ["number", "null"] },
    totalClv: { type: ["number", "null"] },
    historicNumberOfOrders: { type: ["number", "null"] },
    predictedNumberOfOrders: { type: ["number", "null"] },
    averageDaysBetweenOrders: { type: ["number", "null"] },
    averageOrderValue: { type: ["number", "null"] },
    churnProbability: { type: ["number", "null"] },
    expectedDateOfNextOrder: nullableDateTime,
    rankedChannelAffinity: {
      type: ["array", "null"],
      items: { type: "string", enum: ["email", "push", "sms", "whatsapp"] },
    },
  },
};
const profileResourceObject = {
  type: "object" as const,
  properties: {
    type: { type: "string" },
    id: { type: ["string", "null"] },
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
            latitude: { type: ["string", "number", "null"] },
            longitude: { type: ["string", "number", "null"] },
            region: { type: ["string", "null"] },
            zip: { type: ["string", "null"] },
            timezone: { type: ["string", "null"] },
            ip: { type: ["string", "null"] },
          },
        },
        properties: { type: ["object", "null"] },
        subscriptions: subscriptionsSchema,
        predictiveAnalytics: predictiveAnalyticsSchema,
      },
    },
    relationships: {
      type: "object" as const,
      properties: {
        lists: toManyRelationshipSchema,
        segments: toManyRelationshipSchema,
        pushTokens: toManyRelationshipSchema,
        conversations: toManyRelationshipSchema,
      },
    },
    links: resourceLinksSchema,
  },
  required: ["type", "attributes", "links"],
};
const listMemberResourceObject = {
  ...profileResourceObject,
  properties: {
    ...profileResourceObject.properties,
    attributes: {
      ...profileResourceObject.properties.attributes,
      properties: {
        ...profileResourceObject.properties.attributes.properties,
        joinedGroupAt: { type: "string", format: "date-time" },
      },
      required: ["joinedGroupAt"],
    },
  },
};
export const createProfileOutputSchema = {
  type: "object" as const,
  properties: {
    data: profileResourceObject,
    links: resourceLinksSchema,
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
    links: resourceLinksSchema,
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
  },
  required: ["data", "links"],
};
export const listListProfilesOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array" as const,
      items: listMemberResourceObject,
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
