export const listFeedsExamplePayload = {
  data: {
    feeds: [
      {
        feedId: "23492834092",
        feedType: "POST_PRODUCT_DATA",
        marketplaceIds: ["ATVPDKIKX0DER"],
        createdTime: "2024-01-15T10:30:45.123Z",
        processingStatus: "DONE",
        processingStartTime: "2024-01-15T10:31:00.456Z",
        processingEndTime: "2024-01-15T10:35:22.789Z",
        resultFeedDocumentId:
          "amzn1.tortuga.3.edbcd0d8-3434-8222-ac12-1212121abcde.T3YUVYPGKE9BMY",
      },
      {
        feedId: "23492834091",
        feedType: "POST_INVENTORY_AVAILABILITY_DATA",
        marketplaceIds: ["ATVPDKIKX0DER"],
        createdTime: "2024-01-14T15:22:30.123Z",
        processingStatus: "IN_PROGRESS",
        processingStartTime: "2024-01-14T15:23:00.456Z",
        processingEndTime: null,
        resultFeedDocumentId: null,
      },
      {
        feedId: "23492834090",
        feedType: "POST_PRODUCT_PRICING_DATA",
        marketplaceIds: ["ATVPDKIKX0DER"],
        createdTime: "2024-01-13T08:15:10.123Z",
        processingStatus: "CANCELLED",
        processingStartTime: null,
        processingEndTime: null,
        resultFeedDocumentId: null,
      },
    ],
    nextToken: "MjAyNC0wMS0xM1QwODoxNToxMC4xMjNa",
  },
};

export const getFeedExamplePayload = {
  data: {
    feedId: "23492834092",
    feedType: "POST_PRODUCT_DATA",
    marketplaceIds: ["ATVPDKIKX0DER"],
    createdTime: "2024-01-15T10:30:45.123Z",
    processingStatus: "DONE",
    processingStartTime: "2024-01-15T10:31:00.456Z",
    processingEndTime: "2024-01-15T10:35:22.789Z",
    resultFeedDocumentId:
      "amzn1.tortuga.3.edbcd0d8-3434-8222-ac12-1212121abcde.T3YUVYPGKE9BMY",
  },
};

export const createFeedExamplePayload = {
  data: {
    feedId: "23492834093",
  },
};

export const cancelFeedExamplePayload = {
  data: {},
};

export const createFeedDocumentExamplePayload = {
  data: {
    feedDocumentId:
      "amzn1.tortuga.3.920614b0-fc4c-4393-b0d9-fff175300000.T29XK4YL08B2VM",
    url: "https://tortuga-prod-na.s3.amazonaws.com/%2FNinetyDays/amzn1.tortuga.3.920614b0-fc4c-4393-b0d9-fff175300000.T29XK4YL08B2VM?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240115T103045Z&X-Amz-SignedHeaders=content-type%3Bhost&X-Amz-Expires=300&X-Amz-Credential=AKIAIN7EXAMPLE%2F20240115%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=example1234567890abcdef1234567890abcdef1234567890abcdef12345678",
  },
};

export const getFeedDocumentExamplePayload = {
  data: {
    feedDocumentId:
      "amzn1.tortuga.3.edbcd0d8-3434-8222-ac12-1212121abcde.T3YUVYPGKE9BMY",
    url: "https://tortuga-prod-na.s3.amazonaws.com/%2FNinetyDays/amzn1.tortuga.3.edbcd0d8-3434-8222-ac12-1212121abcde.T3YUVYPGKE9BMY?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240115T103545Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=AKIAIN7EXAMPLE%2F20240115%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=example1234567890abcdef1234567890abcdef1234567890abcdef12345678",
    compressionAlgorithm: "GZIP",
  },
};
