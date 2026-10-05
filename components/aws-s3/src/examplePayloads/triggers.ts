import type { TriggerPayload } from "@prismatic-io/spectral";
import type { PolledBucket } from "../types";
const exampleTriggerPayloadBase: Omit<TriggerPayload, "headers" | "body"> = {
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
export const snsS3NotificationWebhookExamplePayload: {
  branch: string;
  payload: TriggerPayload;
} = {
  branch: "Notification",
  payload: {
    ...exampleTriggerPayloadBase,
    headers: {
      "x-amz-sns-message-type": "Notification",
      "x-amz-sns-message-id": "22b80b92-fdea-4c2c-8f9d-bdfb0c7bf324",
      "x-amz-sns-topic-arn": "arn:aws:sns:us-west-2:123456789012:MyTopic",
      "x-amz-sns-subscription-arn":
        "arn:aws:sns:us-west-2:123456789012:MyTopic:c9135db0-26c4-47ec-8998-413945fb5a96",
      "Content-Type": "text/plain; charset=UTF-8",
      "User-Agent": "Amazon Simple Notification Service Agent",
    },
    body: {
      data: {
        Type: "Notification",
        MessageId: "22b80b92-fdea-4c2c-8f9d-bdfb0c7bf324",
        TopicArn: "arn:aws:sns:us-west-2:123456789012:MyTopic",
        Subject: "Amazon S3 Notification",
        Message: JSON.stringify({
          Records: [
            {
              eventVersion: "2.6",
              eventSource: "aws:s3",
              awsRegion: "us-west-2",
              eventTime: "2024-01-15T00:00:00.000Z",
              eventName: "ObjectCreated:Put",
              userIdentity: { principalId: "AIDAJDPLRKLG7UEXAMPLE" },
              requestParameters: { sourceIPAddress: "172.16.0.1" },
              responseElements: {
                "x-amz-request-id": "C3D13FE58DE4C810",
                "x-amz-id-2":
                  "FMyUVURIY8/IgAtTv8xRjskZQpcIZ9KG4V5Wp6S7S/JRWeUWerMUE5JgHvANOjpD",
              },
              s3: {
                s3SchemaVersion: "1.0",
                configurationId: "testConfigRule",
                bucket: {
                  name: "amzn-s3-demo-bucket",
                  ownerIdentity: { principalId: "A3NL1KOZZKExample" },
                  arn: "arn:aws:s3:::amzn-s3-demo-bucket",
                },
                object: {
                  key: "HappyFace.jpg",
                  size: 1024,
                  eTag: "d41d8cd98f00b204e9800998ecf8427e",
                  versionId: "096fKKXTRTtl3on89fVO.nfljtsv6qko",
                  sequencer: "0055AED6DCD90281E5",
                },
              },
            },
          ],
        }),
        Timestamp: "2024-01-15T00:00:01.000Z",
        SignatureVersion: "1",
        Signature: "EXAMPLEw6JRN...",
        SigningCertURL:
          "https://sns.us-west-2.amazonaws.com/SimpleNotificationService-f3ecfb7224c7233fe7bb5f59f96de52f.pem",
        UnsubscribeURL:
          "https://sns.us-west-2.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-west-2:123456789012:MyTopic:c9135db0-26c4-47ec-8998-413945fb5a96",
      },
    },
  },
};
export const pollChangesFilesTriggerExamplePayload: {
  payload: TriggerPayload & {
    body: {
      data: string[];
    };
  };
  polledNoChanges: boolean;
} = {
  payload: {
    ...exampleTriggerPayloadBase,
    headers: {},
    body: { data: ["invoices/2024-01-15.pdf", "images/logo.png"] },
  },
  polledNoChanges: false,
};
export const pollNewBucketsTriggerExamplePayload: {
  payload: TriggerPayload & {
    body: {
      data: PolledBucket[];
    };
  };
  polledNoChanges: boolean;
} = {
  payload: {
    ...exampleTriggerPayloadBase,
    headers: {},
    body: {
      data: [{ Name: "bucket-1", CreationDate: "2024-03-08T23:30:22.000Z" }],
    },
  },
  polledNoChanges: false,
};
