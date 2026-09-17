import { describe, expect, it } from "vitest";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import type { PollingChangesObject, SendgridMessageRecord } from "../types";
import { resolvePollingRecordChanges } from "./polling";
const exampleChanges = pollChangesTriggerExamplePayload.payload.body
  .data as PollingChangesObject;
const updatedRecord = (exampleChanges.updated ?? [])[0];
const createdRecord: SendgridMessageRecord = {
  ...updatedRecord,
  msg_id: "def67890.recvd-12345-ABC-1-7654321-1.0",
};
describe("resolvePollingRecordChanges", () => {
  it("tags and flattens both arrays, created first", () => {
    expect(
      resolvePollingRecordChanges({
        created: [createdRecord],
        updated: [updatedRecord],
      }),
    ).toEqual([
      { changeType: "created", record: createdRecord },
      { changeType: "updated", record: updatedRecord },
    ]);
  });
  it("handles only `updated` present", () => {
    expect(resolvePollingRecordChanges({ updated: [updatedRecord] })).toEqual([
      { changeType: "updated", record: updatedRecord },
    ]);
  });
  it("handles only `created` present", () => {
    expect(resolvePollingRecordChanges({ created: [createdRecord] })).toEqual([
      { changeType: "created", record: createdRecord },
    ]);
  });
  it("returns an empty array when both arrays are empty", () => {
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
  });
  it("returns an empty array for undefined input", () => {
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
});
