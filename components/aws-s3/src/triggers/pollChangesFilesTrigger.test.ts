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
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import type { ActionContext } from "@prismatic-io/spectral";
import {
  createConnection,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { accessKeySecretPair } from "../connections";
import { pollChangesFilesTriggerExamplePayload } from "../examplePayloads";
import type { FileListingCursor, PollingState } from "../types";
import { pollChangesFilesTrigger } from "./pollChangesFilesTrigger";
const connection = createConnection(accessKeySecretPair, {
  accessKeyId: "fakeKey",
  secretAccessKey: "fakeSecret",
});
const params = {
  bucket: "example-bucket",
  lookBackDate: "",
  accessKey: connection,
  awsRegion: "us-east-2",
  dynamicAccessKeyId: "",
  dynamicSecretAccessKey: "",
  dynamicSessionToken: "",
};
const T0 = "2024-01-15T00:00:00.000Z";
const T1 = "2024-01-15T01:00:00.000Z";
const T2 = "2024-01-15T02:00:00.000Z";
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
      data: string[];
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
    pollChangesFilesTrigger as never,
    context,
    undefined,
    params as never,
  );
  return { result: result as unknown as PollResult };
};
describe("pollChangesFilesTrigger", () => {
  beforeEach(() => {
    sendMock.mockReset();
    vi.useFakeTimers({ toFake: ["Date"] });
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  test("emits only objects modified after the cursor, then advances the cursor", async () => {
    const [newerKey, olderKey] =
      pollChangesFilesTriggerExamplePayload.payload.body.data;
    sendMock.mockResolvedValue({
      Contents: [
        { Key: olderKey, LastModified: new Date("2024-01-14T23:59:59.000Z") },
        { Key: newerKey, LastModified: new Date("2024-01-15T00:30:00.000Z") },
      ],
      IsTruncated: false,
    });
    const { context, getStore } = createPollingContext({ lastPolledAt: T0 });
    vi.setSystemTime(new Date(T1));
    const { result } = await poll(context);
    const command = sendMock.mock.calls[0][0];
    expect(command).toBeInstanceOf(ListObjectsV2Command);
    expect(command.input).toEqual({
      Bucket: "example-bucket",
      MaxKeys: 1000,
      StartAfter: undefined,
    });
    expect(result.payload.body.data).toEqual([newerKey]);
    expect(result.polledNoChanges).toBe(false);
    expect(getStore()).toEqual({ lastPolledAt: T1 });
  });
  test("does not re-emit objects already returned by the previous poll", async () => {
    sendMock.mockResolvedValue({
      Contents: [
        {
          Key: "invoices/2024-01-15.pdf",
          LastModified: new Date("2024-01-15T00:30:00.000Z"),
        },
      ],
      IsTruncated: false,
    });
    const { context, getStore } = createPollingContext({ lastPolledAt: T0 });
    vi.setSystemTime(new Date(T1));
    const first = await poll(context);
    vi.setSystemTime(new Date(T2));
    const second = await poll(context);
    expect(first.result.payload.body.data).toEqual(["invoices/2024-01-15.pdf"]);
    expect(second.result.payload.body.data).toEqual([]);
    expect(second.result.polledNoChanges).toBe(true);
    expect(getStore()).toEqual({ lastPolledAt: T2 });
  });
  test("lists every page, resuming after the last key of each truncated page", async () => {
    sendMock
      .mockResolvedValueOnce({
        Contents: [
          {
            Key: "page-1.txt",
            LastModified: new Date("2024-01-15T00:10:00.000Z"),
          },
        ],
        IsTruncated: true,
      })
      .mockResolvedValueOnce({
        Contents: [
          {
            Key: "page-2.txt",
            LastModified: new Date("2024-01-15T00:20:00.000Z"),
          },
        ],
        IsTruncated: false,
      });
    const { context } = createPollingContext({ lastPolledAt: T0 });
    vi.setSystemTime(new Date(T1));
    const { result } = await poll(context);
    expect(sendMock).toHaveBeenCalledTimes(2);
    expect(sendMock.mock.calls[0][0].input.StartAfter).toBeUndefined();
    expect(sendMock.mock.calls[1][0].input).toEqual({
      Bucket: "example-bucket",
      MaxKeys: 1000,
      StartAfter: "page-1.txt",
    });
    expect(result.payload.body.data).toEqual(["page-1.txt", "page-2.txt"]);
  });
  test("seeds the initial sync from Look-back Date on the first poll", async () => {
    sendMock.mockResolvedValue({
      Contents: [
        {
          Key: "backfilled.txt",
          LastModified: new Date("2024-01-10T00:00:00.000Z"),
        },
      ],
      IsTruncated: false,
    });
    const { context, getStore } = createPollingContext({});
    vi.setSystemTime(new Date(T1));
    const { result } = await invokeTrigger(
      pollChangesFilesTrigger as never,
      context as never,
      undefined,
      { ...params, lookBackDate: "2024-01-01T00:00:00.000Z" } as never,
    );
    expect((result as unknown as PollResult).payload.body.data).toEqual([
      "backfilled.txt",
    ]);
    expect(getStore()).toEqual({ lastPolledAt: T1 });
  });
  test("records the position without listing when neither stored state nor Look-back Date is set", async () => {
    const { context, getStore } = createPollingContext({});
    vi.setSystemTime(new Date(T1));
    const { result } = await poll(context);
    expect(sendMock).not.toHaveBeenCalled();
    expect(result.payload.body.data).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(getStore()).toEqual({ lastPolledAt: T1 });
  });
  test("includes a file stamped exactly at the Look-back Date on the initial sync (inclusive)", async () => {
    const lookBackDate = "2024-01-01T00:00:00.000Z";
    sendMock.mockResolvedValue({
      Contents: [{ Key: "midnight.txt", LastModified: new Date(lookBackDate) }],
      IsTruncated: false,
    });
    const { context } = createPollingContext({});
    vi.setSystemTime(new Date(T1));
    const { result } = await invokeTrigger(
      pollChangesFilesTrigger as never,
      context as never,
      undefined,
      { ...params, lookBackDate } as never,
    );
    expect((result as unknown as PollResult).payload.body.data).toEqual([
      "midnight.txt",
    ]);
  });
  test("defers a file stamped in the window's closing second to the next poll instead of losing it", async () => {
    sendMock.mockResolvedValue({
      Contents: [{ Key: "late.txt", LastModified: new Date(T1) }],
      IsTruncated: false,
    });
    const { context, getStore } = createPollingContext({ lastPolledAt: T0 });
    vi.setSystemTime(new Date("2024-01-15T01:00:00.500Z"));
    const first = await poll(context);
    expect(first.result.payload.body.data).toEqual([]);
    expect(getStore()).toEqual({ lastPolledAt: T1 });
    vi.setSystemTime(new Date(T2));
    const second = await poll(context);
    expect(second.result.payload.body.data).toEqual(["late.txt"]);
    vi.setSystemTime(new Date("2024-01-15T03:00:00.000Z"));
    const third = await poll(context);
    expect(third.result.payload.body.data).toEqual([]);
  });
  test("never rewinds a millisecond-precision position stored before windows were floored", async () => {
    const legacy = "2024-01-15T01:00:00.100Z";
    const { context, getStore } = createPollingContext({
      lastPolledAt: legacy,
    });
    vi.setSystemTime(new Date("2024-01-15T01:00:00.900Z"));
    const { result } = await poll(context);
    expect(sendMock).not.toHaveBeenCalled();
    expect(result.polledNoChanges).toBe(true);
    expect(getStore()).toEqual({ lastPolledAt: legacy });
  });
  test("ignores an in-flight cursor left by a batched drain and lists from the start", async () => {
    sendMock.mockResolvedValue({
      Contents: [
        { Key: "a.txt", LastModified: new Date("2024-01-15T00:30:00.000Z") },
      ],
      IsTruncated: false,
    });
    const { context, getStore } = createPollingContext({
      lastPolledAt: T0,
      cursor: { windowStart: T0, windowEnd: T1, startAfter: "m.txt" },
    });
    vi.setSystemTime(new Date(T2));
    const { result } = await poll(context);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock.mock.calls[0][0].input.StartAfter).toBeUndefined();
    expect(result.payload.body.data).toEqual(["a.txt"]);
    expect(getStore()).toEqual({ lastPolledAt: T2 });
  });
});
describe("pollChangesFilesTrigger trigger pagination (batching enabled)", () => {
  const batch = { enabled: true as const, batchSize: 50 };
  type BatchedResult = PollResult & {
    payload: {
      paginationState?: FileListingCursor;
    };
  };
  const pollBatched = async (
    context: Partial<ActionContext>,
    paginationState?: FileListingCursor,
    overrides: Partial<typeof params> = {},
  ): Promise<BatchedResult> => {
    const { result } = await invokeTrigger(
      pollChangesFilesTrigger as never,
      { ...context, batch } as never,
      { paginationState } as never,
      { ...params, ...overrides } as never,
    );
    return result as unknown as BatchedResult;
  };
  beforeEach(() => {
    sendMock.mockReset();
    vi.useFakeTimers({ toFake: ["Date"] });
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  test("lists one page per round, hands the rest to the platform and mirrors the cursor in state", async () => {
    sendMock.mockResolvedValueOnce({
      Contents: [
        { Key: "a.txt", LastModified: new Date("2024-01-14T00:00:00.000Z") },
        { Key: "b.txt", LastModified: new Date("2024-01-15T00:30:00.000Z") },
      ],
      IsTruncated: true,
    });
    const { context, getStore } = createPollingContext({ lastPolledAt: T0 });
    vi.setSystemTime(new Date(T1));
    const result = await pollBatched(context);
    const cursor = { windowStart: T0, windowEnd: T1, startAfter: "b.txt" };
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(result.payload.body.data).toEqual(["b.txt"]);
    expect(result.payload.paginationState).toEqual(cursor);
    expect(result.polledNoChanges).toBe(false);
    expect(getStore()).toEqual({ lastPolledAt: T0, cursor });
  });
  test("a round with nothing matching still keeps draining while pages remain", async () => {
    sendMock.mockResolvedValueOnce({
      Contents: [
        { Key: "old.txt", LastModified: new Date("2024-01-01T00:00:00.000Z") },
      ],
      IsTruncated: true,
    });
    const { context } = createPollingContext({ lastPolledAt: T0 });
    vi.setSystemTime(new Date(T1));
    const result = await pollBatched(context);
    expect(result.payload.body.data).toEqual([]);
    expect(result.payload.paginationState).toEqual({
      windowStart: T0,
      windowEnd: T1,
      startAfter: "old.txt",
    });
    expect(result.polledNoChanges).toBe(false);
  });
  test("the final round keeps the frozen window, clears the cursor and commits the window end", async () => {
    sendMock.mockResolvedValueOnce({
      Contents: [
        { Key: "c.txt", LastModified: new Date("2024-01-15T00:45:00.000Z") },
        { Key: "d.txt", LastModified: new Date("2024-01-15T01:30:00.000Z") },
      ],
      IsTruncated: false,
    });
    const cursor = { windowStart: T0, windowEnd: T1, startAfter: "b.txt" };
    const { context, getStore } = createPollingContext({
      lastPolledAt: T0,
      cursor,
    });
    vi.setSystemTime(new Date(T2));
    const result = await pollBatched(context, cursor);
    expect(sendMock.mock.calls[0][0].input).toEqual({
      Bucket: "example-bucket",
      MaxKeys: 1000,
      StartAfter: "b.txt",
    });
    expect(result.payload.body.data).toEqual(["c.txt"]);
    expect(result.payload.paginationState).toBeUndefined();
    expect(result.polledNoChanges).toBe(false);
    expect(getStore()).toEqual({ lastPolledAt: T1 });
  });
  test("a recurrence that finds no platform cursor resumes the drain from the one mirrored in state", async () => {
    sendMock.mockResolvedValueOnce({ Contents: [], IsTruncated: false });
    const cursor = { windowStart: T0, windowEnd: T1, startAfter: "b.txt" };
    const { context, getStore } = createPollingContext({
      lastPolledAt: T0,
      cursor,
    });
    vi.setSystemTime(new Date(T2));
    const result = await pollBatched(context);
    expect(sendMock.mock.calls[0][0].input.StartAfter).toBe("b.txt");
    expect(result.polledNoChanges).toBe(true);
    expect(getStore()).toEqual({ lastPolledAt: T1 });
  });
  test("an initial sync that has not finished keeps no lastPolledAt, so it restarts rather than skips", async () => {
    sendMock.mockResolvedValueOnce({
      Contents: [
        {
          Key: "backfilled.txt",
          LastModified: new Date("2024-01-10T00:00:00.000Z"),
        },
      ],
      IsTruncated: true,
    });
    const { context, getStore } = createPollingContext({});
    vi.setSystemTime(new Date(T1));
    const result = await pollBatched(context, undefined, {
      lookBackDate: "2024-01-01T00:00:00.000Z",
    });
    expect(result.payload.body.data).toEqual(["backfilled.txt"]);
    expect(getStore()).toEqual({
      cursor: {
        windowStart: "2024-01-01T00:00:00.000Z",
        windowEnd: T1,
        startAfter: "backfilled.txt",
      },
    });
  });
  test("an empty window lists nothing and reports no changes", async () => {
    const { context, getStore } = createPollingContext({});
    vi.setSystemTime(new Date(T1));
    const result = await pollBatched(context);
    expect(sendMock).not.toHaveBeenCalled();
    expect(result.payload.paginationState).toBeUndefined();
    expect(result.polledNoChanges).toBe(true);
    expect(getStore()).toEqual({ lastPolledAt: T1 });
  });
  test("a platform-driven round never reports polledNoChanges, even when it emits nothing", async () => {
    sendMock.mockResolvedValueOnce({ Contents: [], IsTruncated: false });
    const cursor = { windowStart: T0, windowEnd: T1, startAfter: "b.txt" };
    const { context } = createPollingContext({ lastPolledAt: T0, cursor });
    vi.setSystemTime(new Date(T2));
    const result = await pollBatched(context, cursor);
    expect(result.payload.body.data).toEqual([]);
    expect(result.polledNoChanges).toBe(false);
  });
  test("getNextPaginationState returns the round's cursor, or null on the last page", () => {
    const cursor = { windowStart: T0, windowEnd: T1, startAfter: "b.txt" };
    const next =
      pollChangesFilesTrigger.triggerResolver?.getNextPaginationState;
    expect(
      next?.({} as never, { payload: { paginationState: cursor } } as never),
    ).toEqual(cursor);
    expect(next?.({} as never, { payload: {} } as never)).toBeNull();
  });
});
describe("pollChangesFilesTrigger batching", () => {
  test("declares batching with a default batch size", () => {
    expect(pollChangesFilesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesFilesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(
      pollChangesFilesTrigger.triggerResolver?.resolveItems,
    ).toBeInstanceOf(Function);
  });
  test("resolveItems flattens the payload into tagged file changes", () => {
    const items = pollChangesFilesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload: { body: { data: ["a.txt", "b.txt"] } } } as never,
    );
    expect(items).toEqual([
      { changeType: "changed", record: "a.txt" },
      { changeType: "changed", record: "b.txt" },
    ]);
  });
});
