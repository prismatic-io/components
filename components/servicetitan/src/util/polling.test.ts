import type { ServiceTitanRecord } from "../types";
import { filterByTimestamp } from "./polling";
const LAST_POLLED_AT = "2026-08-19T12:00:00.000Z";
const bucket = (records: ServiceTitanRecord[]) =>
  filterByTimestamp(records, LAST_POLLED_AT, "createdOn", "modifiedOn");
describe("filterByTimestamp", () => {
  test("puts a record created after the cutoff in the created bucket", () => {
    const record: ServiceTitanRecord = {
      id: 24815,
      createdOn: "2026-08-19T14:02:11.000Z",
      modifiedOn: "2026-08-19T14:02:11.000Z",
    };
    expect(bucket([record])).toEqual({ created: [record], updated: [] });
  });
  test("puts a record created before but modified after the cutoff in the updated bucket", () => {
    const record: ServiceTitanRecord = {
      id: 24790,
      createdOn: "2026-08-17T09:15:04.000Z",
      modifiedOn: "2026-08-19T13:42:07.000Z",
    };
    expect(bucket([record])).toEqual({ created: [], updated: [record] });
  });
  test("puts a record both created and modified in-window in created only", () => {
    const record: ServiceTitanRecord = {
      id: 24820,
      createdOn: "2026-08-19T13:00:00.000Z",
      modifiedOn: "2026-08-19T13:59:00.000Z",
    };
    const { created, updated } = bucket([record]);
    expect(created).toEqual([record]);
    expect(updated).toEqual([]);
  });
  test("drops a record matching neither test into neither bucket", () => {
    const stale: ServiceTitanRecord = {
      id: 24700,
      createdOn: "2026-08-01T08:00:00.000Z",
      modifiedOn: "2026-08-02T08:00:00.000Z",
    };
    const fresh: ServiceTitanRecord = {
      id: 24821,
      createdOn: "2026-08-19T14:30:00.000Z",
      modifiedOn: "2026-08-19T14:30:00.000Z",
    };
    expect(bucket([stale, fresh])).toEqual({ created: [fresh], updated: [] });
  });
  test("drops a record whose timestamp fields are missing or empty", () => {
    const missing: ServiceTitanRecord = { id: 1 };
    const empty: ServiceTitanRecord = { id: 2, createdOn: "", modifiedOn: "" };
    expect(bucket([missing, empty])).toEqual({ created: [], updated: [] });
  });
});
