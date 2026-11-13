import { identitySetSchema, quotaSchema, sharepointIdsSchema } from "./common";

export const driveSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    id: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    driveType: {
      type: "string",
      enum: ["personal", "business", "documentLibrary"],
    },
    createdDateTime: { type: "string", format: "date-time" },
    lastModifiedDateTime: { type: "string", format: "date-time" },
    webUrl: { type: "string" },
    createdBy: identitySetSchema,
    lastModifiedBy: identitySetSchema,
    owner: identitySetSchema,
    quota: quotaSchema,
    sharepointIds: sharepointIdsSchema,
    system: { type: "object" },
  },
  required: ["id"],
};

const driveCollectionSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: { type: "array", items: driveSchema },
    "@odata.nextLink": { type: "string" },
  },
  required: ["value"],
};

export const getDriveOutputSchema = driveSchema;

export const listDrivesOutputSchema = driveCollectionSchema;

export const listDrivesByGroupOutputSchema = driveCollectionSchema;

export const listDrivesBySiteOutputSchema = driveCollectionSchema;

export const listDrivesByUserOutputSchema = driveCollectionSchema;
