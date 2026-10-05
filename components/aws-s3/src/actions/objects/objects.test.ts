const { sendMock, getSignedUrlMock } = vi.hoisted(() => ({
  sendMock: vi.fn(),
  getSignedUrlMock: vi.fn(),
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
  createS3Client: vi.fn(async () => ({ send: sendMock })),
}));
vi.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: getSignedUrlMock,
}));
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectAttributesCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { accessKeySecretPair } from "../../connections";
import {
  copyObjectExamplePayload,
  deleteObjectExamplePayload,
  deleteObjectsExamplePayload,
  generatePresignedUrlExamplePayload,
  getObjectAttributesExamplePayload,
  listObjectsExamplePayload,
  putObjectExamplePayload,
} from "../../examplePayloads";
import { toObjectCannedACL } from "../../utils";
import { copyObject } from "./copyObject";
import { deleteObject } from "./deleteObject";
import { deleteObjects } from "./deleteObjects";
import { generatePresignedUrl } from "./generatePresignedUrl";
import { getObjectAttributes } from "./getObjectAttributes";
import { listObjects } from "./listObjects";
import { putObject } from "./putObject";
const connection = createConnection(accessKeySecretPair, {
  accessKeyId: "fakeKey",
  secretAccessKey: "fakeSecret",
});
const credentialInputs = {
  awsRegion: "us-east-2",
  accessKey: connection,
  dynamicAccessKeyId: "",
  dynamicSecretAccessKey: "",
  dynamicSessionToken: "",
};
const objectInputs = {
  ...credentialInputs,
  bucket: "example-bucket",
  objectKey: "example/object.txt",
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
describe("object actions", () => {
  beforeEach(() => {
    sendMock.mockReset();
    getSignedUrlMock.mockReset();
  });
  describe("copyObject", () => {
    const inputs = {
      ...credentialInputs,
      sourceBucket: "source-bucket",
      destinationBucket: "destination-bucket",
      sourceKey: "backups/file.sql",
      destinationKey: "archive/file.sql",
      acl: toObjectCannedACL(""),
    };
    test("sends CopySource as bucket/key and returns the response", async () => {
      sendMock.mockResolvedValue(copyObjectExamplePayload.data);
      const { result } = await invoke(copyObject, inputs);
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(CopyObjectCommand);
      expect(command.input).toEqual({
        ACL: null,
        Bucket: "destination-bucket",
        CopySource: "source-bucket/backups/file.sql",
        Key: "archive/file.sql",
      });
      expect(result).toEqual(copyObjectExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("NoSuchKey", 404));
      await expectServiceError(invoke(copyObject, inputs), "NoSuchKey", 404);
    });
  });
  describe("deleteObject", () => {
    test("sends DeleteObjectCommand and returns the response", async () => {
      sendMock.mockResolvedValue(deleteObjectExamplePayload.data);
      const { result } = await invoke(deleteObject, objectInputs);
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(DeleteObjectCommand);
      expect(command.input).toEqual({
        Bucket: "example-bucket",
        Key: "example/object.txt",
      });
      expect(result).toEqual(deleteObjectExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("AccessDenied", 403));
      await expectServiceError(
        invoke(deleteObject, objectInputs),
        "AccessDenied",
        403,
      );
    });
  });
  describe("deleteObjects", () => {
    const inputs = {
      ...credentialInputs,
      bucket: "example-bucket",
      objectKeys: [{ Key: "a.txt" }, { Key: "b.txt" }],
    };
    test("sends the object identifiers and returns the response", async () => {
      sendMock.mockResolvedValue(deleteObjectsExamplePayload.data);
      const { result } = await invoke(deleteObjects, inputs);
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(DeleteObjectsCommand);
      expect(command.input).toEqual({
        Bucket: "example-bucket",
        Delete: { Objects: [{ Key: "a.txt" }, { Key: "b.txt" }] },
      });
      expect(result).toEqual(deleteObjectsExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("MalformedXML", 400));
      await expectServiceError(
        invoke(deleteObjects, inputs),
        "MalformedXML",
        400,
      );
    });
  });
  describe("generatePresignedUrl", () => {
    test("signs a GetObjectCommand for download and returns the URL", async () => {
      getSignedUrlMock.mockResolvedValue(
        generatePresignedUrlExamplePayload.data,
      );
      const { result } = await invoke(generatePresignedUrl, {
        ...objectInputs,
        actionType: "download",
        expirationSeconds: 3600,
      });
      const [, command, options] = getSignedUrlMock.mock.calls[0];
      expect(command).toBeInstanceOf(GetObjectCommand);
      expect(command.input).toEqual({
        Bucket: "example-bucket",
        Key: "example/object.txt",
      });
      expect(options).toEqual({ expiresIn: 3600 });
      expect(result).toEqual(generatePresignedUrlExamplePayload);
    });
    test("signs a PutObjectCommand for any non-download action type", async () => {
      getSignedUrlMock.mockResolvedValue(
        generatePresignedUrlExamplePayload.data,
      );
      await invoke(generatePresignedUrl, {
        ...objectInputs,
        actionType: "upload",
        expirationSeconds: 60,
      });
      const [, command, options] = getSignedUrlMock.mock.calls[0];
      expect(command).toBeInstanceOf(PutObjectCommand);
      expect(command.input).toEqual({
        Bucket: "example-bucket",
        Key: "example/object.txt",
      });
      expect(options).toEqual({ expiresIn: 60 });
    });
    test("propagates a signing failure", async () => {
      getSignedUrlMock.mockRejectedValue(
        serviceError("CredentialsProviderError", 400),
      );
      await expectServiceError(
        invoke(generatePresignedUrl, {
          ...objectInputs,
          actionType: "download",
          expirationSeconds: 3600,
        }),
        "CredentialsProviderError",
        400,
      );
    });
  });
  describe("getObjectAttributes", () => {
    const inputs = {
      ...objectInputs,
      objectAttributes: ["ETag" as const, "ObjectSize" as const],
      versionId: undefined,
    };
    test("sends the requested attributes and returns the response", async () => {
      sendMock.mockResolvedValue(getObjectAttributesExamplePayload.data);
      const { result } = await invoke(getObjectAttributes, inputs);
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(GetObjectAttributesCommand);
      expect(command.input).toEqual({
        Bucket: "example-bucket",
        Key: "example/object.txt",
        ObjectAttributes: ["ETag", "ObjectSize"],
        VersionId: undefined,
      });
      expect(result).toEqual(getObjectAttributesExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("NoSuchKey", 404));
      await expectServiceError(
        invoke(getObjectAttributes, inputs),
        "NoSuchKey",
        404,
      );
    });
  });
  describe("listObjects", () => {
    const inputs = {
      ...credentialInputs,
      bucket: "example-bucket",
      prefix: "invoices/",
      includeMetadata: false,
      pagination: { maxKeys: 50, continuationToken: "token-1" },
    };
    const listResponse = {
      Contents: listObjectsExamplePayload.data.map((Key) => ({ Key })),
      IsTruncated: false,
    };
    test("sends prefix and pagination and returns only object keys", async () => {
      sendMock.mockResolvedValue(listResponse);
      const { result } = await invoke(listObjects, inputs);
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(ListObjectsV2Command);
      expect(command.input).toEqual({
        Bucket: "example-bucket",
        Prefix: "invoices/",
        MaxKeys: 50,
        ContinuationToken: "token-1",
      });
      expect(result).toEqual(listObjectsExamplePayload);
    });
    test("returns the raw response when includeMetadata is true", async () => {
      sendMock.mockResolvedValue(listResponse);
      const { result } = await invoke(listObjects, {
        ...inputs,
        includeMetadata: true,
      });
      expect(result).toEqual({ data: listResponse });
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("NoSuchBucket", 404));
      await expectServiceError(
        invoke(listObjects, inputs),
        "NoSuchBucket",
        404,
      );
    });
  });
  describe("putObject", () => {
    const fileData = Buffer.from("My File Contents");
    const inputs = {
      ...objectInputs,
      fileContents: { data: fileData, contentType: "text/plain" },
      tagging: [{ key: "env", value: "prod" }],
      acl: "public-read" as const,
    };
    test("sends body, content type, ACL and tags and returns the response", async () => {
      sendMock.mockResolvedValue(putObjectExamplePayload.data);
      const { result } = await invoke(putObject, inputs);
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(PutObjectCommand);
      expect(command.input).toEqual({
        ACL: "public-read",
        Bucket: "example-bucket",
        Key: "example/object.txt",
        Body: fileData,
        ContentType: "text/plain",
        Tagging: "env=prod",
      });
      expect(result).toEqual(putObjectExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("EntityTooLarge", 400));
      await expectServiceError(
        invoke(putObject, inputs),
        "EntityTooLarge",
        400,
      );
    });
  });
});
