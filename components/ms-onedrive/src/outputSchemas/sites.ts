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
    siteCollection: {
      type: "object",
      properties: {
        hostname: { type: "string" },
        dataLocationCode: { type: "string" },
        root: { type: "object" },
      },
    },
    sharepointIds: sharepointIdsSchema,
  },
  required: ["id"],
};

export const getSiteOutputSchema = siteSchema;

export const listSitesOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: { type: "array", items: siteSchema },
    "@odata.nextLink": { type: "string" },
  },
  required: ["value"],
};
