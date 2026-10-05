import { ListBucketsCommand, type S3Client } from "@aws-sdk/client-s3";
import { LIST_BUCKETS_MAX_BUCKETS } from "../constants";
import { listAllBuckets } from "./buckets";
const sendMock = vi.fn();
const s3 = { send: sendMock } as unknown as S3Client;
describe("listAllBuckets", () => {
  beforeEach(() => {
    sendMock.mockReset();
  });
  test("sends a paginated ListBucketsCommand with the maximum page size", async () => {
    sendMock.mockResolvedValue({ Buckets: [{ Name: "only-bucket" }] });
    const buckets = await listAllBuckets(s3);
    expect(sendMock).toHaveBeenCalledTimes(1);
    const command = sendMock.mock.calls[0][0];
    expect(command).toBeInstanceOf(ListBucketsCommand);
    expect(command.input).toEqual({ MaxBuckets: LIST_BUCKETS_MAX_BUCKETS });
    expect(buckets).toEqual([{ Name: "only-bucket" }]);
  });
  test("follows ContinuationToken across pages and concatenates the buckets in order", async () => {
    sendMock
      .mockResolvedValueOnce({
        Buckets: [{ Name: "bucket-1" }],
        ContinuationToken: "tok-1",
      })
      .mockResolvedValueOnce({
        Buckets: [{ Name: "bucket-2" }],
        ContinuationToken: "tok-2",
      })
      .mockResolvedValueOnce({ Buckets: [{ Name: "bucket-3" }] });
    const buckets = await listAllBuckets(s3);
    expect(
      sendMock.mock.calls.map(([command]) => command.input.ContinuationToken),
    ).toEqual([undefined, "tok-1", "tok-2"]);
    expect(buckets.map(({ Name }) => Name)).toEqual([
      "bucket-1",
      "bucket-2",
      "bucket-3",
    ]);
  });
  test("returns an empty list when a response has no Buckets field", async () => {
    sendMock.mockResolvedValue({});
    await expect(listAllBuckets(s3)).resolves.toEqual([]);
  });
});
