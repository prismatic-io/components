import { sharepointIdsSchema } from "./common";

export const siteSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    id: { type: "string" },
    name: { type: "string" },
    displayName: { type: "string" },
    description: { type: "string" },
    eTag: { type: "string" },
    createdDateTime: { type: "string", format: "date-time" },
    lastModifiedDateTime: { type: "string", format: "date-time" },
    isPersonalSite: { type: "boolean" },
    webUrl: { type: "string" },
    root: { type: "object" },
    sharepointIds: sharepointIdsSchema,
    siteCollection: {
      type: "object",
      properties: {
        hostname: { type: "string" },
        dataLocationCode: { type: "string" },
        root: { type: "object" },
        archivalDetails: {
          type: "object",
          properties: {
            archiveStatus: {
              type: "string",
              enum: ["recentlyArchived", "fullyArchived", "reactivating", "unknownFutureValue"],
            },
          },
        },
      },
    },
  },
  required: ["id"],
};

const siteCollectionPageSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: { type: "array", items: siteSchema },
    "@odata.nextLink": { type: "string" },
  },
  required: ["value"],
};

export const listSitesOutputSchema = siteCollectionPageSchema;

export const listFollowedSitesOutputSchema = siteCollectionPageSchema;

export const getRootSiteOutputSchema = siteSchema;

export const getSiteOutputSchema = siteSchema;
