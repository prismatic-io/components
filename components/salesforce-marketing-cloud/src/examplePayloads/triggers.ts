import type { TriggerPayload } from "@prismatic-io/spectral";
export const ensWebhookExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "X-SFMC-ENS-Signature": "sGYYE0kMz1sJl0mNXQqIcYqRuYRRPuVGdI5FtF0hDxg=",
    },
    queryParameters: {},
    rawBody: {
      data: '[{"eventCategoryType":"TransactionalSendEvents.EmailSent","timestampUTC":"2024-02-01T15:30:00.000Z","definitionKey":"welcome-email-def","requestId":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","compositeId":"a1b2c3d4-e5f6-7890-abcd-ef1234567890.1","info":{"messageKey":"d4e5f6a7-b8c9-0123-defa-345678901234","contactKey":"subscriber-001","to":"john.doe@example.com","statusCode":200,"statusMessage":"OK"}}]',
      contentType: "application/json",
    },
    body: {
      data: [
        {
          eventCategoryType: "TransactionalSendEvents.EmailSent",
          timestampUTC: "2024-02-01T15:30:00.000Z",
          definitionKey: "welcome-email-def",
          requestId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          compositeId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890.1",
          info: {
            messageKey: "d4e5f6a7-b8c9-0123-defa-345678901234",
            contactKey: "subscriber-001",
            to: "john.doe@example.com",
            statusCode: 200,
            statusMessage: "OK",
          },
        },
        {
          eventCategoryType: "TransactionalSendEvents.EmailBounced",
          timestampUTC: "2024-02-01T15:31:00.000Z",
          definitionKey: "welcome-email-def",
          requestId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
          compositeId: "b2c3d4e5-f6a7-8901-bcde-f12345678901.1",
          info: {
            messageKey: "e5f6a7b8-c9d0-1234-efab-456789012345",
            contactKey: "subscriber-002",
            to: "jane.smith@example.com",
            statusCode: 550,
            statusMessage: "Mailbox not found",
            bounceCode: "1",
            bounceMessage: "Address does not exist",
          },
        },
      ],
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
