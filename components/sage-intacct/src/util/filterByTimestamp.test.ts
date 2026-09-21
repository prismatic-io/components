import { describe, expect, it } from "vitest";
import { filterByTimestamp } from "./filterByTimestamp";
import type { SageIntacctRecord } from "../types";
const makeRecord = (
  overrides: Partial<SageIntacctRecord> = {},
): SageIntacctRecord => ({
  RECORDNO: "1",
  WHENMODIFIED: "2024-06-15T12:00:00Z",
  WHENCREATED: "2024-06-15T12:00:00Z",
  ...overrides,
});
describe("filterByTimestamp", () => {
  const lastPolledAt = "2024-06-10T00:00:00Z";
  it("puts records created after lastPolledAt into the created bucket", () => {
    const record = makeRecord({ WHENCREATED: "2024-06-11T00:00:00Z" });
    const result = filterByTimestamp([record], lastPolledAt, true, true);
    expect(result.created).toEqual([record]);
    expect(result.updated).toEqual([]);
  });
  it("puts records created before lastPolledAt into the updated bucket", () => {
    const record = makeRecord({ WHENCREATED: "2024-06-09T00:00:00Z" });
    const result = filterByTimestamp([record], lastPolledAt, true, true);
    expect(result.created).toEqual([]);
    expect(result.updated).toEqual([record]);
  });
  it("treats records with missing created field as updated", () => {
    const record = makeRecord();
    delete record.WHENCREATED;
    const result = filterByTimestamp([record], lastPolledAt, true, true);
    expect(result.created).toEqual([]);
    expect(result.updated).toEqual([record]);
  });
  it("treats records with empty created field as updated", () => {
    const record = makeRecord({ WHENCREATED: "" });
    const result = filterByTimestamp([record], lastPolledAt, true, true);
    expect(result.created).toEqual([]);
    expect(result.updated).toEqual([record]);
  });
  it("suppresses created records when includeNew is false", () => {
    const record = makeRecord({ WHENCREATED: "2024-06-11T00:00:00Z" });
    const result = filterByTimestamp([record], lastPolledAt, false, true);
    expect(result.created).toEqual([]);
    expect(result.updated).toEqual([]);
  });
  it("suppresses updated records when includeUpdated is false", () => {
    const record = makeRecord({ WHENCREATED: "2024-06-09T00:00:00Z" });
    const result = filterByTimestamp([record], lastPolledAt, true, false);
    expect(result.created).toEqual([]);
    expect(result.updated).toEqual([]);
  });
  it("returns empty results when both flags are false", () => {
    const records = [
      makeRecord({ WHENCREATED: "2024-06-11T00:00:00Z" }),
      makeRecord({ WHENCREATED: "2024-06-09T00:00:00Z" }),
    ];
    const result = filterByTimestamp(records, lastPolledAt, false, false);
    expect(result.created).toEqual([]);
    expect(result.updated).toEqual([]);
  });
  it("uses a custom createdField parameter", () => {
    const record = makeRecord({ CUSTOM_DATE: "2024-06-11T00:00:00Z" });
    const result = filterByTimestamp(
      [record],
      lastPolledAt,
      true,
      true,
      "CUSTOM_DATE",
    );
    expect(result.created).toEqual([record]);
  });
  it("treats exact timestamp equality as updated (strict >)", () => {
    const record = makeRecord({ WHENCREATED: lastPolledAt });
    const result = filterByTimestamp([record], lastPolledAt, true, true);
    expect(result.created).toEqual([]);
    expect(result.updated).toEqual([record]);
  });
});
