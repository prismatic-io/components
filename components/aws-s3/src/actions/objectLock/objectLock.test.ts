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
  GetObjectLockConfigurationCommand,
  GetObjectRetentionCommand,
  PutObjectLockConfigurationCommand,
  PutObjectRetentionCommand,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { accessKeySecretPair } from "../../connections";
import {
  getObjectLockConfigurationExamplePayload,
  getObjectRetentionExamplePayload,
  putObjectLockConfigurationExamplePayload,
  putObjectRetentionExamplePayload,
} from "../../examplePayloads";
import { getObjectLockConfiguration } from "./getObjectLockConfiguration";
import { getObjectRetention } from "./getObjectRetention";
import { putObjectLockConfiguration } from "./putObjectLockConfiguration";
import { putObjectRetention } from "./putObjectRetention";
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
describe("object lock actions", () => {
  beforeEach(() => {
    sendMock.mockReset();
  });
  describe("getObjectLockConfiguration", () => {
    test("sends GetObjectLockConfigurationCommand and returns the response", async () => {
      sendMock.mockResolvedValue(getObjectLockConfigurationExamplePayload.data);
      const { result } = await invoke(getObjectLockConfiguration, baseInputs);
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(GetObjectLockConfigurationCommand);
      expect(command.input).toEqual({ Bucket: "example-bucket" });
      expect(result).toEqual(getObjectLockConfigurationExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(
        serviceError("ObjectLockConfigurationNotFoundError", 404),
      );
      await expectServiceError(
        invoke(getObjectLockConfiguration, baseInputs),
        "ObjectLockConfigurationNotFoundError",
        404,
      );
    });
  });
  describe("getObjectRetention", () => {
    const inputs = {
      ...baseInputs,
      objectKey: "example/object.txt",
      versionId: "AMn71WZYnWqbvfy0unBOdtaBC.DRiN_r",
    };
    test("sends key and version ID and returns the response", async () => {
      sendMock.mockResolvedValue(getObjectRetentionExamplePayload.data);
      const { result } = await invoke(getObjectRetention, inputs);
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(GetObjectRetentionCommand);
      expect(command.input).toEqual({
        Bucket: "example-bucket",
        Key: "example/object.txt",
        VersionId: "AMn71WZYnWqbvfy0unBOdtaBC.DRiN_r",
      });
      expect(result).toEqual(getObjectRetentionExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("NoSuchKey", 404));
      await expectServiceError(
        invoke(getObjectRetention, inputs),
        "NoSuchKey",
        404,
      );
    });
  });
  describe("putObjectLockConfiguration", () => {
    const inputs = {
      ...baseInputs,
      defaultRetentionDays: 30,
      defaultRetentionYears: 0,
      defaultRetentionMode: "GOVERNANCE" as const,
    };
    test("sends an enabled configuration with a days-based default retention", async () => {
      sendMock.mockResolvedValue(putObjectLockConfigurationExamplePayload.data);
      const { result } = await invoke(putObjectLockConfiguration, inputs);
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(PutObjectLockConfigurationCommand);
      expect(command.input).toEqual({
        Bucket: "example-bucket",
        ObjectLockConfiguration: {
          ObjectLockEnabled: "Enabled",
          Rule: {
            DefaultRetention: {
              Days: 30,
              Mode: "GOVERNANCE",
              Years: undefined,
            },
          },
        },
      });
      expect(result).toEqual(putObjectLockConfigurationExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("InvalidBucketState", 409));
      await expectServiceError(
        invoke(putObjectLockConfiguration, inputs),
        "InvalidBucketState",
        409,
      );
    });
  });
  describe("putObjectRetention", () => {
    const inputs = {
      ...baseInputs,
      objectKey: "example/object.txt",
      retentionMode: "COMPLIANCE" as const,
      retainUntilDate: "2030-01-01T00:00:00.000Z",
      versionId: undefined,
    };
    test("sends the retention with a Date and omits an unset version ID", async () => {
      sendMock.mockResolvedValue(putObjectRetentionExamplePayload.data);
      const { result } = await invoke(putObjectRetention, inputs);
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(PutObjectRetentionCommand);
      expect(command.input).toEqual({
        Bucket: "example-bucket",
        Key: "example/object.txt",
        Retention: {
          Mode: "COMPLIANCE",
          RetainUntilDate: new Date("2030-01-01T00:00:00.000Z"),
        },
        VersionId: undefined,
      });
      expect(result).toEqual(putObjectRetentionExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("AccessDenied", 403));
      await expectServiceError(
        invoke(putObjectRetention, inputs),
        "AccessDenied",
        403,
      );
    });
  });
});
