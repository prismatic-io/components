export const subscriptionSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    id: { type: "string" },
    resource: { type: "string" },
    changeType: { type: "string" },
    notificationUrl: { type: "string" },
    expirationDateTime: { type: "string", format: "date-time" },
    applicationId: { type: ["string", "null"] },
    clientState: { type: ["string", "null"] },
    creatorId: { type: ["string", "null"] },
    encryptionCertificate: { type: ["string", "null"] },
    encryptionCertificateId: { type: ["string", "null"] },
    includeResourceData: { type: ["boolean", "null"] },
    latestSupportedTlsVersion: {
      type: ["string", "null"],
      enum: ["v1_0", "v1_1", "v1_2", "v1_3", null],
    },
    lifecycleNotificationUrl: { type: ["string", "null"] },
    notificationQueryOptions: { type: ["string", "null"] },
    notificationUrlAppId: { type: ["string", "null"] },
    notificationContentType: { type: ["string", "null"] },
    vapidPublicKey: { type: ["string", "null"] },
    webPushEncryptionP256dhPublicKey: { type: ["string", "null"] },
    webPushEncryptionSecret: { type: ["string", "null"] },
  },
  required: ["id", "resource", "changeType", "notificationUrl", "expirationDateTime"],
};

export const createSiteListSubscriptionOutputSchema = subscriptionSchema;

export const updateSiteListSubscriptionExpirationOutputSchema = subscriptionSchema;

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

export const deleteAllInstanceSubscriptionsOutputSchema = {
  type: "object" as const,
  properties: {
    subscriptionsRemoved: { type: "array", items: { type: "string" } },
    count: { type: "integer" },
  },
  required: ["subscriptionsRemoved", "count"],
};
