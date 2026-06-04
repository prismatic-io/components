








export const listWebhooksExamplePayload = {
  data: [
    {
      id: "ach00000000000001",
      specification: {
        options: {
          filters: {
            dataTypes: ["tableData"],
            recordChangeScope: "tbltp8DGLhqbUmjK1",
          },
        },
      },
      notificationUrl: "https://example.com/receive-webhook",
      cursorForNextPayload: 5,
      areNotificationsEnabled: true,
      lastNotificationResult: {
        success: true,
        completionTimestamp: "2022-02-01T21:25:05.663Z",
        durationMs: 2.603,
        retryNumber: 0,
      },
      lastSuccessfulNotificationTime: "2022-02-01T21:25:05.663Z",
      isHookEnabled: true,
      expirationTime: "2023-01-20T00:00:00.000Z",
    },
    {
      id: "ach00000000000002",
      specification: {
        options: {
          filters: {
            dataTypes: ["tableData", "tableMetadata"],
          },
        },
      },
      notificationUrl: "https://hooks.example.io/airtable",
      cursorForNextPayload: 12,
      areNotificationsEnabled: true,
      lastNotificationResult: {
        success: true,
        completionTimestamp: "2022-02-15T14:30:22.145Z",
        durationMs: 1.854,
        retryNumber: 0,
      },
      lastSuccessfulNotificationTime: "2022-02-15T14:30:22.145Z",
      isHookEnabled: true,
      expirationTime: "2023-02-10T00:00:00.000Z",
    },
  ],
};







export const createWebhookExamplePayload = {
  data: {
    id: "ach00000000000001",
    macSecretBase64: "c3VwZXIgZHVwZXIgc2VjcmV0IGtleSBmb3Igd2ViaG9vaw==",
    expirationTime: "2023-01-20T00:00:00.000Z",
  },
};







export const deleteWebhookExamplePayload = {
  data: {},
};






export const refreshWebhookExamplePayload = {
  data: {
    expirationTime: "2023-01-30T00:00:00.000Z",
  },
};
