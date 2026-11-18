import type { TriggerPayload } from "@prismatic-io/spectral";
import { TriggerBranches } from "../constants";

const USER_ID = "87d349ed-44d7-43e1-9a83-5f2406dee5bd";
const GROUP_ID = "b320ee12-b1cd-4cca-b648-a437be61c5cd";
const SUBSCRIPTION_ID = "7f105c7d-2dc5-4530-97cd-4e7ae6534c07";
const TENANT_ID = "84bd8158-6d4d-4958-8b9f-9d6445542f95";

const changeNotification = (
  resource: string,
  odataType: string,
  id: string,
) => ({
  value: [
    {
      subscriptionId: SUBSCRIPTION_ID,
      subscriptionExpirationDateTime: "2026-12-01T00:00:00.0000000Z",
      changeType: "updated",
      resource,
      resourceData: {
        "@odata.type": odataType,
        "@odata.id": resource,
        id,
        organizationId: TENANT_ID,
      },
      clientState: null,
      tenantId: TENANT_ID,
    },
  ],
});

const triggerPayloadAttributes: Omit<TriggerPayload, "body"> = {
  headers: { "content-type": "application/json; charset=utf-8" },
  queryParameters: {},
  rawBody: { data: null },
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
};

export const webhookExamplePayload: {
  payload: TriggerPayload;
  branch: TriggerBranches;
} = {
  payload: {
    ...triggerPayloadAttributes,
    body: {
      data: changeNotification(
        `Users/${USER_ID}`,
        "#Microsoft.Graph.User",
        USER_ID,
      ),
    },
  },
  branch: TriggerBranches.Notification,
};

export const userTriggerExamplePayload: {
  payload: TriggerPayload;
  branch: TriggerBranches;
} = {
  payload: {
    ...triggerPayloadAttributes,
    body: {
      data: changeNotification(
        `Users/${USER_ID}`,
        "#Microsoft.Graph.User",
        USER_ID,
      ),
    },
  },
  branch: TriggerBranches.Notification,
};

export const groupTriggerExamplePayload: {
  payload: TriggerPayload;
  branch: TriggerBranches;
} = {
  payload: {
    ...triggerPayloadAttributes,
    body: {
      data: changeNotification(
        `Groups/${GROUP_ID}`,
        "#Microsoft.Graph.Group",
        GROUP_ID,
      ),
    },
  },
  branch: TriggerBranches.Notification,
};
