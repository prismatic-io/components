import type { IntercomRecord } from "./types";
import { lookBackDateClean, resolvePollingRecordChanges } from "./util";
const created: IntercomRecord = {
  id: "1",
  created_at: 1767225600,
  updated_at: 1767225600,
};
const updated: IntercomRecord = {
  id: "2",
  created_at: 1750000000,
  updated_at: 1767312000,
};
describe("lookBackDateClean", () => {
  it("returns an empty string for an empty value", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
  });
  it("normalizes a valid date to 00:00:00 UTC", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  it("rejects a malformed date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow("Look-back Date");
  });
  it("rejects a non-calendar date", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow("Look-back Date");
  });
  it("rejects a future date", () => {
    expect(() => lookBackDateClean("2999-01-01")).toThrow("future date");
  });
});
describe("resolvePollingRecordChanges", () => {
  it("tags every record with how it changed", () => {
    expect(
      resolvePollingRecordChanges({ created: [created], updated: [updated] }),
    ).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });
  it("returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  it("tolerates a single absent array", () => {
    expect(
      resolvePollingRecordChanges({ updated: [updated] } as never),
    ).toEqual([{ changeType: "updated", record: updated }]);
    expect(
      resolvePollingRecordChanges({ created: [created] } as never),
    ).toEqual([{ changeType: "created", record: created }]);
  });
});
