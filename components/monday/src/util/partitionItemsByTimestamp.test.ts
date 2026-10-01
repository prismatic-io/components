import { describe, expect, it } from "vitest";
import type { MondayItem } from "../types";
import { partitionItemsByTimestamp } from "./fetchItemsSince";
const boundary = new Date("2026-05-21T12:00:00Z");
const makeItem = (overrides: Partial<MondayItem> = {}): MondayItem => ({
  id: "1",
  ...overrides,
});
describe("partitionItemsByTimestamp", () => {
  it("classifies items created after the boundary as created", () => {
    const items: MondayItem[] = [
      makeItem({
        id: "1",
        created_at: "2026-05-21T14:00:00Z",
        updated_at: "2026-05-21T14:00:00Z",
      }),
    ];
    const result = partitionItemsByTimestamp(items, boundary);
    expect(result.created).toHaveLength(1);
    expect(result.updated).toHaveLength(0);
  });
  it("classifies items updated after the boundary (but created before) as updated", () => {
    const items: MondayItem[] = [
      makeItem({
        id: "2",
        created_at: "2026-04-01T00:00:00Z",
        updated_at: "2026-05-21T15:00:00Z",
      }),
    ];
    const result = partitionItemsByTimestamp(items, boundary);
    expect(result.created).toHaveLength(0);
    expect(result.updated).toHaveLength(1);
  });
  it("drops items where both timestamps are before the boundary", () => {
    const items: MondayItem[] = [
      makeItem({
        id: "3",
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-02T00:00:00Z",
      }),
    ];
    const result = partitionItemsByTimestamp(items, boundary);
    expect(result.created).toHaveLength(0);
    expect(result.updated).toHaveLength(0);
  });
  it("falls back to updated when both timestamps are missing", () => {
    const items: MondayItem[] = [makeItem({ id: "4" })];
    const result = partitionItemsByTimestamp(items, boundary);
    expect(result.created).toHaveLength(0);
    expect(result.updated).toHaveLength(1);
  });
  it("prefers created over updated when both exceed the boundary", () => {
    const items: MondayItem[] = [
      makeItem({
        id: "5",
        created_at: "2026-05-21T13:00:00Z",
        updated_at: "2026-05-21T14:00:00Z",
      }),
    ];
    const result = partitionItemsByTimestamp(items, boundary);
    expect(result.created).toHaveLength(1);
    expect(result.updated).toHaveLength(0);
  });
  it("handles a mix of items correctly", () => {
    const items: MondayItem[] = [
      makeItem({
        id: "new",
        created_at: "2026-05-21T13:00:00Z",
        updated_at: "2026-05-21T13:00:00Z",
      }),
      makeItem({
        id: "upd",
        created_at: "2026-03-01T00:00:00Z",
        updated_at: "2026-05-21T15:00:00Z",
      }),
      makeItem({
        id: "old",
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
      }),
      makeItem({ id: "none" }),
    ];
    const result = partitionItemsByTimestamp(items, boundary);
    expect(result.created.map((i) => i.id)).toEqual(["new"]);
    expect(result.updated.map((i) => i.id)).toEqual(["upd", "none"]);
  });
  it("returns empty buckets for an empty array", () => {
    const result = partitionItemsByTimestamp([], boundary);
    expect(result.created).toEqual([]);
    expect(result.updated).toEqual([]);
  });
});
