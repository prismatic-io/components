import { describe, expect, it } from "vitest";
import { filterByTimestamp, resolvePollingRecordChanges } from "./polling";
import type { KlaviyoRecord } from "../types";
const makeRecord = (
  id: string,
  createdAt: string,
  updatedAt: string,
  createdAtField = "created_at",
  updatedAtField = "updated_at",
): KlaviyoRecord => ({
  type: "campaign",
  id,
  attributes: {
    [createdAtField]: createdAt,
    [updatedAtField]: updatedAt,
  },
});
describe("filterByTimestamp", () => {
  const lastPolledAt = "2024-06-01T12:00:00Z";
  it("classifies a new record (created after lastPolledAt)", () => {
    const records = [
      makeRecord("1", "2024-06-01T13:00:00Z", "2024-06-01T13:00:00Z"),
    ];
    const result = filterByTimestamp(
      records,
      lastPolledAt,
      "created_at",
      "updated_at",
      true,
      true,
    );
    expect(result.created).toHaveLength(1);
    expect(result.updated).toHaveLength(0);
    expect(result.created[0].id).toBe("1");
  });
  it("classifies an updated record (created before, updated after lastPolledAt)", () => {
    const records = [
      makeRecord("2", "2024-05-01T10:00:00Z", "2024-06-01T14:00:00Z"),
    ];
    const result = filterByTimestamp(
      records,
      lastPolledAt,
      "created_at",
      "updated_at",
      true,
      true,
    );
    expect(result.created).toHaveLength(0);
    expect(result.updated).toHaveLength(1);
    expect(result.updated[0].id).toBe("2");
  });
  it("excludes new records when includeNew is false", () => {
    const records = [
      makeRecord("1", "2024-06-01T13:00:00Z", "2024-06-01T13:00:00Z"),
    ];
    const result = filterByTimestamp(
      records,
      lastPolledAt,
      "created_at",
      "updated_at",
      false,
      true,
    );
    expect(result.created).toHaveLength(0);
    expect(result.updated).toHaveLength(0);
  });
  it("excludes updated records when includeUpdated is false", () => {
    const records = [
      makeRecord("2", "2024-05-01T10:00:00Z", "2024-06-01T14:00:00Z"),
    ];
    const result = filterByTimestamp(
      records,
      lastPolledAt,
      "created_at",
      "updated_at",
      true,
      false,
    );
    expect(result.created).toHaveLength(0);
    expect(result.updated).toHaveLength(0);
  });
  it("separates mixed new and updated records", () => {
    const records = [
      makeRecord("new-1", "2024-06-01T13:00:00Z", "2024-06-01T13:00:00Z"),
      makeRecord("upd-1", "2024-05-01T10:00:00Z", "2024-06-01T14:00:00Z"),
      makeRecord("new-2", "2024-06-02T08:00:00Z", "2024-06-02T08:00:00Z"),
    ];
    const result = filterByTimestamp(
      records,
      lastPolledAt,
      "created_at",
      "updated_at",
      true,
      true,
    );
    expect(result.created).toHaveLength(2);
    expect(result.updated).toHaveLength(1);
  });
  it("returns empty arrays when no records match", () => {
    const result = filterByTimestamp(
      [],
      lastPolledAt,
      "created_at",
      "updated_at",
      true,
      true,
    );
    expect(result.created).toEqual([]);
    expect(result.updated).toEqual([]);
  });
  it("handles records with non-string timestamp attributes gracefully", () => {
    const record: KlaviyoRecord = {
      type: "campaign",
      id: "bad",
      attributes: {
        created_at: null,
        updated_at: null,
      },
    };
    const result = filterByTimestamp(
      [record],
      lastPolledAt,
      "created_at",
      "updated_at",
      true,
      true,
    );
    expect(result.created).toHaveLength(0);
    expect(result.updated).toHaveLength(0);
  });
  it("works with profile-style field names (created/updated)", () => {
    const record: KlaviyoRecord = {
      type: "profile",
      id: "p1",
      attributes: {
        created: "2024-06-02T10:00:00Z",
        updated: "2024-06-02T10:00:00Z",
      },
    };
    const result = filterByTimestamp(
      [record],
      lastPolledAt,
      "created",
      "updated",
      true,
      true,
    );
    expect(result.created).toHaveLength(1);
  });
  it("handles Date object timestamps from the Klaviyo SDK", () => {
    const record: KlaviyoRecord = {
      type: "profile",
      id: "date-obj",
      attributes: {
        created: new Date("2024-06-02T10:00:00Z"),
        updated: new Date("2024-06-02T11:00:00Z"),
      },
    };
    const result = filterByTimestamp(
      [record],
      lastPolledAt,
      "created",
      "updated",
      true,
      true,
    );
    expect(result.created).toHaveLength(1);
    expect(result.created[0].id).toBe("date-obj");
    expect(result.updated).toHaveLength(0);
  });
  it("classifies a Date object updated record correctly", () => {
    const record: KlaviyoRecord = {
      type: "profile",
      id: "date-upd",
      attributes: {
        created: new Date("2024-05-01T10:00:00Z"),
        updated: new Date("2024-06-02T11:00:00Z"),
      },
    };
    const result = filterByTimestamp(
      [record],
      lastPolledAt,
      "created",
      "updated",
      true,
      true,
    );
    expect(result.created).toHaveLength(0);
    expect(result.updated).toHaveLength(1);
    expect(result.updated[0].id).toBe("date-upd");
  });
  it("works with SDK camelCase campaign field names (createdAt/updatedAt)", () => {
    const records = [
      makeRecord(
        "c1",
        "2024-06-02T10:00:00Z",
        "2024-06-02T10:00:00Z",
        "createdAt",
        "updatedAt",
      ),
      makeRecord(
        "c2",
        "2024-05-01T10:00:00Z",
        "2024-06-02T14:00:00Z",
        "createdAt",
        "updatedAt",
      ),
    ];
    const result = filterByTimestamp(
      records,
      lastPolledAt,
      "createdAt",
      "updatedAt",
      true,
      true,
    );
    expect(result.created).toHaveLength(1);
    expect(result.created[0].id).toBe("c1");
    expect(result.updated).toHaveLength(1);
    expect(result.updated[0].id).toBe("c2");
  });
  it("does not double-classify a new record as also updated", () => {
    const records = [
      makeRecord("1", "2024-06-01T13:00:00Z", "2024-06-01T13:00:00Z"),
    ];
    const result = filterByTimestamp(
      records,
      lastPolledAt,
      "created_at",
      "updated_at",
      true,
      true,
    );
    expect(result.created).toHaveLength(1);
    expect(result.updated).toHaveLength(0);
  });
});
describe("resolvePollingRecordChanges", () => {
  const rec = (id: string): KlaviyoRecord => ({
    type: "profile",
    id,
    attributes: {},
  });
  it("flattens created then updated into tagged items", () => {
    const result = resolvePollingRecordChanges({
      created: [rec("1")],
      updated: [rec("2")],
    });
    expect(result).toEqual([
      { changeType: "created", record: rec("1") },
      { changeType: "updated", record: rec("2") },
    ]);
  });
  it("handles only created records", () => {
    const result = resolvePollingRecordChanges({ created: [rec("1")] });
    expect(result).toHaveLength(1);
    expect(result[0].changeType).toBe("created");
  });
  it("handles only updated records", () => {
    const result = resolvePollingRecordChanges({ updated: [rec("1")] });
    expect(result).toHaveLength(1);
    expect(result[0].changeType).toBe("updated");
  });
  it("returns empty array for undefined input", () => {
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  it("returns empty array for empty object", () => {
    expect(resolvePollingRecordChanges({})).toEqual([]);
  });
});
