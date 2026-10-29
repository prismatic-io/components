import {
  collectionLinksSchema,
  includedItemSchema,
  resourceLinksSchema,
  toManyRelationshipSchema,
} from "./shared";

const campaignResourceObject = {
  type: "object" as const,
  properties: {
    type: { type: "string" },
    id: { type: "string" },
    attributes: {
      type: "object" as const,
      properties: {
        name: { type: "string" },
        status: { type: "string" },
        archived: { type: "boolean" },
        audiences: {
          type: "object" as const,
          properties: {
            included: { type: "array" as const, items: { type: "string" } },
            excluded: { type: ["array", "null"], items: { type: "string" } },
          },
        },
        sendOptions: {
          type: "object" as const,
          properties: {
            useSmartSending: { type: ["boolean", "null"] },
          },
        },
        trackingOptions: {
          type: ["object", "null"],
          properties: {
            addTrackingParams: { type: ["boolean", "null"] },
            customTrackingParams: {
              type: ["array", "null"],
              items: {
                type: "object" as const,
                properties: {
                  type: { type: "string" },
                  name: { type: "string" },
                  value: { type: "string" },
                },
              },
            },
            isTrackingClicks: { type: ["boolean", "null"] },
            isTrackingOpens: { type: ["boolean", "null"] },
          },
        },
        sendStrategy: {
          type: "object" as const,
          properties: {
            method: { type: "string" },
            datetime: { type: "string", format: "date-time" },
            date: { type: "string" },
            options: {
              type: ["object", "null"],
              properties: {
                isLocal: { type: "boolean" },
                sendPastRecipientsImmediately: { type: "boolean" },
              },
            },
            throttlePercentage: { type: "number" },
          },
        },
        createdAt: { type: "string", format: "date-time" },
        scheduledAt: { type: ["string", "null"] },
        updatedAt: { type: "string", format: "date-time" },
        sendTime: { type: ["string", "null"] },
      },
    },
    relationships: {
      type: "object" as const,
      properties: {
        campaignMessages: toManyRelationshipSchema,
        tags: toManyRelationshipSchema,
      },
    },
    links: resourceLinksSchema,
  },
  required: ["type", "id", "attributes", "links"],
};

export const createCampaignOutputSchema = {
  type: "object" as const,
  properties: {
    data: campaignResourceObject,
    links: resourceLinksSchema,
  },
  required: ["data"],
};

export const getCampaignOutputSchema = {
  type: "object" as const,
  properties: {
    data: campaignResourceObject,
    included: {
      type: "array" as const,
      items: includedItemSchema,
    },
    links: resourceLinksSchema,
  },
  required: ["data"],
};

export const listCampaignsOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array" as const,
      items: campaignResourceObject,
    },
    links: collectionLinksSchema,
    included: {
      type: "array" as const,
      items: includedItemSchema,
    },
  },
  required: ["data", "links"],
};

export const updateCampaignOutputSchema = createCampaignOutputSchema;

export const deleteCampaignOutputSchema = {
  type: "string" as const,
};
