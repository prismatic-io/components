import type { TriggerPayload } from "@prismatic-io/spectral";
export const getConsumerGroupStatusExamplePayload = {
  data: {
    groupId: "order-processing-group",
    state: "Stable",
    protocolType: "consumer",
    protocol: "RoundRobinAssigner",
    members: [
      {
        memberId: "order-processor-a2f4c8e1-7b3d-4e9a-b5c6-d8f0e1a2b3c4",
        clientId: "order-processor",
        clientHost: "/10.0.1.42",
      },
    ],
    topicsWithOffsets: [
      {
        topic: "order-events",
        partitions: [
          {
            partition: 0,
            committedOffset: "1250",
            currentOffset: "1255",
            lag: "5",
          },
          {
            partition: 1,
            committedOffset: "980",
            currentOffset: "980",
            lag: "0",
          },
        ],
        totalLag: "5",
      },
    ],
    totalLag: "5",
  },
};
export const kafkaConsumerExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        messages: [
          {
            topic: "order-events",
            partition: 0,
            offset: "142",
            key: "order-12345",
            value: {
              orderId: "order-12345",
              customerId: "cust-67890",
              amount: 99.99,
              currency: "USD",
              status: "COMPLETED",
            },
            timestamp: "1720281600000",
            headers: {},
          },
          {
            topic: "order-events",
            partition: 0,
            offset: "143",
            key: "order-12346",
            value: {
              orderId: "order-12346",
              customerId: "cust-11111",
              amount: 149.5,
              currency: "EUR",
              status: "PENDING",
            },
            timestamp: "1720281601000",
            headers: {},
          },
        ],
        messageCount: 2,
        consumerGroupId: "order-processing-group",
        topics: ["order-events"],
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
      name: "Test User",
      email: "user@example.com",
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
      stableId: "testStableId",
    },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
