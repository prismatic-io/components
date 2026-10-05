const { s3SendMock, snsSendMock } = vi.hoisted(() => ({
  s3SendMock: vi.fn(),
  snsSendMock: vi.fn(),
}));
vi.mock("aws-utils", async () => {
  const { input } = await import("@prismatic-io/spectral");
  return {
    assumeRoleConnection: { key: "awsAssumeRole" },
    awsRegion: input({ label: "AWS Region", type: "string", required: false }),
    dynamicAccessAllInputs: {},
  };
});
vi.mock("../../client", () => ({
  createS3Client: vi.fn(async () => ({ send: s3SendMock })),
  createSNSClient: vi.fn(async () => ({ send: snsSendMock })),
}));
import {
  GetBucketNotificationConfigurationCommand,
  PutBucketNotificationConfigurationCommand,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import {
  CreateTopicCommand,
  SetTopicAttributesCommand,
  SNSServiceException,
  SubscribeCommand,
  UnsubscribeCommand,
} from "@aws-sdk/client-sns";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { accessKeySecretPair } from "../../connections";
import {
  bucketEventTriggerConfigurationExamplePayload,
  createTopicExamplePayload,
  subscribeToTopicExamplePayload,
  unsubscribeFromTopicExamplePayload,
  updateTopicPolicyExamplePayload,
} from "../../examplePayloads";
import { bucketEventTriggerConfiguration } from "./bucketEventTriggerConfiguration";
import { createTopic } from "./createTopic";
import { subscribeToTopic } from "./subscribeToTopic";
import { unsubscribeFromTopic } from "./unsubscribeFromTopic";
import { updateTopicPolicy } from "./updateTopicPolicy";
const connection = createConnection(accessKeySecretPair, {
  accessKeyId: "fakeKey",
  secretAccessKey: "fakeSecret",
});
const credentialInputs = {
  awsRegion: "us-east-2",
  awsConnection: connection,
  dynamicAccessKeyId: "",
  dynamicSecretAccessKey: "",
  dynamicSessionToken: "",
};
const TOPIC_ARN = "arn:aws:sns:us-east-2:123456789012:example-topic";
const snsError = (name: string, httpStatusCode: number) =>
  new SNSServiceException({
    name,
    $fault: httpStatusCode >= 500 ? "server" : "client",
    $metadata: { httpStatusCode },
    message: `${name} error`,
  });
const expectServiceError = async (
  promise: Promise<unknown>,
  name: string,
  status: number,
) => {
  await expect(promise).rejects.toMatchObject({
    name,
    $metadata: { httpStatusCode: status },
  });
};
describe("SNS actions", () => {
  beforeEach(() => {
    s3SendMock.mockReset();
    snsSendMock.mockReset();
  });
  describe("bucketEventTriggerConfiguration", () => {
    const inputs = {
      ...credentialInputs,
      snsTopicArn: TOPIC_ARN,
      eventsList: ["s3:ObjectCreated:*"],
      bucket: "example-bucket",
      eventNotificationName: "example-notification",
      bucketOwnerAccountid: "123456789012",
    };
    const newTopicConfiguration = {
      Id: "example-notification",
      TopicArn: TOPIC_ARN,
      Events: ["s3:ObjectCreated:*"],
    };
    test("appends the topic configuration when the bucket has none", async () => {
      s3SendMock
        .mockResolvedValueOnce({ $metadata: { httpStatusCode: 200 } })
        .mockResolvedValueOnce(
          bucketEventTriggerConfigurationExamplePayload.data,
        );
      const { result } = await invoke(bucketEventTriggerConfiguration, inputs);
      const [[getCommand], [putCommand]] = s3SendMock.mock.calls;
      expect(getCommand).toBeInstanceOf(
        GetBucketNotificationConfigurationCommand,
      );
      expect(getCommand.input).toEqual({
        Bucket: "example-bucket",
        ExpectedBucketOwner: "123456789012",
      });
      expect(putCommand).toBeInstanceOf(
        PutBucketNotificationConfigurationCommand,
      );
      expect(putCommand.input).toEqual({
        Bucket: "example-bucket",
        NotificationConfiguration: {
          $metadata: undefined,
          TopicConfigurations: [newTopicConfiguration],
        },
        SkipDestinationValidation: true,
      });
      expect(result).toEqual(bucketEventTriggerConfigurationExamplePayload);
    });
    test("replaces an existing topic configuration with the same Id and keeps the others", async () => {
      const otherQueue = {
        Id: "queue-1",
        QueueArn: "arn:aws:sqs:us-east-2:123456789012:q",
      };
      const otherTopic = {
        Id: "other-topic",
        TopicArn: TOPIC_ARN,
        Events: ["s3:ObjectRemoved:*"],
      };
      s3SendMock
        .mockResolvedValueOnce({
          $metadata: { httpStatusCode: 200 },
          QueueConfigurations: [otherQueue],
          TopicConfigurations: [
            otherTopic,
            {
              Id: "example-notification",
              TopicArn: "arn:old",
              Events: ["s3:ObjectRestore:*"],
            },
          ],
        })
        .mockResolvedValueOnce(
          bucketEventTriggerConfigurationExamplePayload.data,
        );
      await invoke(bucketEventTriggerConfiguration, inputs);
      const putCommand = s3SendMock.mock.calls[1][0];
      expect(putCommand.input.NotificationConfiguration).toEqual({
        $metadata: undefined,
        QueueConfigurations: [otherQueue],
        TopicConfigurations: [otherTopic, newTopicConfiguration],
      });
    });
    test("propagates an SDK service error from the read and never writes", async () => {
      s3SendMock.mockRejectedValue(
        new S3ServiceException({
          name: "AccessDenied",
          $fault: "client",
          $metadata: { httpStatusCode: 403 },
          message: "AccessDenied error",
        }),
      );
      await expectServiceError(
        invoke(bucketEventTriggerConfiguration, inputs),
        "AccessDenied",
        403,
      );
      expect(s3SendMock).toHaveBeenCalledTimes(1);
    });
  });
  describe("createTopic", () => {
    const inputs = { ...credentialInputs, name: "example-topic" };
    test("sends a standard (non-FIFO) topic and returns the response", async () => {
      snsSendMock.mockResolvedValue(createTopicExamplePayload.data);
      const { result } = await invoke(createTopic, inputs);
      const command = snsSendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(CreateTopicCommand);
      expect(command.input).toEqual({
        Name: "example-topic",
        Attributes: { FifoTopic: "false" },
      });
      expect(result).toEqual(createTopicExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      snsSendMock.mockRejectedValue(snsError("InvalidParameter", 400));
      await expectServiceError(
        invoke(createTopic, inputs),
        "InvalidParameter",
        400,
      );
    });
  });
  describe("subscribeToTopic", () => {
    const inputs = {
      ...credentialInputs,
      snsTopicArn: TOPIC_ARN,
      endpoint: "https://hooks.example.com/sns",
    };
    test("subscribes the endpoint over https and returns the response", async () => {
      snsSendMock.mockResolvedValue(subscribeToTopicExamplePayload.data);
      const { result } = await invoke(subscribeToTopic, inputs);
      const command = snsSendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(SubscribeCommand);
      expect(command.input).toEqual({
        Protocol: "https",
        TopicArn: TOPIC_ARN,
        Endpoint: "https://hooks.example.com/sns",
      });
      expect(result).toEqual(subscribeToTopicExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      snsSendMock.mockRejectedValue(snsError("NotFound", 404));
      await expectServiceError(
        invoke(subscribeToTopic, inputs),
        "NotFound",
        404,
      );
    });
  });
  describe("unsubscribeFromTopic", () => {
    const inputs = {
      ...credentialInputs,
      subscriptionArn: `${TOPIC_ARN}:subscription-id`,
    };
    test("sends UnsubscribeCommand and returns the response", async () => {
      snsSendMock.mockResolvedValue(unsubscribeFromTopicExamplePayload.data);
      const { result } = await invoke(unsubscribeFromTopic, inputs);
      const command = snsSendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(UnsubscribeCommand);
      expect(command.input).toEqual({
        SubscriptionArn: `${TOPIC_ARN}:subscription-id`,
      });
      expect(result).toEqual(unsubscribeFromTopicExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      snsSendMock.mockRejectedValue(snsError("AuthorizationError", 403));
      await expectServiceError(
        invoke(unsubscribeFromTopic, inputs),
        "AuthorizationError",
        403,
      );
    });
  });
  describe("updateTopicPolicy", () => {
    const inputs = {
      ...credentialInputs,
      bucket: "example-bucket",
      snsTopicArn: TOPIC_ARN,
      bucketOwnerAccountid: "123456789012",
    };
    test("sets a policy letting the bucket publish to the topic", async () => {
      snsSendMock.mockResolvedValue(updateTopicPolicyExamplePayload.data);
      const { result } = await invoke(updateTopicPolicy, inputs);
      const command = snsSendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(SetTopicAttributesCommand);
      expect(command.input).toMatchObject({
        TopicArn: TOPIC_ARN,
        AttributeName: "Policy",
      });
      expect(JSON.parse(command.input.AttributeValue)).toEqual({
        Version: "2012-10-17",
        Id: "allow-s3-to-publish",
        Statement: [
          {
            Sid: "allow-s3-to-publish",
            Effect: "Allow",
            Principal: { Service: "s3.amazonaws.com" },
            Action: ["SNS:Publish"],
            Resource: TOPIC_ARN,
            Condition: {
              ArnLike: { "aws:SourceArn": "arn:aws:s3:*:*:example-bucket" },
              StringEquals: { "aws:SourceAccount": "123456789012" },
            },
          },
        ],
      });
      expect(result).toEqual(updateTopicPolicyExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      snsSendMock.mockRejectedValue(snsError("NotFound", 404));
      await expectServiceError(
        invoke(updateTopicPolicy, inputs),
        "NotFound",
        404,
      );
    });
  });
});
