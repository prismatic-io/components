import { DEFAULT_POLLING_CRM_FIELDS } from "../constants";
import type { BookRecord, CRMRecord } from "../types";
import {
  getBooksModifiedOrCreatedRecords,
  getCRMModifiedOrCreatedRecords,
  mergeCRMPollingFields,
  polledChanges,
} from "./triggers";
const LAST_UPDATED = "2024-01-15T00:00:00+00:00";
const crmRecord = (over: Partial<CRMRecord>): CRMRecord => ({
  id: "1",
  Created_Time: "2024-01-01T00:00:00+00:00",
  Modified_Time: "2024-01-01T00:00:00+00:00",
  Full_Name: "Test",
  ...over,
});
const bookRecord = (over: Partial<BookRecord>): BookRecord =>
  ({
    created_time: "2024-01-01T00:00:00+00:00",
    last_modified_time: "2024-01-01T00:00:00+00:00",
    ...over,
  }) as BookRecord;
describe("getCRMModifiedOrCreatedRecords", () => {
  test("record with Created_Time >= lastUpdated lands in the created bucket", () => {
    const rec = crmRecord({ Created_Time: "2024-01-20T00:00:00+00:00" });
    const result = getCRMModifiedOrCreatedRecords([rec], LAST_UPDATED);
    expect(result.created).toEqual([rec]);
    expect(result.updated).toEqual([]);
  });
  test("record with only Modified_Time >= lastUpdated lands in the updated bucket", () => {
    const rec = crmRecord({
      Created_Time: "2024-01-01T00:00:00+00:00",
      Modified_Time: "2024-01-20T00:00:00+00:00",
    });
    const result = getCRMModifiedOrCreatedRecords([rec], LAST_UPDATED);
    expect(result.updated).toEqual([rec]);
    expect(result.created).toEqual([]);
  });
  test("record older than lastUpdated lands in neither bucket", () => {
    const rec = crmRecord({
      Created_Time: "2024-01-01T00:00:00+00:00",
      Modified_Time: "2024-01-02T00:00:00+00:00",
    });
    const result = getCRMModifiedOrCreatedRecords([rec], LAST_UPDATED);
    expect(result.created).toEqual([]);
    expect(result.updated).toEqual([]);
  });
});
describe("getBooksModifiedOrCreatedRecords", () => {
  test("record with created_time >= lastUpdated lands in the created bucket", () => {
    const rec = bookRecord({ created_time: "2024-01-20T00:00:00+00:00" });
    const result = getBooksModifiedOrCreatedRecords([rec], LAST_UPDATED);
    expect(result.created).toEqual([rec]);
    expect(result.updated).toEqual([]);
  });
  test("record with only last_modified_time >= lastUpdated lands in the updated bucket", () => {
    const rec = bookRecord({
      created_time: "2024-01-01T00:00:00+00:00",
      last_modified_time: "2024-01-20T00:00:00+00:00",
    });
    const result = getBooksModifiedOrCreatedRecords([rec], LAST_UPDATED);
    expect(result.updated).toEqual([rec]);
    expect(result.created).toEqual([]);
  });
  test("record older than lastUpdated lands in neither bucket", () => {
    const rec = bookRecord({
      created_time: "2024-01-01T00:00:00+00:00",
      last_modified_time: "2024-01-02T00:00:00+00:00",
    });
    const result = getBooksModifiedOrCreatedRecords([rec], LAST_UPDATED);
    expect(result.created).toEqual([]);
    expect(result.updated).toEqual([]);
  });
});
describe("polledChanges", () => {
  test("returns true when both buckets are empty", () => {
    expect(polledChanges({ created: [], updated: [] })).toBe(true);
  });
  test("returns false when the created bucket is non-empty", () => {
    expect(polledChanges({ created: [crmRecord({})], updated: [] })).toBe(
      false,
    );
  });
  test("returns false when the updated bucket is non-empty", () => {
    expect(polledChanges({ created: [], updated: [crmRecord({})] })).toBe(
      false,
    );
  });
});
describe("mergeCRMPollingFields", () => {
  test("returns the defaults unioned with additional fields, de-duplicated", () => {
    const result = mergeCRMPollingFields(["Email", "Created_Time"]);
    expect(result.filter((f) => f === "Created_Time")).toHaveLength(1);
    expect(result).toEqual([...DEFAULT_POLLING_CRM_FIELDS, "Email"]);
  });
  test("returns defaults only when called with no argument", () => {
    expect(mergeCRMPollingFields()).toEqual(DEFAULT_POLLING_CRM_FIELDS);
  });
  test("returns defaults only when called with an empty array", () => {
    expect(mergeCRMPollingFields([])).toEqual(DEFAULT_POLLING_CRM_FIELDS);
  });
  test("always includes Created_Time and Modified_Time", () => {
    const result = mergeCRMPollingFields(["Email"]);
    expect(result).toContain("Created_Time");
    expect(result).toContain("Modified_Time");
  });
});
