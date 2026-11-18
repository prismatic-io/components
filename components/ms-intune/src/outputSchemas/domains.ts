import { odataCollectionSchema } from "./common";

const domainStateSchema = {
  type: "object" as const,
  properties: {
    lastActionDateTime: { type: ["string", "null"], format: "date-time" },
    operation: { type: ["string", "null"] },
    status: { type: ["string", "null"] },
  },
};

const domainSchema = {
  type: "object" as const,
  properties: {
    authenticationType: { type: ["string", "null"] },
    availabilityStatus: { type: ["string", "null"] },
    id: { type: "string" },
    isAdminManaged: { type: ["boolean", "null"] },
    isDefault: { type: ["boolean", "null"] },
    isInitial: { type: ["boolean", "null"] },
    isRoot: { type: ["boolean", "null"] },
    isVerified: { type: ["boolean", "null"] },
    passwordNotificationWindowInDays: { type: ["integer", "null"] },
    passwordValidityPeriodInDays: { type: ["integer", "null"] },
    state: { ...domainStateSchema, type: ["object", "null"] },
    supportedServices: { type: "array", items: { type: "string" } },
  },
};

export const listDomainsOutputSchema = {
  type: "object" as const,
  properties: {
    ...odataCollectionSchema.properties,
    value: { type: "array", items: domainSchema },
  },
  required: ["value"],
};
