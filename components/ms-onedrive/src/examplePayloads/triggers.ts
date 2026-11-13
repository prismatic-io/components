import type {
  TriggerBranchingResult,
  TriggerPayload,
} from "@prismatic-io/spectral";

const webhookNotificationExamplePayload = {
  body: {
    data: {
      value: [
        {
          subscriptionId: "38031b7d-16b1-448a-8e68-68b8aec62315",
          clientState: "my-client-state-token",
          changeType: "updated",
          resource: "/me/drive/root",
          subscriptionExpirationDateTime: "2025-01-15T14:30:00.0000000Z",
          resourceData: {
            "@odata.type": "#Microsoft.Graph.DriveItem",
            "@odata.id":
              "/drives/b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd/items/01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
            id: "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
          },
          tenantId: "84df9e7f-e9f6-40af-b435-aaaaaaaaaaaa",
        },
        {
          subscriptionId: "38031b7d-16b1-448a-8e68-68b8aec62315",
          clientState: "my-client-state-token",
          changeType: "updated",
          resource: "/me/drive/root",
          subscriptionExpirationDateTime: "2025-01-15T14:30:00.0000000Z",
          resourceData: {
            "@odata.type": "#Microsoft.Graph.DriveItem",
            "@odata.id":
              "/drives/b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd/items/01BYE5RZ5MYLM2SMX75ZBIPQZIHT6OAYPB",
            id: "01BYE5RZ5MYLM2SMX75ZBIPQZIHT6OAYPB",
          },
          tenantId: "84df9e7f-e9f6-40af-b435-aaaaaaaaaaaa",
        },
      ],
    },
  },
};

export const instanceDeployWebhookExamplePayload: TriggerBranchingResult<TriggerPayload> =
  {
    branch: "Notification",
    payload: {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      queryParameters: {},
      rawBody: { data: null },
      body: {
        data: webhookNotificationExamplePayload.body.data,
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
      flow: {
        id: "testFlowId",
        name: "Test Flow",
        stableId: "testFlowStableId",
      },
      startedAt: "2024-01-15T00:00:00.000Z",
      globalDebug: false,
    },
  };

export const webhookExamplePayload: TriggerBranchingResult<TriggerPayload> = {
  branch: "Notification",
  payload: {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: webhookNotificationExamplePayload.body.data,
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
