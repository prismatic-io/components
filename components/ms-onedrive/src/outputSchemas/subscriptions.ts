export const subscriptionSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    id: { type: "string" },
    applicationId: { type: "string" },
    changeType: { type: "string" },
    resource: { type: "string" },
    notificationUrl: { type: "string" },
    lifecycleNotificationUrl: { type: ["string", "null"] },
    expirationDateTime: { type: "string", format: "date-time" },
    clientState: { type: ["string", "null"] },
    creatorId: { type: "string" },
    includeResourceData: { type: ["boolean", "null"] },
    encryptionCertificate: { type: ["string", "null"] },
    encryptionCertificateId: { type: ["string", "null"] },
    latestSupportedTlsVersion: {
      type: "string",
      enum: ["v1_0", "v1_1", "v1_2", "v1_3"],
    },
    notificationQueryOptions: { type: ["string", "null"] },
    notificationUrlAppId: { type: ["string", "null"] },
    notificationContentType: { type: ["string", "null"] },
    vapidPublicKey: { type: ["string", "null"] },
    webPushEncryptionP256dhPublicKey: { type: ["string", "null"] },
    webPushEncryptionSecret: { type: ["string", "null"] },
  },
  required: [
    "id",
    "changeType",
    "resource",
    "notificationUrl",
    "expirationDateTime",
  ],
};

export const createSubscriptionOutputSchema = subscriptionSchema;

export const renewSubscriptionOutputSchema = subscriptionSchema;

export const listSubscriptionsOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: { type: "array", items: subscriptionSchema },
    "@odata.nextLink": { type: "string" },
  },
  required: ["value"],
};

export const deleteSubscriptionsOutputSchema = {
  type: "object" as const,
  properties: {
    message: { type: "string" },
    subscriptionsRemoved: { type: "array", items: { type: "string" } },
  },
  required: [],
};
