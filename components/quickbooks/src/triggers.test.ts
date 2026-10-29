import { afterEach, describe, expect, test, vi } from "vitest";
import { pollChangesTrigger } from "./triggers";
import type { PollingState } from "./types";
import { fetchQuickBooksRecordsSince } from "./util/polling";

vi.mock("./util/polling", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./util/polling")>();
  return { ...actual, fetchQuickBooksRecordsSince: vi.fn() };
});

const fetchMock = vi.mocked(fetchQuickBooksRecordsSince);

const makeContext = (initial: PollingState) => {
  let state: PollingState = initial;
  return {
    get state() {
      return state;
    },
    context: {
      polling: {
        getState: () => state,
        setState: (next: PollingState) => {
          state = next;
        },
      },
      debug: { enabled: false },
      logger: { debug: vi.fn() },
      batch: { enabled: false },
    },
  };
};

const params = {
  connection: {},
  pollResourceType: "customer",
  lookBackDate: "",
  showNewRecords: true,
  showUpdatedRecords: true,
};

const perform = (context: unknown, payload: unknown) =>
  (
    pollChangesTrigger.perform as unknown as (
      c: unknown,
      p: unknown,
      i: unknown,
    ) => Promise<unknown>
  )(context, payload, params);

afterEach(() => {
  vi.useRealTimers();
  fetchMock.mockReset();
});

describe("pollChangesTrigger drain watermark", () => {
  test("a drain spanning two recurrences commits the time its first round began", async () => {
    const harness = makeContext({ lastPolledAt: "2026-01-01T00:00:00.000Z" });
    vi.useFakeTimers();

    vi.setSystemTime(new Date("2026-01-02T00:00:00.000Z"));
    fetchMock.mockResolvedValueOnce({
      records: [],
      truncated: true,
      nextPosition: 100001,
    });
    await perform(harness.context, {});
    expect(harness.state.lastPolledAt).toBe("2026-01-01T00:00:00.000Z");
    expect(harness.state.windowStart).toBe("2026-01-02T00:00:00.000Z");

    vi.setSystemTime(new Date("2026-01-02T01:00:00.000Z"));
    fetchMock.mockResolvedValueOnce({
      records: [],
      truncated: false,
      nextPosition: 100500,
    });
    await perform(harness.context, {});

    expect(harness.state.lastPolledAt).toBe("2026-01-02T00:00:00.000Z");
    expect(harness.state.windowStart).toBeUndefined();
    expect(harness.state.resumePosition).toBeUndefined();
  });

  test("a single-round drain commits that round's start time", async () => {
    const harness = makeContext({ lastPolledAt: "2026-01-01T00:00:00.000Z" });
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-02T00:00:00.000Z"));
    fetchMock.mockResolvedValueOnce({
      records: [],
      truncated: false,
      nextPosition: 1,
    });
    await perform(harness.context, {});
    expect(harness.state.lastPolledAt).toBe("2026-01-02T00:00:00.000Z");
  });

  test("a batched drain carries the window start in its pagination state", async () => {
    const harness = makeContext({ lastPolledAt: "2026-01-01T00:00:00.000Z" });
    harness.context.batch.enabled = true;
    vi.useFakeTimers();

    vi.setSystemTime(new Date("2026-01-02T00:00:00.000Z"));
    fetchMock.mockResolvedValueOnce({
      records: [],
      truncated: true,
      nextPosition: 1001,
    });
    const first = (await perform(harness.context, {})) as {
      payload: { paginationState?: { windowStart?: string } };
    };
    expect(first.payload.paginationState?.windowStart).toBe(
      "2026-01-02T00:00:00.000Z",
    );

    vi.setSystemTime(new Date("2026-01-02T00:05:00.000Z"));
    fetchMock.mockResolvedValueOnce({
      records: [],
      truncated: false,
      nextPosition: 1500,
    });
    await perform(harness.context, {
      paginationState: first.payload.paginationState,
    });
    expect(harness.state.lastPolledAt).toBe("2026-01-02T00:00:00.000Z");
  });
});
