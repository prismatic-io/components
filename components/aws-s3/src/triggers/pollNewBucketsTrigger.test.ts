const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));
vi.mock("aws-utils", async () => {
  const { input } = await import("@prismatic-io/spectral");
  return {
    assumeRoleConnection: { key: "awsAssumeRole" },
    awsRegion: input({ label: "AWS Region", type: "string", required: false }),
    dynamicAccessAllInputs: {},
  };
});
vi.mock("../client", () => ({
  createS3Client: vi.fn(async () => ({ send: sendMock })),
}));
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import type { ActionContext } from "@prismatic-io/spectral";
import {
  createConnection,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { createS3Client } from "../client";
import { accessKeySecretPair } from "../connections";
import { LIST_BUCKETS_MAX_BUCKETS } from "../constants";
import {
  listBucketsExamplePayload,
  pollNewBucketsTriggerExamplePayload,
} from "../examplePayloads";
import type { PolledBucket, PollingState } from "../types";
import { pollNewBucketsTrigger } from "./pollNewBucketsTrigger";
const connection = createConnection(accessKeySecretPair, {
  accessKeyId: "fakeKey",
  secretAccessKey: "fakeSecret",
});
const params = {
  lookBackDate: "",
  accessKey: connection,
  awsRegion: "us-east-2",
  dynamicAccessKeyId: "",
  dynamicSecretAccessKey: "",
  dynamicSessionToken: "",
};
const T0 = "2024-03-08T00:00:00.000Z";
const T1 = "2024-03-09T00:00:00.000Z";
const T2 = "2024-03-10T00:00:00.000Z";
const createPollingContext = (initialState: PollingState = {}) => {
  let store: PollingState = initialState;
  const polling = {
    getState: () => store,
    setState: (state: PollingState) => {
      store = state;
    },
  };
  return {
    context: { polling } as unknown as Partial<ActionContext>,
    getStore: () => store,
  };
};
type PollResult = {
  payload: {
    body: {
      data: PolledBucket[];
    };
  };
  polledNoChanges: boolean;
};
const poll = async (
  context: Partial<ActionContext>,
): Promise<{
  result: PollResult;
}> => {
  const { result } = await invokeTrigger(
    pollNewBucketsTrigger as never,
    context,
    undefined,
    params as never,
  );
  return { result: result as unknown as PollResult };
};
describe("pollNewBucketsTrigger", () => {
  beforeEach(() => {
    sendMock.mockReset();
    vi.useFakeTimers({ toFake: ["Date"] });
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  test("emits only buckets created after the cursor, with ISO dates, and advances the cursor", async () => {
    sendMock.mockResolvedValue({
      Buckets: [
        ...listBucketsExamplePayload.data,
        {
          Name: "old-bucket",
          CreationDate: new Date("2024-03-01T00:00:00.000Z"),
        },
      ],
    });
    const { context, getStore } = createPollingContext({ lastPolledAt: T0 });
    vi.setSystemTime(new Date(T1));
    const { result } = await poll(context);
    const command = sendMock.mock.calls[0][0];
    expect(command).toBeInstanceOf(ListBucketsCommand);
    expect(command.input).toEqual({ MaxBuckets: LIST_BUCKETS_MAX_BUCKETS });
    expect(result.payload.body.data).toEqual(
      pollNewBucketsTriggerExamplePayload.payload.body.data,
    );
    expect(result.polledNoChanges).toBe(false);
    expect(getStore()).toEqual({ lastPolledAt: T1 });
  });
  test("does not re-emit buckets already returned by the previous poll", async () => {
    sendMock.mockResolvedValue({ Buckets: listBucketsExamplePayload.data });
    const { context, getStore } = createPollingContext({ lastPolledAt: T0 });
    vi.setSystemTime(new Date(T1));
    const first = await poll(context);
    vi.setSystemTime(new Date(T2));
    const second = await poll(context);
    expect(first.result.payload.body.data).toHaveLength(1);
    expect(second.result.payload.body.data).toEqual([]);
    expect(second.result.polledNoChanges).toBe(true);
    expect(getStore()).toEqual({ lastPolledAt: T2 });
  });
  test("passes the step logger and debug flag to the S3 client", async () => {
    sendMock.mockResolvedValue({ Buckets: [] });
    const { context } = createPollingContext({ lastPolledAt: T0 });
    await poll(context);
    expect(createS3Client).toHaveBeenCalledWith(
      expect.objectContaining({
        logger: expect.anything(),
        debug: expect.any(Boolean),
      }),
    );
  });
  test("seeds the initial sync from Look-back Date on the first poll", async () => {
    sendMock.mockResolvedValue({
      Buckets: [
        {
          Name: "backfilled-bucket",
          CreationDate: new Date("2024-03-05T00:00:00.000Z"),
        },
      ],
    });
    const { context, getStore } = createPollingContext({});
    vi.setSystemTime(new Date(T1));
    const { result } = await invokeTrigger(
      pollNewBucketsTrigger as never,
      context as never,
      undefined,
      { ...params, lookBackDate: "2024-03-01T00:00:00.000Z" } as never,
    );
    expect((result as unknown as PollResult).payload.body.data).toEqual([
      { Name: "backfilled-bucket", CreationDate: "2024-03-05T00:00:00.000Z" },
    ]);
    expect(getStore()).toEqual({ lastPolledAt: T1 });
  });
  test("falls back to now (no backfill) when neither stored state nor Look-back Date is set", async () => {
    sendMock.mockResolvedValue({ Buckets: [] });
    const { context, getStore } = createPollingContext({});
    vi.setSystemTime(new Date(T1));
    const { result } = await poll(context);
    expect(result.payload.body.data).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(getStore()).toEqual({ lastPolledAt: T1 });
  });
  test("includes a bucket stamped exactly at the Look-back Date on the initial sync (inclusive)", async () => {
    const lookBackDate = "2024-03-01T00:00:00.000Z";
    sendMock.mockResolvedValue({
      Buckets: [
        { Name: "midnight-bucket", CreationDate: new Date(lookBackDate) },
      ],
    });
    const { context } = createPollingContext({});
    vi.setSystemTime(new Date(T1));
    const { result } = await invokeTrigger(
      pollNewBucketsTrigger as never,
      context as never,
      undefined,
      { ...params, lookBackDate } as never,
    );
    expect((result as unknown as PollResult).payload.body.data).toEqual([
      { Name: "midnight-bucket", CreationDate: lookBackDate },
    ]);
  });
  test("does not re-emit a bucket whose CreationDate equals the stored cursor (strict, incremental)", async () => {
    sendMock.mockResolvedValue({
      Buckets: [{ Name: "boundary-bucket", CreationDate: new Date(T0) }],
    });
    const { context } = createPollingContext({ lastPolledAt: T0 });
    vi.setSystemTime(new Date(T1));
    const { result } = await poll(context);
    expect(result.payload.body.data).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
});
describe("pollNewBucketsTrigger batching", () => {
  test("declares batching with a default batch size", () => {
    expect(pollNewBucketsTrigger.triggerResolverSupport).toBe("valid");
    expect(pollNewBucketsTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollNewBucketsTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  test("resolveItems flattens the payload into tagged bucket changes", () => {
    const bucket: PolledBucket = {
      Name: "bucket-1",
      CreationDate: "2024-03-08T23:30:22.000Z",
    };
    const items = pollNewBucketsTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload: { body: { data: [bucket] } } } as never,
    );
    expect(items).toEqual([{ changeType: "created", record: bucket }]);
  });
});
