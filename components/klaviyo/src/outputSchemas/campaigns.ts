import {
  collectionLinksSchema,
  includedItemSchema,
  resourceLinksSchema,
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
            excluded: { type: "array" as const, items: { type: "string" } },
          },
        },
        sendOptions: { type: "object" as const },
        trackingOptions: { type: "object" as const },
        sendStrategy: {
          type: "object" as const,
          properties: {
            method: { type: "string" },
            optionsStatic: {
              type: "object" as const,
              properties: {
                datetime: { type: "string", format: "date-time" },
                isLocal: { type: "boolean" },
                sendPastRecipientsImmediately: { type: "boolean" },
              },
            },
            optionsThrottled: {
              type: "object" as const,
              properties: {
                datetime: { type: "string", format: "date-time" },
                throttlePercentage: { type: "number" },
              },
            },
            optionsSto: {
              type: "object" as const,
              properties: {
                date: { type: "string" },
              },
            },
          },
        },
        createdAt: { type: "string", format: "date-time" },
        scheduledAt: { type: ["string", "null"] },
        updatedAt: { type: "string", format: "date-time" },
        sendTime: { type: ["string", "null"] },
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
