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
  AbortMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  ListMultipartUploadsCommand,
  ListPartsCommand,
  S3ServiceException,
  UploadPartCommand,
} from "@aws-sdk/client-s3";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { accessKeySecretPair } from "../../connections";
import {
  abortMultipartUploadExamplePayload,
  completeMultipartUploadExamplePayload,
  createMultipartUploadExamplePayload,
  listMultipartUploadsExamplePayload,
  listPartsExamplePayload,
  uploadPartExamplePayload,
} from "../../examplePayloads";
import { abortMultipartUpload } from "./abortMultipartUpload";
import { completeMultipartUpload } from "./completeMultipartUpload";
import { createMultipartUpload } from "./createMultipartUpload";
import { generatePresignedForMultiparUploads } from "./generatePresignedForMultiparUploads";
import { listMultipartUploads } from "./listMultipartUploads";
import { listParts } from "./listParts";
import { uploadPart } from "./uploadPart";
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
const uploadInputs = {
  ...baseInputs,
  objectKey: "example/object.bin",
  uploadId: "example-upload-id",
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
describe("multipart upload actions", () => {
  beforeEach(() => {
    sendMock.mockReset();
    getSignedUrlMock.mockReset();
  });
  describe("abortMultipartUpload", () => {
    test("sends AbortMultipartUploadCommand and returns the response", async () => {
      sendMock.mockResolvedValue(abortMultipartUploadExamplePayload.data);
      const { result } = await invoke(abortMultipartUpload, uploadInputs);
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(AbortMultipartUploadCommand);
      expect(command.input).toEqual({
        Bucket: "example-bucket",
        Key: "example/object.bin",
        UploadId: "example-upload-id",
      });
      expect(result).toEqual(abortMultipartUploadExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("NoSuchUpload", 404));
      await expectServiceError(
        invoke(abortMultipartUpload, uploadInputs),
        "NoSuchUpload",
        404,
      );
    });
  });
  describe("completeMultipartUpload", () => {
    const parts = [
      { ETag: '"etag-1"', PartNumber: 1 },
      { ETag: '"etag-2"', PartNumber: 2 },
    ];
    test("sends the parts list and returns the response", async () => {
      sendMock.mockResolvedValue(completeMultipartUploadExamplePayload.data);
      const { result } = await invoke(completeMultipartUpload, {
        ...uploadInputs,
        parts,
      });
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(CompleteMultipartUploadCommand);
      expect(command.input).toEqual({
        Bucket: "example-bucket",
        Key: "example/object.bin",
        UploadId: "example-upload-id",
        MultipartUpload: { Parts: parts },
      });
      expect(result).toEqual(completeMultipartUploadExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("InvalidPart", 400));
      await expectServiceError(
        invoke(completeMultipartUpload, { ...uploadInputs, parts }),
        "InvalidPart",
        400,
      );
    });
  });
  describe("createMultipartUpload", () => {
    const inputs = {
      ...baseInputs,
      objectKey: "example/object.bin",
      acl: "private" as const,
      tagging: [
        { key: "env", value: "prod" },
        { key: "team", value: "data" },
      ],
    };
    test("sends ACL, key and URL-encoded tags and returns the response", async () => {
      sendMock.mockResolvedValue(createMultipartUploadExamplePayload.data);
      const { result } = await invoke(createMultipartUpload, inputs);
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(CreateMultipartUploadCommand);
      expect(command.input).toEqual({
        ACL: "private",
        Bucket: "example-bucket",
        Key: "example/object.bin",
        Tagging: "env=prod&team=data",
      });
      expect(result).toEqual(createMultipartUploadExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("AccessDenied", 403));
      await expectServiceError(
        invoke(createMultipartUpload, inputs),
        "AccessDenied",
        403,
      );
    });
  });
  describe("generatePresignedForMultiparUploads", () => {
    const inputs = {
      ...uploadInputs,
      urlsToGenerate: 2,
      expirationSeconds: 900,
    };
    test("signs one UploadPartCommand per part and returns numbered URLs", async () => {
      getSignedUrlMock.mockImplementation(
        async (_client, command: UploadPartCommand) =>
          `https://example-bucket.s3.amazonaws.com/part-${command.input.PartNumber}`,
      );
      const { result } = await invoke(
        generatePresignedForMultiparUploads,
        inputs,
      );
      expect(getSignedUrlMock).toHaveBeenCalledTimes(2);
      getSignedUrlMock.mock.calls.forEach(([, command, options], index) => {
        expect(command).toBeInstanceOf(UploadPartCommand);
        expect(command.input).toEqual({
          Bucket: "example-bucket",
          Key: "example/object.bin",
          PartNumber: index + 1,
          UploadId: "example-upload-id",
        });
        expect(options).toEqual({ expiresIn: 900 });
      });
      expect(result).toEqual({
        data: [
          {
            url: "https://example-bucket.s3.amazonaws.com/part-1",
            partNumber: 1,
          },
          {
            url: "https://example-bucket.s3.amazonaws.com/part-2",
            partNumber: 2,
          },
        ],
      });
      expect(sendMock).not.toHaveBeenCalled();
    });
    test("propagates a signing failure", async () => {
      getSignedUrlMock.mockRejectedValue(
        serviceError("CredentialsProviderError", 400),
      );
      await expectServiceError(
        invoke(generatePresignedForMultiparUploads, inputs),
        "CredentialsProviderError",
        400,
      );
    });
  });
  describe("listMultipartUploads", () => {
    test("sends ListMultipartUploadsCommand and returns the response", async () => {
      sendMock.mockResolvedValue(listMultipartUploadsExamplePayload.data);
      const { result } = await invoke(listMultipartUploads, baseInputs);
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(ListMultipartUploadsCommand);
      expect(command.input).toEqual({ Bucket: "example-bucket" });
      expect(result).toEqual(listMultipartUploadsExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("NoSuchBucket", 404));
      await expectServiceError(
        invoke(listMultipartUploads, baseInputs),
        "NoSuchBucket",
        404,
      );
    });
  });
  describe("listParts", () => {
    test("sends ListPartsCommand and returns the response", async () => {
      sendMock.mockResolvedValue(listPartsExamplePayload.data);
      const { result } = await invoke(listParts, uploadInputs);
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(ListPartsCommand);
      expect(command.input).toEqual({
        Bucket: "example-bucket",
        Key: "example/object.bin",
        UploadId: "example-upload-id",
      });
      expect(result).toEqual(listPartsExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("NoSuchUpload", 404));
      await expectServiceError(
        invoke(listParts, uploadInputs),
        "NoSuchUpload",
        404,
      );
    });
  });
  describe("uploadPart", () => {
    const fileChunk = Buffer.from("chunk-contents");
    const inputs = { ...uploadInputs, fileChunk, partNumber: 3 };
    test("sends the chunk and returns the response plus a part descriptor", async () => {
      const { part: _part, ...sdkResponse } = uploadPartExamplePayload.data;
      sendMock.mockResolvedValue(sdkResponse);
      const { result } = await invoke(uploadPart, inputs);
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(UploadPartCommand);
      expect(command.input).toEqual({
        Bucket: "example-bucket",
        Key: "example/object.bin",
        PartNumber: 3,
        UploadId: "example-upload-id",
        Body: fileChunk,
      });
      expect(result).toEqual({
        data: {
          ...sdkResponse,
          part: { ETag: sdkResponse.ETag, PartNumber: 3 },
        },
      });
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("EntityTooSmall", 400));
      await expectServiceError(
        invoke(uploadPart, inputs),
        "EntityTooSmall",
        400,
      );
    });
  });
});
