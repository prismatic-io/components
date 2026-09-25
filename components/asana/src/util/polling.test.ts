import type { PollingRecordChange } from "../types/polling";
import type { Task } from "../types/resources";
import {
  partitionTasksByTimestamp,
  resolvePollingRecordChanges,
} from "./polling";
const makeTask = (
  overrides: Partial<Task> & {
    gid: string;
  },
): Task =>
  ({
    name: "Test Task",
    ...overrides,
  }) as Task;
describe("partitionTasksByTimestamp", () => {
  const sinceDate = new Date("2024-06-01T00:00:00Z");
  it("puts tasks created after sinceDate into created", () => {
    const task = makeTask({
      gid: "1",
      created_at: "2024-06-15T00:00:00Z",
      modified_at: "2024-06-15T00:00:00Z",
    });
    const result = partitionTasksByTimestamp([task], sinceDate);
    expect(result.created).toEqual([task]);
    expect(result.updated).toEqual([]);
  });
  it("puts tasks modified (but not created) after sinceDate into updated", () => {
    const task = makeTask({
      gid: "2",
      created_at: "2024-05-01T00:00:00Z",
      modified_at: "2024-06-15T00:00:00Z",
    });
    const result = partitionTasksByTimestamp([task], sinceDate);
    expect(result.created).toEqual([]);
    expect(result.updated).toEqual([task]);
  });
  it("puts tasks with no dates into updated", () => {
    const task = makeTask({
      gid: "3",
    });
    (task as Record<string, unknown>).created_at = null;
    (task as Record<string, unknown>).modified_at = null;
    const result = partitionTasksByTimestamp([task], sinceDate);
    expect(result.created).toEqual([]);
    expect(result.updated).toEqual([task]);
  });
  it("excludes tasks older than sinceDate in both fields", () => {
    const task = makeTask({
      gid: "4",
      created_at: "2024-01-01T00:00:00Z",
      modified_at: "2024-01-15T00:00:00Z",
    });
    const result = partitionTasksByTimestamp([task], sinceDate);
    expect(result.created).toEqual([]);
    expect(result.updated).toEqual([]);
  });
  it("partitions a mixed list correctly", () => {
    const created = makeTask({
      gid: "1",
      created_at: "2024-07-01T00:00:00Z",
      modified_at: "2024-07-01T00:00:00Z",
    });
    const updated = makeTask({
      gid: "2",
      created_at: "2024-03-01T00:00:00Z",
      modified_at: "2024-07-01T00:00:00Z",
    });
    const old = makeTask({
      gid: "3",
      created_at: "2024-01-01T00:00:00Z",
      modified_at: "2024-02-01T00:00:00Z",
    });
    const result = partitionTasksByTimestamp(
      [created, updated, old],
      sinceDate,
    );
    expect(result.created).toEqual([created]);
    expect(result.updated).toEqual([updated]);
  });
});
describe("resolvePollingRecordChanges", () => {
  const created = makeTask({ gid: "1", created_at: "2024-07-01T00:00:00Z" });
  const updated = makeTask({ gid: "2", modified_at: "2024-07-01T00:00:00Z" });
  it("tags every record with how it changed", () => {
    const result: PollingRecordChange[] = resolvePollingRecordChanges({
      created: [created],
      updated: [updated],
    });
    expect(result).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });
  it("returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({})).toEqual([]);
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  it("tolerates an absent array", () => {
    expect(resolvePollingRecordChanges({ created: [created] })).toEqual([
      { changeType: "created", record: created },
    ]);
    expect(resolvePollingRecordChanges({ updated: [updated] })).toEqual([
      { changeType: "updated", record: updated },
    ]);
  });
});
