const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));
vi.mock("aws-utils", async () => {
  const { input } = await import("@prismatic-io/spectral");
  return {
    assumeRoleConnection: { key: "awsAssumeRole" },
    awsRegion: input({ label: "AWS Region", type: "string", required: false }),
    dynamicAccessAllInputs: {},
    selectRegion: {},
  };
});
vi.mock("../client", () => ({
  createS3Client: vi.fn(async () => ({ send: sendMock })),
}));
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import { accessKeySecretPair } from "../connections";
import { LIST_BUCKETS_MAX_BUCKETS } from "../constants";
import {
  listBucketsExamplePayload,
  selectBucketExamplePayload,
} from "../examplePayloads";
import { selectBucket } from "./selectBucket";
const connection = createConnection(accessKeySecretPair, {
  accessKeyId: "fakeKey",
  secretAccessKey: "fakeSecret",
});
const params = {
  accessKey: connection,
  dynamicAccessKeyId: "",
  dynamicSecretAccessKey: "",
  dynamicSessionToken: "",
};
describe("selectBucket", () => {
  beforeEach(() => {
    sendMock.mockReset();
  });
  test("returns one { label, key } element per bucket, keyed by bucket name", async () => {
    sendMock.mockResolvedValue({ Buckets: listBucketsExamplePayload.data });
    const { result } = await invokeDataSource(selectBucket, params);
    const command = sendMock.mock.calls[0][0];
    expect(command).toBeInstanceOf(ListBucketsCommand);
    expect(command.input).toEqual({ MaxBuckets: LIST_BUCKETS_MAX_BUCKETS });
    expect(result).toEqual(
      listBucketsExamplePayload.data.map(({ Name }) => ({
        label: Name,
        key: Name,
      })),
    );
  });
  test("returns an empty list when the account has no buckets", async () => {
    sendMock.mockResolvedValue({ Buckets: [] });
    const { result } = await invokeDataSource(selectBucket, params);
    expect(result).toEqual([]);
  });
  test("returns an empty list when the response has no Buckets field", async () => {
    sendMock.mockResolvedValue({});
    const { result } = await invokeDataSource(selectBucket, params);
    expect(result).toEqual([]);
  });
  test("wires the example payload in the shape the perform returns", async () => {
    sendMock.mockResolvedValue({ Buckets: listBucketsExamplePayload.data });
    const { result } = await invokeDataSource(selectBucket, params);
    expect(selectBucket.examplePayload).toBe(selectBucketExamplePayload);
    expect(selectBucketExamplePayload).toEqual({ result });
  });
  test("lists buckets from every page", async () => {
    sendMock
      .mockResolvedValueOnce({
        Buckets: [{ Name: "bucket-1" }],
        ContinuationToken: "tok-1",
      })
      .mockResolvedValueOnce({ Buckets: [{ Name: "bucket-2" }] });
    const { result } = await invokeDataSource(selectBucket, params);
    expect(result).toEqual([
      { label: "bucket-1", key: "bucket-1" },
      { label: "bucket-2", key: "bucket-2" },
    ]);
  });
});
