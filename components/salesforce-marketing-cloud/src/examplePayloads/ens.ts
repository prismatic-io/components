export const listCallbacksExamplePayload = {
  data: [
    {
      callbackId: "14e2ee5b-8c01-4f9d-916d-29e329945619",
      callbackName: "Example Callback",
      url: "https://webhook.example.com/callback/example-endpoint",
      maxBatchSize: 1000,
      status: "verified",
      statusReason: "",
    },
  ],
};

export const createCallbackExamplePayload = {
  data: [
    {
      callbackName: "Example Callback 1",
      callbackId: "65b885ab-c2b4-46fe-85d0-d6cb8be8057d",
      url: "https://example.com/",
      signatureKey: "V27FXfqI3DnhfQW1bhFDeJixpt8eDAY5R24UJI3cK6M=",
      maxBatchSize: 1000,
    },
  ],
};

export const verifyCallbackExamplePayload = {
  data: {},
};

export const updateCallbackExamplePayload = {
  data: [
    {
      callbackId: "14e2ee5b-8c01-4f9d-916d-29e329945619",
      callbackName: "Updated Callback",
      url: "https://webhook.example.com/callback/updated",
      maxBatchSize: 500,
      status: "verified",
      statusReason: "",
    },
  ],
};

export const deleteCallbackExamplePayload = {
  data: {
    success: true,
    callbackId: "c3d4e5f6-a7b8-9012-cdef-234567890123",
    message: "Callback deleted successfully",
  },
};

export const listSubscriptionsExamplePayload = {
  data: [
    {
      callbackId: "14e2ee5b-8c01-4f9d-916d-29e329945619",
      callbackName: "Example Callback",
      url: "https://webhook.example.com/callback/example-endpoint",
      maxBatchSize: 1000,
      subscriptionId: "6807835e-a82f-498e-a0b9-55d6bde4814d",
      subscriptionName: "Example Subscription",
      eventCategoryTypes: ["TransactionalSendEvents.EmailSent"],
      filters: [""],
      status: "active",
      statusReason: "",
    },
  ],
};

export const createSubscriptionExamplePayload = {
  data: [
    {
      callbackId: "65b885ab-c2b4-46fe-85d0-d6cb8be8057d",
      callbackName: "Example Callback 1",
      subscriptionName: "Example Subscription 1",
      eventCategoryTypes: [
        "TransactionalSendEvents.EmailNotSent",
        "TransactionalSendEvents.EmailSent",
      ],
      subscriptionId: "d89c87c4-70f8-43d6-be1e-f01dce97fe4c",
      filters: ["definitionKey=12345"],
      status: "active",
    },
  ],
};

export const getSubscriptionExamplePayload = {
  data: {
    callbackId: "65b885ab-c2b4-46fe-85d0-d6cb8be8057d",
    callbackName: "cb1",
    url: "https://example.com/",
    maxBatchSize: 1000,
    subscriptionName: "Example Subscription Name",
    eventCategoryTypes: [
      "TransactionalSendEvents.EmailNotSent",
      "TransactionalSendEvents.EmailSent",
    ],
    subscriptionId: "d89c87c4-70f8-43d6-be1e-f01dce97fe4c",
    filters: ["definitionKey=12345"],
    status: "active",
    statusReason: "none",
  },
};

export const updateSubscriptionExamplePayload = {
  data: [
    {
      callbackId: "65b885ab-c2b4-46fe-85d0-d6cb8be8057d",
      callbackName: "Example Callback 1",
      subscriptionName: "Updated Subscription",
      eventCategoryTypes: [
        "TransactionalSendEvents.EmailSent",
        "TransactionalSendEvents.EmailNotSent",
      ],
      subscriptionId: "d89c87c4-70f8-43d6-be1e-f01dce97fe4c",
      filters: [],
      status: "active",
    },
  ],
};

export const deleteSubscriptionExamplePayload = {
  data: {
    success: true,
    subscriptionId: "a7b8c9d0-e1f2-3456-abcd-678901234567",
    message: "Subscription deleted successfully",
  },
};
