import type { PollingCursorContext, PollingState } from "../types";
import {
  readLastPolledAt,
  resolvePolledBucketChanges,
  resolvePolledFileChanges,
} from "./polling";
const createContext = (state: PollingState): PollingCursorContext =>
  ({
    logger: { debug: vi.fn() },
    debug: { enabled: false },
    polling: { getState: () => state as unknown as Record<string, unknown> },
  }) as unknown as PollingCursorContext;
describe("readLastPolledAt", () => {
  const NOW = "2024-01-15T02:00:00.000Z";
  const LOOK_BACK = "2024-01-01T00:00:00.000Z";
  const STORED = "2024-01-10T00:00:00.000Z";
  test("no stored state and no Look-back Date: falls back to now, strict", () => {
    expect(readLastPolledAt(createContext({}), NOW, "")).toEqual({
      since: NOW,
      inclusive: false,
    });
  });
  test("no stored state, Look-back Date set: seeds the initial sync, inclusive", () => {
    expect(readLastPolledAt(createContext({}), NOW, LOOK_BACK)).toEqual({
      since: LOOK_BACK,
      inclusive: true,
    });
  });
  test("stored state present: uses it regardless of Look-back Date, strict", () => {
    expect(
      readLastPolledAt(createContext({ lastPolledAt: STORED }), NOW, LOOK_BACK),
    ).toEqual({
      since: STORED,
      inclusive: false,
    });
    expect(
      readLastPolledAt(createContext({ lastPolledAt: STORED }), NOW, ""),
    ).toEqual({
      since: STORED,
      inclusive: false,
    });
  });
});
describe("resolvePolledFileChanges", () => {
  test("tags every key as changed", () => {
    expect(resolvePolledFileChanges(["a.txt", "b.txt"])).toEqual([
      { changeType: "changed", record: "a.txt" },
      { changeType: "changed", record: "b.txt" },
    ]);
  });
  test("returns [] for an empty array", () => {
    expect(resolvePolledFileChanges([])).toEqual([]);
  });
  test("returns [] for undefined", () => {
    expect(resolvePolledFileChanges(undefined)).toEqual([]);
  });
});
describe("resolvePolledBucketChanges", () => {
  const bucket = { Name: "bucket-1", CreationDate: "2024-03-08T23:30:22.000Z" };
  test("tags every bucket as created", () => {
    expect(resolvePolledBucketChanges([bucket])).toEqual([
      { changeType: "created", record: bucket },
    ]);
  });
  test("returns [] for an empty array", () => {
    expect(resolvePolledBucketChanges([])).toEqual([]);
  });
  test("returns [] for undefined", () => {
    expect(resolvePolledBucketChanges(undefined)).toEqual([]);
  });
});
