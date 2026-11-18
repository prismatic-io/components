import { deleteResultSchema, odataCollectionSchema } from "./common";

const subscriptionSchema = {
  type: "object" as const,
  properties: {
    applicationId: { type: ["string", "null"] },
    changeType: { type: "string" },
    clientState: { type: ["string", "null"] },
    creatorId: { type: ["string", "null"] },
    encryptionCertificate: { type: ["string", "null"] },
    encryptionCertificateId: { type: ["string", "null"] },
    expirationDateTime: { type: "string", format: "date-time" },
    id: { type: "string" },
    includeResourceData: { type: ["boolean", "null"] },
    latestSupportedTlsVersion: {
      type: ["string", "null"],
      enum: ["v1_0", "v1_1", "v1_2", "v1_3", null],
    },
    lifecycleNotificationUrl: { type: ["string", "null"] },
    notificationQueryOptions: { type: ["string", "null"] },
    notificationUrl: { type: "string" },
    notificationUrlAppId: { type: ["string", "null"] },
    resource: { type: "string" },
    vapidPublicKey: { type: ["string", "null"] },
    webPushEncryptionP256dhPublicKey: { type: ["string", "null"] },
    webPushEncryptionSecret: { type: ["string", "null"] },
    notificationContentType: { type: ["string", "null"] },
  },
  required: [
    "id",
    "resource",
    "changeType",
    "notificationUrl",
    "expirationDateTime",
  ],
};

export const getSubscriptionOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...subscriptionSchema.properties,
  },
  required: subscriptionSchema.required,
};

export const listSubscriptionsOutputSchema = {
  type: "object" as const,
  properties: {
    ...odataCollectionSchema.properties,
    value: { type: "array", items: subscriptionSchema },
  },
  required: ["value"],
};

export const updateSubscriptionOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...subscriptionSchema.properties,
  },
  required: subscriptionSchema.required,
};

export const deleteSubscriptionOutputSchema = deleteResultSchema;

export const createSubscriptionOutputSchema = {
  type: "array" as const,
  items: subscriptionSchema,
};

export const deleteAllSubscriptionOutputSchema = {
  type: "array" as const,
  items: { type: "string" },
};
