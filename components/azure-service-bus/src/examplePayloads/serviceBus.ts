










import type { ServiceBusMessage } from "@azure/service-bus";








export const getNamespacesExamplePayload = {
  data: {
    sku: {
      name: "Standard",
      tier: "Standard",
    },
    id: "/subscriptions/5f750a97-50d9-4e36-8081-c9ee4c0210d4/resourceGroups/ArunMonocle/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-2924",
    name: "sdk-Namespace-2924",
    type: "Microsoft.ServiceBus/Namespaces",
    location: "South Central US",
    tags: {
      tag1: "value1",
      tag2: "value2",
    },
    properties: {
      provisioningState: "Succeeded",
      metricId: "5f750a97-50d9-4e36-8081-c9ee4c0210d4:sdk-namespace-2924",
      createdAt: "2017-05-25T22:26:36.76Z",
      updatedAt: "2017-05-25T22:26:59.35Z",
      serviceBusEndpoint:
        "https://sdk-Namespace-2924.servicebus.windows-int.net:443/",
      disableLocalAuth: false,
    },
  },
};






export const createOrUpdateNamespacesExamplePayload = {
  data: {
    sku: {
      name: "Standard",
      tier: "Standard",
    },
    id: "/subscriptions/5f750a97-50d9-4e36-8081-c9ee4c0210d4/resourceGroups/ArunMonocle/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-2924",
    name: "sdk-Namespace-2924",
    type: "Microsoft.ServiceBus/Namespaces",
    location: "South Central US",
    tags: {
      tag1: "value1",
      tag2: "value2",
    },
    properties: {
      provisioningState: "Succeeded",
      metricId: "5f750a97-50d9-4e36-8081-c9ee4c0210d4:sdk-namespace-2924",
      createdAt: "2017-05-25T22:26:36.76Z",
      updatedAt: "2017-05-25T22:26:59.35Z",
      serviceBusEndpoint:
        "https://sdk-Namespace-2924.servicebus.windows-int.net:443/",
      disableLocalAuth: false,
    },
  },
};






export const listNamespacesExamplePayload = {
  data: {
    value: [
      {
        sku: {
          name: "Standard",
          tier: "Standard",
        },
        id: "/subscriptions/5f750a97-50d9-4e36-8081-c9ee4c0210d4/resourceGroups/ArunMonocle/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-2924",
        name: "sdk-Namespace-2924",
        type: "Microsoft.ServiceBus/Namespaces",
        location: "South Central US",
        tags: {
          tag1: "value1",
          tag2: "value2",
        },
        properties: {
          provisioningState: "Succeeded",
          metricId: "5f750a97-50d9-4e36-8081-c9ee4c0210d4:sdk-namespace-2924",
          createdAt: "2017-05-25T22:26:36.76Z",
          updatedAt: "2017-05-25T22:26:59.35Z",
          serviceBusEndpoint:
            "https://sdk-Namespace-2924.servicebus.windows-int.net:443/",
          disableLocalAuth: false,
        },
      },
    ],
  },
};






export const listNamespacesByResourceGroupExamplePayload = {
  data: {
    value: [
      {
        sku: {
          name: "Standard",
          tier: "Standard",
        },
        id: "/subscriptions/5f750a97-50d9-4e36-8081-c9ee4c0210d4/resourceGroups/ArunMonocle/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-2924",
        name: "sdk-Namespace-2924",
        type: "Microsoft.ServiceBus/Namespaces",
        location: "South Central US",
        tags: {
          tag1: "value1",
          tag2: "value2",
        },
        properties: {
          provisioningState: "Succeeded",
          metricId: "5f750a97-50d9-4e36-8081-c9ee4c0210d4:sdk-namespace-2924",
          createdAt: "2017-05-25T22:26:36.76Z",
          updatedAt: "2017-05-25T22:26:59.35Z",
          serviceBusEndpoint:
            "https://sdk-Namespace-2924.servicebus.windows-int.net:443/",
          disableLocalAuth: false,
        },
      },
    ],
  },
};






export const deleteNamespaceExamplePayload = {
  data: null,
};








export const getQueueExamplePayload = {
  data: {
    id: "/subscriptions/5f750a97-50d9-4e36-8081-c9ee4c0210d4/resourceGroups/ArunMonocle/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-3174/queues/sdk-Queues-5647",
    name: "sdk-Queues-5647",
    type: "Microsoft.ServiceBus/Namespaces/Queues",
    properties: {
      lockDuration: "PT1M",
      maxSizeInMegabytes: 163840,
      maxMessageSizeInKilobytes: 10240,
      requiresDuplicateDetection: false,
      requiresSession: false,
      defaultMessageTimeToLive: "P10675199DT2H48M5.4775807S",
      duplicateDetectionHistoryTimeWindow: "PT10M",
      maxDeliveryCount: 10,
      sizeInBytes: 0,
      messageCount: 0,
      status: "Active",
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      enablePartitioning: true,
      enableExpress: false,
      createdAt: "2017-05-26T18:07:32.4592931Z",
      updatedAt: "2017-05-26T18:07:34.6243761Z",
      accessedAt: "0001-01-01T00:00:00Z",
    },
  },
};






export const createOrUpdateQueueExamplePayload = {
  data: {
    id: "/subscriptions/5f750a97-50d9-4e36-8081-c9ee4c0210d4/resourceGroups/ArunMonocle/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-3174/queues/sdk-Queues-5647",
    name: "sdk-Queues-5647",
    type: "Microsoft.ServiceBus/Namespaces/Queues",
    properties: {
      lockDuration: "PT1M",
      maxSizeInMegabytes: 163840,
      maxMessageSizeInKilobytes: 10240,
      requiresDuplicateDetection: false,
      requiresSession: false,
      defaultMessageTimeToLive: "P10675199DT2H48M5.4775807S",
      duplicateDetectionHistoryTimeWindow: "PT10M",
      maxDeliveryCount: 10,
      sizeInBytes: 0,
      messageCount: 0,
      status: "Active",
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      enablePartitioning: true,
      enableExpress: false,
      createdAt: "2017-05-26T18:07:32.4592931Z",
      updatedAt: "2017-05-26T18:07:34.6243761Z",
      accessedAt: "0001-01-01T00:00:00Z",
    },
  },
};






export const listQueuesExamplePayload = {
  data: {
    value: [
      {
        id: "/subscriptions/5f750a97-50d9-4e36-8081-c9ee4c0210d4/resourceGroups/ArunMonocle/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-3174/queues/sdk-queues-5647",
        name: "sdk-queues-5647",
        type: "Microsoft.ServiceBus/Namespaces/Queues",
        properties: {
          lockDuration: "PT1M",
          maxSizeInMegabytes: 163840,
          maxMessageSizeInKilobytes: 10240,
          requiresDuplicateDetection: false,
          requiresSession: false,
          defaultMessageTimeToLive: "P10675199DT2H48M5.4775807S",
          duplicateDetectionHistoryTimeWindow: "PT10M",
          maxDeliveryCount: 10,
          sizeInBytes: 0,
          messageCount: 0,
          status: "Active",
          autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
          enablePartitioning: true,
          enableExpress: false,
          createdAt: "2017-05-26T18:07:32.4592931Z",
          updatedAt: "2017-05-26T18:07:34.6243761Z",
          accessedAt: "0001-01-01T00:00:00Z",
        },
      },
    ],
  },
};






export const deleteQueueExamplePayload = {
  data: null,
};








export const getTopicExamplePayload = {
  data: {
    id: "/subscriptions/5f750a97-50d9-4e36-8081-c9ee4c0210d4/resourceGroups/ArunMonocle/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-1617/topics/sdk-Topics-5488",
    name: "sdk-Topics-5488",
    type: "Microsoft.ServiceBus/Namespaces/Topics",
    properties: {
      defaultMessageTimeToLive: "P10675199DT2H48M5.4775807S",
      maxSizeInMegabytes: 10240,
      maxMessageSizeInKilobytes: 10240,
      requiresDuplicateDetection: false,
      duplicateDetectionHistoryTimeWindow: "PT10M",
      enableBatchedOperations: true,
      sizeInBytes: 0,
      status: "Active",
      supportOrdering: true,
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      enablePartitioning: false,
      enableExpress: true,
      createdAt: "2017-05-26T20:50:31.4442694Z",
      updatedAt: "2017-05-26T20:52:32.2092264Z",
      accessedAt: "0001-01-01T00:00:00Z",
      subscriptionCount: 0,
    },
  },
};






export const createOrUpdateTopicExamplePayload = {
  data: {
    id: "/subscriptions/5f750a97-50d9-4e36-8081-c9ee4c0210d4/resourceGroups/ArunMonocle/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-1617/topics/sdk-Topics-5488",
    name: "sdk-Topics-5488",
    type: "Microsoft.ServiceBus/Namespaces/Topics",
    properties: {
      defaultMessageTimeToLive: "P10675199DT2H48M5.4775807S",
      maxSizeInMegabytes: 10240,
      maxMessageSizeInKilobytes: 10240,
      requiresDuplicateDetection: false,
      duplicateDetectionHistoryTimeWindow: "PT10M",
      enableBatchedOperations: true,
      sizeInBytes: 0,
      status: "Active",
      supportOrdering: true,
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      enablePartitioning: false,
      enableExpress: true,
      createdAt: "2017-05-26T20:50:31.4442694Z",
      updatedAt: "2017-05-26T20:52:32.2092264Z",
      accessedAt: "0001-01-01T00:00:00Z",
      subscriptionCount: 0,
    },
  },
};






export const listTopicsByNamespaceExamplePayload = {
  data: {
    value: [
      {
        id: "/subscriptions/5f750a97-50d9-4e36-8081-c9ee4c0210d4/resourceGroups/ArunMonocle/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-1617/topics/sdk-Topics-5488",
        name: "sdk-Topics-5488",
        type: "Microsoft.ServiceBus/Namespaces/Topics",
        properties: {
          defaultMessageTimeToLive: "P10675199DT2H48M5.4775807S",
          maxSizeInMegabytes: 10240,
          maxMessageSizeInKilobytes: 10240,
          requiresDuplicateDetection: false,
          duplicateDetectionHistoryTimeWindow: "PT10M",
          enableBatchedOperations: true,
          sizeInBytes: 0,
          status: "Active",
          supportOrdering: true,
          autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
          enablePartitioning: false,
          enableExpress: true,
          createdAt: "2017-05-26T20:50:31.4442694Z",
          updatedAt: "2017-05-26T20:52:32.2092264Z",
          accessedAt: "0001-01-01T00:00:00Z",
          subscriptionCount: 0,
        },
      },
    ],
  },
};






export const deleteTopicExamplePayload = {
  data: null,
};








export const getSubscriptionsExamplePayload = {
  data: {
    id: "/subscriptions/Subscriptionid/resourceGroups/ResourceGroup/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-1349/topics/sdk-Topics-8740/subscriptions/sdk-Subscriptions-2178",
    name: "sdk-Subscriptions-2178",
    type: "Microsoft.ServiceBus/Namespaces/Topics/Subscriptions",
    properties: {
      lockDuration: "PT1M",
      requiresSession: false,
      defaultMessageTimeToLive: "P10675199DT2H48M5.4775807S",
      deadLetteringOnMessageExpiration: true,
      deadLetteringOnFilterEvaluationExceptions: true,
      messageCount: 0,
      maxDeliveryCount: 10,
      status: "Active",
      enableBatchedOperations: true,
      createdAt: "2021-01-04T18:02:20.5992764Z",
      updatedAt: "2021-01-04T18:02:20.5992764Z",
      accessedAt: "2021-01-04T18:02:20.5992764Z",
      countDetails: {
        activeMessageCount: 0,
        deadLetterMessageCount: 0,
        scheduledMessageCount: 0,
        transferMessageCount: 0,
        transferDeadLetterMessageCount: 0,
      },
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      forwardTo: "sdk-Topics-3065",
      forwardDeadLetteredMessagesTo: "sdk-Topics-3065",
    },
  },
};






export const createOrUpdateSubscriptionExamplePayload = {
  data: {
    id: "/subscriptions/Subscriptionid/resourceGroups/ResourceGroup/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-1349/topics/sdk-Topics-8740/subscriptions/sdk-Subscriptions-2178",
    name: "sdk-Subscriptions-2178",
    type: "Microsoft.ServiceBus/Namespaces/Topics/Subscriptions",
    properties: {
      lockDuration: "PT1M",
      requiresSession: false,
      defaultMessageTimeToLive: "P10675199DT2H48M5.4775807S",
      deadLetteringOnMessageExpiration: true,
      deadLetteringOnFilterEvaluationExceptions: true,
      messageCount: 0,
      maxDeliveryCount: 10,
      status: "Active",
      enableBatchedOperations: true,
      createdAt: "2021-01-04T18:02:20.5992764Z",
      updatedAt: "2021-01-04T18:02:20.5992764Z",
      accessedAt: "2021-01-04T18:02:20.5992764Z",
      countDetails: {
        activeMessageCount: 0,
        deadLetterMessageCount: 0,
        scheduledMessageCount: 0,
        transferMessageCount: 0,
        transferDeadLetterMessageCount: 0,
      },
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
    },
  },
};






export const listSubscriptionsByTopicExamplePayload = {
  data: {
    value: [
      {
        id: "/subscriptions/Subscriptionid/resourceGroups/ResourceGroup/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-1349/topics/sdk-Topics-8740/subscriptions/sdk-Subscriptions-2178",
        name: "sdk-Subscriptions-2178",
        type: "Microsoft.ServiceBus/Namespaces/Topics/Subscriptions",
        properties: {
          lockDuration: "PT1M",
          requiresSession: false,
          defaultMessageTimeToLive: "P10675199DT2H48M5.4775807S",
          deadLetteringOnMessageExpiration: true,
          deadLetteringOnFilterEvaluationExceptions: true,
          messageCount: 0,
          maxDeliveryCount: 10,
          status: "Active",
          enableBatchedOperations: true,
          createdAt: "2021-01-04T18:02:20.5992764Z",
          updatedAt: "2021-01-04T18:02:20.5992764Z",
          accessedAt: "2021-01-04T18:02:20.5992764Z",
          countDetails: {
            activeMessageCount: 0,
            deadLetterMessageCount: 0,
            scheduledMessageCount: 0,
            transferMessageCount: 0,
            transferDeadLetterMessageCount: 0,
          },
          autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
        },
      },
    ],
  },
};






export const deleteSubscriptionsExamplePayload = {
  data: null,
};








export const getRuleExamplePayload = {
  data: {
    id: "/subscriptions/5f750a97-50d9-4e36-8081-c9ee4c0210d4/resourceGroups/ArunMonocle/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-1319/topics/sdk-Topics-2081/subscriptions/sdk-Subscriptions-8691/rules/sdk-Rules-6571",
    name: "sdk-Rules-6571",
    type: "Microsoft.ServiceBus/Namespaces/Topics/Subscriptions/Rules",
    properties: {
      action: {},
      filterType: "SqlFilter",
      sqlFilter: {
        sqlExpression: "1=1",
        compatibilityLevel: 20,
      },
    },
  },
};






export const createOrUpdateRulesExamplePayload = {
  data: {
    id: "/subscriptions/5f750a97-50d9-4e36-8081-c9ee4c0210d4/resourceGroups/ArunMonocle/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-1319/topics/sdk-Topics-2081/subscriptions/sdk-Subscriptions-8691/rules/sdk-Rules-6571",
    name: "sdk-Rules-6571",
    type: "Microsoft.ServiceBus/Namespaces/Topics/Subscriptions/Rules",
    properties: {
      action: {},
      filterType: "SqlFilter",
      sqlFilter: {
        sqlExpression: "1=1",
        compatibilityLevel: 20,
      },
    },
  },
};






export const listRulesExamplePayload = {
  data: {
    value: [
      {
        id: "/subscriptions/5f750a97-50d9-4e36-8081-c9ee4c0210d4/resourceGroups/ArunMonocle/providers/Microsoft.ServiceBus/namespaces/sdk-Namespace-1319/topics/sdk-Topics-2081/subscriptions/sdk-Subscriptions-8691/rules/sdk-Rules-6571",
        name: "sdk-Rules-6571",
        type: "Microsoft.ServiceBus/Namespaces/Topics/Subscriptions/Rules",
        properties: {
          action: {},
          filterType: "SqlFilter",
          sqlFilter: {
            sqlExpression: "1=1",
            compatibilityLevel: 20,
          },
        },
      },
    ],
  },
};






export const deleteRuleExamplePayload = {
  data: null,
};









export const sendMessageToQueueExamplePayload: { data: ServiceBusMessage } = {
  data: {
    body: "Hello, Service Bus!",
    contentType: "application/json",
    messageId: "msg-abc123-def456",
    subject: "order-notification",
    to: "order-processor",
  },
};







export const sendMessagesToQueueExamplePayload = {
  data: [{ body: "First message" }, { body: "Second message" }],
};







export const receiveMessagesFromQueueExamplePayload = {
  data: ["First message body", "Second message body"],
};
