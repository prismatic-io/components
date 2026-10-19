import type { GorgiasRecord } from "../types";
import { resolvePollingRecordChanges } from "./resolvePollingRecordChanges";
const created: GorgiasRecord = {
  id: 1,
  created_datetime: "2026-01-01T00:00:00Z",
  updated_datetime: "2026-01-01T00:00:00Z",
};
const updated: GorgiasRecord = {
  id: 2,
  created_datetime: "2025-12-01T00:00:00Z",
  updated_datetime: "2026-01-02T00:00:00Z",
};
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
});
describe("resolvePollingRecordChanges with a single absent array", () => {
  it("tolerates a missing updated array", () => {
    expect(
      resolvePollingRecordChanges({ created: [created] } as never),
    ).toEqual([{ changeType: "created", record: created }]);
  });
  it("tolerates a missing created array", () => {
    expect(
      resolvePollingRecordChanges({ updated: [updated] } as never),
    ).toEqual([{ changeType: "updated", record: updated }]);
  });
});
