import type { pollTablePerform } from "./triggers/pollTablePerform";
export const queryExamplePayload = {
  data: [
    {
      id: 1,
      first_name: "Jane",
      last_name: "Doe",
      email: "jane.doe@example.com",
      created_at: "2025-08-15T14:32:00.000Z",
      is_active: true,
    },
    {
      id: 2,
      first_name: "John",
      last_name: "Smith",
      email: "john.smith@example.com",
      created_at: "2025-09-01T09:15:00.000Z",
      is_active: false,
    },
  ],
};
export const pollTableExamplePayload = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: [
        {
          id: 1,
          first_name: "Jane",
          last_name: "Doe",
          email: "jane.doe@example.com",
          created_at: "2025-08-15T14:32:00.000Z",
          updated_at: "2025-08-15T14:32:00.000Z",
          is_active: true,
        },
        {
          id: 2,
          first_name: "John",
          last_name: "Smith",
          email: "john.smith@example.com",
          created_at: "2025-09-01T09:15:00.000Z",
          updated_at: "2025-09-02T11:48:00.000Z",
          is_active: false,
        },
      ],
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
    paginationState: undefined,
  },
  polledNoChanges: false,
} satisfies Awaited<ReturnType<typeof pollTablePerform>>;
