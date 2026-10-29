import { describe, test, expect } from "vitest";
import { lookBackDateClean, resolvePollingRecordChanges } from "./polling";
import { classifyAssetsByPollDate } from "./classifyAssets";
import type { AssetResponse } from "../actions/types/shared";

const asset = (createdAt: string, modifiedAt: string): AssetResponse =>
  ({ createdAt, modifiedAt }) as unknown as AssetResponse;

describe("resolvePollingRecordChanges", () => {
  test("returns empty array for undefined input", () => {
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });

  test("returns empty array when both arrays are empty", () => {
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
  });

  test("maps created and updated with correct changeType", () => {
    const result = resolvePollingRecordChanges({
      created: [{ id: "c1" }],
      updated: [{ id: "u1" }],
    });
    expect(result).toEqual([
      { changeType: "created", record: { id: "c1" } },
      { changeType: "updated", record: { id: "u1" } },
    ]);
  });
});

describe("classifyAssetsByPollDate", () => {
  const lastPolledAt = "2026-01-15T00:00:00.000Z";

  test("classifies assets created after poll as created", () => {
    const assets = [
      asset("2026-02-01T00:00:00.000Z", "2026-02-01T00:00:00.000Z"),
    ];
    const { created, updated } = classifyAssetsByPollDate(assets, lastPolledAt);
    expect(created).toHaveLength(1);
    expect(updated).toHaveLength(0);
  });

  test("classifies assets modified after poll but created before as updated", () => {
    const assets = [
      asset("2025-06-01T00:00:00.000Z", "2026-02-01T00:00:00.000Z"),
    ];
    const { created, updated } = classifyAssetsByPollDate(assets, lastPolledAt);
    expect(created).toHaveLength(0);
    expect(updated).toHaveLength(1);
  });

  test("excludes assets not modified since the poll", () => {
    const assets = [
      asset("2025-01-01T00:00:00.000Z", "2025-01-01T00:00:00.000Z"),
    ];
    const { created, updated } = classifyAssetsByPollDate(assets, lastPolledAt);
    expect(created).toHaveLength(0);
    expect(updated).toHaveLength(0);
  });

  test("created beats updated when both qualify", () => {
    const assets = [
      asset("2026-02-01T00:00:00.000Z", "2026-03-01T00:00:00.000Z"),
    ];
    const { created, updated } = classifyAssetsByPollDate(assets, lastPolledAt);
    expect(created).toHaveLength(1);
    expect(updated).toHaveLength(0);
  });
});

describe("lookBackDateClean", () => {
  test("returns empty string for empty input", () => {
    expect(lookBackDateClean("")).toBe("");
  });

  test("returns valid date as-is", () => {
    expect(lookBackDateClean("2025-06-15")).toBe("2025-06-15");
  });

  test("throws on invalid format", () => {
    expect(() => lookBackDateClean("15/06/2025")).toThrow("YYYY-MM-DD");
  });

  test("throws on invalid calendar date", () => {
    expect(() => lookBackDateClean("2025-02-30")).toThrow(
      "not a valid calendar date",
    );
  });

  test("throws on future date", () => {
    expect(() => lookBackDateClean("2099-01-01")).toThrow("future date");
  });
});
