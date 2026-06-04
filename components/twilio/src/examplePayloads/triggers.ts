import type { TriggerPayload } from "@prismatic-io/spectral";
import { messagePayload } from "./sms";

















export const pollChangesTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        created: [messagePayload],
        updated: [],
      },
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
    flow: { id: "testFlowId", name: "Test Flow" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};










export const webhookExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json; charset=UTF-8",
      "User-Agent": "TwilioProxy/1.1",
      Host: "hooks.example.com",
    },
    body: { data: undefined },
    rawBody: { data: Buffer.from("Example") },
    queryParameters: null,
    webhookUrls: {
      "Flow 1": "https://hooks.example.com/trigger/EXAMPLEG",
    },
    webhookApiKeys: {
      "Flow 1": ["abc-123"],
    },
    customer: {
      id: "customer-example-id",
      externalId: "customer-example-external-id",
      name: "John Doe",
    },
    pathFragment: "",
    invokeUrl: "",
    executionId: "",
    instance: undefined,
    user: undefined,
    integration: undefined,
    flow: undefined,
    startedAt: "",
    globalDebug: false,
  },
};
