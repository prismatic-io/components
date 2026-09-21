import { describe, expect, it } from "vitest";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import type {
  PollingChangesObject,
  PollingRecordChange,
  SageIntacctRecord,
} from "../types";
import { resolvePollingRecordChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
const createdVendor: SageIntacctRecord = {
  RECORDNO: "10042",
  WHENMODIFIED: "2026-01-15T14:30:00Z",
  WHENCREATED: "2026-01-15T14:30:00Z",
  VENDORID: "V-1042",
};
const createdVendorTwo: SageIntacctRecord = {
  RECORDNO: "10043",
  WHENMODIFIED: "2026-01-15T14:31:00Z",
  WHENCREATED: "2026-01-15T14:31:00Z",
  VENDORID: "V-1043",
};
const updatedVendor: SageIntacctRecord = {
  RECORDNO: "10001",
  WHENMODIFIED: "2026-01-15T14:35:00Z",
  WHENCREATED: "2025-12-01T09:00:00Z",
  VENDORID: "V-1001",
};
const updatedVendorTwo: SageIntacctRecord = {
  RECORDNO: "10002",
  WHENMODIFIED: "2026-01-15T14:36:00Z",
  WHENCREATED: "2025-12-02T09:00:00Z",
  VENDORID: "V-1002",
};
describe("pollChangesTrigger batching declaration", () => {
  it("declares opt-in batching with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({
      batchSize: DEFAULT_BATCH_SIZE,
    });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
});
describe("resolvePollingRecordChanges", () => {
  it("tags every record with how it changed", () => {
    expect(
      resolvePollingRecordChanges({
        created: [createdVendor],
        updated: [updatedVendor],
      }),
    ).toEqual<PollingRecordChange[]>([
      { changeType: "created", record: createdVendor },
      { changeType: "updated", record: updatedVendor },
    ]);
  });
  it("emits created records before updated records, preserving source order", () => {
    expect(
      resolvePollingRecordChanges({
        created: [createdVendor, createdVendorTwo],
        updated: [updatedVendor, updatedVendorTwo],
      }),
    ).toEqual<PollingRecordChange[]>([
      { changeType: "created", record: createdVendor },
      { changeType: "created", record: createdVendorTwo },
      { changeType: "updated", record: updatedVendor },
      { changeType: "updated", record: updatedVendorTwo },
    ]);
  });
  it("returns [] for an empty changes object", () => {
    expect(resolvePollingRecordChanges({})).toEqual([]);
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
  });
  it("returns [] when the changes object is undefined", () => {
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  it("handles one array present and the other absent", () => {
    expect(resolvePollingRecordChanges({ created: [createdVendor] })).toEqual<
      PollingRecordChange[]
    >([{ changeType: "created", record: createdVendor }]);
    expect(resolvePollingRecordChanges({ updated: [updatedVendor] })).toEqual<
      PollingRecordChange[]
    >([{ changeType: "updated", record: updatedVendor }]);
  });
});
describe("pollChangesTrigger resolveItems", () => {
  const fixture = pollChangesTriggerExamplePayload.payload.body
    .data as PollingChangesObject;
  const fixtureCreated = fixture.created ?? [];
  const fixtureUpdated = fixture.updated ?? [];
  it("flattens the documented example payload", () => {
    expect(fixtureCreated.length).toBeGreaterThan(0);
    expect(fixtureUpdated.length).toBeGreaterThan(0);
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload: pollChangesTriggerExamplePayload.payload,
      }),
    ).toEqual<PollingRecordChange[]>([
      ...fixtureCreated.map(
        (record): PollingRecordChange => ({ changeType: "created", record }),
      ),
      ...fixtureUpdated.map(
        (record): PollingRecordChange => ({ changeType: "updated", record }),
      ),
    ]);
  });
  it("returns [] for the no-changes payload perform emits alongside polledNoChanges", () => {
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload: {
          ...pollChangesTriggerExamplePayload.payload,
          body: { data: { created: [], updated: [] } },
        },
      }),
    ).toEqual([]);
  });
});
