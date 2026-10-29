import { describe, it, expect } from "vitest";
import {
  formatPipedriveTimestamp,
  partitionByTimestamp,
  resolvePollingRecordChanges,
} from "./polling";
import type {
  PipedriveRecentItem,
  PollingChangesObject,
  PollResourceConfig,
} from "../types";

describe("formatPipedriveTimestamp", () => {
  it("converts ISO to Pipedrive v1 format (space-separated, no millis)", () => {
    const date = new Date("2024-06-15T10:30:45.123Z");
    expect(formatPipedriveTimestamp(date)).toBe("2024-06-15 10:30:45");
  });
});

describe("partitionByTimestamp", () => {
  const config: PollResourceConfig = {
    createdAtField: "add_time",
    updatedAtField: "update_time",
  };
  const sinceDate = new Date("2024-06-01T00:00:00Z");
  const makeRecord = (
    id: number,
    data: Record<string, unknown>,
  ): PipedriveRecentItem => ({
    id,
    data,
  });

  it("classifies as created when add_time is after sinceDate", () => {
    const result = partitionByTimestamp(
      [
        makeRecord(1, {
          add_time: "2024-06-15T00:00:00Z",
          update_time: "2024-06-15T00:00:00Z",
        }),
      ],
      sinceDate,
      config,
    );
    expect(result.created).toHaveLength(1);
    expect(result.updated).toHaveLength(0);
  });

  it("classifies as updated when only update_time is after sinceDate", () => {
    const result = partitionByTimestamp(
      [
        makeRecord(2, {
          add_time: "2024-01-01T00:00:00Z",
          update_time: "2024-06-15T00:00:00Z",
        }),
      ],
      sinceDate,
      config,
    );
    expect(result.created).toHaveLength(0);
    expect(result.updated).toHaveLength(1);
  });

  it("excludes records where both timestamps are before sinceDate", () => {
    const result = partitionByTimestamp(
      [
        makeRecord(3, {
          add_time: "2024-01-01T00:00:00Z",
          update_time: "2024-01-01T00:00:00Z",
        }),
      ],
      sinceDate,
      config,
    );
    expect(result.created).toHaveLength(0);
    expect(result.updated).toHaveLength(0);
  });

  it("falls back to updated when neither timestamp field exists on the record", () => {
    const result = partitionByTimestamp(
      [makeRecord(4, { name: "No timestamps" })],
      sinceDate,
      config,
    );
    expect(result.updated).toHaveLength(1);
  });

  it("falls back to updated when config has null timestamp fields", () => {
    const noFieldsConfig: PollResourceConfig = {
      createdAtField: null,
      updatedAtField: null,
    };
    const result = partitionByTimestamp(
      [makeRecord(5, { add_time: "2024-06-15T00:00:00Z" })],
      sinceDate,
      noFieldsConfig,
    );
    expect(result.updated).toHaveLength(1);
  });
});

describe("resolvePollingRecordChanges", () => {
  const makeRecord = (id: number): PipedriveRecentItem => ({
    id,
    data: { name: `Record ${id}` },
  });

  it("flattens created and updated into tagged records", () => {
    const data: PollingChangesObject = {
      created: [makeRecord(1)],
      updated: [makeRecord(2), makeRecord(3)],
    };
    const result = resolvePollingRecordChanges(data);
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ changeType: "created", record: makeRecord(1) });
    expect(result[1].changeType).toBe("updated");
  });

  it("returns empty array for undefined input", () => {
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
});
