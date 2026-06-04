









export const getTopicExamplePayload = {
  data: {
    name: "projects/my-gcp-project-123456/topics/order-events",
    labels: {
      environment: "production",
      team: "engineering",
      cost_center: "cc-1234",
    },
    messageStoragePolicy: {
      allowedPersistenceRegions: ["us-east1", "us-west1"],
    },
    kmsKeyName:
      "projects/my-gcp-project-123456/locations/us-east1/keyRings/my-keyring/cryptoKeys/my-key",
    schemaSettings: {
      schema: "projects/my-gcp-project-123456/schemas/order-schema",
      encoding: "JSON",
      firstRevisionId: "1a2b3c4d",
      lastRevisionId: "5e6f7g8h",
    },
    satisfiesPzs: false,
    messageRetentionDuration: "86400s",
    alreadyExisted: false,
  },
};

export const createTopicExamplePayload = getTopicExamplePayload;

export const updateTopicExamplePayload = getTopicExamplePayload;

export const listTopicsExamplePayload = {
  data: {
    topics: [
      {
        name: "projects/my-gcp-project-123456/topics/order-events",
        labels: {
          environment: "production",
          team: "engineering",
        },
        messageStoragePolicy: {
          allowedPersistenceRegions: ["us-east1", "us-west1"],
        },
        satisfiesPzs: false,
      },
      {
        name: "projects/my-gcp-project-123456/topics/user-activity",
        labels: {
          environment: "production",
          team: "analytics",
        },
        messageStoragePolicy: {
          allowedPersistenceRegions: ["us-central1"],
        },
        satisfiesPzs: false,
      },
    ],
    nextPageToken: "CAESGwoKcHJvamVjdHMvMRIMc3Vic2NyaXB0aW9ucw",
  },
};

export const deleteTopicExamplePayload = {
  data: {},
};





export const getSubscriptionExamplePayload = {
  data: {
    name: "projects/my-gcp-project-123456/subscriptions/order-processor",
    topic: "projects/my-gcp-project-123456/topics/order-events",
    pushConfig: {
      pushEndpoint: "https://example.com/webhook/pubsub",
      attributes: {
        "x-goog-version": "v1",
      },
      oidcToken: {
        serviceAccountEmail: "my-service-account@my-project.iam.gserviceaccount.com",
        audience: "https://example.com",
      },
    },
    bigqueryConfig: null,
    cloudStorageConfig: null,
    ackDeadlineSeconds: 60,
    retainAckedMessages: false,
    messageRetentionDuration: "604800s",
    labels: {
      environment: "production",
      application: "order-processing",
    },
    enableMessageOrdering: true,
    expirationPolicy: {
      ttl: "2678400s",
    },
    filter: 'attributes.environment = "production"',
    deadLetterPolicy: {
      deadLetterTopic: "projects/my-gcp-project-123456/topics/dead-letter-topic",
      maxDeliveryAttempts: 5,
    },
    retryPolicy: {
      minimumBackoff: "10s",
      maximumBackoff: "600s",
    },
    detached: false,
    enableExactlyOnceDelivery: true,
    topicMessageRetentionDuration: "86400s",
    state: "ACTIVE",
  },
};

export const createSubscriptionExamplePayload = getSubscriptionExamplePayload;

export const updateSubscriptionExamplePayload = getSubscriptionExamplePayload;

export const listSubscriptionsExamplePayload = {
  data: {
    subscriptions: [
      {
        name: "projects/my-gcp-project-123456/subscriptions/order-processor",
        topic: "projects/my-gcp-project-123456/topics/order-events",
        pushConfig: {
          pushEndpoint: "https://example.com/webhook/pubsub",
        },
        ackDeadlineSeconds: 60,
        messageRetentionDuration: "604800s",
        labels: {
          environment: "production",
          application: "order-processing",
        },
        state: "ACTIVE",
      },
      {
        name: "projects/my-gcp-project-123456/subscriptions/analytics-consumer",
        topic: "projects/my-gcp-project-123456/topics/user-activity",
        pushConfig: {},
        ackDeadlineSeconds: 10,
        messageRetentionDuration: "86400s",
        labels: {
          environment: "production",
          team: "analytics",
        },
        state: "ACTIVE",
      },
    ],
    nextPageToken: "CAESGwoKcHJvamVjdHMvMRIMc3Vic2NyaXB0aW9ucw",
  },
};

export const deleteSubscriptionExamplePayload = {
  data: {},
};





export const pullMessagesExamplePayload = {
  data: {
    receivedMessages: [
      {
        ackId: "RUFeQBJMNxkESVMrQwsqWBFOBCEhPjA-RVNEUAYWLF1GSFE3BjYXfHhRDk9eIz81IChFEhQKFF",
        message: {
          data: "eyJvcmRlcklkIjogIjEyMzQ1IiwgImN1c3RvbWVySWQiOiAiNjc4OTAiLCAidG90YWwiOiAxMjMuNDV9",
          attributes: {
            environment: "production",
            orderId: "12345",
            customerId: "67890",
          },
          messageId: "1234567890123456",
          publishTime: "2024-01-16T10:30:00.123Z",
          orderingKey: "customer-67890",
        },
      },
      {
        ackId: "RUFeQBJMNxkESVMrQwsqWBFOBCEhPjA-RVNEUAYWLF1GSFE3BjYXfHhRDk9eIz81IChFEhQKFF",
        message: {
          data: "eyJvcmRlcklkIjogIjEyMzQ2IiwgImN1c3RvbWVySWQiOiAiNjc4OTEiLCAidG90YWwiOiA0NTYuNzh9",
          attributes: {
            environment: "production",
            orderId: "12346",
            customerId: "67891",
          },
          messageId: "1234567890123457",
          publishTime: "2024-01-16T10:30:05.456Z",
          orderingKey: "customer-67891",
        },
      },
    ],
  },
};





export const getPolicyExamplePayload = {
  data: {
    version: 3,
    bindings: [
      {
        role: "roles/pubsub.publisher",
        members: [
          "serviceAccount:my-service-account@my-project.iam.gserviceaccount.com",
          "serviceAccount:gmail-api-push@system.gserviceaccount.com",
        ],
      },
      {
        role: "roles/pubsub.subscriber",
        members: ["serviceAccount:subscriber@my-project.iam.gserviceaccount.com"],
      },
      {
        role: "roles/pubsub.viewer",
        members: ["user:john.doe@example.com", "group:team@example.com"],
        condition: {
          title: "Production environment only",
          description: "Allow access only in production",
          expression: 'resource.name.startsWith("projects/my-gcp-project-123456/")',
        },
      },
    ],
    etag: "BwYFgrUAAAA=",
  },
};

export const setPolicyExamplePayload = getPolicyExamplePayload;





export const updatePushConfigExamplePayload = {
  data: {},
};





export const rawRequestExamplePayload = {
  data: {
    name: "projects/my-gcp-project-123456/topics/order-events",
    labels: {
      environment: "production",
    },
  },
};





export const createWebhookSubscriptionExamplePayload = {
  data: {
    name: "projects/my-gcp-project-123456/subscriptions/webhook-subscriber",
    topic: "projects/my-gcp-project-123456/topics/order-events",
    pushConfig: {
      pushEndpoint: "https://your-webhook-endpoint.com/webhook/abc123",
      attributes: {
        "x-goog-version": "v1",
      },
    },
    ackDeadlineSeconds: 10,
    messageRetentionDuration: "604800s",
    state: "ACTIVE",
    alreadyExisted: false,
  },
};
