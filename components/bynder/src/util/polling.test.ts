import { POLL_RESOURCE_CONFIG } from "../constants";
import type { BynderChangesObject, BynderRecord } from "../types/triggers";
import { collectRecordChanges, resolveBynderRecordChanges } from "./polling";

const created: BynderRecord = {
  id: "created-1",
  dateCreated: "2026-01-02T00:00:00+00:00",
  dateModified: "2026-01-02T00:00:00+00:00",
};
const updated: BynderRecord = {
  id: "updated-1",
  dateCreated: "2025-01-01T00:00:00+00:00",
  dateModified: "2026-01-03T00:00:00+00:00",
};

test("resolveBynderRecordChanges tags every record with how it changed", () => {
  expect(
    resolveBynderRecordChanges({ created: [created], updated: [updated] }),
  ).toEqual([
    { changeType: "created", record: created },
    { changeType: "updated", record: updated },
  ]);
});

test("resolveBynderRecordChanges returns [] for empty or undefined changes", () => {
  expect(resolveBynderRecordChanges({ created: [], updated: [] })).toEqual([]);
  expect(resolveBynderRecordChanges(undefined)).toEqual([]);
});

test("resolveBynderRecordChanges tolerates a single absent array", () => {
  expect(
    resolveBynderRecordChanges({ created: [created] } as BynderChangesObject),
  ).toEqual([{ changeType: "created", record: created }]);
  expect(
    resolveBynderRecordChanges({ updated: [updated] } as BynderChangesObject),
  ).toEqual([{ changeType: "updated", record: updated }]);
});

describe("collectRecordChanges", () => {
  const since = "2026-01-02T00:00:00.000Z";
  const options = {
    isInitialSync: false,
    showNewRecords: true,
    showUpdatedRecords: true,
  };

  test("compares strictly on an incremental recurrence", () => {
    expect(
      collectRecordChanges(
        [created, updated],
        since,
        POLL_RESOURCE_CONFIG.jobs,
        options,
      ),
    ).toEqual({ created: [], updated: [updated] });
  });

  test("compares inclusively on an initial sync", () => {
    expect(
      collectRecordChanges(
        [created, updated],
        since,
        POLL_RESOURCE_CONFIG.jobs,
        {
          ...options,
          isInitialSync: true,
        },
      ),
    ).toEqual({ created: [created], updated: [updated] });
  });

  test("drops records with a missing or unparseable timestamp", () => {
    const undated: BynderRecord = { id: "undated", dateCreated: "not a date" };
    expect(
      collectRecordChanges([undated], since, POLL_RESOURCE_CONFIG.jobs, {
        ...options,
        isInitialSync: true,
      }),
    ).toEqual({ created: [], updated: [] });
  });
});
