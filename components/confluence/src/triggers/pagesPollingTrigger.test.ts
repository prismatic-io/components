import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import { describe, expect, test } from "vitest";
import type { Page } from "../types";
import { resolvePageRecordChanges } from "../util";
import { newSpacesPollingTrigger } from "./newSpacesPollingTrigger";
import { pagesPollingTrigger } from "./pagesPollingTrigger";
describe("polling trigger batching", () => {
  test.each([
    ["New and Updated Pages", pagesPollingTrigger],
    ["New Spaces", newSpacesPollingTrigger],
  ])("%s is opt-in batchable with a default batch size", (_label, trigger) => {
    expect(trigger.triggerResolverSupport).toBe("valid");
    expect(trigger.batchConfig).toEqual({ batchSize: 50 });
    expect(trigger.triggerResolver?.resolveItems).toBeInstanceOf(Function);
  });
});
describe("resolvePageRecordChanges", () => {
  const created: Page = {
    id: "1",
    title: "Q4 Planning Notes",
    createdAt: "2026-01-01T00:00:00.000Z",
    version: { createdAt: "2026-01-01T00:00:00.000Z" },
  };
  const updated: Page = {
    id: "2",
    title: "Engineering Onboarding Guide",
    createdAt: "2025-01-01T00:00:00.000Z",
    version: { createdAt: "2026-01-02T00:00:00.000Z" },
  };
  test("tags every page with how it changed", () => {
    expect(
      resolvePageRecordChanges({
        createdRecords: [created],
        updatedRecords: [updated],
      }),
    ).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });
  test("returns [] for empty or undefined changes", () => {
    expect(resolvePageRecordChanges({})).toEqual([]);
    expect(resolvePageRecordChanges(undefined)).toEqual([]);
  });
  test("tolerates an absent array", () => {
    expect(resolvePageRecordChanges({ createdRecords: [created] })).toEqual([
      { changeType: "created", record: created },
    ]);
    expect(resolvePageRecordChanges({ updatedRecords: [updated] })).toEqual([
      { changeType: "updated", record: updated },
    ]);
  });
  test("resolveItems flattens the payload shape perform actually returns", () => {
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: { createdRecords: [created], updatedRecords: [] } },
    };
    expect(
      pagesPollingTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([{ changeType: "created", record: created }]);
  });
});
