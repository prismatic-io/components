import { identitySetSchema, sharepointIdsSchema } from "./common";

export const driveSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    id: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    driveType: { type: "string", enum: ["personal", "business", "documentLibrary"] },
    createdDateTime: { type: "string", format: "date-time" },
    lastModifiedDateTime: { type: "string", format: "date-time" },
    webUrl: { type: "string" },
    createdBy: identitySetSchema,
    lastModifiedBy: identitySetSchema,
    owner: identitySetSchema,
    quota: {
      type: "object",
      properties: {
        deleted: { type: "integer" },
        remaining: { type: "integer" },
        total: { type: "integer" },
        used: { type: "integer" },
        state: { type: "string", enum: ["normal", "nearing", "critical", "exceeded"] },
        storagePlanInformation: {
          type: "object",
          properties: { upgradeAvailable: { type: "boolean" } },
        },
      },
    },
    sharepointIds: sharepointIdsSchema,
    system: { type: "object" },
  },
  required: ["id"],
};

export const listDrivesOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: { type: "array", items: driveSchema },
    "@odata.nextLink": { type: "string" },
    "@odata.nextToken": { type: "string" },
  },
  required: ["value"],
};

export const getDriveOutputSchema = driveSchema;
