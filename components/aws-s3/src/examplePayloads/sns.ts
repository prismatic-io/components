import type { PutBucketNotificationConfigurationCommandOutput } from "@aws-sdk/client-s3";
import type {
  CreateTopicCommandOutput,
  SetTopicAttributesCommandOutput,
  SubscribeCommandOutput,
  UnsubscribeCommandOutput,
} from "@aws-sdk/client-sns";
export const createTopicExamplePayload: {
  data: CreateTopicCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "a91d4b8e-c6c5-52f3-9b45-3e6d3f8a1234",
      extendedRequestId: null,
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    TopicArn: "arn:aws:sns:us-east-2:123456789012:MyTopic",
  },
};
export const subscribeToTopicExamplePayload: {
  data: SubscribeCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "c72f9a3d-1b6e-54a2-8d7f-5a1b2c3d4e5f",
      extendedRequestId: null,
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    SubscriptionArn:
      "arn:aws:sns:us-east-2:123456789012:MyTopic:8a21d249-4bcd-4f7e-9abc-b1a2c3d4e5f6",
  },
};
export const updateTopicPolicyExamplePayload: {
  data: SetTopicAttributesCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "b81eb768-e79a-52a1-9be8-e90175212345",
      extendedRequestId: null,
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
  },
};
export const bucketEventTriggerConfigurationExamplePayload: {
  data: PutBucketNotificationConfigurationCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "73B4K590MABCMWV",
      extendedRequestId:
        "AHYlhdFxyrlbc3otaMb/gcjlmDEY+UT3xt7Vz6ZQ8F4B1234GZQSGN7D6yDV7mEC+U/1xU0pKc=",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
  },
};
export const unsubscribeFromTopicExamplePayload: {
  data: UnsubscribeCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "059f8a07-f312-5e3b-9b7c-d46e66ee8a58",
      extendedRequestId: null,
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
  },
};
