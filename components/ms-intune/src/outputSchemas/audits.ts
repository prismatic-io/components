import { odataCollectionSchema } from "./common";
import { keyValueSchema } from "./graphTypes";

const appIdentitySchema = {
  type: "object" as const,
  properties: {
    appId: { type: ["string", "null"] },
    displayName: { type: ["string", "null"] },
    servicePrincipalId: { type: ["string", "null"] },
    servicePrincipalName: { type: ["string", "null"] },
  },
};

const userIdentitySchema = {
  type: "object" as const,
  properties: {
    displayName: { type: ["string", "null"] },
    id: { type: ["string", "null"] },
    ipAddress: { type: ["string", "null"] },
    userPrincipalName: { type: ["string", "null"] },
  },
};

const modifiedPropertySchema = {
  type: "object" as const,
  properties: {
    displayName: { type: ["string", "null"] },
    newValue: { type: ["string", "null"] },
    oldValue: { type: ["string", "null"] },
  },
};

const targetResourceSchema = {
  type: "object" as const,
  properties: {
    displayName: { type: ["string", "null"] },
    groupType: {
      type: ["string", "null"],
      enum: ["unifiedGroups", "azureAD", "unknownFutureValue", null],
    },
    id: { type: ["string", "null"] },
    modifiedProperties: { type: "array", items: modifiedPropertySchema },
    type: { type: ["string", "null"] },
    userPrincipalName: { type: ["string", "null"] },
  },
};

const directoryAuditSchema = {
  type: "object" as const,
  properties: {
    activityDateTime: { type: ["string", "null"], format: "date-time" },
    activityDisplayName: { type: ["string", "null"] },
    additionalDetails: { type: "array", items: keyValueSchema },
    category: { type: ["string", "null"] },
    correlationId: { type: ["string", "null"] },
    id: { type: "string" },
    initiatedBy: {
      type: ["object", "null"],
      properties: {
        app: { ...appIdentitySchema, type: ["object", "null"] },
        user: { ...userIdentitySchema, type: ["object", "null"] },
      },
    },
    loggedByService: { type: ["string", "null"] },
    operationType: { type: ["string", "null"] },
    result: {
      type: ["string", "null"],
      enum: ["success", "failure", "timeout", "unknownFutureValue", null],
    },
    resultReason: { type: ["string", "null"] },
    targetResources: { type: "array", items: targetResourceSchema },
  },
  required: ["id"],
};

export const getDirectoryAuditOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...directoryAuditSchema.properties,
  },
  required: ["id"],
};

export const listDirectoryAuditsOutputSchema = {
  type: "object" as const,
  properties: {
    ...odataCollectionSchema.properties,
    value: { type: "array", items: directoryAuditSchema },
  },
  required: ["value"],
};
