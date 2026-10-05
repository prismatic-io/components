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
  DeleteBucketCommand,
  GetBucketLocationCommand,
  HeadBucketCommand,
  ListBucketsCommand,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { accessKeySecretPair } from "../../connections";
import { LIST_BUCKETS_MAX_BUCKETS } from "../../constants";
import {
  deleteBucketExamplePayload,
  getBucketLocationExamplePayload,
  headBucketExamplePayload,
  listBucketsExamplePayload,
} from "../../examplePayloads";
import { deleteBucket } from "./deleteBucket";
import { getBucketLocation } from "./getBucketLocation";
import { headBucket } from "./headBucket";
import { listBuckets } from "./listBuckets";
const connection = createConnection(accessKeySecretPair, {
  accessKeyId: "fakeKey",
  secretAccessKey: "fakeSecret",
});
const baseInputs = {
  awsRegion: "us-east-2",
  accessKey: connection,
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
describe("bucket actions", () => {
  beforeEach(() => {
    sendMock.mockReset();
  });
  describe("deleteBucket", () => {
    test("sends DeleteBucketCommand and returns the response", async () => {
      sendMock.mockResolvedValue(deleteBucketExamplePayload.data);
      const { result } = await invoke(deleteBucket, {
        ...baseInputs,
        bucket: "example-bucket",
      });
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(DeleteBucketCommand);
      expect(command.input).toEqual({ Bucket: "example-bucket" });
      expect(result).toEqual(deleteBucketExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("BucketNotEmpty", 409));
      await expect(
        invoke(deleteBucket, { ...baseInputs, bucket: "example-bucket" }),
      ).rejects.toMatchObject({
        name: "BucketNotEmpty",
        $metadata: { httpStatusCode: 409 },
      });
    });
  });
  describe("getBucketLocation", () => {
    test("returns LocationConstraint, falling back to us-east-1 when S3 returns none", async () => {
      sendMock.mockResolvedValueOnce({ LocationConstraint: "us-west-2" });
      const { result: westResult } = await invoke(getBucketLocation, {
        ...baseInputs,
        bucket: "example-bucket",
      });
      sendMock.mockResolvedValueOnce({ LocationConstraint: null });
      const { result: eastResult } = await invoke(getBucketLocation, {
        ...baseInputs,
        bucket: "example-bucket",
      });
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(GetBucketLocationCommand);
      expect(command.input).toEqual({ Bucket: "example-bucket" });
      expect(westResult).toEqual({ data: "us-west-2" });
      expect(eastResult).toEqual(getBucketLocationExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("NoSuchBucket", 404));
      await expect(
        invoke(getBucketLocation, { ...baseInputs, bucket: "missing-bucket" }),
      ).rejects.toMatchObject({
        name: "NoSuchBucket",
        $metadata: { httpStatusCode: 404 },
      });
    });
  });
  describe("headBucket", () => {
    test("sends HeadBucketCommand and returns the response", async () => {
      sendMock.mockResolvedValue(headBucketExamplePayload.data);
      const { result } = await invoke(headBucket, {
        ...baseInputs,
        bucket: "example-bucket",
      });
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(HeadBucketCommand);
      expect(command.input).toEqual({ Bucket: "example-bucket" });
      expect(result).toEqual(headBucketExamplePayload);
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("Forbidden", 403));
      await expect(
        invoke(headBucket, { ...baseInputs, bucket: "example-bucket" }),
      ).rejects.toMatchObject({
        name: "Forbidden",
        $metadata: { httpStatusCode: 403 },
      });
    });
  });
  describe("listBuckets", () => {
    test("sends ListBucketsCommand and returns the Buckets array", async () => {
      sendMock.mockResolvedValue({ Buckets: listBucketsExamplePayload.data });
      const { result } = await invoke(listBuckets, baseInputs);
      const command = sendMock.mock.calls[0][0];
      expect(command).toBeInstanceOf(ListBucketsCommand);
      expect(command.input).toEqual({ MaxBuckets: LIST_BUCKETS_MAX_BUCKETS });
      expect(result).toEqual(listBucketsExamplePayload);
    });
    test("returns the buckets from every page", async () => {
      sendMock
        .mockResolvedValueOnce({
          Buckets: [{ Name: "bucket-1" }],
          ContinuationToken: "tok-1",
        })
        .mockResolvedValueOnce({ Buckets: [{ Name: "bucket-2" }] });
      const { result } = await invoke(listBuckets, baseInputs);
      expect(sendMock).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        data: [{ Name: "bucket-1" }, { Name: "bucket-2" }],
      });
    });
    test("propagates an SDK service error", async () => {
      sendMock.mockRejectedValue(serviceError("AccessDenied", 403));
      await expect(invoke(listBuckets, baseInputs)).rejects.toMatchObject({
        name: "AccessDenied",
        $metadata: { httpStatusCode: 403 },
      });
    });
  });
});
