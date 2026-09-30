import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import { describe, expect, test } from "vitest";
import type { Space } from "../types";
import { resolveSpaceRecordChanges } from "../util";
import { newSpacesPollingTrigger } from "./newSpacesPollingTrigger";
describe("polling trigger batching", () => {
  test("New Spaces is opt-in batchable with a default batch size", () => {
    expect(newSpacesPollingTrigger.triggerResolverSupport).toBe("valid");
    expect(newSpacesPollingTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(
      newSpacesPollingTrigger.triggerResolver?.resolveItems,
    ).toBeInstanceOf(Function);
  });
});
describe("resolveSpaceRecordChanges", () => {
  const spaceA: Space = {
    id: "1",
    name: "Engineering",
    createdAt: "2026-01-01T00:00:00.000Z",
  };
  const spaceB: Space = {
    id: "2",
    name: "Marketing",
    createdAt: "2026-01-02T00:00:00.000Z",
  };
  test("tags every space as created", () => {
    expect(resolveSpaceRecordChanges([spaceA, spaceB])).toEqual([
      { changeType: "created", record: spaceA },
      { changeType: "created", record: spaceB },
    ]);
  });
  test("returns [] for empty or undefined input", () => {
    expect(resolveSpaceRecordChanges([])).toEqual([]);
    expect(resolveSpaceRecordChanges(undefined)).toEqual([]);
  });
  test("resolveItems flattens the payload shape perform actually returns", () => {
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: [spaceA] },
    };
    expect(
      newSpacesPollingTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([{ changeType: "created", record: spaceA }]);
  });
});
