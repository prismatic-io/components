const { uploadConstructorMock, uploadDoneMock } = vi.hoisted(() => ({
  uploadConstructorMock: vi.fn(),
  uploadDoneMock: vi.fn(),
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
  createS3Client: vi.fn(async () => ({ send: vi.fn() })),
}));
vi.mock("@aws-sdk/lib-storage", () => {
  class Upload {
    done = uploadDoneMock;
    constructor(options: unknown) {
      uploadConstructorMock(options);
    }
  }
  return { Upload };
});
import { PassThrough } from "node:stream";
import { S3ServiceException } from "@aws-sdk/client-s3";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { createS3Client } from "../../client";
import { accessKeySecretPair } from "../../connections";
import {
  closeUploadStreamExamplePayload,
  writeUploadStreamExamplePayload,
} from "../../examplePayloads";
import type { UploadStreamExecutionState } from "../../types";
import { closeUploadStream } from "./closeUploadStream";
import { createUploadStream } from "./createUploadStream";
import { writeUploadStream } from "./writeUploadStream";
const connection = createConnection(accessKeySecretPair, {
  accessKeyId: "fakeKey",
  secretAccessKey: "fakeSecret",
});
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const serviceError = (name: string, httpStatusCode: number) =>
  new S3ServiceException({
    name,
    $fault: httpStatusCode >= 500 ? "server" : "client",
    $metadata: { httpStatusCode },
    message: `${name} error`,
  });
describe("upload stream actions", () => {
  beforeEach(() => {
    uploadConstructorMock.mockReset();
    uploadDoneMock.mockReset();
  });
  describe("createUploadStream", () => {
    const inputs = {
      awsRegion: "us-east-2",
      accessKey: connection,
      dynamicAccessKeyId: "",
      dynamicSecretAccessKey: "",
      dynamicSessionToken: "",
      bucket: "example-bucket",
      objectKey: "example/stream.bin",
      tagging: [{ key: "env", value: "prod" }],
      acl: "private" as const,
    };
    test("starts an Upload over a PassThrough and stores it in execution state", async () => {
      const finisher = Promise.resolve({ $metadata: {} });
      uploadDoneMock.mockReturnValue(finisher);
      const executionState: Record<string, unknown> = {};
      const { result } = await invoke(createUploadStream, inputs, {
        executionState,
      });
      expect(result.data).toMatch(UUID_PATTERN);
      const [options] = uploadConstructorMock.mock.calls[0];
      expect(options.params).toEqual({
        ACL: "private",
        Bucket: "example-bucket",
        Key: "example/stream.bin",
        Body: expect.any(PassThrough),
        Tagging: "env=prod",
      });
      const state = executionState[
        result.data as string
      ] as UploadStreamExecutionState;
      expect(state.fileStream).toBe(options.params.Body);
      expect(state.uploadFinisher).toBe(finisher);
    });
    test("propagates a client creation failure without starting an upload", async () => {
      vi.mocked(createS3Client).mockRejectedValueOnce(
        serviceError("InvalidAccessKeyId", 403),
      );
      await expect(
        invoke(createUploadStream, inputs, { executionState: {} }),
      ).rejects.toMatchObject({
        name: "InvalidAccessKeyId",
        $metadata: { httpStatusCode: 403 },
      });
      expect(uploadConstructorMock).not.toHaveBeenCalled();
    });
  });
  describe("writeUploadStream", () => {
    test("writes the file contents to the stored stream", async () => {
      const fileStream = new PassThrough();
      const executionState = {
        "upload-1": {
          fileStream,
          uploadFinisher: Promise.resolve({ $metadata: {} }),
        },
      };
      const { result } = await invoke(
        writeUploadStream,
        {
          uploadId: "upload-1",
          fileContents: {
            data: Buffer.from("chunk-1"),
            contentType: "application/octet-stream",
          },
        },
        { executionState },
      );
      expect(result).toEqual(writeUploadStreamExamplePayload);
      expect(fileStream.read()).toEqual(Buffer.from("chunk-1"));
    });
    test("throws a descriptive error when the upload stream ID is unknown", async () => {
      await expect(
        invoke(
          writeUploadStream,
          {
            uploadId: "missing",
            fileContents: {
              data: Buffer.from("x"),
              contentType: "application/octet-stream",
            },
          },
          { executionState: {} },
        ),
      ).rejects.toThrow('Upload stream "missing" was not found');
    });
  });
  describe("closeUploadStream", () => {
    test("ends the stream, awaits the upload and returns null", async () => {
      const fileStream = new PassThrough();
      const executionState = {
        "upload-1": {
          fileStream,
          uploadFinisher: Promise.resolve({ $metadata: {} }),
        },
      };
      const { result } = await invoke(
        closeUploadStream,
        { uploadId: "upload-1" },
        { executionState },
      );
      expect(fileStream.writableEnded).toBe(true);
      expect(result).toEqual(closeUploadStreamExamplePayload);
    });
    test("propagates an SDK service error from the upload", async () => {
      const uploadFinisher = Promise.reject(
        serviceError("EntityTooSmall", 400),
      );
      uploadFinisher.catch(() => undefined);
      const executionState = {
        "upload-1": { fileStream: new PassThrough(), uploadFinisher },
      };
      await expect(
        invoke(closeUploadStream, { uploadId: "upload-1" }, { executionState }),
      ).rejects.toMatchObject({
        name: "EntityTooSmall",
        $metadata: { httpStatusCode: 400 },
      });
    });
    test("throws a descriptive error when the upload stream ID is unknown", async () => {
      await expect(
        invoke(
          closeUploadStream,
          { uploadId: "missing" },
          { executionState: {} },
        ),
      ).rejects.toThrow('Upload stream "missing" was not found');
    });
  });
});
