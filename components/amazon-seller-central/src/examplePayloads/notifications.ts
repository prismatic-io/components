export const listDestinationsExamplePayload = {
  data: {
    destinations: [
      {
        name: "Production SQS Queue",
        destinationId: "d0e9e693-cd56-4d1f-b63a-418f2d169d4a",
        resource: {
          sqs: {
            arn: "arn:aws:sqs:us-east-1:123456789012:SellerCentral-Notifications",
          },
        },
      },
      {
        name: "EventBridge Destination",
        destinationId: "f1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c",
        resource: {
          eventBridge: {
            accountId: "123456789012",
            region: "us-east-1",
            name: "aws.partner/sellingpartnerapi.amazon.com/456789/sellercentral-notifications",
          },
        },
      },
    ],
  },
};

export const getDestinationExamplePayload = {
  data: {
    name: "Production SQS Queue",
    destinationId: "d0e9e693-cd56-4d1f-b63a-418f2d169d4a",
    resource: {
      sqs: {
        arn: "arn:aws:sqs:us-east-1:123456789012:SellerCentral-Notifications",
      },
    },
  },
};

export const createDestinationExamplePayload = {
  data: {
    name: "Production SQS Queue",
    destinationId: "d0e9e693-cd56-4d1f-b63a-418f2d169d4a",
    resource: {
      sqs: {
        arn: "arn:aws:sqs:us-east-1:123456789012:SellerCentral-Notifications",
      },
    },
  },
};

export const deleteDestinationExamplePayload = {
  data: {},
};


export const listSubscriptionsExamplePayload = {
  data: {
    subscriptions: [
      {
        subscriptionId: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
        payloadVersion: "1.0",
        destinationId: "d0e9e693-cd56-4d1f-b63a-418f2d169d4a",
        processingDirective: {
          eventFilter: {
            eventFilterType: "ANY_OFFER_CHANGED",
            marketplaceIds: ["ATVPDKIKX0DER"],
          },
        },
      },
      {
        subscriptionId: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
        payloadVersion: "1.0",
        destinationId: "d0e9e693-cd56-4d1f-b63a-418f2d169d4a",
        processingDirective: {
          eventFilter: {
            eventFilterType: "ORDER_CHANGE",
            marketplaceIds: ["ATVPDKIKX0DER"],
            orderChangeTypes: ["OrderStatusChange", "BuyerRequestedChange"],
          },
        },
      },
      {
        subscriptionId: "c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f",
        payloadVersion: "1.0",
        destinationId: "d0e9e693-cd56-4d1f-b63a-418f2d169d4a",
        processingDirective: {
          eventFilter: {
            eventFilterType: "FEED_PROCESSING_FINISHED",
          },
        },
      },
    ],
  },
};

export const getSubscriptionByIdExamplePayload = {
  data: {
    subscriptionId: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    payloadVersion: "1.0",
    destinationId: "d0e9e693-cd56-4d1f-b63a-418f2d169d4a",
    processingDirective: {
      eventFilter: {
        eventFilterType: "ANY_OFFER_CHANGED",
        marketplaceIds: ["ATVPDKIKX0DER"],
      },
    },
  },
};

export const createSubscriptionExamplePayload = {
  data: {
    subscriptionId: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a",
    payloadVersion: "1.0",
    destinationId: "d0e9e693-cd56-4d1f-b63a-418f2d169d4a",
  },
};

export const deleteSubscriptionExamplePayload = {
  data: {},
};

export const deleteAllSubscriptionsExamplePayload = {
  data: {},
};
