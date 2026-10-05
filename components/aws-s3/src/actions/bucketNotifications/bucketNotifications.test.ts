const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));
vi.mock("aws-utils", async () => {
  const { input } = await import("@prismatic-io/spectral");
  return {
    assumeRoleConnection: { key: "awsAssumeRole" },
    awsRegion: input({ label: "AWS Region", type: "string", required: false }),
    dynamicAccessAllInputs: {},
  };
});
vi.mock("../../client", () => ({
  createS3Client: vi.fn(async () => ({ send: sendMock })),
}));
import {
  GetBucketNotificationConfigurationCommand,
  PutBucketNotificationConfigurationCommand,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { accessKeySecretPair } from "../../connections";
import {
  getBucketNotificationConfigurationExamplePayload,
  putBucketNotificationConfigurationExamplePayload,
} from "../../examplePayloads";
import { getBucketNotificationConfiguration } from "./getBucketNotificationConfiguration";
import { putBucketNotificationConfiguration } from "./putBucketNotificationConfiguration";
const connection = createConnection(accessKeySecretPair, {
  accessKeyId: "fakeKey",
  secretAccessKey: "fakeSecret",
});
const baseInputs = {
  awsRegion: "us-east-2",
  accessKey: connection,
  bucket: "example-bucket",
  dynamicAccessKeyId: "",
  dynamicSecretAccessKey: "",
  dynamicSessionToken: "",
};
const serviceError = (name: string, httpStatusCode: number) =>
  new S3ServiceException({
    name,
    $fault: httpStatusCode >= 500 ? "server" : "client",
    $metadata: { httpStatusCode },
    message: `${name} error`,
  });
const topicConfigurations = [
  {
    Id: "topic-1",
    TopicArn: "arn:aws:sns:us-east-2:123456789012:example-topic",
    Events: ["s3:ObjectCreated:*" as const],
  },
];
const putInputs = {
  ...baseInputs,
  topicConfigurations,
  queueConfigurations: undefined,
  lambdaFunctionConfigurations: undefined,
  eventBridgeConfiguration: undefined,
};
describe("bucket notification actions", () => {
  beforeEach(() => {
    sendMock.mockReset();
  });
  describe("getBucketNotificationConfiguration", () => {
    test("sends the command and returns the response with $metadata kept", async () => {
      sendMock.mockResolvedValue(
        getBucketNotificationConfigurationExamplePayload.data,
      );
      const { result } = await invoke(
        getBucketNotificationConfiguration,
        baseInputs,
      );
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(GetBucketNotificationConfigurationCommand);
      expect(command.input).toEqual({
        Bucket: "example-bucket",
        ExpectedBucketOwner: undefined,
      });
      expect(result).toEqual(getBucketNotificationConfigurationExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("NoSuchBucket", 404));
      await expect(
        invoke(getBucketNotificationConfiguration, baseInputs),
      ).rejects.toMatchObject({
        name: "NoSuchBucket",
        $metadata: { httpStatusCode: 404 },
      });
    });
  });
  describe("putBucketNotificationConfiguration", () => {
    test("sends the full configuration with SkipDestinationValidation and returns the response", async () => {
      sendMock.mockResolvedValue(
        putBucketNotificationConfigurationExamplePayload.data,
      );
      const { result } = await invoke(
        putBucketNotificationConfiguration,
        putInputs,
      );
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(PutBucketNotificationConfigurationCommand);
      expect(command.input).toEqual({
        Bucket: "example-bucket",
        NotificationConfiguration: {
          TopicConfigurations: topicConfigurations,
          QueueConfigurations: undefined,
          LambdaFunctionConfigurations: undefined,
          EventBridgeConfiguration: undefined,
        },
        SkipDestinationValidation: true,
      });
      expect(result).toEqual(putBucketNotificationConfigurationExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("InvalidArgument", 400));
      await expect(
        invoke(putBucketNotificationConfiguration, putInputs),
      ).rejects.toMatchObject({
        name: "InvalidArgument",
        $metadata: { httpStatusCode: 400 },
      });
    });
  });
});
