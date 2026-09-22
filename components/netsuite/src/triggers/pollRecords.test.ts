import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import { describe, expect, test } from "vitest";
import type { PollingTriggerObject } from "../types/PollingTriggerObject";
import { resolvePollingRecordChanges } from "../utils";
import { pollRecords } from "./pollRecords";
const created: PollingTriggerObject = {
  id: "12345",
  datecreated: "2026-01-01T00:00:00Z",
  lastmodifieddate: "2026-01-01T00:00:00Z",
};
const updated: PollingTriggerObject = {
  id: "12346",
  datecreated: "2026-01-01T00:00:00Z",
  lastmodifieddate: "2026-01-02T00:00:00Z",
};
describe("pollRecords batching", () => {
  test("New and Updated Records is opt-in batchable with a default batch size", () => {
    expect(pollRecords.triggerResolverSupport).toBe("valid");
    expect(pollRecords.batchConfig).toEqual({ batchSize: 50 });
    expect(pollRecords.triggerResolver?.resolveItems).toBeInstanceOf(Function);
  });
  test("resolvePollingRecordChanges tags every record with how it changed", () => {
    expect(
      resolvePollingRecordChanges({
        createdRecords: [created],
        updatedRecords: [updated],
      }),
    ).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });
  test("resolvePollingRecordChanges returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({})).toEqual([]);
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  test("resolvePollingRecordChanges tolerates an absent array", () => {
    expect(resolvePollingRecordChanges({ createdRecords: [created] })).toEqual([
      { changeType: "created", record: created },
    ]);
    expect(resolvePollingRecordChanges({ updatedRecords: [updated] })).toEqual([
      { changeType: "updated", record: updated },
    ]);
  });
  test("resolveItems flattens the payload shape perform actually returns", () => {
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: { createdRecords: [created] } },
    };
    expect(
      pollRecords.triggerResolver?.resolveItems?.({} as never, { payload }),
    ).toEqual([{ changeType: "created", record: created }]);
  });
});
