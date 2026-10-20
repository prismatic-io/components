import { describe, expect, test } from "vitest";
import type { BookRecord, CRMRecord } from "../types";
import { lookBackDateClean } from "./general";
import {
  buildCRMPollingState,
  isRejectedPageToken,
  resolveBooksRecordChanges,
  resolveCRMRecordChanges,
  resolveCRMStream,
  resolvePollingStart,
} from "./polling";
const crm = (id: string): CRMRecord => ({
  id,
  Created_Time: "2026-01-01T00:00:00+00:00",
  Modified_Time: "2026-01-02T00:00:00+00:00",
  Full_Name: id,
});
const book = (id: string): BookRecord => ({
  created_time: "2026-01-01T00:00:00+00:00",
  last_modified_time: id,
});
describe("resolveCRMRecordChanges", () => {
  test("tags every record with how it changed", () => {
    expect(
      resolveCRMRecordChanges({ created: [crm("1")], updated: [crm("2")] }),
    ).toEqual([
      { changeType: "created", record: crm("1") },
      { changeType: "updated", record: crm("2") },
    ]);
  });
  test("returns [] for empty or undefined changes", () => {
    expect(resolveCRMRecordChanges({})).toEqual([]);
    expect(resolveCRMRecordChanges({ created: [], updated: [] })).toEqual([]);
    expect(resolveCRMRecordChanges(undefined)).toEqual([]);
  });
  test("tolerates an absent array", () => {
    expect(resolveCRMRecordChanges({ created: [crm("1")] })).toEqual([
      { changeType: "created", record: crm("1") },
    ]);
    expect(resolveCRMRecordChanges({ updated: [crm("2")] })).toEqual([
      { changeType: "updated", record: crm("2") },
    ]);
  });
});
describe("resolveBooksRecordChanges", () => {
  test("tags every record with how it changed", () => {
    expect(
      resolveBooksRecordChanges({ created: [book("a")], updated: [book("b")] }),
    ).toEqual([
      { changeType: "created", record: book("a") },
      { changeType: "updated", record: book("b") },
    ]);
  });
  test("returns [] for empty or undefined changes and tolerates an absent array", () => {
    expect(resolveBooksRecordChanges({})).toEqual([]);
    expect(resolveBooksRecordChanges(undefined)).toEqual([]);
    expect(resolveBooksRecordChanges({ updated: [book("b")] })).toEqual([
      { changeType: "updated", record: book("b") },
    ]);
  });
});
describe("resolvePollingStart", () => {
  const now = new Date("2026-03-01T00:00:00.000Z");
  test("first poll without a Look-back Date starts at now", () => {
    const r = resolvePollingStart({}, "", now);
    expect(r.sinceDate).toEqual(now);
    expect(r.isBackfill).toBe(false);
  });
  test("first poll with a Look-back Date seeds from it and is a backfill", () => {
    const r = resolvePollingStart({}, "2026-01-01T00:00:00.000Z", now);
    expect(r.sinceDate.toISOString()).toBe("2026-01-01T00:00:00.000Z");
    expect(r.isBackfill).toBe(true);
  });
  test("later polls ignore the Look-back Date", () => {
    const r = resolvePollingStart(
      { lastPolledAt: "2026-02-01T00:00:00.000Z" },
      "2026-01-01T00:00:00.000Z",
      now,
    );
    expect(r.sinceDate.toISOString()).toBe("2026-02-01T00:00:00.000Z");
    expect(r.isBackfill).toBe(false);
  });
  test("reads the pre-batching lastUpdated key as a fallback", () => {
    expect(
      resolvePollingStart({ lastUpdated: "2026-02-01T00:00:00.000Z" }, "", now)
        .sinceDate,
    ).toEqual(new Date("2026-02-01T00:00:00.000Z"));
  });
  test("an unfinished backfill stays a backfill", () => {
    const r = resolvePollingStart(
      { lastPolledAt: "2026-01-01T00:00:00.000Z", backfillActive: true },
      "2026-01-01T00:00:00.000Z",
      now,
    );
    expect(r.isBackfill).toBe(true);
  });
});
describe("resolveCRMStream and buildCRMPollingState", () => {
  const now = new Date("2026-03-01T00:00:00.000Z");
  const started = "2026-02-28T00:00:00.000Z";
  test("a cursor on the round wins over stored state", () => {
    const s = resolveCRMStream(
      { pageToken: "old", streamStartedAt: "2026-02-01T00:00:00.000Z" },
      { pageToken: "new", streamStartedAt: started },
      now,
    );
    expect(s.pageToken).toBe("new");
    expect(s.streamStartedAt.toISOString()).toBe(started);
  });
  test("no held token starts a stream at now", () => {
    const s = resolveCRMStream({}, undefined, now);
    expect(s.pageToken).toBeUndefined();
    expect(s.streamStartedAt).toEqual(now);
  });
  test("mid-drain keeps lastPolledAt at sinceDate; a drained stream commits its start", () => {
    const since = new Date("2026-02-01T00:00:00.000Z");
    const start = new Date(started);
    expect(
      buildCRMPollingState(
        { pageToken: "t", streamStartedAt: started },
        start,
        since,
        true,
      ),
    ).toEqual({
      pageToken: "t",
      streamStartedAt: started,
      lastPolledAt: since.toISOString(),
      backfillActive: true,
    });
    expect(buildCRMPollingState(null, start, since, true)).toEqual({
      lastPolledAt: started,
    });
  });
});
describe("isRejectedPageToken", () => {
  const err = (status: number, code: string) => ({
    response: { status, data: { code } },
  });
  test("matches only the documented expired and mismatch rejections", () => {
    expect(isRejectedPageToken(err(400, "EXPIRED_VALUE"))).toBe(true);
    expect(isRejectedPageToken(err(400, "TOKEN_BOUND_DATA_MISMATCH"))).toBe(
      true,
    );
    expect(isRejectedPageToken(err(400, "REQUIRED_PARAM_MISSING"))).toBe(false);
    expect(isRejectedPageToken(err(401, "EXPIRED_VALUE"))).toBe(false);
    expect(isRejectedPageToken(new Error("boom"))).toBe(false);
  });
});
describe("lookBackDateClean", () => {
  test("returns an empty string for empty input", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean("  ")).toBe("");
  });
  test("normalizes a valid past date to an ISO instant", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("rejects a bad format, a non-calendar date and a future date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      "Look-back Date must be",
    );
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      "Look-back Date must be",
    );
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      "cannot be a future date",
    );
    expect(() => lookBackDateClean(20260101)).toThrow("Look-back Date must be");
  });
});
