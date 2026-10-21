import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import { describe, expect, test } from "vitest";
import { pollChangesTrigger } from "./triggers";
import type { FluentOrder } from "./types";
import { lookBackDateClean, resolvePollingRecordChanges } from "./util";
const createdRecord: FluentOrder = {
  id: "ORD-1042",
  ref: "WEB-000142",
  type: "STANDARD",
  status: "CREATED",
  createdOn: "2026-05-26T14:30:00.000Z",
  updatedOn: "2026-05-26T14:30:00.000Z",
};
const updatedRecord: FluentOrder = {
  id: "ORD-980",
  ref: "WEB-000087",
  type: "STANDARD",
  status: "FULFILLED",
  createdOn: "2026-04-12T09:00:00.000Z",
  updatedOn: "2026-05-26T15:45:00.000Z",
};
describe("pollChangesTrigger", () => {
  test("New and Updated Records is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
    expect(
      pollChangesTrigger.triggerResolver?.getNextPaginationState,
    ).toBeInstanceOf(Function);
  });
});
describe("resolvePollingRecordChanges", () => {
  test("tags every record with how it changed", () => {
    expect(
      resolvePollingRecordChanges({
        created: [createdRecord],
        updated: [updatedRecord],
      }),
    ).toEqual([
      { changeType: "created", record: createdRecord },
      { changeType: "updated", record: updatedRecord },
    ]);
  });
  test("returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({})).toEqual([]);
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  test("tolerates an absent array", () => {
    expect(resolvePollingRecordChanges({ created: [createdRecord] })).toEqual([
      { changeType: "created", record: createdRecord },
    ]);
    expect(resolvePollingRecordChanges({ updated: [updatedRecord] })).toEqual([
      { changeType: "updated", record: updatedRecord },
    ]);
  });
});
describe("resolveItems (resolver test)", () => {
  test("flattens the payload shape perform actually returns", () => {
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: { created: [createdRecord] } },
    };
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.(
        {} as never,
        { payload } as never,
      ),
    ).toEqual([{ changeType: "created", record: createdRecord }]);
  });
});
describe("lookBackDateClean", () => {
  test("returns empty string for empty/null/undefined input", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean("   ")).toBe("");
    expect(lookBackDateClean(null)).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
  });
  test("returns ISO string for valid date", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("rejects invalid format", () => {
    expect(() => lookBackDateClean("01-01-2026")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
  });
  test("rejects non-calendar date", () => {
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
  });
  test("rejects future date", () => {
    const future = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    const futureStr = future.toISOString().slice(0, 10);
    expect(() => lookBackDateClean(futureStr)).toThrow(
      "Look-back Date cannot be a future date",
    );
  });
});
