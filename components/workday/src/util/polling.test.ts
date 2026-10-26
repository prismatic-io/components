import { POLLING_SEEN_MAX } from "../constants";
import {
  advanceWqlWatermark,
  applyWqlWatermark,
  formatRaasWatermark,
  getEventStepsWindow,
  getPollingWindow,
  getWqlWindow,
  resolveEventStepChanges,
  resolveRecordChanges,
  selectChangedRecords,
  selectNewEventSteps,
} from "./polling";
const NOW = "2026-10-15T12:00:00.000Z";
const row = { workdayID: "a1" };
const step = { id: "s1", creationDate: "2026-10-15" };
describe("resolveRecordChanges", () => {
  it("tags every row as changed", () => {
    expect(resolveRecordChanges({ changed: [row] })).toEqual([
      { changeType: "changed", record: row },
    ]);
  });
  it("returns [] for empty, undefined, or absent changes", () => {
    expect(resolveRecordChanges({ changed: [] })).toEqual([]);
    expect(resolveRecordChanges(undefined)).toEqual([]);
    expect(resolveRecordChanges({})).toEqual([]);
  });
});
describe("resolveEventStepChanges", () => {
  it("tags every step as created", () => {
    expect(resolveEventStepChanges({ created: [step] })).toEqual([
      { changeType: "created", record: step },
    ]);
  });
  it("returns [] for empty, undefined, or absent changes", () => {
    expect(resolveEventStepChanges({ created: [] })).toEqual([]);
    expect(resolveEventStepChanges(undefined)).toEqual([]);
    expect(resolveEventStepChanges({})).toEqual([]);
  });
});
describe("getPollingWindow", () => {
  it("starts a later window five minutes before the previous poll", () => {
    expect(
      getPollingWindow({ lastPolledAt: "2026-10-15T11:00:00.000Z" }, "", NOW),
    ).toEqual({
      since: "2026-10-15T10:55:00.000Z",
      isInitialSync: false,
      isBaseline: false,
    });
  });
  it("ignores the Look-back Date once state exists", () => {
    expect(
      getPollingWindow({ lastPolledAt: NOW }, "2026-01-01T00:00:00.000Z", NOW)
        .isInitialSync,
    ).toBe(false);
  });
});
describe("getEventStepsWindow", () => {
  it("starts a day before the previous poll's date", () => {
    expect(
      getEventStepsWindow({ lastPolledAt: NOW }, "", NOW).since.slice(0, 10),
    ).toBe("2026-10-14");
  });
});
describe("watermark formats", () => {
  it("formats a RaaS date-time and date watermark", () => {
    expect(formatRaasWatermark(NOW, "dateTime")).toBe("2026-10-15T12:00:00Z");
    expect(formatRaasWatermark(NOW, "date")).toBe("2026-10-15");
  });
  it("replaces every {{lastPolledAt}} with a quoted WQL UTC date-time literal", () => {
    expect(
      applyWqlWatermark(
        "WHERE a >= {{lastPolledAt}} OR b >= {{lastPolledAt}}",
        NOW,
      ),
    ).toBe("WHERE a >= '2026-10-15 12:00:00Z' OR b >= '2026-10-15 12:00:00Z'");
  });
});
describe("dedupe cap", () => {
  const incremental = { since: NOW, isInitialSync: false, isBaseline: false };
  it("keeps every fingerprint of a window within the cap, without warning", () => {
    const warn = vi.fn();
    const rows = [{ workdayID: "a1" }, { workdayID: "b2" }];
    const { seen } = selectChangedRecords(rows, "workdayID", incremental, [], {
      warn,
    });
    expect(seen).toHaveLength(2);
    expect(seen.every((entry) => /^[0-9a-f]{16}$/.test(entry))).toBe(true);
    expect(warn).not.toHaveBeenCalled();
  });
  it("warns with the window size and keeps the last rows when a window exceeds the cap", () => {
    const warn = vi.fn();
    const rows = Array.from({ length: POLLING_SEEN_MAX + 2 }, (_, index) => ({
      workdayID: `w${index}`,
    }));
    const { changed, seen } = selectChangedRecords(
      rows,
      "workdayID",
      incremental,
      [],
      { warn },
    );
    expect(changed).toHaveLength(POLLING_SEEN_MAX + 2);
    expect(seen).toHaveLength(POLLING_SEEN_MAX);
    const kept = selectChangedRecords(rows.slice(2), "workdayID", incremental);
    expect(seen).toEqual(kept.seen);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain(
      `returned ${POLLING_SEEN_MAX + 2} distinct rows, more than the ${POLLING_SEEN_MAX}`,
    );
  });
  it("keeps the most recently created event steps when a window exceeds the cap", () => {
    const warn = vi.fn();
    const newer = Array.from({ length: POLLING_SEEN_MAX }, (_, index) => ({
      id: `n${index}`,
      creationDate: "2026-10-15",
    }));
    const older = [{ id: "old", creationDate: "2026-10-14" }];
    const { seen } = selectNewEventSteps(
      [...newer, ...older],
      incremental,
      [],
      "2026-10-14T12:00:00.000Z",
      { warn },
    );
    expect(seen).toHaveLength(POLLING_SEEN_MAX);
    expect(seen).not.toContain("old");
    expect(seen[0]).toBe("n0");
    expect(warn.mock.calls[0][0]).toContain(
      `returned ${POLLING_SEEN_MAX + 1} distinct event steps`,
    );
  });
});
describe("getWqlWindow", () => {
  const TEN_MIN = 10 * 60 * 1000;
  it("starts exactly at a stored watermark", () => {
    expect(
      getWqlWindow({ watermark: NOW }, "", "2030-01-01T00:00:00.000Z"),
    ).toEqual({ since: NOW, isInitialSync: false, isBaseline: false });
  });
  it("starts the overlap before a stored watermark", () => {
    expect(
      getWqlWindow({ watermark: NOW }, "", "2030-01-01T00:00:00.000Z", TEN_MIN)
        .since,
    ).toBe("2026-10-15T11:50:00.000Z");
  });
  it("never starts before the epoch, however large the overlap", () => {
    expect(
      getWqlWindow({ watermark: NOW }, "", NOW, Number.MAX_SAFE_INTEGER * 60000)
        .since,
    ).toBe("1970-01-01T00:00:00.000Z");
  });
  it("falls back to the clock rules without a watermark, overlap ignored", () => {
    expect(getWqlWindow(undefined, "", NOW, TEN_MIN)).toEqual(
      getPollingWindow(undefined, "", NOW),
    );
    expect(getWqlWindow({ lastPolledAt: NOW }, "", NOW, TEN_MIN)).toEqual(
      getPollingWindow({ lastPolledAt: NOW }, "", NOW),
    );
    expect(
      getWqlWindow(undefined, "2026-01-01T00:00:00.000Z", NOW, TEN_MIN),
    ).toEqual(getPollingWindow(undefined, "2026-01-01T00:00:00.000Z", NOW));
  });
});
describe("advanceWqlWatermark", () => {
  const advance = (
    rows: Record<string, unknown>[],
    overlapMs = 0,
    floor = NOW,
  ) =>
    advanceWqlWatermark(rows, {
      dateField: "d",
      recordKeyField: "workdayID",
      floor,
      overlapMs,
    });
  const at = (value: unknown) => [{ workdayID: "a1", d: value }];
  it("parses dates, date-times and offsets as Workday returns them", () => {
    const next = (value: unknown) => advance(at(value)).watermark;
    expect(next("2026-10-16")).toBe("2026-10-16T00:00:00.000Z");
    expect(next("2026-10-16T08:30:00-07:00")).toBe("2026-10-16T15:30:00.000Z");
    expect(next("2026-10-16T08:30:00-0700")).toBe("2026-10-16T15:30:00.000Z");
    expect(next("2026-10-16 08:30:00")).toBe("2026-10-16T08:30:00.000Z");
  });
  it("keeps the floor when no row is newer", () => {
    expect(advance(at("2026-10-14"))).toEqual({ watermark: NOW });
    expect(advance([])).toEqual({ watermark: NOW });
  });
  it("remembers every row from the watermark second, not just the newest instant", () => {
    const cursor = advance([
      { workdayID: "a", d: "2026-10-16T08:00:00.100Z" },
      { workdayID: "b", d: "2026-10-16T08:00:00.900Z" },
      { workdayID: "c", d: "2026-10-16T07:59:59.000Z" },
    ]);
    expect(cursor.watermark).toBe("2026-10-16T08:00:00.900Z");
    expect(cursor.seen).toHaveLength(2);
  });
  it("remembers every row inside the overlap, never moving the watermark back", () => {
    const rows = [
      { workdayID: "a", d: "2026-10-16T08:00:00.900Z" },
      { workdayID: "b", d: "2026-10-16T07:55:00.000Z" },
      { workdayID: "c", d: "2026-10-16T07:49:00.000Z" },
    ];
    const cursor = advance(rows, 10 * 60 * 1000);
    expect(cursor.watermark).toBe("2026-10-16T08:00:00.900Z");
    expect(cursor.seen).toHaveLength(2);
  });
  it("remembers backdated rows inside the overlap when none is newer than the floor", () => {
    const cursor = advance(
      [{ workdayID: "a", d: "2026-10-15T11:55:00.000Z" }],
      10 * 60 * 1000,
    );
    expect(cursor.watermark).toBe(NOW);
    expect(cursor.seen).toHaveLength(1);
  });
  it("throws when rows came back and none has a usable date", () => {
    expect(() => advance(at("soon"))).toThrow(/Date Field "d"/);
  });
});
